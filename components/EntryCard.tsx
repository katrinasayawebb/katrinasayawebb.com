import Link from "next/link";
import { entryHref, formatDate, type Entry } from "@/lib/content";
import { PhotoSlot } from "./PhotoSlot";

// A card in the LEARN / LIVE archives and the homepage "Recent writing" row.
// Substack entries (`external`) open on Substack.
export function EntryCard({ entry, showPillar = false }: { entry: Entry; showPillar?: boolean }) {
  const href = entryHref(entry);
  const inner = (
    <>
      {entry.photo.src || entry.pillar === "live" ? (
        <PhotoSlot photo={entry.photo} className="mb-5 aspect-[3/2]" sizes="(min-width: 768px) 30vw, 100vw" />
      ) : null}
      <p className="caps text-muted">
        <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        {showPillar && <span className="ml-4">{entry.pillar}</span>}
        {entry.external && <span className="ml-4">Substack</span>}
      </p>
      <h3 className="mt-3 font-serif text-[1.625rem] leading-[1.15] decoration-1 underline-offset-[6px] group-hover:underline">
        {entry.title}
      </h3>
      {entry.summary && (
        <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">{entry.summary}</p>
      )}
      {entry.tags.length > 0 && (
        <ul className="caps mt-4 flex flex-wrap gap-x-4 text-muted">
          {entry.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </>
  );
  return (
    <article>
      {entry.external ? (
        <a href={href} className="group block" target="_blank" rel="noopener">
          {inner}
        </a>
      ) : (
        <Link href={href} className="group block">
          {inner}
        </Link>
      )}
    </article>
  );
}
