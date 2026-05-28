import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        <span style={{ color: "#00D4FF" }}>D</span>
        <span style={{ color: "#F0F4FF" }}>S</span>
      </div>
    ),
    size
  );
}
