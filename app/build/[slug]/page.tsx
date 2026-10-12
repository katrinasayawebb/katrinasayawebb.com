import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Mdx, slugify } from "@/components/Mdx";
import { Arrow } from "@/components/Arrow";
import { getEntry, getLocalSlugs } from "@/lib/content";

// Pre-builds one page per project file at deploy time; unknown slugs 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return getLocalSlugs("build");
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getEntry("build", (await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function CaseStudy({ params }: Props) {
  const project = getEntry("build", (await params).slug);
  if (!project) notFound();
  const hasSections = project.headings.length > 0;

  return (
    <Container className="pt-6">
      <Link href="/build" className="caps quiet-link inline-flex items-center gap-2">
        <Arrow className="rotate-180" /> All projects
      </Link>

      <article>
        <header className="mt-10 grid gap-10 md:grid-cols-12">
          <PhotoSlot
            photo={project.photo}
            priority
            className="aspect-[4/3] md:col-span-7"
            sizes="(min-width: 768px) 55vw, 100vw"
          />
          <div className="md:col-span-5">
            <ul className="caps flex flex-wrap gap-x-4 text-muted">
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
              {project.status && <li className="text-burgundy">{project.status}</li>}
            </ul>
            <h1 className="mt-5 font-serif text-[2.75rem] leading-[1.02] md:text-[3.5rem]">{project.title}</h1>
            <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-[1.7] text-espresso/85">{project.summary}</p>

            {hasSections && (
              <nav aria-label="Sections" className="mt-10">
                <ol className="border-t border-taupe">
                  {project.headings.map((h, i) => (
                    <li key={h} className="border-b border-taupe">
                      <a href={`#${slugify(h)}`} className="caps flex gap-6 py-3 hover:text-blue">
                        <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                        {h}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {project.github && (
              <a href={project.github} className="caps quiet-link mt-8 inline-flex items-center gap-2" target="_blank" rel="noopener">
                View on GitHub <Arrow />
              </a>
            )}
          </div>
        </header>

        <div className="mt-20 grid md:grid-cols-12">
          <div className="md:col-span-8 md:col-start-3">
            {hasSections ? (
              <Mdx source={project.body} className="prose-numbered" />
            ) : (
              <p className="border-t border-taupe pt-8 font-serif text-[1.5rem] leading-snug text-muted">
                Case study in progress.
              </p>
            )}
          </div>
        </div>
      </article>
    </Container>
  );
}
