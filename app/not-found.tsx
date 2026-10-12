import Link from "next/link";
import { Container } from "@/components/Container";
import { Arrow } from "@/components/Arrow";

export default function NotFound() {
  return (
    <Container className="py-32">
      <h1 className="font-serif text-5xl leading-none md:text-7xl">This page doesn't exist.</h1>
      <p className="mt-6 max-w-[48ch] text-muted">The link may be old, or the address may have a typo.</p>
      <Link href="/" className="caps quiet-link mt-10 inline-flex items-center gap-2">
        Back to the homepage <Arrow />
      </Link>
    </Container>
  );
}
