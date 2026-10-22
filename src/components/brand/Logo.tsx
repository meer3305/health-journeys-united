export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {/* Red medical cross */}
      <svg viewBox="0 0 24 24" className="h-[1.05em] w-[1.05em] shrink-0" aria-hidden="true">
        <path
          d="M9.5 2h5v7.5H22v5h-7.5V22h-5v-7.5H2v-5h7.5V2z"
          fill="#E03A2F"
        />
      </svg>
      <span className={`relative font-sans text-[1.15em] font-extrabold tracking-tight ${light ? "text-white" : "text-foreground"}`} style={{ letterSpacing: "-0.03em" }}>
        trawellcare<span className="absolute -right-3 -top-0.5 text-[0.5em] font-semibold opacity-60">®</span>
      </span>
    </span>
  );
}
