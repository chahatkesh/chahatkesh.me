import { ImageResponse } from "next/og";

import { WALLPAPER_COLORS } from "~/constants/wallpaper";
import type { WallpaperLayout } from "~/lib/wallpaper";

export function generateWallpaperImageResponse(layout: WallpaperLayout) {
  const typeface = "system-ui, -apple-system, sans-serif";

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
      {layout.dots.map((dot) => {
        const size = Math.round(dot.radius * 2);
        const ring = dot.isToday
          ? Math.max(3, Math.round(dot.radius * 0.22))
          : 0;

        if (!dot.isToday) {
          return (
            <div
              key={dot.date}
              style={{
                display: "flex",
                position: "absolute",
                left: Math.round(dot.x - dot.radius),
                top: Math.round(dot.y - dot.radius),
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: dot.color,
              }}
            />
          );
        }

        return (
          <div
            key={dot.date}
            style={{
              display: "flex",
              position: "absolute",
              left: Math.round(dot.x - dot.radius - ring),
              top: Math.round(dot.y - dot.radius - ring),
              width: size + ring * 2,
              height: size + ring * 2,
              borderRadius: "50%",
              border: `${ring}px solid ${WALLPAPER_COLORS.todayRing}`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: dot.color,
              }}
            />
          </div>
        );
      })}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          left: layout.streak.x,
          top: layout.streak.y,
          width: layout.streak.width,
          alignItems: "center",
          gap: layout.streak.gap,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            fontSize: layout.streak.numberSize,
            fontWeight: 500,
            color: WALLPAPER_COLORS.text,
            letterSpacing: "-2px",
            fontFamily: typeface,
            lineHeight: 1,
          }}
        >
          {layout.streak.value}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            fontSize: layout.streak.captionSize,
            fontWeight: 500,
            color: WALLPAPER_COLORS.muted,
            letterSpacing: "6px",
            paddingLeft: 6,
            textTransform: "uppercase",
            fontFamily: typeface,
            lineHeight: 1,
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
