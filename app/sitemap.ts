import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getEntries, type Pillar } from "@/lib/content";

// Generated at build time as /sitemap.xml, so search engines find every page.
export default function sitemap(): MetadataRoute.Sitemap {
  const pillars: Pillar[] = ["build", "learn", "live", "create"];
  const fixed = ["", "/about", ...pillars.map((p) => `/${p}`)].map((path) => ({
    url: `${site.url}${path}`,
  }));
  const entries = pillars.flatMap((p) =>
    getEntries(p)
      .filter((e) => !e.external)
      .map((e) => ({ url: `${site.url}/${p}/${e.slug}`, ...(e.date ? { lastModified: e.date } : {}) })),
  );
  return [...fixed, ...entries];
}
