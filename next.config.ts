import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats from the optimiser instead of raw originals.
    formats: ["image/avif", "image/webp"],
    // Every <Image quality> value used in the codebase must be listed here.
    qualities: [75, 90],
  },
  async redirects() {
    // Legacy WordPress-era route. Permanent (308) so search engines transfer signals.
    return [
      { source: "/portfolio", destination: "/journal", permanent: true },
      { source: "/portfolio/:slug", destination: "/journal/:slug", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
