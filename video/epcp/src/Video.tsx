import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import VO from "./vo.json";
import { C, LEFT, SANS } from "./ui";
import {
  Bus,
  Circuits,
  Flagships,
  Flow,
  Layers,
  Limits,
  Models,
  Outro,
  Purpose,
  Quality,
  Retrieval,
  Security,
  Stack,
  Statement,
  Title,
} from "./scenes";

type Item = { id: keyof typeof VO; el: React.ReactNode; d: number; label?: string };

// Voice-over starts LEAD frames into a scene; the scene holds TAIL frames after it ends.
const LEAD = 10;
const TAIL = 24;
const voStarts = (id: keyof typeof VO) => VO[id].parts.map((f) => f + LEAD);

const RAW: Item[] = [
  { id: "title", el: <Title />, d: 130 },
  { id: "purpose", el: <Purpose />, d: 210, label: "НАЗНАЧЕНИЕ" },
  { id: "limits", el: <Limits />, d: 190, label: "ОГРАНИЧЕНИЯ" },
  { id: "two", el: <Statement a="Два контура." b="Один канал обмена." note="суд и стороны встречаются только в материалах дела" />, d: 110 },
  { id: "circuits", el: <Circuits />, d: 310, label: "КОНТУРЫ" },
  { id: "flow", el: <Flow starts={voStarts("flow").slice(1)} />, d: 280, label: "СКВОЗНОЙ СЦЕНАРИЙ" },
  { id: "cite", el: <Statement a="Каждое утверждение —" b="со ссылкой на страницу." />, d: 105 },
  { id: "retrieval", el: <Retrieval />, d: 260, label: "ЗНАНИЯ" },
  { id: "layers", el: <Layers />, d: 220, label: "АРХИТЕКТУРА" },
  { id: "bus", el: <Bus />, d: 250, label: "ШИНА АГЕНТОВ" },
  { id: "models", el: <Models />, d: 230, label: "МОДЕЛИ" },
  { id: "security", el: <Security />, d: 200, label: "БЕЗОПАСНОСТЬ" },
  { id: "quality", el: <Quality />, d: 230, label: "КАЧЕСТВО" },
  { id: "flagships", el: <Flagships starts={voStarts("flagships").slice(1)} />, d: 345, label: "ФЛАГМАНСКИЕ СЦЕНАРИИ" },
  { id: "stack", el: <Stack />, d: 200, label: "ТЕХНОЛОГИИ" },
  { id: "outro", el: <Outro />, d: 160 },
];

const TIMELINE: Item[] = RAW.map((it) => ({ ...it, d: Math.max(it.d, VO[it.id].frames + LEAD + TAIL) }));

const STARTS = TIMELINE.reduce<number[]>((acc, _, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + TIMELINE[i - 1].d);
  return acc;
}, []);

export const TOTAL = STARTS[STARTS.length - 1] + TIMELINE[TIMELINE.length - 1].d;

const LABELLED = TIMELINE.map((t, i) => (t.label ? i : -1)).filter((i) => i >= 0);

const SceneWrap: React.FC<{ d: number; children: React.ReactNode }> = ({ d, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, d - 10, d], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

/** Overline section label + footer, as on every slide of the deck. */
const Chrome: React.FC<{ item: Item; index: number }> = ({ item, index }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const out = interpolate(frame, [item.d - 10, item.d], [1, 0], { extrapolateLeft: "clamp" });
  if (!item.label) return null;
  const n = LABELLED.indexOf(index) + 1;
  return (
    <AbsoluteFill style={{ fontFamily: SANS, opacity: out }}>
      <div style={{ position: "absolute", left: LEFT, top: 96, fontSize: 20, fontWeight: 700, letterSpacing: 3, color: C.red, opacity: p, transform: `translateY(${(1 - p) * 8}px)` }}>
        {item.label}
      </div>
      <div style={{ position: "absolute", left: LEFT, right: LEFT, top: 1000, display: "flex", justifyContent: "space-between", fontSize: 18, color: C.greyLight }}>
        <span>ДИТ · Агентная платформа ЕПЦП</span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          {String(n).padStart(2, "0")} / {String(LABELLED.length).padStart(2, "0")}
        </span>
      </div>
    </AbsoluteFill>
  );
};

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  return <div style={{ position: "absolute", left: 0, bottom: 0, height: 4, width: `${(frame / TOTAL) * 100}%`, background: C.red }} />;
};

export const Video: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {TIMELINE.map((it, i) => (
      <Sequence key={i} from={STARTS[i]} durationInFrames={it.d}>
        <SceneWrap d={it.d}>{it.el}</SceneWrap>
        <Sequence from={LEAD} layout="none">
          <Audio src={staticFile(`vo/${it.id}.wav`)} />
        </Sequence>
        <Chrome item={it} index={i} />
      </Sequence>
    ))}
    <Progress />
  </AbsoluteFill>
);
