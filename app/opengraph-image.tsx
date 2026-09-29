import { ImageResponse } from "next/og";

export const alt = "Cô Hai Vintage — Saigon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-share card. Article and product pages override it with their own photo.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#171513", color: "#f4f0e9" }}>
        <div style={{ display: "flex", fontSize: 120, letterSpacing: 14 }}>CÔ HAI</div>
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 22, color: "#b59a7e", marginTop: 18 }}>VINTAGE</div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, color: "#8f8982", marginTop: 56 }}>SAIGON · VINTAGE · STORIES</div>
      </div>
    ),
    size,
  );
}
