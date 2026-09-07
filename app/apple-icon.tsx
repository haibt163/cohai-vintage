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
          background: "#f3efe8",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: "50%",
            background: "#1d1a17",
            border: "3px solid #d8c7b2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#f3efe8",
          }}
        >
          <div style={{ fontSize: 49, fontFamily: "Georgia", letterSpacing: -4, lineHeight: 1 }}>CH</div>
          <div style={{ fontSize: 9, fontFamily: "Arial", letterSpacing: 3, color: "#b08b68", marginTop: 7 }}>VINTAGE</div>
        </div>
      </div>
    ),
    size,
  );
}
