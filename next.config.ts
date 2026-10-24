import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // The brand was renamed from AWARÉ to SÆWA; keep old links working.
  async redirects() {
    return [{ source: "/create/aware", destination: "/create/saewa", permanent: true }];
  },
};

export default nextConfig;
