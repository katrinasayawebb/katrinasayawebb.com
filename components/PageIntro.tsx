// The opening of every pillar page: small label, large serif headline, one line of intro.
export function PageIntro({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <header className="pt-10 pb-12 md:pt-16 md:pb-16">
      <p className="caps text-muted">{label}</p>
      <h1 className="mt-5 max-w-[16ch] font-serif text-[3.25rem] leading-[0.98] tracking-[-0.01em] md:text-[5rem]">
        {title}
      </h1>
      {intro && <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-espresso/85">{intro}</p>}
    </header>
  );
}
