import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#171513" }}>
        <div style={{ width: 424, height: 424, border: "3px solid #b59a7e", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ width: 270, height: 205, border: "7px solid #f4f0e9", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginTop: 55 }}>
            <div style={{ position: "absolute", width: 142, height: 82, border: "7px solid #f4f0e9", borderBottom: 0, borderRadius: "82px 82px 0 0", top: -84, left: 57 }} />
            <div style={{ fontSize: 82, fontFamily: "Georgia", color: "#f4f0e9", letterSpacing: -8, lineHeight: 1 }}>CH</div>
          </div>
          <div style={{ position: "absolute", right: 39, top: 38, width: 24, height: 24, borderRadius: "50%", background: "#b59a7e", border: "4px solid #171513" }} />
          <div style={{ position: "absolute", bottom: 28, fontSize: 18, fontFamily: "Arial", letterSpacing: 8, color: "#b59a7e" }}>VINTAGE</div>
        </div>
      </div>
    ),
    size,
  );
}
