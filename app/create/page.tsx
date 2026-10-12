import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Arrow } from "@/components/Arrow";
import { getPillar } from "@/lib/site";
import { PillarHero } from "@/components/PillarHero";
import { getEntries } from "@/lib/content";

const pillar = getPillar("/create");
export const metadata: Metadata = { title: "Create", description: pillar.intro };

export default function CreatePage() {
  const [featured, ...others] = getEntries("create");
  return (
    <>
      <PillarHero label={`${pillar.number} ${pillar.name}`} title={pillar.title} intro={pillar.intro} portrait={pillar.portrait} />

      {featured && (
        <section aria-labelledby="featured-title" className="mt-12 md:mt-12">
          <Container>
            <div className="border-t border-taupe pt-12">
              <Link href={`/create/${featured.slug}`} className="group grid gap-10 lg:grid-cols-12 lg:items-end">
                <PhotoSlot
                  photo={featured.photo}
                  className="aspect-[16/10] lg:order-2 lg:col-span-8"
                  sizes="(min-width: 1024px) 62vw, 100vw"
                />
                <div className="lg:order-1 lg:col-span-4 lg:pb-2">
                  <h2
                    id="featured-title"
                    className="font-serif text-[2.75rem] leading-none decoration-1 underline-offset-[8px] group-hover:underline md:text-[3.5rem]"
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-6 max-w-[36ch] text-[1rem] leading-relaxed text-espresso/85">{featured.summary}</p>
                  <span className="caps mt-8 inline-flex items-center gap-2">
                    Follow the project <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Future ventures appear here automatically: add a file to content/create */}
      {others.length > 0 && (
        <section aria-label="Other projects" className="mt-28">
          <Container className="grid gap-x-8 gap-y-16 border-t border-taupe pt-12 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/create/${o.slug}`} className="group block">
                <PhotoSlot photo={o.photo} className="aspect-[4/3]" sizes="(min-width: 768px) 30vw, 100vw" />
                <h3 className="mt-5 font-serif text-[1.75rem] leading-[1.1] group-hover:underline">{o.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{o.summary}</p>
              </Link>
            ))}
          </Container>
        </section>
      )}
    </>
  );
}
