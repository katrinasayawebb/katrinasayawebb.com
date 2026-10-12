import { links } from "@/lib/site";
import { Arrow } from "./Arrow";

// Shown on LEARN / LIVE until the first piece is added.
export function EmptyArchive({ what }: { what: string }) {
  return (
    <div className="grid gap-6 border-t border-taupe pt-10 md:grid-cols-12">
      <p className="font-serif text-[1.75rem] leading-[1.2] md:col-span-6">Nothing here yet.</p>
      <div className="md:col-span-5 md:col-start-8">
        <p className="text-[0.9375rem] leading-relaxed text-muted">
          New {what} go out on Substack first, and the archive collects them here.
        </p>
        {links.substack && (
          <a href={links.substack} className="caps quiet-link mt-6 inline-flex items-center gap-2" target="_blank" rel="noopener">
            Read on Substack <Arrow />
          </a>
        )}
      </div>
    </div>
  );
}
