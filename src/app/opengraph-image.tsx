import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const runtime = "edge";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(120deg, #0f6b5f 0%, #1c2f4a 100%)",
          color: "white",
          fontSize: 58,
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 22, textTransform: "uppercase", letterSpacing: 6 }}>
          {siteConfig.name}
        </div>
        <div style={{ marginTop: 20 }}>{siteConfig.tagline}</div>
        <div style={{ marginTop: 24, fontSize: 26, fontWeight: 400 }}>
          Fast, reliable internet for Borongan & Eastern Samar.
        </div>
      </div>
    ),
    size
  );
}

