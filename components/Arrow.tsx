// Thin editorial arrow, drawn to match the 1px dividers.
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 10"
      className={`inline-block h-[0.6em] w-[1em] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 5h15M11 1l4 4-4 4" />
    </svg>
  );
}
