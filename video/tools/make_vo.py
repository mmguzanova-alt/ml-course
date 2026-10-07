"""Generate per-scene voice-over with Piper and write frame timings for Remotion.

Usage:
  python3 make_vo.py <project_dir> <voice.onnx>

Reads  <project_dir>/vo-script.json
Writes <project_dir>/public/vo/<id>.wav and <project_dir>/src/vo.json

A scene is either {"id", "text"} or {"id", "parts": [...]} — for parts, the
start frame of every part is recorded so animations can follow the narration.
"""
import json
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np
from piper import PiperVoice, SynthesisConfig

project = Path(sys.argv[1])
voice = PiperVoice.load(sys.argv[2])
script = json.loads((project / "vo-script.json").read_text(encoding="utf-8"))
fps = script.get("fps", 30)
cfg = SynthesisConfig(
    length_scale=script.get("length_scale", 1.05),
    noise_scale=script.get("noise_scale", 0.6),
    noise_w_scale=script.get("noise_w_scale", 0.7),
)
rate = voice.config.sample_rate
sentence_gap = np.zeros(int(rate * script.get("sentence_silence", 0.28)), dtype=np.int16)

out_dir = project / "public" / "vo"
out_dir.mkdir(parents=True, exist_ok=True)


def speak(text: str) -> np.ndarray:
    chunks = []
    for chunk in voice.synthesize(text, syn_config=cfg):
        chunks.append(chunk.audio_int16_array)
        chunks.append(sentence_gap)
    return np.concatenate(chunks[:-1]) if chunks else np.zeros(0, dtype=np.int16)


timings = {}
for scene in script["scenes"]:
    parts = scene.get("parts") or [scene["text"]]
    part_gap = np.zeros(int(rate * scene.get("gap", 0.35)), dtype=np.int16)
    audio, starts, cursor = [], [], 0
    for i, text in enumerate(parts):
        if i:
            audio.append(part_gap)
            cursor += len(part_gap)
        starts.append(round(cursor / rate * fps))
        a = speak(text)
        audio.append(a)
        cursor += len(a)
    samples = np.concatenate(audio)

    raw = out_dir / f"{scene['id']}.raw.wav"
    with wave.open(str(raw), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(samples.tobytes())
    # Gentle cleanup: cut rumble, even out level, stereo 48 kHz for the video mux.
    subprocess.run(
        [
            "ffmpeg", "-v", "error", "-y", "-i", str(raw),
            "-af", "highpass=f=70,lowpass=f=11000,acompressor=threshold=-20dB:ratio=2.5:attack=5:release=80,loudnorm=I=-16:TP=-1.5:LRA=7",
            "-ar", "48000", "-ac", "2", str(out_dir / f"{scene['id']}.wav"),
        ],
        check=True,
    )
    raw.unlink()
    timings[scene["id"]] = {"frames": round(len(samples) / rate * fps), "parts": starts}
    print(f"{scene['id']:<14} {len(samples) / rate:5.1f}s  parts={starts}")

(project / "src" / "vo.json").write_text(json.dumps(timings, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
