/* eslint-disable @next/next/no-img-element -- ImageResponse cannot use next/image */
import { ImageResponse } from "next/og";
import config from "~/config";
import { OG_IMAGE_SIZE } from "~/lib/og-template";
import { generateWritingCoverSvg } from "~/lib/writing-cover";

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function generateWritingOGImage({
  title,
  subtitle,
  slug,
}: {
  title: string;
  subtitle?: string;
  slug: string;
}) {
  const cover = svgDataUri(generateWritingCoverSvg({ slug, title }));
  const titleSize = title.length > 42 ? 48 : title.length > 28 ? 56 : 64;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#0b0d0d",
        fontFamily: "Georgia, Times New Roman, Times, serif",
      }}
    >
      <img
        src={cover}
        alt=""
        width={OG_IMAGE_SIZE.width}
        height={OG_IMAGE_SIZE.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: OG_IMAGE_SIZE.width,
          height: OG_IMAGE_SIZE.height,
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 42%, rgba(0,0,0,0.18) 100%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(231,226,216,0.72)",
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span>Writing</span>
          <span>{config.domainName}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              lineHeight: 1.12,
              color: "#f4f0e8",
              letterSpacing: "-0.03em",
              maxWidth: "92%",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                lineHeight: 1.4,
                color: "rgba(231,226,216,0.72)",
                maxWidth: "78%",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {subtitle.length > 140
                ? `${subtitle.slice(0, 137)}...`
                : subtitle}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              marginTop: 8,
              fontSize: 20,
              color: "rgba(231,226,216,0.55)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {config.appName}
          </div>
        </div>
      </div>
    </div>,
    OG_IMAGE_SIZE,
  );
}
