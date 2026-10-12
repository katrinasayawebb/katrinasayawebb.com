import Link from "next/link";
import type { Entry } from "@/lib/content";
import { PhotoSlot } from "./PhotoSlot";
import { Arrow } from "./Arrow";

export function ProjectCard({ project }: { project: Entry }) {
  return (
    <article>
      <Link href={`/build/${project.slug}`} className="group block">
        <PhotoSlot photo={project.photo} className="aspect-[4/3]" sizes="(min-width: 768px) 30vw, 100vw" />
        <ul className="caps mt-5 flex flex-wrap gap-x-4 text-muted">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
          {project.status && <li className="text-burgundy">{project.status}</li>}
        </ul>
        <h3 className="mt-3 font-serif text-[1.75rem] leading-[1.1] decoration-1 underline-offset-[6px] group-hover:underline">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-muted">{project.summary}</p>
        <span className="caps mt-5 inline-flex items-center gap-2">
          View project
          <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </article>
  );
}
