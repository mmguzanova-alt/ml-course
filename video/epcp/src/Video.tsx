import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
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

type Item = { el: React.ReactNode; d: number; label?: string };

const TIMELINE: Item[] = [
  { el: <Title />, d: 130 },
  { el: <Purpose />, d: 210, label: "НАЗНАЧЕНИЕ" },
  { el: <Limits />, d: 190, label: "ОГРАНИЧЕНИЯ" },
  { el: <Statement a="Два контура." b="Один канал обмена." note="суд и стороны встречаются только в материалах дела" />, d: 110 },
  { el: <Circuits />, d: 310, label: "КОНТУРЫ" },
  { el: <Flow />, d: 280, label: "СКВОЗНОЙ СЦЕНАРИЙ" },
  { el: <Statement a="Каждое утверждение —" b="со ссылкой на страницу." />, d: 105 },
  { el: <Retrieval />, d: 260, label: "ЗНАНИЯ" },
  { el: <Layers />, d: 220, label: "АРХИТЕКТУРА" },
  { el: <Bus />, d: 250, label: "ШИНА АГЕНТОВ" },
  { el: <Models />, d: 230, label: "МОДЕЛИ" },
  { el: <Security />, d: 200, label: "БЕЗОПАСНОСТЬ" },
  { el: <Quality />, d: 230, label: "КАЧЕСТВО" },
  { el: <Flagships />, d: 345, label: "ФЛАГМАНСКИЕ СЦЕНАРИИ" },
  { el: <Stack />, d: 200, label: "ТЕХНОЛОГИИ" },
  { el: <Outro />, d: 160 },
];

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
        <Chrome item={it} index={i} />
      </Sequence>
    ))}
    <Progress />
  </AbsoluteFill>
);
