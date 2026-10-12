import Image from "next/image";
import type { Photo } from "@/lib/site";

type Props = {
  photo: Photo;
  className?: string; // sizing / aspect-ratio classes, e.g. "aspect-[4/3]"
  sizes: string; // tells the browser how wide the image renders, so Next serves the right file size
  priority?: boolean; // true only for the hero, so it loads first
  grayscale?: boolean;
};

// Shows your photo when `src` is set; otherwise a labeled placeholder of the same shape,
// so the layout can be reviewed before every image exists.
export function PhotoSlot({ photo, className = "", sizes, priority, grayscale }: Props) {
  if (photo.src) {
    return (
      <div className={`relative overflow-hidden bg-sand ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={photo.focus ? { objectPosition: photo.focus } : undefined}
          className={`object-cover ${grayscale ? "grayscale" : ""}`}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-end overflow-hidden bg-sand ${className}`}
    >
      {/* The label is a note to you while building; the live site shows a plain tonal block. */}
      {process.env.NODE_ENV === "development" && (
        <span className="p-3 text-[0.6875rem] leading-snug text-muted">{photo.label}</span>
      )}
    </div>
  );
}
