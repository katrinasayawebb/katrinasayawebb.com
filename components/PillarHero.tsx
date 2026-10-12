import { Container } from "./Container";
import { PhotoSlot } from "./PhotoSlot";
import { PageIntro } from "./PageIntro";
import type { Photo } from "@/lib/site";

type Props = {
  label: string;
  title: string;
  intro: string;
  portrait: Photo;
};

// Opening of each pillar page. With a portrait: photo left, title right, aligned to the photo's base.
// Without one (src ""), it falls back to the text-only intro, so a missing photo never shows an empty block.
export function PillarHero({ label, title, intro, portrait }: Props) {
  if (!portrait.src) {
    return (
      <Container>
        <PageIntro label={label} title={title} intro={intro} />
      </Container>
    );
  }
  return (
    <Container className="grid gap-10 pt-6 pb-16 md:grid-cols-12 md:items-end md:pt-10 md:pb-24">
      <PhotoSlot photo={portrait} priority className="aspect-[4/5] md:col-span-5" sizes="(min-width: 768px) 40vw, 100vw" />
      <header className="md:col-span-6 md:col-start-7 md:pb-4">
        <p className="caps text-muted">{label}</p>
        <h1 className="mt-5 max-w-[12ch] font-serif text-[3.25rem] leading-[0.98] tracking-[-0.01em] md:text-[5rem]">
          {title}
        </h1>
        <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-[1.7] text-espresso/85">{intro}</p>
      </header>
    </Container>
  );
}
