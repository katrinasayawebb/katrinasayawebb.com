import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Arrow } from "@/components/Arrow";
import { about, links, photos } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Katrina Saya Webb: data, technology, and business systems, based in San Francisco.",
};

const contact = [
  { label: "Email", value: links.email, href: links.email ? `mailto:${links.email}` : "" },
  { label: "LinkedIn", value: "katrina-saya-webb", href: links.linkedin },
  { label: "GitHub", value: "katrinasayawebb", href: links.github },
  { label: "Substack", value: "@katrinasaya", href: links.substack },
].filter((c) => c.href);

export default function AboutPage() {
  return (
    <Container className="pt-6 md:pt-10">
      <div className="grid gap-12 md:grid-cols-12">
        {/* Portrait stays in view while the text scrolls on larger screens */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-8">
            <PhotoSlot
              photo={photos.aboutPreview}
              priority
              grayscale
              className="aspect-[3/4]"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <h1 className="font-serif text-[3.5rem] leading-none md:text-[5.5rem]">About</h1>
          <div className="mt-10 space-y-6 font-serif text-[1.5rem] leading-[1.4] md:text-[1.75rem]">
            {about.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <section aria-labelledby="background" className="mt-16 border-t border-taupe pt-8">
            <h2 id="background" className="caps text-muted">Background</h2>
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.8] text-espresso/85">
              {about.background.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {links.resume && (
              <a href={links.resume} className="caps quiet-link mt-8 inline-flex items-center gap-2" target="_blank" rel="noopener">
                Resume (PDF) <Arrow />
              </a>
            )}
          </section>

          <section aria-labelledby="interests" className="mt-16 border-t border-taupe pt-8">
            <h2 id="interests" className="caps text-muted">Interests</h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-serif text-[1.5rem]">Technical</h3>
                <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-espresso/85">
                  {about.technical.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-[1.5rem]">Elsewhere</h3>
                <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-espresso/85">
                  {about.elsewhere.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section aria-labelledby="contact" className="mt-16 border-t border-taupe pt-8">
            <h2 id="contact" className="caps text-muted">Contact</h2>
            <dl className="mt-6">
              {contact.map((c) => (
                <div key={c.label} className="flex items-baseline justify-between gap-6 border-b border-taupe py-3">
                  <dt className="caps text-muted">{c.label}</dt>
                  <dd>
                    <a
                      href={c.href}
                      className="quiet-link text-[0.9375rem]"
                      {...(c.href.startsWith("http") ? { target: "_blank", rel: "me noopener" } : {})}
                    >
                      {c.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </Container>
  );
}
