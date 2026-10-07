import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import {
  Camera,
  Cpu,
  Factory,
  FileCheck,
  FileText,
  FileType,
  Gauge,
  Gavel,
  Globe,
  KeyRound,
  Landmark,
  BookOpen,
  MessageSquare,
  Network,
  ScanText,
  Scale,
  Search,
  ShieldCheck,
  Smartphone,
  Store,
  TriangleAlert,
  User,
  Wrench,
} from "lucide-react";
import {
  Arrow,
  BigCaps,
  Blue,
  C,
  CAPS,
  Card,
  IconCard,
  MONO,
  Pill,
  SANS,
  Title,
  Typed,
  rise,
  useAppear,
} from "./ui";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ───────────── 1. Intro ───────────── */
export const Intro: React.FC = () => (
  <BigCaps
    pill="правоконсультант · case insensitive"
    lines={["Солон —", "агент для претензий"]}
    note="автономный агент для досудебных претензий"
  />
);

/* ───────────── 2. Idea: «у меня проблема» → претензия ───────────── */
export const Idea: React.FC = () => {
  const bubble = useAppear(28);
  const bottom = useAppear(120);
  return (
    <AbsoluteFill>
      <Title sub="автономный LLM-агент для B2C-клиента">
        «у меня проблема» → <Blue>готовая претензия</Blue>
      </Title>

      <div
        style={{
          position: "absolute",
          left: 560 - 40,
          top: 360,
          padding: "16px 24px",
          background: C.card,
          borderRadius: "22px 22px 22px 6px",
          fontFamily: SANS,
          fontSize: 26,
          fontWeight: 500,
          color: C.ink,
          boxShadow: "0 10px 30px rgba(60,50,30,0.08)",
          ...rise(bubble, 10),
        }}
      >
        <Typed text="У меня проблема…" delay={34} />
      </div>

      <IconCard icon={MessageSquare} x={560} y={560} delay={14} label="клиент" />
      <Arrow d="M 640 560 L 870 560" delay={60} />
      <IconCard icon={Cpu} x={960} y={560} delay={72} label="агент ведёт клиента" active={1} />
      <Arrow d="M 1050 560 L 1280 560" delay={92} />
      <IconCard icon={FileCheck} x={1360} y={560} delay={104} label="готовые претензии" />

      <div
        style={{
          position: "absolute",
          top: 790,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: CAPS,
          fontWeight: 700,
          fontSize: 76,
          color: C.greyLight,
          letterSpacing: 2,
          ...rise(bottom, 14),
        }}
      >
        РАССКАЗ → ПРЕТЕНЗИЯ
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── 3. Audience ───────────── */
export const Audience: React.FC = () => {
  const frame = useCurrentFrame();
  const dtp = interpolate(frame, [130, 150], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Title sub="клиент без юридических знаний, любые споры с бизнесом">
        для кого
      </Title>

      <IconCard icon={User} x={560} y={560} delay={14} label="B2C-клиент" active={1} size={150} />
      <IconCard icon={Smartphone} x={330} y={420} delay={40} label="телефон" size={100} />
      <IconCard icon={Camera} x={330} y={720} delay={52} label="фото документов" size={100} />
      <Arrow d="M 390 440 Q 440 470 470 500" delay={48} head={false} color={C.greyLight} />
      <Arrow d="M 390 700 Q 440 670 470 630" delay={60} head={false} color={C.greyLight} />

      <Card x={860} y={370} w={760} delay={70}>
        <div style={{ fontSize: 20, fontWeight: 600, color: C.blue, letterSpacing: 1 }}>
          СЦЕНАРИИ
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: C.ink, marginTop: 10, letterSpacing: -0.5 }}>
          любые споры физлица с бизнесом
        </div>
        <div
          style={{
            marginTop: 26,
            paddingTop: 22,
            borderTop: `2px solid ${C.bg}`,
            display: "flex",
            gap: 14,
            alignItems: "center",
            opacity: 0.25 + 0.75 * dtp,
          }}
        >
          <Pill size={20} active={dtp > 0.5}>
            эталон
          </Pill>
          <span style={{ fontSize: 26, color: C.ink, fontWeight: 500 }}>
            ДТП: дилер, завод, страховая
          </span>
        </div>
        <div style={{ marginTop: 14, fontSize: 22, color: C.grey, opacity: dtp }}>
          первый эталон — не ограничение
        </div>
      </Card>
    </AbsoluteFill>
  );
};

/* ───────────── 4/11/14. Statements ───────────── */
export const AskHow: React.FC = () => (
  <BigCaps lines={["Как дойти от рассказа", "до претензии?"]} size={120} />
);

export const NoTouch: React.FC = () => (
  <BigCaps
    lines={["Не трогаем продукт —", "ставим агента поверх"]}
    size={120}
    note="ноль изменений в Консультанте · связь по MCP"
  />
);

export const Outro: React.FC = () => (
  <BigCaps
    pill="дальше"
    lines={["Если гипотеза подтвердится —", "режим в UI Консультанта"]}
    size={108}
  />
);

/* ───────────── 5. Six steps ───────────── */
const STEPS = [
  { icon: MessageSquare, label: "рассказ", text: "Клиент рассказывает ситуацию и прикладывает документы" },
  { icon: ScanText, label: "факты", text: "Агент разбирает документы и достаёт из них факты" },
  { icon: Scale, label: "право", text: "Анализирует право: практика, Пленум, НПА и веб-поиск" },
  { icon: Search, label: "адресаты", text: "Определяет, к кому предъявлять требования" },
  { icon: Gauge, label: "шансы", text: "Говорит, чего не хватает, и оценивает шансы" },
  { icon: FileText, label: "претензии", text: "Составляет претензии: текстом и в DOCX" },
];

export const Steps: React.FC<{ starts?: number[] }> = ({ starts: given }) => {
  const frame = useCurrentFrame();
  const starts = given ?? STEPS.map((_, i) => 50 + i * 38);
  const START = starts[0];
  // Continuous step index: i at starts[i], i + 1 at starts[i + 1].
  let pos = (frame - START) / 38;
  for (let i = starts.length - 1; i >= 0; i--) {
    if (frame >= starts[i]) {
      const next = starts[i + 1] ?? starts[i] + 38;
      pos = i + Math.min(1, (frame - starts[i]) / (next - starts[i]));
      break;
    }
  }
  const current = Math.max(0, Math.min(STEPS.length - 1, Math.floor(pos)));
  const x0 = 360;
  const dx = 240;
  const textP = interpolate(frame - starts[current], [0, 9], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Title sub="от рассказа до претензий">
        <Blue>шесть</Blue> шагов
      </Title>

      {STEPS.map((s, i) => {
        const active = interpolate(pos, [i, i + 0.15, i + 1, i + 1.15], [0, 1, 1, 0], clamp);
        const done = pos >= i + 1;
        const notYet = pos < i;
        const lastHold = i === STEPS.length - 1 && pos >= i ? 1 : active;
        return (
          <React.Fragment key={s.label}>
            <IconCard
              icon={s.icon}
              x={x0 + i * dx}
              y={500}
              delay={10 + i * 4}
              label={s.label}
              active={lastHold}
              dim={notYet ? 1 : 0}
            />
            {i < STEPS.length - 1 ? (
              <Arrow
                d={`M ${x0 + i * dx + 72} 500 L ${x0 + (i + 1) * dx - 72} 500`}
                delay={starts[i + 1] - 14}
                dur={12}
                color={done || pos > i + 0.6 ? C.blue : C.greyLight}
              />
            ) : null}
          </React.Fragment>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: 700,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: frame < START ? 0 : 1,
        }}
      >
        <div
          style={{
            fontFamily: CAPS,
            fontWeight: 700,
            fontSize: 110,
            color: C.blue,
            lineHeight: 1,
            ...rise(textP, 12),
          }}
        >
          {String(current + 1).padStart(2, "0")}
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: SANS,
            fontWeight: 600,
            fontSize: 38,
            color: C.ink,
            ...rise(textP, 8),
          }}
        >
          {STEPS[current].text}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── 6. Documents → facts ───────────── */
const FACTS = ["Стороны", "Даты", "Суммы", "VIN", "Номера полисов", "Условия гарантии", "Условия страхования"];

export const Docs: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Title sub="из сканов PDF, фото документов и DOCX">
        не спрашивает то, что <Blue>уже есть</Blue>
      </Title>

      <IconCard icon={FileText} x={360} y={410} delay={12} label="PDF" labelSide="right" size={96} />
      <IconCard icon={Camera} x={360} y={560} delay={18} label="фото" labelSide="right" size={96} />
      <IconCard icon={FileType} x={360} y={710} delay={24} label="DOCX" labelSide="right" size={96} />
      <Arrow d="M 520 410 Q 620 410 690 520" delay={40} color={C.greyLight} head={false} />
      <Arrow d="M 520 560 L 690 560" delay={44} color={C.greyLight} head={false} />
      <Arrow d="M 520 710 Q 620 710 690 600" delay={48} color={C.greyLight} head={false} />

      <IconCard icon={Cpu} x={780} y={560} delay={56} label="агент" active={1} size={140} />
      <Arrow d="M 870 560 L 1030 560" delay={74} />

      <div
        style={{
          position: "absolute",
          left: 1070,
          top: 340,
          width: 640,
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
        }}
      >
        {FACTS.map((f, i) => {
          const p = interpolate(frame, [88 + i * 9, 102 + i * 9], [0, 1], {
            ...clamp,
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "18px 26px",
                background: C.card,
                borderRadius: 18,
                fontFamily: SANS,
                fontSize: 30,
                fontWeight: 600,
                color: C.ink,
                boxShadow: "0 10px 30px rgba(60,50,30,0.07)",
                ...rise(p, 16),
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: 5, background: C.blue }} />
              {f}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── 7. Law via MCP ───────────── */
export const Law: React.FC = () => {
  const bar = useAppear(40, 26);
  return (
    <AbsoluteFill>
      <Title sub="практика, Пленум и НПА через MCP Консультанта">
        право из <Blue>Консультанта</Blue>
      </Title>

      <IconCard icon={Cpu} x={860} y={380} delay={12} label="агент" labelSide="right" active={1} />
      <Arrow d="M 860 445 L 860 520" delay={32} dur={10} head={false} />

      <div
        style={{
          position: "absolute",
          left: 500,
          top: 522,
          width: 720,
          height: 52,
          borderRadius: 26,
          background: C.blue,
          color: "#fff",
          fontFamily: SANS,
          fontSize: 24,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scaleX(${bar})`,
          opacity: bar,
        }}
      >
        MCP Консультанта
      </div>
      {[620, 860, 1100].map((x, i) => (
        <Arrow key={x} d={`M ${x} 576 L ${x} 668`} delay={62 + i * 6} dur={12} />
      ))}
      <IconCard icon={Gavel} x={620} y={740} delay={70} label="практика" active={1} />
      <IconCard icon={Landmark} x={860} y={740} delay={76} label="Пленум" active={1} />
      <IconCard icon={BookOpen} x={1100} y={740} delay={82} label="НПА" active={1} />

      <Arrow d="M 900 318 Q 1380 260 1440 650" delay={110} dashed />
      <IconCard icon={Globe} x={1440} y={740} delay={124} label="веб-поиск дополняет" />
    </AbsoluteFill>
  );
};

/* ───────────── 8. Addressees ───────────── */
const ADDR = [
  { icon: Store, label: "продавец", x: 520, y: 470, dtp: true },
  { icon: Factory, label: "изготовитель / импортёр", x: 1400, y: 470, dtp: true },
  { icon: ShieldCheck, label: "страховая · КАСКО / ОСАГО", x: 520, y: 760, dtp: true },
  { icon: Wrench, label: "исполнитель услуги", x: 1400, y: 760, dtp: false },
];

export const Addressees: React.FC = () => {
  const frame = useCurrentFrame();
  const dtp = interpolate(frame, [140, 156], [0, 1], clamp);
  const badge = useAppear(136);
  return (
    <AbsoluteFill>
      <Title sub="адресаты определяются по ситуации">
        к кому <Blue>предъявлять</Blue>?
      </Title>

      <IconCard icon={Cpu} x={960} y={615} delay={10} label="агент" active={1} size={140} />
      {ADDR.map((a, i) => {
        const fromX = a.x < 960 ? 880 : 1040;
        const toX = a.x < 960 ? a.x + 80 : a.x - 80;
        const isDim = !a.dtp && dtp > 0.5;
        return (
          <React.Fragment key={a.label}>
            <Arrow
              d={`M ${fromX} ${615 + (a.y < 615 ? -30 : 30)} L ${toX} ${a.y}`}
              delay={30 + i * 12}
              color={isDim ? C.greyLight : C.blue}
            />
            <IconCard
              icon={a.icon}
              x={a.x}
              y={a.y}
              delay={40 + i * 12}
              label={a.label}
              active={a.dtp ? dtp : 0}
              dim={isDim ? 1 : 0}
            />
          </React.Fragment>
        );
      })}
      <div style={{ position: "absolute", top: 905, left: 0, right: 0, textAlign: "center", ...rise(badge, 10) }}>
        <Pill size={22}>эталон: ДТП → дилер, завод и страховая</Pill>
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── 9. Result ───────────── */
export const Result: React.FC = () => {
  const frame = useCurrentFrame();
  const meter = interpolate(frame, [110, 160], [0, 0.72], { ...clamp, easing: Easing.out(Easing.cubic) });
  const head = (Icon: typeof Cpu, word: string) => (
    <>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: C.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={32} strokeWidth={1.7} color={C.blue} />
      </div>
      <div
        style={{
          fontFamily: CAPS,
          fontWeight: 700,
          fontSize: 58,
          color: C.ink,
          marginTop: 22,
          textTransform: "uppercase",
        }}
      >
        = {word}
      </div>
    </>
  );
  const body: React.CSSProperties = { fontSize: 24, color: C.grey, marginTop: 12, lineHeight: 1.35 };
  return (
    <AbsoluteFill>
      <Title sub="и получает готовую претензию">
        клиент видит <Blue>пробелы и шансы</Blue>
      </Title>

      <Card x={250} y={360} w={440} h={420} delay={24}>
        {head(TriangleAlert, "пробелы")}
        <div style={body}>чего не хватает для сильной позиции</div>
        <div
          style={{
            marginTop: 26,
            padding: "14px 18px",
            borderRadius: 14,
            background: C.bg,
            fontSize: 21,
            color: C.ink,
            fontWeight: 500,
          }}
        >
          <span style={{ color: C.blue }}>✕</span> независимая автотехническая экспертиза
        </div>
      </Card>

      <Card x={740} y={360} w={440} h={420} delay={60}>
        {head(Gauge, "шансы")}
        <div style={body}>оценка с перечнем факторов</div>
        <div style={{ marginTop: 34, height: 14, borderRadius: 7, background: C.bg, overflow: "hidden" }}>
          <div style={{ width: `${meter * 100}%`, height: "100%", background: C.blue, borderRadius: 7 }} />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          {["договор", "чеки", "сроки"].map((t, i) => (
            <span
              key={t}
              style={{
                fontSize: 19,
                padding: "6px 14px",
                borderRadius: 999,
                background: C.blueSoft,
                color: C.blue,
                fontWeight: 600,
                opacity: interpolate(frame, [130 + i * 8, 142 + i * 8], [0, 1], clamp),
              }}
            >
              + {t}
            </span>
          ))}
        </div>
      </Card>

      <Card x={1230} y={360} w={440} h={420} delay={96} outline={interpolate(frame, [170, 186], [0, 1], clamp)}>
        {head(FileCheck, "претензии")}
        <div style={body}>по каждому адресату</div>
        <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
          <Pill size={20} active={false}>
            <span style={{ color: C.ink }}>текст в чате</span>
          </Pill>
          <Pill size={20}>DOCX</Pill>
        </div>
      </Card>
    </AbsoluteFill>
  );
};

/* ───────────── 10. Before / after ───────────── */
export const Why: React.FC = () => {
  const frame = useCurrentFrame();
  const note = useAppear(120);
  const strike = interpolate(frame, [80, 100], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Title>зачем</Title>

      <Card x={330} y={330} w={600} h={360} delay={18} style={{ opacity: 1 - 0.45 * strike }}>
        <div style={{ fontFamily: CAPS, fontWeight: 700, fontSize: 72, color: C.greyLight }}>БЫЛО</div>
        <div style={{ fontSize: 32, fontWeight: 600, color: C.ink, marginTop: 18, lineHeight: 1.3 }}>
          человек в беде не знает, с чего начать
        </div>
        <div style={{ fontSize: 24, color: C.grey, marginTop: 14 }}>
          бросает спор или переплачивает
        </div>
      </Card>

      <Card x={990} y={330} w={600} h={360} delay={70} outline={1}>
        <div style={{ fontFamily: CAPS, fontWeight: 700, fontSize: 72, color: C.blue }}>СТАЛО</div>
        <div style={{ fontSize: 32, fontWeight: 600, color: C.ink, marginTop: 18, lineHeight: 1.3 }}>
          агент ведёт до готовой претензии
        </div>
      </Card>

      <div
        style={{
          position: "absolute",
          top: 780,
          left: 360,
          right: 360,
          textAlign: "center",
          fontFamily: SANS,
          fontSize: 26,
          lineHeight: 1.4,
          color: C.grey,
          ...rise(note, 10),
        }}
      >
        досудебная претензия — обязательный или выгодный первый шаг почти в любом потребительском и
        страховом споре
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── 12. Architecture ───────────── */
type Col = {
  title: string;
  sub: string;
  x: number;
  w: number;
  rows: string[];
  tone: "blue" | "grey" | "plain";
};

const COLS: Col[] = [
  { title: "клиент", sub: "браузер и телефон", x: 130, w: 300, rows: ["B2C-клиент"], tone: "plain" },
  {
    title: "свой контур",
    sub: "ns solon-dev · новый",
    x: 510,
    w: 440,
    rows: ["solon-web", "solon-api · REST + SSE", "NATS JetStream", "solon-worker · LangGraph", "Postgres + S3"],
    tone: "blue",
  },
  {
    title: "Консультант",
    sub: "без изменений",
    x: 1030,
    w: 400,
    rows: ["auth-service", "mcp-face", "api-gateway", "docling-service"],
    tone: "grey",
  },
  { title: "inference", sub: "ns inference · LLM", x: 1510, w: 280, rows: ["OpenRouter", "PaddleOCR-VL"], tone: "plain" },
];

export const Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const TOP = 320;
  const H = 440;
  // A dot travels left → right once the boxes are drawn.
  const dotT = interpolate(frame, [190, 290], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const dotX = interpolate(dotT, [0, 1], [430, 1510]);
  return (
    <AbsoluteFill>
      <Title sub="автономный агент поверх Консультанта по MCP">
        агент живёт в <Blue>своём контуре</Blue>
      </Title>

      {COLS.map((c, ci) => {
        const p = useAppearSafe(16 + ci * 22);
        const border = c.tone === "blue" ? C.blue : C.greyLight;
        return (
          <div
            key={c.title}
            style={{
              position: "absolute",
              left: c.x,
              top: TOP,
              width: c.w,
              height: H,
              borderRadius: 28,
              border: `2.5px ${c.tone === "grey" ? "dashed" : "solid"} ${border}`,
              background: c.tone === "blue" ? "rgba(29,121,239,0.05)" : "transparent",
              padding: 26,
              boxSizing: "border-box",
              fontFamily: SANS,
              ...rise(p, 18),
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: c.tone === "blue" ? C.blue : C.ink,
              }}
            >
              {c.title}
            </div>
            <div style={{ fontSize: 19, color: C.grey, marginTop: 6 }}>{c.sub}</div>
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12 }}>
              {c.rows.map((r, ri) => {
                const rp = interpolate(frame, [30 + ci * 22 + ri * 6, 44 + ci * 22 + ri * 6], [0, 1], clamp);
                const lit = c.tone === "blue" && r.startsWith("solon-worker") && frame > 210;
                return (
                  <div
                    key={r}
                    style={{
                      padding: "14px 18px",
                      borderRadius: 14,
                      background: c.tone === "grey" ? C.cardDim : C.card,
                      boxShadow: `0 6px 18px rgba(60,50,30,0.06), inset 0 0 0 ${lit ? 2.5 : 0}px ${C.blue}`,
                      fontFamily: MONO,
                      fontSize: 20,
                      color: c.tone === "grey" ? C.grey : C.ink,
                      whiteSpace: "nowrap",
                      ...rise(rp, 10),
                    }}
                  >
                    {r}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {[
        [430, 510],
        [950, 1030],
        [1430, 1510],
      ].map(([a, b], i) => (
        <Arrow key={a} d={`M ${a + 8} ${TOP + H / 2} L ${b - 10} ${TOP + H / 2}`} delay={110 + i * 16} dur={14} />
      ))}

      <div
        style={{
          position: "absolute",
          left: dotX - 9,
          top: TOP + H / 2 - 9,
          width: 18,
          height: 18,
          borderRadius: 9,
          background: C.blue,
          boxShadow: `0 0 0 8px rgba(29,121,239,0.18)`,
          opacity: dotT > 0 && dotT < 1 ? 1 : 0,
        }}
      />
    </AbsoluteFill>
  );
};

// Hooks inside .map are fine here because the column list is static.
const useAppearSafe = useAppear;

/* ───────────── 13. Phase 1 ───────────── */
export const Phase1: React.FC = () => (
  <AbsoluteFill>
    <Title sub="остальное строим сами">
      фаза 1 берёт у Консультанта <Blue>три вещи</Blue>
    </Title>
    <IconCard icon={Network} x={560} y={440} delay={20} label="MCP" active={1} />
    <IconCard icon={KeyRound} x={560} y={640} delay={32} label="техучётка организации" active={1} />
    <IconCard icon={FileType} x={560} y={840} delay={44} label="DOCX через docling" active={1} />
    <Arrow d="M 650 440 Q 1000 440 1210 600" delay={64} />
    <Arrow d="M 650 640 L 1200 640" delay={72} />
    <Arrow d="M 650 840 Q 1000 840 1210 680" delay={80} />
    <IconCard icon={Cpu} x={1310} y={640} delay={96} label="Солон" size={160} active={1} />
  </AbsoluteFill>
);
