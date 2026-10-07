import React from "react";
import { Composition, continueRender, delayRender } from "remotion";
import "@fontsource/golos-text/cyrillic-400.css";
import "@fontsource/golos-text/cyrillic-500.css";
import "@fontsource/golos-text/cyrillic-600.css";
import "@fontsource/golos-text/cyrillic-700.css";
import "@fontsource/golos-text/cyrillic-800.css";
import "@fontsource/golos-text/latin-400.css";
import "@fontsource/golos-text/latin-500.css";
import "@fontsource/golos-text/latin-600.css";
import "@fontsource/golos-text/latin-700.css";
import "@fontsource/golos-text/latin-800.css";
import "@fontsource/jetbrains-mono/cyrillic-400.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import { TOTAL, Video } from "./Video";

const fontHandle = delayRender("fonts");
Promise.all(
  [400, 500, 600, 700, 800]
    .map((w) => `${w} 40px "Golos Text"`)
    .concat(['400 20px "JetBrains Mono"', '500 20px "JetBrains Mono"'])
    .map((f) => document.fonts.load(f, "АБВ abc 123")),
).then(() => continueRender(fontHandle));

export const Root: React.FC = () => (
  <Composition id="Epcp" component={Video} durationInFrames={TOTAL} fps={30} width={1920} height={1080} />
);
