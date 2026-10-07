import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { getLength } from "@remotion/paths";

// Palette taken from the deck itself.
export const C = {
  bg: "#FFFFFF",
  ink: "#1D1D25",
  grey: "#5C5C6B",
  greyLight: "#8A8A99",
  line: "#DEDEE4",
  panel: "#F4F4F6",
  red: "#C00000",
  redDark: "#9A0404",
  green: "#1E7A3C",
  lime: "#92D050",
  gold: "#8A5A00",
};

export const SANS = "'Golos Text', Inter, sans-serif";
export const MONO = "'JetBrains Mono', monospace";
export const LEFT = 120;

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const useAppear = (delay = 0, durationInFrames = 20) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, durationInFrames, config: { damping: 200 } });
};

export const useLinear = (from: number, to: number, ease = Easing.inOut(Easing.cubic)) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], { ...clamp, easing: ease });
};

export const rise = (p: number, dist = 20): React.CSSProperties => ({
  opacity: p,
  transform: `translateY(${(1 - p) * dist}px)`,
});

export const slide = (p: number, dist = 30): React.CSSProperties => ({
  opacity: p,
  transform: `translateX(${(1 - p) * -dist}px)`,
});

/** Text that slides up from behind a mask. */
export const Reveal: React.FC<{ p: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  p,
  children,
  style,
}) => (
  <div style={{ overflow: "hidden", paddingBottom: "0.08em", ...style }}>
    <div style={{ transform: `translateY(${(1 - p) * 105}%)` }}>{children}</div>
  </div>
);

/** Left-aligned slide heading: title + grey subtitle (the red overline lives in the chrome). */
export const Head: React.FC<{ title: React.ReactNode; sub?: string; delay?: number }> = ({
  title,
  sub,
  delay = 4,
}) => {
  const p = useAppear(delay, 24);
  const ps = useAppear(delay + 10);
  return (
    <div style={{ position: "absolute", left: LEFT, top: 132, right: LEFT, fontFamily: SANS }}>
      <Reveal p={p}>
        <div style={{ fontSize: 62, fontWeight: 600, color: C.ink, letterSpacing: -1.2 }}>{title}</div>
      </Reveal>
      {sub ? (
        <div style={{ marginTop: 14, fontSize: 27, color: C.grey, ...rise(ps, 8) }}>{sub}</div>
      ) : null}
    </div>
  );
};

export const Red: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: C.red }}>{children}</span>
);

/** Line drawn progressively along an SVG path. */
export const Path: React.FC<{
  d: string;
  delay?: number;
  dur?: number;
  color?: string;
  width?: number;
  dashed?: boolean;
  head?: boolean;
}> = ({ d, delay = 0, dur = 18, color = C.ink, width = 2, dashed, head }) => {
  const frame = useCurrentFrame();
  const len = getLength(d);
  const p = interpolate(frame, [delay, delay + dur], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const id = `m${React.useId().replace(/:/g, "")}`;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}>
          <path d={d} fill="none" stroke="#fff" strokeWidth={width + 16} strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
        </mask>
        <marker id={`${id}h`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={color} />
        </marker>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? "6 7" : undefined}
        mask={`url(#${id})`}
        markerEnd={head && p > 0.97 ? `url(#${id}h)` : undefined}
      />
    </svg>
  );
};

/** The deck's chevron motif: »  */
export const Chevron: React.FC<{ size?: number; color?: string; width?: number; style?: React.CSSProperties }> = ({
  size = 24,
  color = C.line,
  width = 2,
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <polyline points="5,5 12,12 5,19" fill="none" stroke={color} strokeWidth={width} strokeLinejoin="miter" />
    <polyline points="12,5 19,12 12,19" fill="none" stroke={color} strokeWidth={width} strokeLinejoin="miter" />
  </svg>
);

type BoxTone = "plain" | "red" | "lime" | "dark" | "panel";

/** Outlined box used for scenario/service nodes. Positioned by top-left corner. */
export const Box: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  code?: string;
  title?: React.ReactNode;
  sub?: React.ReactNode;
  tone?: BoxTone;
  p?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ x, y, w, h, code, title, sub, tone = "plain", p = 1, style, children }) => {
  const border =
    tone === "red" ? C.red : tone === "lime" ? C.lime : tone === "dark" ? C.ink : tone === "panel" ? C.panel : C.line;
  const bg = tone === "lime" ? C.lime : tone === "dark" ? C.ink : tone === "panel" ? C.panel : C.bg;
  const fg = tone === "dark" ? "#fff" : C.ink;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        boxSizing: "border-box",
        padding: "18px 22px",
        border: `2px solid ${border}`,
        borderRadius: 10,
        background: bg,
        fontFamily: SANS,
        color: fg,
        ...rise(p, 14),
        ...style,
      }}
    >
      {code ? (
        <div style={{ fontSize: 19, fontWeight: 700, color: tone === "lime" ? C.ink : tone === "dark" ? "#ff8a8a" : C.red, marginBottom: 6 }}>
          {code}
        </div>
      ) : null}
      {title ? <div style={{ fontSize: 25, fontWeight: 600, lineHeight: 1.2 }}>{title}</div> : null}
      {sub ? (
        <div style={{ fontSize: 19, color: tone === "dark" ? "#B9B9C6" : C.grey, marginTop: 8, lineHeight: 1.35 }}>{sub}</div>
      ) : null}
      {children}
    </div>
  );
};

export const Tag: React.FC<{ children: React.ReactNode; tone?: "red" | "lime" | "grey" | "ink"; size?: number }> = ({
  children,
  tone = "grey",
  size = 18,
}) => {
  const map = {
    red: { bg: "rgba(192,0,0,0.08)", fg: C.red },
    lime: { bg: C.lime, fg: C.ink },
    grey: { bg: C.panel, fg: C.grey },
    ink: { bg: C.ink, fg: "#fff" },
  }[tone];
  return (
    <span
      style={{
        display: "inline-block",
        padding: `${size * 0.3}px ${size * 0.6}px`,
        borderRadius: 6,
        background: map.bg,
        color: map.fg,
        fontFamily: SANS,
        fontWeight: 600,
        fontSize: size,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};
