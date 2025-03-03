"use client";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  isActive?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  isActive = true,
}: SectionHeaderProps) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-yellow-500">{title}</h2>
      <p
        className={`mt-1 text-sm ${
          isActive ? "text-zinc-400" : "text-zinc-500"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}
