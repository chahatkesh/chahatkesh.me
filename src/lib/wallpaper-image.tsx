import { ImageResponse } from "next/og";

import { WALLPAPER_COLORS } from "~/constants/wallpaper";
import type { WallpaperLayout } from "~/lib/wallpaper";

export function generateWallpaperImageResponse(layout: WallpaperLayout) {
  const numberSize = Math.round(layout.width * 0.07);
  const captionSize = Math.round(layout.width * 0.022);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: WALLPAPER_COLORS.background,
      }}
    >
      {layout.dots.map((dot) => (
        <div
          key={dot.date}
          style={{
            display: "flex",
            position: "absolute",
            left: dot.x - dot.radius,
            top: dot.y - dot.radius,
            width: dot.radius * 2,
            height: dot.radius * 2,
            borderRadius: "50%",
            backgroundColor: dot.color,
          }}
        />
      ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          left: layout.streak.x,
          top: layout.streak.y,
          width: layout.streak.width,
          alignItems: "center",
          gap: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: numberSize,
            fontWeight: 600,
            color: WALLPAPER_COLORS.text,
            letterSpacing: "-1px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1,
          }}
        >
          {layout.streak.value}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: captionSize,
            fontWeight: 500,
            color: WALLPAPER_COLORS.muted,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          streak
        </div>
      </div>
    </div>,
    {
      width: layout.width,
      height: layout.height,
    },
  );
}
