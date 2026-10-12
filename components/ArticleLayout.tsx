import Link from "next/link";
import { Container } from "./Container";
import { PhotoSlot } from "./PhotoSlot";
import { Mdx } from "./Mdx";
import { Arrow } from "./Arrow";
import { formatDate, type Entry } from "@/lib/content";

// Shared by LEARN notes and LIVE essays. LIVE leads with a wide photograph.
export function ArticleLayout({ entry, backHref, backLabel }: { entry: Entry; backHref: string; backLabel: string }) {
  const showPhoto = entry.photo.src || entry.pillar === "live";
  return (
    <article>
      <Container className="pt-6">
        <Link href={backHref} className="caps quiet-link inline-flex items-center gap-2">
          <Arrow className="rotate-180" /> {backLabel}
        </Link>
        <header className="mx-auto mt-14 max-w-[48rem] text-center">
          <p className="caps text-muted">
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            {entry.tags.length > 0 && <span className="ml-4">{entry.tags.join("  /  ")}</span>}
          </p>
          <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.02] md:text-[4.25rem]">{entry.title}</h1>
          {entry.summary && (
            <p className="mx-auto mt-6 max-w-[48ch] text-[1.125rem] leading-[1.7] text-espresso/85">{entry.summary}</p>
          )}
        </header>
      </Container>
      {showPhoto && (
        <Container className="mt-14">
          <PhotoSlot photo={entry.photo} priority className="aspect-[16/9]" sizes="(min-width: 1440px) 1360px, 100vw" />
        </Container>
      )}
      <Container className="mt-16">
        <Mdx source={entry.body} className="mx-auto max-w-[42rem]" />
      </Container>
    </article>
  );
}
