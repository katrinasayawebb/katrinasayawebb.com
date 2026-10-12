"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pillars } from "@/lib/site";

// Top menu: About first, then the four pillars.
const items = [{ name: "About", href: "/about" }, ...pillars.map((p) => ({ name: p.name, href: p.href }))];

// Client component only because it reads the current URL to underline the active item.
export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-5 sm:gap-8">
      {items.map((p) => {
        const active = pathname === p.href || pathname.startsWith(`${p.href}/`);
        return (
          <li key={p.href}>
            <Link
              href={p.href}
              aria-current={active ? "page" : undefined}
              className={`caps block border-b pb-1 transition-colors ${
                active ? "border-espresso" : "border-transparent hover:border-taupe"
              }`}
            >
              {p.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
