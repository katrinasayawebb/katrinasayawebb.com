import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "./Container";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header>
      <a
        href="#main"
        className="caps sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ivory focus:p-3"
      >
        Skip to content
      </a>
      <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
        <Link
          href="/"
          className="font-serif text-[1.125rem] uppercase leading-none tracking-[0.2em] sm:text-[1.25rem]"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <NavLinks />
        </nav>
      </Container>
    </header>
  );
}
