import React from "react";
import { Composition, continueRender, delayRender } from "remotion";
import "@fontsource/oswald/cyrillic-700.css";
import "@fontsource/oswald/latin-700.css";
import "@fontsource/inter/cyrillic-400.css";
import "@fontsource/inter/cyrillic-500.css";
import "@fontsource/inter/cyrillic-600.css";
import "@fontsource/inter/cyrillic-700.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import { TOTAL, Video } from "./Video";

const fontHandle = delayRender("fonts");
Promise.all(
  ["700 100px Oswald", "400 20px Inter", "500 20px Inter", "600 20px Inter", "700 20px Inter"].map((f) =>
    document.fonts.load(f, "АБВ abc"),
  ),
).then(() => continueRender(fontHandle));

export const Root: React.FC = () => (
  <Composition id="Solon" component={Video} durationInFrames={TOTAL} fps={30} width={1920} height={1080} />
);
