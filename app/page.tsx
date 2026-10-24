import Link from "next/link";
import { Container } from "@/components/Container";
import { PhotoSlot } from "@/components/PhotoSlot";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Arrow } from "@/components/Arrow";
import { EntryCard } from "@/components/EntryCard";
import { about, saewa, links, photos, pillars, site } from "@/lib/site";
import { getEntries, getEntry, getRecentWriting } from "@/lib/content";

// Left edge of hero text lines up with the page container even though the photo bleeds to the window edge.
const alignToContainer = "px-6 md:px-10 lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]";

export default function Home() {
  const projects = getEntries("build").slice(0, 3);
  const writing = getRecentWriting(3);
  const saewaEntry = getEntry("create", "saewa");
  return (
    <>
      {/* Hero: text left, portrait bleeding off the right edge */}
      {/* On very wide screens the text column keeps a fixed 600px past the container edge, so the headline never squeezes */}
      <section
        aria-labelledby="hero-title"
        className="grid lg:grid-cols-12 2xl:grid-cols-[calc((100vw-1440px)/2+600px)_minmax(0,1fr)]"
      >
        <div className={`flex flex-col justify-center pt-10 pb-14 lg:col-span-5 lg:py-24 2xl:col-span-1 ${alignToContainer}`}>
          <h1
            id="hero-title"
            className="max-w-[9em] font-serif text-[3.25rem] leading-[0.98] tracking-[-0.01em] sm:text-[4.25rem] xl:text-[5.5rem]"
          >
            {site.heroLines.map((line, i) => (
              <span key={line} className="block">
                {line}
                {i < site.heroLines.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-[44ch] text-[1.0625rem] leading-[1.7] text-espresso/85">{site.intro}</p>
          <a href="#pillars" className="caps quiet-link mt-10 inline-flex w-fit items-center gap-2">
            Explore <Arrow />
          </a>
        </div>
        <PhotoSlot
          photo={photos.hero}
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="order-first aspect-[4/5] sm:aspect-[4/3] lg:order-none lg:col-span-7 lg:aspect-auto lg:min-h-[680px] 2xl:col-span-1 2xl:min-h-[min(80svh,860px)]"
        />
      </section>

      {/* The four pillars */}
      <section id="pillars" aria-label="Sections of the site" className="scroll-mt-6">
        <Container>
          <ul className="grid grid-cols-2 border-b border-taupe lg:grid-cols-4">
            {pillars.map((p, i) => (
              <li
                key={p.href}
                className={`border-t border-taupe even:border-l lg:border-t-0 ${i > 0 ? "lg:border-l" : ""}`}
              >
                <Link
                  href={p.href}
                  className={`group flex h-full flex-col py-8 lg:py-10 ${
                    i % 2 === 0 ? "pr-4 sm:pr-6" : "pl-4 sm:pl-6 sm:pr-6"
                  } ${i > 0 ? "lg:pl-6" : ""}`}
                >
                  <span className="font-serif text-[1.5rem] leading-none text-muted sm:text-[1.75rem]">
                    {p.number}
                  </span>
                  <h2 className="mt-4 font-serif text-[1.5rem] uppercase leading-none tracking-[0.04em] sm:text-[1.75rem]">
                    {p.name}
                  </h2>
                  <p className="mt-3 max-w-[22ch] text-[0.875rem] leading-relaxed text-muted">{p.line}</p>
                  {/* mt-auto pins the photo row to the bottom so all four line up */}
                  <div className="mt-auto flex flex-col gap-4 pt-8 lg:flex-row-reverse lg:items-end lg:justify-between lg:gap-6">
                    <PhotoSlot
                      photo={p.photo}
                      sizes="(min-width: 1024px) 12vw, 45vw"
                      className="aspect-[4/3] w-full lg:w-[9.5rem]"
                    />
                    <Arrow className="lg:mb-1 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Featured technical projects */}
      <section aria-labelledby="projects-title" className="mt-28 md:mt-36">
        <Container>
          <SectionHeading id="projects-title" title="Selected projects" link={{ href: "/build", label: "All projects" }} />
          <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* Recent writing — fills in automatically from content/learn and content/live */}
      <section aria-labelledby="writing-title" className="mt-28 md:mt-36">
        <Container>
          <SectionHeading id="writing-title" title="Recent writing" link={writing.length ? { href: "/learn", label: "All writing" } : undefined} />
          {writing.length > 0 ? (
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {writing.map((w) => (
                <EntryCard key={w.slug} entry={w} showPillar />
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-12">
              <p className="font-serif text-[1.75rem] leading-[1.2] md:col-span-6">
                Essays and notes are published on Substack first.
              </p>
              <div className="md:col-span-5 md:col-start-8">
                <p className="text-[0.9375rem] leading-relaxed text-muted">
                  The newest pieces will appear here as they go live: technical notes under Learn, and
                  writing on Japan, design, and everyday life under Live.
                </p>
                {links.substack ? (
                  <a href={links.substack} className="caps quiet-link mt-6 inline-flex items-center gap-2">
                    Read on Substack <Arrow />
                  </a>
                ) : null}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* SÆWA feature */}
      <section aria-labelledby="saewa-title" className="mt-28 md:mt-36">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:order-2 lg:col-span-8">
            <PhotoSlot photo={saewa.photo} className="aspect-[16/10]" sizes="(min-width: 1024px) 62vw, 100vw" />
          </div>
          <div className="lg:order-1 lg:col-span-4 lg:pb-2">
            <p className="caps text-muted">04 Create</p>
            <h2 id="saewa-title" className="mt-4 font-serif text-[2.75rem] leading-none md:text-[3.5rem]">
              Building SÆWA.
            </h2>
            <p className="mt-6 max-w-[36ch] text-[1rem] leading-relaxed text-espresso/85">{saewaEntry?.summary}</p>
            <Link href={saewa.href} className="caps quiet-link mt-8 inline-flex items-center gap-2">
              Follow the project <Arrow />
            </Link>
          </div>
        </Container>
      </section>

      {/* About preview */}
      <section aria-labelledby="about-title" className="mt-28 md:mt-36">
        <Container>
          <div className="grid gap-10 border-t border-taupe pt-16 md:grid-cols-12 md:items-center">
          <PhotoSlot
            photo={photos.aboutPreview}
            grayscale
            className="aspect-[3/4] w-2/3 md:col-span-4 md:w-full"
            sizes="(min-width: 768px) 30vw, 66vw"
          />
          <div className="md:col-span-6 md:col-start-6">
            <h2 id="about-title" className="font-serif text-[2.75rem] leading-none md:text-[3.5rem]">
              About
            </h2>
            <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-[1.75] text-espresso/85">{about.preview}</p>
            <Link href="/about" className="caps quiet-link mt-8 inline-flex items-center gap-2">
              More about me <Arrow />
            </Link>
          </div>
          </div>
        </Container>
      </section>
    </>
  );
}
