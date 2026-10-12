import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { EntryCard } from "@/components/EntryCard";
import { EmptyArchive } from "@/components/EmptyArchive";
import { getPillar } from "@/lib/site";
import { getEntries } from "@/lib/content";

const pillar = getPillar("/live");
export const metadata: Metadata = { title: "Live", description: pillar.intro };

export default function LivePage() {
  const entries = getEntries("live");
  return (
    <Container>
      <PageIntro label={`${pillar.number} ${pillar.name}`} title={pillar.title} intro={pillar.intro} />
      {entries.length === 0 ? (
        <EmptyArchive what="essays" />
      ) : (
        <div className="grid gap-x-8 gap-y-16 border-t border-taupe pt-12 md:grid-cols-3">
          {entries.map((e) => (
            <EntryCard key={e.slug} entry={e} />
          ))}
        </div>
      )}
    </Container>
  );
}
