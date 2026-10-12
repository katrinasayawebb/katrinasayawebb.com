import Link from "next/link";
import { Arrow } from "./Arrow";

export function SectionHeading({
  title,
  link,
  id,
}: {
  title: string;
  link?: { href: string; label: string };
  id?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-taupe pb-5">
      <h2 id={id} className="font-serif text-[2.5rem] leading-none md:text-[3.25rem]">
        {title}
      </h2>
      {link && (
        <Link href={link.href} className="caps quiet-link inline-flex shrink-0 items-center gap-2 pb-1">
          {link.label} <Arrow />
        </Link>
      )}
    </div>
  );
}
