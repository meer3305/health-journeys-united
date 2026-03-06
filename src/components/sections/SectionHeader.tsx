interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, centered = true, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
