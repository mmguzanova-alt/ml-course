import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { C, SANS } from "./ui";
import {
  Addressees,
  Architecture,
  AskHow,
  Audience,
  Docs,
  Idea,
  Intro,
  Law,
  NoTouch,
  Outro,
  Phase1,
  Result,
  Steps,
  Why,
} from "./scenes";

const TABS = ["идея", "этапы", "документы", "анализ", "результат", "архитектура", "дальше"];

type Item = { C: React.FC; d: number; tab: number | null };

const TIMELINE: Item[] = [
  { C: Intro, d: 120, tab: null },
  { C: Idea, d: 210, tab: 0 },
  { C: Audience, d: 190, tab: 0 },
  { C: AskHow, d: 95, tab: null },
  { C: Steps, d: 310, tab: 1 },
  { C: Docs, d: 230, tab: 2 },
  { C: Law, d: 220, tab: 3 },
  { C: Addressees, d: 210, tab: 3 },
  { C: Result, d: 250, tab: 4 },
  { C: Why, d: 210, tab: 4 },
  { C: NoTouch, d: 120, tab: null },
  { C: Architecture, d: 320, tab: 5 },
  { C: Phase1, d: 190, tab: 6 },
  { C: Outro, d: 150, tab: null },
];

const STARTS = TIMELINE.reduce<number[]>((acc, it, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + TIMELINE[i - 1].d);
  return acc;
}, []);

export const TOTAL = STARTS[STARTS.length - 1] + TIMELINE[TIMELINE.length - 1].d;

/** Persistent tab bar: fades in/out around caps statements, active pill cross-fades between tabs. */
const Nav: React.FC = () => {
  const frame = useCurrentFrame();
  let i = STARTS.findIndex((s, k) => frame >= s && frame < s + TIMELINE[k].d);
  if (i < 0) i = TIMELINE.length - 1;
  const it = TIMELINE[i];
  const local = frame - STARTS[i];
  const prev = TIMELINE[i - 1];
  const next = TIMELINE[i + 1];
  let opacity = 0;
  if (it.tab !== null) {
    const fin = prev?.tab == null ? interpolate(local, [0, 14], [0, 1], { extrapolateRight: "clamp" }) : 1;
    const fout = next?.tab == null ? interpolate(local, [it.d - 12, it.d], [1, 0], { extrapolateLeft: "clamp" }) : 1;
    opacity = Math.min(fin, fout);
  }
  const blend = prev?.tab != null && prev.tab !== it.tab ? interpolate(local, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : 1;
  const weight = (t: number) => (t === it.tab ? blend : prev?.tab === t && it.tab !== t ? 1 - blend : 0);
  return (
    <div
      style={{
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 8,
        opacity,
        fontFamily: SANS,
      }}
    >
      {TABS.map((t, k) => {
        const w = weight(k);
        return (
          <div
            key={t}
            style={{
              position: "relative",
              padding: "8px 20px",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 500,
              color: w > 0.5 ? "#fff" : C.grey,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                background: C.blue,
                opacity: w,
                transform: `scale(${0.85 + 0.15 * w})`,
              }}
            />
            <span style={{ position: "relative" }}>{t}</span>
          </div>
        );
      })}
    </div>
  );
};

export const Video: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {TIMELINE.map((it, i) => (
      <Sequence key={i} from={STARTS[i]} durationInFrames={it.d}>
        <SceneWrap d={it.d}>
          <it.C />
        </SceneWrap>
      </Sequence>
    ))}
    <Nav />
  </AbsoluteFill>
);

const SceneWrap: React.FC<{ d: number; children: React.ReactNode }> = ({ d, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, d - 12, d], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
