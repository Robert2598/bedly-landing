import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Bedly — Make your bed. Make your day.";

type LoadedFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600 | 700 | 800;
  style: "normal";
};

/**
 * Loads a Google font as TTF for Satori. The css2 endpoint serves truetype to
 * non-browser user agents (like the build's fetch), which Satori can parse.
 * Returns null on any failure so the OG image still renders in a fallback font.
 */
async function loadFont(
  family: string,
  weight: LoadedFont["weight"],
  text: string,
): Promise<LoadedFont | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+",
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const match = css.match(
      /src: url\((https:[^)]+)\) format\('(?:truetype|opentype)'\)/,
    );
    if (!match) return null;
    const data = await (await fetch(match[1])).arrayBuffer();
    return { name: family, data, weight, style: "normal" };
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const title = "Bedly.";
  const tagline = "Make your bed. Make your day.";
  const sub = "Scan your bed · Score 0–100 · Build your streak";

  const [fredoka, nunito, mascotBuf] = await Promise.all([
    loadFont("Fredoka", 700, title + tagline),
    loadFont("Nunito", 700, sub),
    readFile(join(process.cwd(), "public", "bedly-mascot.png")).catch(() => null),
  ]);

  const fonts = [fredoka, nunito].filter((f): f is LoadedFont => f !== null);

  const displayFont = fredoka ? "Fredoka" : undefined;
  const bodyFont = nunito ? "Nunito" : undefined;
  const mascotSrc = mascotBuf
    ? `data:image/png;base64,${Buffer.from(mascotBuf).toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          padding: "0 90px",
          background:
            "linear-gradient(135deg, #FF8A6B 0%, #FF6F8E 48%, #9F6BE6 100%)",
          color: "#fff",
        }}
      >
        {mascotSrc && <img src={mascotSrc} alt="" width={360} height={295} />}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 116,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            Bedly
            <span style={{ color: "#FFCB2D" }}>.</span>
          </div>
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 52,
              marginTop: 18,
              letterSpacing: -1,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 700,
              fontSize: 30,
              marginTop: 22,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            {sub}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
