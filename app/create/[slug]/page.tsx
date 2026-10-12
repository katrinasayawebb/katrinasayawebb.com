import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Mdx } from "@/components/Mdx";
import { Arrow } from "@/components/Arrow";
import { links } from "@/lib/site";
import { getEntry, getLocalSlugs } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return getLocalSlugs("create");
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEntry("create", (await params).slug);
  return e ? { title: e.title, description: e.summary } : {};
}

// A creative project page (AWARÉ first). Sections come from the MDX file.
export default async function CreateProject({ params }: Props) {
  const entry = getEntry("create", (await params).slug);
  if (!entry) notFound();
  return (
    <article>
      <Container className="pt-6">
        <Link href="/create" className="caps quiet-link inline-flex items-center gap-2">
          <Arrow className="rotate-180" /> Create
        </Link>
        <header className="mt-10 grid gap-6 md:grid-cols-12 md:items-end">
          <h1 className="font-serif text-[3.5rem] leading-[0.95] md:col-span-7 md:text-[6.5rem]">{entry.title}</h1>
          <p className="max-w-[40ch] text-[1.0625rem] leading-[1.7] text-espresso/85 md:col-span-5 md:pb-3">
            {entry.summary}
          </p>
        </header>
      </Container>
      <Container className="mt-12">
        <PhotoSlot photo={entry.photo} priority className="aspect-[16/9]" sizes="(min-width: 1440px) 1360px, 100vw" />
      </Container>
      <Container className="mt-16 grid md:grid-cols-12">
        <div className="md:col-span-8 md:col-start-3">
          <Mdx source={entry.body} className="prose-numbered" />
          {links.substack && (
            <a
              href={links.substack}
              className="caps quiet-link mt-14 inline-flex items-center gap-2"
              target="_blank"
              rel="noopener"
            >
              Follow along on Substack <Arrow />
            </a>
          )}
        </div>
      </Container>
    </article>
  );
}
