import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PillarHero } from "@/components/PillarHero";
import { ProjectCard } from "@/components/ProjectCard";
import { getPillar } from "@/lib/site";
import { getEntries } from "@/lib/content";

const pillar = getPillar("/build");
export const metadata: Metadata = { title: "Build", description: pillar.intro };

export default function BuildPage() {
  const projects = getEntries("build");
  return (
    <>
      <PillarHero label={`${pillar.number} ${pillar.name}`} title={pillar.title} intro={pillar.intro} portrait={pillar.portrait} />
      <Container>
      <div className="grid gap-x-8 gap-y-16 border-t border-taupe pt-12 md:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      </Container>
    </>
  );
}
