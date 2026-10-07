import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import {
  Ban,
  ClipboardCheck,
  EyeOff,
  KeyRound,
  ScrollText,
  ShieldAlert,
  SplitSquareHorizontal,
  Check,
  Lock,
} from "lucide-react";
import {
  Box,
  C,
  Chevron,
  Head,
  LEFT,
  MONO,
  Path,
  Red,
  Reveal,
  SANS,
  Tag,
  clamp,
  rise,
  slide,
  useAppear,
  useLinear,
} from "./ui";

/* ───────────── Title ───────────── */
export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const bar = useLinear(4, 24);
  const over = useAppear(10);
  const t1 = useAppear(16, 26);
  const t2 = useAppear(24, 26);
  const sub = useAppear(40);
  const big = useAppear(44, 30);
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <div style={{ position: "absolute", left: LEFT, top: 300, width: 90 * bar, height: 6, background: C.red }} />
      <div style={{ position: "absolute", left: LEFT, top: 340, fontSize: 22, fontWeight: 700, letterSpacing: 3, color: C.grey, ...rise(over, 8) }}>
        ДЕПАРТАМЕНТ ИНФОРМАЦИОННЫХ ТЕХНОЛОГИЙ
      </div>
      <div style={{ position: "absolute", left: LEFT - 4, top: 390, fontSize: 116, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02, color: C.ink }}>
        <Reveal p={t1}>Агентная платформа</Reveal>
        <Reveal p={t2}>ЕПЦП</Reveal>
      </div>
      <div style={{ position: "absolute", left: LEFT, top: 680, fontSize: 36, color: C.grey, ...rise(sub, 10) }}>
        Архитектура и бизнес-сценарии
      </div>

      {/* Chevron field: a quiet grid that lights up in a diagonal wave. */}
      <div style={{ position: "absolute", left: 1400, top: 250, display: "grid", gridTemplateColumns: "repeat(6, 70px)", rowGap: 46 }}>
        {Array.from({ length: 36 }).map((_, i) => {
          const r = Math.floor(i / 6);
          const c = i % 6;
          const wave = interpolate(frame, [20 + (r + c) * 4, 34 + (r + c) * 4], [0, 1], clamp);
          return <Chevron key={i} size={34} color={C.line} style={{ opacity: wave }} />;
        })}
      </div>
      <div style={{ position: "absolute", left: 1520, top: 420, ...slide(big, 60) }}>
        <Chevron size={300} color={C.red} width={2.2} />
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Purpose / launch modes ───────────── */
const MODES = [
  ["По запросу", "Действие пользователя", "Ответы по материалам дела"],
  ["По событию", "Событие дела", "Проверка ссылок в поступившем документе"],
  ["По расписанию", "График оркестратора", "Ночная обработка новых поступлений"],
  ["Перед действием", "Начало действия в системе", "Контроль перед подписанием акта"],
];

export const Purpose: React.FC = () => {
  const frame = useCurrentFrame();
  const fns = [
    "Обрабатывает события карточки дела",
    "Работает со всем массивом материалов",
    "Готовит таблицы, отметки, проекты и сроки",
    "Выполняется от имени пользователя и с его правами",
  ];
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Назначение агентной среды" sub="Обрабатывает события дела и готовит проекты действий для пользователя" />

      <div style={{ position: "absolute", left: LEFT, top: 340, width: 560 }}>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, color: C.greyLight, marginBottom: 18 }}>ФУНКЦИИ</div>
        {fns.map((f, i) => {
          const p = interpolate(frame, [24 + i * 8, 40 + i * 8], [0, 1], clamp);
          return (
            <div key={f} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "16px 0", borderTop: `1.5px solid ${C.line}`, fontSize: 27, color: C.ink, ...slide(p, 20) }}>
              <Chevron size={22} color={C.red} style={{ marginTop: 6, flexShrink: 0 }} />
              {f}
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", left: 800, top: 340, width: 1000 }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 330px 1fr", fontSize: 20, fontWeight: 700, letterSpacing: 2, color: C.greyLight, marginBottom: 18 }}>
          <span>РЕЖИМ</span>
          <span>ЗАПУСК</span>
          <span>ПРИМЕР</span>
        </div>
        {MODES.map((m, i) => {
          const p = interpolate(frame, [70 + i * 14, 88 + i * 14], [0, 1], clamp);
          const hot = interpolate(frame, [70 + i * 14, 84 + i * 14, 100 + i * 14], [0, 1, 0], clamp);
          return (
            <div
              key={m[0]}
              style={{
                display: "grid",
                gridTemplateColumns: "260px 330px 1fr",
                alignItems: "center",
                padding: "22px 0",
                borderTop: `1.5px solid ${C.line}`,
                fontSize: 25,
                position: "relative",
                ...rise(p, 12),
              }}
            >
              <div style={{ position: "absolute", left: -20, top: 0, bottom: 0, width: 4, background: C.red, opacity: hot }} />
              <span style={{ fontWeight: 700, color: C.ink }}>{m[0]}</span>
              <span style={{ color: C.grey }}>{m[1]}</span>
              <span style={{ color: C.ink }}>{m[2]}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Boundaries ───────────── */
const LIMITS = [
  ["01", "Решения по делу", "Агент не принимает решений. Решение и оценка доказательств остаются за судьёй"],
  ["02", "Подписание и подача", "Только после подтверждения человеком. Электронная подпись — только человеком", "К8"],
  ["03", "Передача данных", "Агент не передаёт данные между контуром суда и контуром сторон", "К7"],
];

export const Limits: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Границы ответственности агентов" sub="Ограничения закреплены в архитектуре платформы" />
      {LIMITS.map((l, i) => {
        const x = LEFT + i * 570;
        const line = interpolate(frame, [24 + i * 16, 44 + i * 16], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
        const p = interpolate(frame, [34 + i * 16, 54 + i * 16], [0, 1], clamp);
        return (
          <div key={l[0]} style={{ position: "absolute", left: x, top: 420, width: 510 }}>
            <div style={{ height: 3, width: `${line * 100}%`, background: C.red }} />
            <div style={{ fontSize: 120, fontWeight: 600, color: C.red, letterSpacing: -4, marginTop: 20, lineHeight: 1, ...rise(p, 16) }}>{l[0]}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: C.ink, marginTop: 26, ...rise(p, 12) }}>{l[1]}</div>
            <div style={{ fontSize: 25, color: C.grey, marginTop: 14, lineHeight: 1.4, ...rise(p, 10) }}>{l[2]}</div>
            {l[3] ? <div style={{ marginTop: 18, ...rise(p, 8) }}><Tag tone="red">{l[3]}</Tag></div> : null}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ───────────── Statements ───────────── */
export const Statement: React.FC<{ a: string; b: string; note?: string }> = ({ a, b, note }) => {
  const frame = useCurrentFrame();
  const bar = useLinear(2, 20);
  const p1 = useAppear(6, 26);
  const p2 = useAppear(16, 26);
  const pn = useAppear(36);
  const drift = interpolate(frame, [0, 150], [0, -12]);
  return (
    <AbsoluteFill style={{ fontFamily: SANS, transform: `translateX(${drift}px)` }}>
      <div style={{ position: "absolute", left: LEFT, top: 380, width: 90 * bar, height: 6, background: C.red }} />
      <div style={{ position: "absolute", left: LEFT - 4, top: 420, fontSize: 112, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1.05 }}>
        <Reveal p={p1}>
          <span style={{ color: C.ink }}>{a}</span>
        </Reveal>
        <Reveal p={p2}>
          <span style={{ color: C.red }}>{b}</span>
        </Reveal>
      </div>
      {note ? <div style={{ position: "absolute", left: LEFT, top: 700, fontSize: 30, color: C.grey, ...rise(pn, 10) }}>{note}</div> : null}
    </AbsoluteFill>
  );
};

/* ───────────── Two circuits ───────────── */
const COURT = [
  ["Событие", "Поступил документ"],
  ["С4", "Проверка ссылок"],
  ["С1, С2", "Разбор и методика"],
  ["С13", "Расшифровка заседания"],
  ["С3", "Контроль перед подписанием"],
];
const PARTY = [
  ["С7", "Подготовка заявления"],
  ["С10", "Проверка перед подачей"],
  ["С8", "Ведение дела по событиям"],
  ["С9", "Ответы по материалам"],
  ["С12", "Взыскание после решения"],
];

export const Circuits: React.FC = () => {
  const frame = useCurrentFrame();
  const X0 = 400;
  const W = 250;
  const GAP = 30;
  const COURT_Y = 330;
  const PARTY_Y = 680;
  const BUS_Y = 560;
  const bus = useLinear(70, 100);
  const xOf = (i: number) => X0 + i * (W + GAP);
  const cx = (i: number) => xOf(i) + W / 2;

  // Packet 1: party document after С10 → bus → court С4.
  const t1 = interpolate(frame, [130, 190], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  // Packet 2: court act after С3 → bus → party С8.
  const t2 = interpolate(frame, [205, 265], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const along = (pts: [number, number][], t: number) => {
    const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    const total = segs.reduce((a, b) => a + b, 0);
    let d = t * total;
    for (let i = 0; i < segs.length; i++) {
      if (d <= segs[i]) {
        const k = segs[i] === 0 ? 0 : d / segs[i];
        return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
      }
      d -= segs[i];
    }
    return pts[pts.length - 1];
  };
  const path1: [number, number][] = [[cx(1), PARTY_Y], [cx(1), BUS_Y], [cx(1), COURT_Y + 120]];
  const path2: [number, number][] = [[cx(4), COURT_Y + 120], [cx(4), BUS_Y], [cx(2), BUS_Y], [cx(2), PARTY_Y]];
  const [p1x, p1y] = along(path1, t1);
  const [p2x, p2y] = along(path2, t2);
  const hit1 = interpolate(frame, [188, 196, 230], [0, 1, 0.0], clamp);
  const hit2 = interpolate(frame, [263, 271, 300], [0, 1, 0.0], clamp);
  const note = useAppear(250);

  const lane = (label: string, sub: string, y: number, delay: number) => {
    const p = useAppearLane(delay);
    return (
      <div style={{ position: "absolute", left: LEFT, top: y + 28, width: 240, ...slide(p, 16) }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: C.ink }}>{label}</div>
        <div style={{ fontSize: 19, color: C.grey, marginTop: 6 }}>{sub}</div>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Взаимодействие контуров суда и сторон" />
      {lane("Контур суда", "судья, помощник, секретарь", COURT_Y, 10)}
      {lane("Контур сторон", "лица в деле, представители", PARTY_Y, 18)}

      {COURT.map((n, i) => (
        <BoxAt key={n[0]} x={xOf(i)} y={COURT_Y} w={W} delay={16 + i * 6} code={n[0]} title={n[1]} tone={i === 0 ? "red" : i === 1 ? (hit1 > 0.3 ? "red" : "plain") : "plain"} />
      ))}
      {PARTY.map((n, i) => (
        <BoxAt key={n[0]} x={xOf(i)} y={PARTY_Y} w={W} delay={30 + i * 6} code={n[0]} title={n[1]} tone={i === 2 && hit2 > 0.3 ? "red" : "plain"} />
      ))}

      <div
        style={{
          position: "absolute",
          left: X0,
          top: BUS_Y - 28,
          width: (W + GAP) * 5 - GAP,
          height: 56,
          borderRadius: 8,
          background: C.panel,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 600,
          color: C.ink,
          clipPath: `inset(0 ${(1 - bus) * 100}% 0 0)`,
        }}
      >
        Материалы дела ЕПЦП — единственный канал обмена между контурами
      </div>

      {[{ x: p1x, y: p1y, t: t1 }, { x: p2x, y: p2y, t: t2 }].map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: d.x - 11,
            top: d.y - 11,
            width: 22,
            height: 22,
            borderRadius: 4,
            background: C.red,
            boxShadow: "0 0 0 8px rgba(192,0,0,0.12)",
            opacity: d.t > 0 && d.t < 1 ? 1 : 0,
          }}
        />
      ))}

      <div style={{ position: "absolute", left: X0, top: 870, fontSize: 22, color: C.grey, ...rise(note, 8) }}>
        Агенты разных контуров напрямую не взаимодействуют
      </div>
    </AbsoluteFill>
  );
};

const useAppearLane = useAppear;

const BoxAt: React.FC<React.ComponentProps<typeof Box> & { delay: number }> = ({ delay, ...rest }) => {
  const p = useAppear(delay);
  return <Box {...rest} p={p} h={120} />;
};

/* ───────────── End-to-end scenario ───────────── */
const FLOW = [
  ["Событие", "Поступление иска", "Документ публикуется в шину событий"],
  ["С4", "Проверка ссылок", "Нормы — с реестрами, цитаты — с источником"],
  ["С5", "Перевод", "Расхождения с заверенным переводом"],
  ["С1", "Пакетный разбор", "Таблица со ссылками на страницы"],
  ["С2", "Методика состава", "Невыясненные обстоятельства, вопросы"],
  ["Заседание", "Аудиозапись", "В модуль распознавания речи"],
  ["С13", "Расшифровка", "Стенограмма, проект протокола"],
  ["С3", "Контроль перед подписанием", "Безусловные основания отмены"],
];

export const Flow: React.FC = () => {
  const frame = useCurrentFrame();
  const START = 30;
  const EACH = 26;
  const W = 380;
  const GAP = 40;
  const pos = (frame - START) / EACH;
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Рассмотрение дела в суде" sub="Агенты запускаются по событиям дела; результаты — судье и помощнику" />
      {FLOW.map((s, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const x = LEFT + col * (W + GAP);
        const y = 360 + row * 290;
        const p = interpolate(pos, [i - 0.2, i + 0.4], [0, 1], clamp);
        const last = i === FLOW.length - 1;
        const lit = last && pos > i + 0.6;
        return (
          <React.Fragment key={i}>
            <Box x={x} y={y} w={W} h={230} p={p} tone={lit ? "lime" : i === Math.floor(pos) && !last ? "red" : "plain"}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    background: lit ? C.ink : C.red,
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 19, fontWeight: 700, color: lit ? C.ink : C.red }}>{s[0]}</span>
              </div>
              <div style={{ fontSize: 29, fontWeight: 700, marginTop: 18, lineHeight: 1.15 }}>{s[1]}</div>
              <div style={{ fontSize: 20, color: lit ? C.ink : C.grey, marginTop: 10, lineHeight: 1.35 }}>{s[2]}</div>
            </Box>
            {col < 3 ? (
              <div style={{ position: "absolute", left: x + W + 8, top: y + 101, opacity: interpolate(pos, [i + 0.4, i + 0.8], [0, 1], clamp) }}>
                <Chevron size={24} color={C.red} />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};

/* ───────────── Retrieval pipeline ───────────── */
const PIPE = [
  ["Д13", "Уточнение запроса"],
  ["Д14", "Гибридный поиск"],
  ["Д15", "Фильтр по правам"],
  ["Д16", "Реранкер"],
  ["Д17", "Сборка контекста"],
  ["Д20", "Модель"],
  ["Д18", "Проверка ссылок"],
];

export const Retrieval: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 196;
  const GAP = 44;
  const claimA = useAppear(150);
  const claimB = useAppear(176);
  const okA = interpolate(frame, [168, 178], [0, 1], clamp);
  const strike = interpolate(frame, [196, 212], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Поиск по материалам дела" sub="Каждое утверждение агента — со ссылкой на документ и страницу" />
      {PIPE.map((s, i) => {
        const x = LEFT + i * (W + GAP);
        const p = interpolate(frame, [20 + i * 12, 36 + i * 12], [0, 1], clamp);
        const last = i === PIPE.length - 1;
        return (
          <React.Fragment key={s[0]}>
            <Box x={x} y={350} w={W} h={140} p={p} code={s[0]} title={s[1]} tone={last ? (frame > 110 ? "lime" : "plain") : "plain"} />
            {!last ? (
              <div style={{ position: "absolute", left: x + W + 10, top: 408, opacity: p }}>
                <Chevron size={24} color={C.greyLight} />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}

      <div style={{ position: "absolute", left: LEFT, top: 580, fontSize: 20, fontWeight: 700, letterSpacing: 2, color: C.greyLight, ...rise(claimA, 6) }}>
        ОТВЕТ АГЕНТА
      </div>
      <div style={{ position: "absolute", left: LEFT, top: 630, display: "flex", alignItems: "center", gap: 22, ...slide(claimA, 20) }}>
        <div style={{ fontSize: 34, fontWeight: 600, color: C.ink }}>Сумма требования — 1 200 000 ₽</div>
        <span style={{ display: "flex", alignItems: "center", gap: 8, opacity: okA, fontFamily: MONO, fontSize: 20, color: C.green, fontWeight: 500 }}>
          <Check size={24} color={C.green} strokeWidth={2.5} /> т. 2, с. 14
        </span>
      </div>
      <div style={{ position: "absolute", left: LEFT, top: 710, display: "flex", alignItems: "center", gap: 22, ...slide(claimB, 20) }}>
        <div style={{ position: "relative", fontSize: 34, fontWeight: 600, color: strike > 0.5 ? C.greyLight : C.ink }}>
          Неустойка начислена с 01.03
          <div style={{ position: "absolute", left: 0, top: "52%", height: 3, width: `${strike * 100}%`, background: C.red }} />
        </div>
        <span style={{ opacity: strike }}>
          <Tag tone="red">не подтверждено материалами</Tag>
        </span>
      </div>

      <div style={{ position: "absolute", left: LEFT, top: 830, display: "flex", gap: 14, ...rise(useAppear(220), 8) }}>
        <Tag>фильтр по правам — в запросе к индексу</Tag>
        <Tag>норма — в редакции на дату правоотношений</Tag>
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Layers ───────────── */
const LAYERS: [string, string, string][] = [
  ["Доступ и безопасность", "edge-gateway · session-bff · Keycloak · identity-broker · policy-engine (OPA)", C.redDark],
  ["Запуски и стриминг", "run-orchestrator · stream-relay (SSE) · model-router · context-compressor", C.ink],
  ["Агенты", "агенты сценариев ЕПЦП · matter-agent · doc-review · drafting · research", C.red],
  ["Шина агентов", "agentgateway (LLM, MCP, A2A, CEL) · MCP-серверы ×7 · tool-registry · approval-service", C.red],
  ["Знания", "legal-retrieval · citation-verifier · embedding-service · case-retrieval-service", C.ink],
  ["Дела и процессы", "Temporal workers · matter · deadline · document-service · legal-calc", C.ink],
  ["Модели", "llm-d + vLLM на собственных GPU · anonymizer перед внешним вызовом", C.green],
  ["Данные", "PostgreSQL + Citus · Qdrant · ClickHouse · Valkey · NATS JetStream · S3", C.green],
];

export const Layers: React.FC = () => {
  const frame = useCurrentFrame();
  const n = LAYERS.length;
  const legend = useAppear(150);
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Слои платформы" />
      {LAYERS.map((l, i) => {
        // Build bottom-up: data first, access last.
        const order = n - 1 - i;
        const p = interpolate(frame, [20 + order * 11, 38 + order * 11], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
        return (
          <div
            key={l[0]}
            style={{
              position: "absolute",
              left: LEFT,
              top: 270 + i * 76,
              width: 1680,
              height: 62,
              display: "flex",
              alignItems: "center",
              background: C.panel,
              borderRadius: 8,
              overflow: "hidden",
              opacity: p,
              transform: `translateY(${(1 - p) * 26}px)`,
            }}
          >
            <div style={{ width: 6, alignSelf: "stretch", background: l[2] }} />
            <div style={{ width: 380, paddingLeft: 26, fontSize: 25, fontWeight: 700, color: C.ink }}>{l[0]}</div>
            <div style={{ fontFamily: MONO, fontSize: 19, color: C.grey }}>{l[1]}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: LEFT, top: 900, display: "flex", gap: 34, fontSize: 20, color: C.grey, ...rise(legend, 6) }}>
        {[
          [C.ink, "детерминированный сервис"],
          [C.red, "LLM-агент и шина"],
          [C.redDark, "безопасность"],
          [C.green, "модели и хранилища"],
        ].map(([c, t]) => (
          <span key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 14, height: 14, background: c, borderRadius: 2 }} />
            {t}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Agent bus ───────────── */
const AGENTS = ["агенты сценариев суда", "агенты сценариев сторон", "matter-agent", "doc-review-agent", "drafting-agent", "research-agent"];
const TOOLS = [
  ["MCP-серверы ×7", "доменные инструменты"],
  ["tool-registry", "каталог, уровень риска"],
  ["approval-service", "согласование перед действием"],
  ["llm-d + vLLM", "модели на собственных GPU"],
];

export const Bus: React.FC = () => {
  const frame = useCurrentFrame();
  const hub = useAppear(40, 24);
  const HX = 780;
  const HY = 450;
  const HW = 360;
  const HH = 210;
  const agentY = (i: number) => 330 + i * 80;
  const toolY = (i: number) => 320 + i * 120;
  // Pulses: agent i → hub → tool (i % 4), staggered, repeating.
  const pulses = [0, 1, 2, 3, 4, 5].map((i) => {
    const t = ((frame - 120 - i * 14) % 84) / 84;
    if (frame < 120 + i * 14) return null;
    const ay = agentY(i) + 26;
    const ty = toolY(i % 4) + 44;
    const pts: [number, number][] = [[460, ay], [HX, HY + HH / 2], [HX + HW, HY + HH / 2], [1260, ty]];
    const seg = t < 0.4 ? 0 : t < 0.6 ? 1 : 2;
    const local = seg === 0 ? t / 0.4 : seg === 1 ? (t - 0.4) / 0.2 : (t - 0.6) / 0.4;
    const a = pts[seg];
    const b = pts[seg + 1];
    return { x: a[0] + (b[0] - a[0]) * local, y: a[1] + (b[1] - a[1]) * local, o: Math.sin(Math.PI * t) };
  });
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Шина агентов и инструментов" sub="Вызовы моделей и инструментов — только через agentgateway" />

      {AGENTS.map((a, i) => {
        const p = interpolate(frame, [14 + i * 5, 30 + i * 5], [0, 1], clamp);
        return (
          <React.Fragment key={a}>
            <div
              style={{
                position: "absolute",
                left: LEFT,
                top: agentY(i),
                width: 340,
                height: 52,
                boxSizing: "border-box",
                border: `2px solid ${i < 2 ? C.red : C.line}`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                paddingLeft: 18,
                fontSize: 21,
                fontWeight: 600,
                color: C.ink,
                ...slide(p, 16),
              }}
            >
              {a}
            </div>
            <Path d={`M 460 ${agentY(i) + 26} C 620 ${agentY(i) + 26}, 640 ${HY + HH / 2}, ${HX} ${HY + HH / 2}`} delay={56 + i * 4} color={C.line} />
          </React.Fragment>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: HX,
          top: HY,
          width: HW,
          height: HH,
          borderRadius: 14,
          background: C.ink,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${0.92 + 0.08 * hub})`,
          opacity: hub,
        }}
      >
        <div style={{ fontSize: 38, fontWeight: 700 }}>agentgateway</div>
        <div style={{ fontSize: 22, color: "#B9B9C6", marginTop: 8 }}>LLM · MCP · A2A</div>
        <div style={{ fontSize: 18, color: "#ff8a8a", marginTop: 14 }}>политики CEL на каждый вызов</div>
      </div>

      {TOOLS.map((t, i) => {
        const p = interpolate(frame, [70 + i * 8, 86 + i * 8], [0, 1], clamp);
        return (
          <React.Fragment key={t[0]}>
            <Path d={`M ${HX + HW} ${HY + HH / 2} C 1200 ${HY + HH / 2}, 1180 ${toolY(i) + 44}, 1260 ${toolY(i) + 44}`} delay={66 + i * 6} color={C.line} />
            <Box x={1260} y={toolY(i)} w={540} h={92} p={p} title={t[0]} sub={t[1]} tone={i === 2 ? "red" : "plain"} style={{ padding: "14px 22px" }} />
          </React.Fragment>
        );
      })}

      {pulses.map((d, i) =>
        d ? (
          <div key={i} style={{ position: "absolute", left: d.x - 7, top: d.y - 7, width: 14, height: 14, borderRadius: 7, background: C.red, opacity: d.o }} />
        ) : null,
      )}

      <div style={{ position: "absolute", left: LEFT, top: 860 + 40, fontSize: 21, color: C.grey, ...rise(useAppear(110), 6) }}>
        A2A — взаимодействие агентов · MCP — подключение инструментов
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Models ───────────── */
export const Models: React.FC = () => {
  const frame = useCurrentFrame();
  const pA = useAppear(12);
  const pB = useAppear(30);
  const pC = useAppear(48);
  const pGpu = useAppear(70);
  const pAnon = useAppear(130);
  const pExt = useAppear(150);
  const block = interpolate(frame, [180, 196], [0, 1], clamp);
  const POOLS = ["mass", "small", "embed ×2", "rerank", "ocr"];
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Размещение моделей" sub="Собственные GPU; внешний вызов — только после обезличивания" />

      <Box x={LEFT} y={360} w={280} h={110} p={pA} title="Агенты" sub="запрос к модели" />
      <Path d="M 400 415 L 500 415" delay={26} color={C.ink} head />
      <Box x={510} y={360} w={330} h={110} p={pB} title="model-router" sub="выбор пула по классу данных" />
      <Path d="M 840 415 L 940 415" delay={44} color={C.ink} head />
      <Box x={950} y={360} w={330} h={110} p={pC} title="agentgateway" sub="лимиты, учёт, журнал" tone="dark" />
      <Path d="M 1115 470 L 1115 560" delay={62} color={C.ink} head />

      <Box x={800} y={570} w={1000} h={230} p={pGpu} tone="plain" style={{ border: `2px solid ${C.green}`, background: "rgba(146,208,80,0.10)" }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: C.ink }}>llm-d + vLLM · собственные GPU</div>
        <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
          {POOLS.map((t, i) => (
            <span key={t} style={{ opacity: interpolate(frame, [84 + i * 6, 96 + i * 6], [0, 1], clamp) }}>
              <Tag tone="lime" size={22}>
                {t}
              </Tag>
            </span>
          ))}
        </div>
        <div style={{ fontSize: 21, color: C.green, marginTop: 26, fontWeight: 600 }}>основной контур исполнения</div>
      </Box>

      <Path d="M 260 470 L 260 600" delay={124} color={C.grey} dashed head />
      <Box x={LEFT} y={610} w={300} h={100} p={pAnon} title="anonymizer" sub="маскирование ПДн" tone="red" />
      <Path d="M 270 710 L 270 790" delay={146} color={C.grey} dashed head />
      <Box x={LEFT} y={800} w={560} h={100} p={pExt} title="Внешние провайдеры" sub="при перегрузке, только обезличенные данные" style={{ borderStyle: "dashed" }} />

      <div
        style={{
          position: "absolute",
          left: 720,
          top: 834,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 22,
          fontWeight: 600,
          color: C.red,
          opacity: block,
          transform: `scale(${0.9 + 0.1 * block})`,
        }}
      >
        <Lock size={24} color={C.red} strokeWidth={2.2} />
        данные контура суда наружу не уходят
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Security ───────────── */
const SEC = [
  { icon: SplitSquareHorizontal, t: "Раздельные контуры", d: "Отдельные хранилища, индексы и кэш для суда и сторон", c: "К7, Д11, Д25" },
  { icon: KeyRound, t: "Права пользователя", d: "Агент действует от имени пользователя; токен на каждый запуск", c: "К2 · identity-broker" },
  { icon: ClipboardCheck, t: "Подтверждение человеком", d: "Подписание, подача и отправка — только действием человека", c: "К8 · approval-service" },
  { icon: ShieldAlert, t: "Внедрённые инструкции", d: "Документы сторон — это данные. Скрытые команды отмечаются", c: "Д24 · content-guard" },
  { icon: EyeOff, t: "Контроль утечек", d: "Ответ проверяется до выдачи; вне прав — блокировка и журнал", c: "policy-engine (OPA)" },
  { icon: ScrollText, t: "Журнал действий", d: "Запуски, данные, вызовы инструментов. Только добавление", c: "К9" },
];

export const Security: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Требования безопасности" sub="Каждое требование реализуется конкретным компонентом" />
      {SEC.map((s, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const p = interpolate(frame, [22 + i * 10, 40 + i * 10], [0, 1], clamp);
        const Icon = s.icon;
        return (
          <div
            key={s.t}
            style={{
              position: "absolute",
              left: LEFT + col * 570,
              top: 350 + row * 290,
              width: 530,
              borderTop: `3px solid ${C.ink}`,
              paddingTop: 26,
              ...rise(p, 14),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Icon size={30} color={C.red} strokeWidth={1.8} />
              <span style={{ fontSize: 31, fontWeight: 700, color: C.ink }}>{s.t}</span>
            </div>
            <div style={{ fontSize: 23, color: C.grey, marginTop: 16, lineHeight: 1.4 }}>{s.d}</div>
            <div style={{ fontFamily: MONO, fontSize: 19, color: C.red, marginTop: 16 }}>{s.c}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ───────────── Quality gate ───────────── */
export const Quality: React.FC = () => {
  const frame = useCurrentFrame();
  const BASE = 820;
  const SCALE = 4.2;
  const THRESH = 84;
  const bars = [
    { v: "v1.4", s: 86 },
    { v: "v1.5", s: 91 },
    { v: "v1.6", s: 79 },
  ];
  const th = useLinear(30, 60);
  const stamp = interpolate(frame, [150, 162], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
  const rollback = useAppear(185);
  const steps = ["Наборы проверочных дел", "Проверка каждой версии", "Блокировка выпуска", "Пополнение наборов"];
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Контроль качества" sub="Версия, ухудшившая результат, в эксплуатацию не выпускается" />

      <div style={{ position: "absolute", left: LEFT, top: 360, width: 600 }}>
        {steps.map((s, i) => {
          const p = interpolate(frame, [16 + i * 10, 32 + i * 10], [0, 1], clamp);
          const hot = i === 2 && frame > 150;
          return (
            <div key={s} style={{ display: "flex", gap: 20, alignItems: "center", padding: "22px 0", borderTop: `1.5px solid ${C.line}`, ...slide(p, 16) }}>
              <span style={{ width: 38, height: 38, borderRadius: 19, background: hot ? C.red : C.ink, color: "#fff", fontWeight: 700, fontSize: 19, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i + 1}
              </span>
              <span style={{ fontSize: 29, fontWeight: 600, color: hot ? C.red : C.ink }}>{s}</span>
            </div>
          );
        })}
      </div>

      {/* chart */}
      <div style={{ position: "absolute", left: 1000, top: BASE, width: 700, height: 2, background: C.ink }} />
      {bars.map((b, i) => {
        const g = interpolate(frame, [50 + i * 30, 80 + i * 30], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
        const bad = b.s < THRESH;
        const h = (b.s - 30) * SCALE * g;
        return (
          <React.Fragment key={b.v}>
            <div style={{ position: "absolute", left: 1060 + i * 220, top: BASE - h, width: 140, height: h, background: bad ? C.red : C.panel, borderTop: `3px solid ${bad ? C.red : C.ink}` }} />
            <div style={{ position: "absolute", left: 1060 + i * 220, width: 140, top: BASE + 16, textAlign: "center", fontFamily: MONO, fontSize: 22, color: C.grey }}>{b.v}</div>
            <div style={{ position: "absolute", left: 1060 + i * 220, width: 140, top: BASE - h - 44, textAlign: "center", fontSize: 26, fontWeight: 700, color: bad ? C.red : C.ink, opacity: g }}>{b.s}</div>
          </React.Fragment>
        );
      })}
      <div style={{ position: "absolute", left: 1000, top: BASE - (THRESH - 30) * SCALE, width: 700 * th, borderTop: `2px dashed ${C.green}` }} />
      <div style={{ position: "absolute", left: 760, width: 220, textAlign: "right", top: BASE - (THRESH - 30) * SCALE - 14, fontSize: 20, fontWeight: 600, color: C.green, opacity: th }}>
        порог проверочного набора
      </div>

      <div style={{ position: "absolute", left: 1460, top: 400, transform: `rotate(-6deg) scale(${0.6 + 0.4 * stamp})`, opacity: stamp }}>
        <div style={{ border: `3px solid ${C.red}`, color: C.red, borderRadius: 8, padding: "10px 18px", fontSize: 26, fontWeight: 800, letterSpacing: 1, display: "flex", alignItems: "center", gap: 10 }}>
          <Ban size={26} color={C.red} strokeWidth={2.4} /> ВЫПУСК ОСТАНОВЛЕН
        </div>
      </div>
      <div style={{ position: "absolute", left: 1460, top: 480, fontSize: 22, color: C.grey, ...rise(rollback, 8) }}>доступен откат к v1.5</div>
    </AbsoluteFill>
  );
};

/* ───────────── Flagships ───────────── */
const FLAGS = [
  { n: "10", unit: "мин", t: "Протокол через 10 минут", d: "Проект протокола после заседания. Стенограмма по говорящим и чек-лист действий", c: "С13" },
  { n: "15", unit: "мин", t: "Живая карта дела", d: "Обновление после нового документа. Хронология, требования, доводы и доказательства на одном экране", c: "С1, С2" },
  { n: "300", unit: "требований", t: "Банкротное дело за ночь", d: "Требования кредиторов разбираются пакетом — реестр готов к утру", c: "С1" },
  { n: "простым", unit: "языком", t: "Суд, который объясняет", d: "Акт с пояснением простым языком, сроком и проектом документа", c: "С9" },
  { n: "пределы", unit: "не раскрываются", t: "Мировое соглашение", d: "Посредник подбирает условия, не раскрывая пределы сторон", c: "С11 · пилот" },
];

export const Flagships: React.FC = () => {
  const frame = useCurrentFrame();
  const START = 20;
  const EACH = 62;
  const idx = Math.max(0, Math.min(FLAGS.length - 1, Math.floor((frame - START) / EACH)));
  const local = frame - START - idx * EACH;
  const f = FLAGS[idx];
  const p = interpolate(local, [0, 16], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const numeric = /^\d+$/.test(f.n);
  const count = numeric ? Math.round(parseInt(f.n, 10) * interpolate(local, [0, 26], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })) : f.n;
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Флагманские сценарии" sub="Для суда, сторон и граждан" />
      <div style={{ position: "absolute", left: LEFT, top: 350, width: 640 }}>
        {FLAGS.map((g, i) => {
          const ap = interpolate(frame, [8 + i * 6, 22 + i * 6], [0, 1], clamp);
          const on = i === idx && frame >= START;
          return (
            <div key={g.t} style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 0", borderTop: `1.5px solid ${C.line}`, ...slide(ap, 14) }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: on ? C.red : C.greyLight, width: 34 }}>{i + 1}</span>
              <span style={{ fontSize: 29, fontWeight: on ? 700 : 500, color: on ? C.ink : C.greyLight }}>{g.t}</span>
              {on ? <Chevron size={22} color={C.red} style={{ marginLeft: "auto" }} /> : null}
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", left: 900, top: 330, width: 900, opacity: frame >= START ? 1 : 0 }}>
        <div style={{ display: "flex", flexDirection: numeric ? "row" : "column", alignItems: "baseline", gap: numeric ? 24 : 10, ...rise(p, 20) }}>
          <span style={{ fontSize: numeric ? 260 : 150, fontWeight: 700, color: C.red, letterSpacing: numeric ? -10 : -5, lineHeight: 1 }}>{count}</span>
          <span style={{ fontSize: 48, fontWeight: 600, color: C.ink }}>{f.unit}</span>
        </div>
        <div style={{ fontSize: 30, color: C.grey, marginTop: 30, lineHeight: 1.4, maxWidth: 800, ...rise(p, 12) }}>{f.d}</div>
        <div style={{ marginTop: 26, ...rise(p, 8) }}>
          <Tag tone="red" size={22}>
            {f.c}
          </Tag>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Stack ───────────── */
const STACK = [
  { lang: "Rust", color: C.red, why: "Задержка и безопасность", items: ["agentgateway", "stream-relay", "anonymizer", "context-compressor", "legal-calc-service"] },
  { lang: "Go", color: C.green, why: "Детерминированные сервисы", items: ["run-orchestrator, model-router", "quota, entitlements", "matter, deadline", "MCP-серверы, tool-registry", "Temporal workers"] },
  { lang: "Python", color: C.gold, why: "Агенты и ML-сервисы", items: ["агенты сценариев ЕПЦП", "citation-verifier", "case-retrieval-service", "content-guard", "document ingest"] },
];
const INFRA = ["PostgreSQL + Citus", "Qdrant", "ClickHouse", "Valkey", "NATS JetStream", "S3", "Temporal", "Keycloak", "OPA", "llm-d + vLLM"];

export const Stack: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Head title="Технологический стек" />
      {STACK.map((s, i) => {
        const p = interpolate(frame, [14 + i * 12, 32 + i * 12], [0, 1], clamp);
        return (
          <div key={s.lang} style={{ position: "absolute", left: LEFT + i * 570, top: 290, width: 520, ...rise(p, 16) }}>
            <div style={{ fontSize: 76, fontWeight: 700, color: s.color, letterSpacing: -2 }}>{s.lang}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: C.ink, marginTop: 4 }}>{s.why}</div>
            <div style={{ marginTop: 22 }}>
              {s.items.map((it, k) => (
                <div
                  key={it}
                  style={{
                    fontFamily: MONO,
                    fontSize: 21,
                    color: C.grey,
                    padding: "11px 0",
                    borderTop: `1.5px solid ${C.line}`,
                    opacity: interpolate(frame, [36 + i * 12 + k * 5, 48 + i * 12 + k * 5], [0, 1], clamp),
                  }}
                >
                  {it}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: LEFT, top: 870, width: 1680, display: "flex", flexWrap: "wrap", gap: 12 }}>
        {INFRA.map((t, i) => (
          <span key={t} style={{ opacity: interpolate(frame, [110 + i * 4, 122 + i * 4], [0, 1], clamp) }}>
            <Tag size={19}>{t}</Tag>
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Outro ───────────── */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const p1 = useAppear(6, 26);
  const p2 = useAppear(18, 26);
  const pn = useAppear(44);
  const bar = useLinear(2, 20);
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <div style={{ position: "absolute", left: LEFT, top: 330, width: 90 * bar, height: 6, background: C.red }} />
      <div style={{ position: "absolute", left: LEFT - 4, top: 370, fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05 }}>
        <Reveal p={p1}>
          <span style={{ color: C.ink }}>Агент готовит.</span>
        </Reveal>
        <Reveal p={p2}>
          <span style={{ color: C.red }}>Решает человек.</span>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: LEFT, top: 680, fontSize: 32, color: C.grey, ...rise(pn, 10) }}>
        Агентная платформа ЕПЦП · ДИТ · Москва, октябрь 2026
      </div>
      <div style={{ position: "absolute", left: 1480, top: 360, opacity: interpolate(frame, [30, 60], [0, 1], clamp) }}>
        <Chevron size={240} color={C.red} width={2.2} />
      </div>
    </AbsoluteFill>
  );
};
