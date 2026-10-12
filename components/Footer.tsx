import Link from "next/link";
import { links, site } from "@/lib/site";
import { Container } from "./Container";

// Links without a URL in lib/site.ts render as plain text, so nothing points somewhere fake.
const footerLinks = [
  { label: "About", href: "/about", internal: true },
  { label: "Contact", href: links.email ? `mailto:${links.email}` : "" },
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "Substack", href: links.substack },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-taupe">
      <Container className="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link href="/" className="font-serif text-[1.125rem] uppercase tracking-[0.2em]">
            {site.name}
          </Link>
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Secondary">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((l) => (
              <li key={l.label}>
                {l.href ? (
                  l.internal ? (
                    <Link href={l.href} className="caps quiet-link">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="caps quiet-link" rel="me noopener" target="_blank">
                      {l.label}
                    </a>
                  )
                ) : (
                  <span className="caps text-muted" title="Add this link in lib/site.ts">
                    {l.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="pb-10">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. {site.location}.
        </p>
      </Container>
    </footer>
  );
}
