import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#171513" }}>
        <div style={{ width: 148, height: 148, border: "2px solid #b59a7e", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ width: 96, height: 73, border: "3px solid #f4f0e9", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginTop: 20 }}>
            <div style={{ position: "absolute", width: 51, height: 29, border: "3px solid #f4f0e9", borderBottom: 0, borderRadius: "29px 29px 0 0", top: -31, left: 19 }} />
            <div style={{ fontSize: 29, fontFamily: "Georgia", color: "#f4f0e9", letterSpacing: -3 }}>CH</div>
          </div>
          <div style={{ position: "absolute", right: 13, top: 12, width: 8, height: 8, borderRadius: "50%", background: "#b59a7e" }} />
        </div>
      </div>
    ),
    size,
  );
}
