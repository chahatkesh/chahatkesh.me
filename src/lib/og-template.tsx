import { ImageResponse } from "next/og";
import config from "~/config";
import { BRAND_ACCENT_HEX, BACKGROUND_HEX } from "~/constants";

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

interface OGTemplateProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  tags?: string[];
  accentColor?: string;
}

export function generateOGImageResponse({
  title,
  subtitle,
  description,
  badge,
  tags,
  accentColor = BRAND_ACCENT_HEX,
}: OGTemplateProps) {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: BACKGROUND_HEX,
        color: "#fff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "80px",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.03) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.03) 2%, transparent 0%)",
        backgroundSize: "100px 100px",
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          style={{
            display: "flex",
            alignSelf: "flex-end",
            backgroundColor: "transparent",
            color: accentColor,
            padding: "8px 20px",
            borderRadius: "6px",
            fontSize: 18,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {badge.toUpperCase()}
        </div>
      )}

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? 56 : 72,
            fontWeight: "bold",
            color: "#fff",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            maxWidth: "90%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: 32,
              color: accentColor,
              fontWeight: 600,
              letterSpacing: "-0.5px",
              maxWidth: "90%",
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Description */}
        {description && (
          <div
            style={{
              fontSize: 24,
              color: "#d4d4d8",
              lineHeight: 1.4,
              maxWidth: "90%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {description.substring(0, 150)}
            {description.length > 150 ? "..." : ""}
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            {tags.slice(0, 5).map((tag) => (
              <div
                key={tag}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderTop: "2px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "30px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          {config.appName}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#888",
          }}
        >
          {config.domainName}
        </div>
      </div>
    </div>,
    OG_IMAGE_SIZE,
  );
}
