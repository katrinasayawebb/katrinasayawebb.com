import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getEntry, getLocalSlugs } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return getLocalSlugs("live");
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEntry("live", (await params).slug);
  return e ? { title: e.title, description: e.summary, openGraph: e.photo.src ? { images: [e.photo.src] } : undefined } : {};
}

export default async function LiveArticle({ params }: Props) {
  const entry = getEntry("live", (await params).slug);
  if (!entry) notFound();
  return <ArticleLayout entry={entry} backHref="/live" backLabel="Live" />;
}
