import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { getLength } from "@remotion/paths";
import type { LucideIcon } from "lucide-react";

export const C = {
  bg: "#F1EDE5",
  ink: "#131313",
  blue: "#1D79EF",
  blueSoft: "#E3EDFB",
  grey: "#8E8A84",
  greyLight: "#C9C5BE",
  card: "#FFFFFF",
  cardDim: "#F5F3EF",
};

export const SANS = "Inter, 'Inter Display', system-ui, sans-serif";
export const CAPS = "Oswald, 'Arial Narrow', sans-serif";
export const MONO = "'JetBrains Mono', 'DejaVu Sans Mono', monospace";

/** Smooth 0..1 progress that starts at `delay` frames. No bounce: calm, minimal motion. */
export const useAppear = (delay = 0, durationInFrames = 22) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    durationInFrames,
    config: { damping: 200 },
  });
};

export const rise = (p: number, dist = 24): React.CSSProperties => ({
  opacity: p,
  transform: `translateY(${(1 - p) * dist}px)`,
});

/** Fades the whole scene in at the start and out at the end. */
export const Scene: React.FC<{
  duration: number;
  children: React.ReactNode;
}> = ({ duration, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 12, duration - 12, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

/** Heading under the navigation: "plain <blue>accent</blue>" + optional grey subtitle. */
export const Title: React.FC<{
  children: React.ReactNode;
  sub?: string;
  delay?: number;
  top?: number;
}> = ({ children, sub, delay = 6, top = 128 }) => {
  const p = useAppear(delay);
  const ps = useAppear(delay + 10);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: SANS,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: -1.5,
          color: C.ink,
          ...rise(p, 16),
        }}
      >
        {children}
      </div>
      {sub ? (
        <div
          style={{
            marginTop: 14,
            fontSize: 26,
            fontWeight: 500,
            color: C.grey,
            ...rise(ps, 10),
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};

export const Blue: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: C.blue }}>{children}</span>
);

/** Large condensed caps statement, black line + blue line. */
export const BigCaps: React.FC<{
  lines: [string, string];
  delay?: number;
  size?: number;
  pill?: string;
  note?: string;
}> = ({ lines, delay = 4, size = 132, pill, note }) => {
  const frame = useCurrentFrame();
  const p1 = useAppear(delay, 26);
  const p2 = useAppear(delay + 9, 26);
  const pp = useAppear(delay - 2);
  const pn = useAppear(delay + 26);
  const line = (text: string, p: number, color: string) => (
    <div style={{ overflow: "hidden", paddingBottom: 4 }}>
      <div
        style={{
          transform: `translateY(${(1 - p) * 100}%)`,
          color,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
  // A very slow push-in keeps the static frame alive.
  const scale = interpolate(frame, [0, 200], [1, 1.035]);
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
      }}
    >
      {pill ? (
        <div style={{ marginBottom: 34, ...rise(pp, 10) }}>
          <Pill>{pill}</Pill>
        </div>
      ) : null}
      <div
        style={{
          fontFamily: CAPS,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.02,
          textTransform: "uppercase",
          textAlign: "center",
          letterSpacing: 0.5,
        }}
      >
        {line(lines[0], p1, C.ink)}
        {line(lines[1], p2, C.blue)}
      </div>
      {note ? (
        <div
          style={{
            marginTop: 40,
            fontFamily: SANS,
            fontSize: 28,
            fontWeight: 500,
            color: C.grey,
            ...rise(pn, 10),
          }}
        >
          {note}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export const Pill: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  size?: number;
}> = ({ children, active = true, size = 22 }) => (
  <div
    style={{
      display: "inline-block",
      fontFamily: SANS,
      fontSize: size,
      fontWeight: 600,
      padding: `${size * 0.32}px ${size * 0.85}px`,
      borderRadius: 999,
      background: active ? C.blue : "transparent",
      color: active ? "#fff" : C.grey,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

/** White rounded card with a line icon. Positioned by its centre. */
export const IconCard: React.FC<{
  icon: LucideIcon;
  x: number;
  y: number;
  delay?: number;
  label?: string;
  labelSide?: "bottom" | "right";
  active?: number; // 0..1, blends to blue outline + blue icon
  dim?: number; // 0..1, fades to a quiet grey card
  size?: number;
}> = ({
  icon: Icon,
  x,
  y,
  delay = 0,
  label,
  labelSide = "bottom",
  active = 0,
  dim = 0,
  size = 120,
}) => {
  const p = useAppear(delay);
  const iconColor = active > 0.5 ? C.blue : dim > 0.5 ? C.greyLight : C.ink;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${0.9 + 0.1 * p})`,
        opacity: p,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.24,
          background: dim > 0.5 ? C.cardDim : C.card,
          boxShadow: `0 ${size * 0.12}px ${size * 0.3}px rgba(60,50,30,${0.08 * (1 - dim * 0.6)}), inset 0 0 0 ${3 * active}px ${C.blue}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={size * 0.44} strokeWidth={1.7} color={iconColor} />
      </div>
      {label ? (
        <div
          style={{
            position: "absolute",
            fontFamily: SANS,
            fontSize: 22,
            fontWeight: 500,
            color: active > 0.5 ? C.ink : C.grey,
            opacity: 1 - dim * 0.55,
            whiteSpace: "nowrap",
            ...(labelSide === "bottom"
              ? {
                  top: size + 18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                }
              : { left: size + 16, top: "50%", transform: "translateY(-50%)" }),
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};

/** Thin blue arrow drawn along an SVG path. */
export const Arrow: React.FC<{
  d: string;
  delay?: number;
  dur?: number;
  color?: string;
  dashed?: boolean;
  head?: boolean;
  width?: number;
}> = ({ d, delay = 0, dur = 18, color = C.blue, dashed, head = true, width = 2.5 }) => {
  const frame = useCurrentFrame();
  const len = getLength(d);
  const p = interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const id = `m${React.useId().replace(/:/g, "")}`;
  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}>
          <path
            d={d}
            fill="none"
            stroke="#fff"
            strokeWidth={width + 16}
            strokeDasharray={len}
            strokeDashoffset={len * (1 - p)}
          />
        </mask>
        <marker
          id={`${id}h`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill={color} />
        </marker>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? "7 9" : undefined}
        mask={`url(#${id})`}
        markerEnd={head && p > 0.97 ? `url(#${id}h)` : undefined}
      />
    </svg>
  );
};

/** Text card: white, rounded, soft shadow. */
export const Card: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  delay?: number;
  children: React.ReactNode;
  outline?: number;
  style?: React.CSSProperties;
}> = ({ x, y, w, h, delay = 0, children, outline = 0, style }) => {
  const p = useAppear(delay);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        background: C.card,
        borderRadius: 26,
        padding: 34,
        boxSizing: "border-box",
        boxShadow: `0 14px 40px rgba(60,50,30,0.08), inset 0 0 0 ${3 * outline}px ${C.blue}`,
        fontFamily: SANS,
        ...rise(p, 20),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Typed: React.FC<{ text: string; delay?: number; cps?: number }> = ({
  text,
  delay = 0,
  cps = 22,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = Math.max(0, Math.floor(((frame - delay) / fps) * cps));
  const shown = text.slice(0, n);
  const caret = n < text.length && n > 0 && Math.floor(frame / 8) % 2 === 0;
  return (
    <span>
      {shown}
      <span style={{ opacity: caret ? 1 : 0, color: C.blue }}>|</span>
    </span>
  );
};
