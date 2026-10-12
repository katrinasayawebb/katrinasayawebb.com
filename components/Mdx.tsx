import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import type { ComponentProps } from "react";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

// Image with an optional caption, for screenshots, diagrams, and photographs inside a post.
// Usage in MDX: <Figure src="/images/x.png" alt="..." caption="..." />
function Figure({
  src,
  alt = "",
  caption,
  width = 1600,
  height = 1000,
}: {
  src: string;
  alt?: string;
  caption?: string;
  width?: number; // the image's real pixel size, so the page reserves the right space before it loads
  height?: number;
}) {
  return (
    <figure className="my-12">
      {src ? (
        // Opens the original file in a new tab, for wide screenshots that are hard to read inline
        <a href={src} target="_blank" rel="noopener" aria-label={`${alt} (opens full size)`} className="block cursor-zoom-in">
          <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 768px) 900px, 100vw" className="h-auto w-full bg-sand" />
        </a>
      ) : (
        <div className="aspect-[3/2] w-full bg-sand" aria-hidden="true" />
      )}
      {caption && <figcaption className="mt-3 text-[0.8125rem] text-muted">{caption}</figcaption>}
    </figure>
  );
}

const components = {
  // Section headings get an id so the case-study index can link to them.
  h2: (props: ComponentProps<"h2">) => <h2 id={slugify(textOf(props.children))} {...props} />,
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("http") ? <a href={href} target="_blank" rel="noopener" {...props} /> : <a href={href} {...props} />,
  Figure,
};

export function Mdx({ source, className = "" }: { source: string; className?: string }) {
  return (
    <div className={`prose ${className}`}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
