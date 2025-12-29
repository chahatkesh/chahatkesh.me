import { ImageResponse } from "next/og";
import config from "~/config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        color: "#fff",
        fontFamily: "Ubuntu, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#fff",
          letterSpacing: "-2px",
          textShadow: "0 2px 16px #000",
        }}
      >
        {config.appName}
      </div>
      <div
        style={{
          fontSize: 36,
          marginBottom: 20,
          color: "#00adb5",
          fontWeight: 600,
          letterSpacing: "-1px",
        }}
      >
        {config.appDesignation}
      </div>
      <div
        style={{
          fontSize: 24,
          color: "#d4d4d8",
          textAlign: "center",
          maxWidth: "80%",
          fontWeight: 400,
        }}
      >
        {config.seo.defaultDescription}
      </div>
    </div>,
    size,
  );
}
