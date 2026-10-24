// Reads MDX files from /content/<pillar>/ at build time.
// Think of each file as one row: the frontmatter (between the --- lines) is the columns,
// the body is the long-form text. Nothing here runs in the visitor's browser.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Photo } from "./site";

export type Pillar = "build" | "learn" | "live" | "create";

export type Entry = {
  pillar: Pillar;
  slug: string; // the file name, used in the URL: /learn/<slug>
  title: string;
  summary: string;
  date: string; // "2026-10-11"; optional for projects
  tags: string[];
  status: string; // e.g. "In progress"
  github: string;
  external: string; // set to a Substack URL to link out instead of hosting the text here
  order: number; // projects: lower shows first
  photo: Photo;
  logo: string; // optional wordmark image shown in place of the title (create projects)
  headings: string[]; // the "## " headings in the body, for the case-study index
  body: string;
};

const ROOT = path.join(process.cwd(), "content");
const isProd = process.env.NODE_ENV === "production";

function readEntry(pillar: Pillar, file: string): Entry & { draft: boolean } {
  const raw = fs.readFileSync(path.join(ROOT, pillar, file), "utf8");
  const { data, content } = matter(raw);
  // Ignore headings inside MDX comments {/* ... */} so commented-out templates don't show up.
  const visible = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  const headings = [...visible.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  return {
    pillar,
    slug: file.replace(/\.mdx$/, ""),
    title: String(data.title ?? "Untitled"),
    summary: String(data.summary ?? ""),
    date,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    status: String(data.status ?? ""),
    github: String(data.github ?? ""),
    external: String(data.external ?? ""),
    order: Number(data.order ?? 999),
    photo: {
      src: String(data.image ?? ""),
      alt: String(data.imageAlt ?? ""),
      label: String(data.imageLabel ?? "Image"),
      focus: data.imageFocus ? String(data.imageFocus) : undefined,
    },
    logo: String(data.logo ?? ""),
    headings,
    body: content,
    draft: data.draft === true,
  };
}

export function getEntries(pillar: Pillar): Entry[] {
  const dir = path.join(ROOT, pillar);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readEntry(pillar, f))
    .filter((e) => !(isProd && e.draft)) // drafts show in `npm run dev` only
    .sort((a, b) =>
      pillar === "build" || pillar === "create"
        ? a.order - b.order
        : b.date.localeCompare(a.date),
    );
}

export function getEntry(pillar: Pillar, slug: string): Entry | undefined {
  return getEntries(pillar).find((e) => e.slug === slug);
}

// Writing shown on the homepage: newest LEARN and LIVE pieces together.
export function getRecentWriting(limit = 3): Entry[] {
  return [...getEntries("learn"), ...getEntries("live")]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

// Pages that live on this site (external Substack entries don't get a page here).
export function getLocalSlugs(pillar: Pillar): { slug: string }[] {
  return getEntries(pillar)
    .filter((e) => !e.external)
    .map((e) => ({ slug: e.slug }));
}

export function entryHref(e: Entry): string {
  return e.external || `/${e.pillar}/${e.slug}`;
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
