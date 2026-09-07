import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
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
          background: "#f3efe8",
          borderRadius: 112,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 348,
            height: 348,
            borderRadius: "50%",
            background: "#1d1a17",
            border: "5px solid #d8c7b2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#f3efe8",
          }}
        >
          <div style={{ fontSize: 132, fontFamily: "Georgia", letterSpacing: -10, lineHeight: 1 }}>CH</div>
          <div style={{ fontSize: 25, fontFamily: "Arial", letterSpacing: 9, color: "#b08b68", marginTop: 16 }}>VINTAGE</div>
        </div>
      </div>
    ),
    size,
  );
}
