# Content

One `.mdx` file = one page. The file name becomes the URL (`content/learn/why-csvs-break.mdx` → `/learn/why-csvs-break`).

Frontmatter fields (between the `---` lines):

| field | used for |
|---|---|
| `title` | headline |
| `summary` | one line under the headline and on cards |
| `date` | `2026-10-11` — sorts LEARN and LIVE, newest first |
| `tags` | `[Japan, Travel]` |
| `image` | `/images/...` — drop the file in `public/images/` |
| `imageAlt` | describe the photo for screen readers |
| `imageFocus` | which part to keep when cropped, e.g. `50% 30%` |
| `external` | a Substack URL — the card links there and no page is made here |
| `draft: true` | visible in `npm run dev`, left out of the live site |
| `github`, `status`, `order` | BUILD projects only |
