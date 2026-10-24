# katrinasayawebb.com

Next.js (App Router) + TypeScript + Tailwind v4. Static, no database or CMS.

## Run it
```
npm install
npm run dev        # http://localhost:3000
npm run build      # production check
```

## Where things live
- `lib/site.ts` — all editable content: links, projects, writing entries, photo paths
- `app/globals.css` — design tokens (colors, fonts)
- `app/page.tsx` — homepage
- `components/` — Header, Footer, PhotoSlot, ProjectCard, SectionHeading
- `public/images/` — put your photos here, then set `src: "/images/your-file.jpg"` in `lib/site.ts`

