import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0C10",
          borderRadius: 40,
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        <span style={{ color: "#00D4FF" }}>D</span>
        <span style={{ color: "#F0F4FF" }}>S</span>
      </div>
    ),
    size
  );
}
