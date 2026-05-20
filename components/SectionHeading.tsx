import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  text,
  className,
  tone = "dark",
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  className?: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
}) {
  const isLight = tone === "light";
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        isCenter ? "text-center" : "text-left",
        className,
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.28em] sm:text-sm sm:tracking-[0.32em]",
          isLight ? "text-emerald-700" : "text-brand-gold-light",
        )}
      >
        {eyebrow}
      </p>
      <span
        className={cn(
          "heading-accent mt-3",
          !isCenter && "heading-accent-left",
        )}
        aria-hidden
      />
      <h2
        className={cn(
          "font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl md:leading-tight",
          isLight ? "text-brand-forest" : "text-white",
        )}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={cn(
            "mt-4 text-sm leading-7 sm:text-base sm:leading-8 md:mt-5",
            isLight ? "text-slate-600" : "text-slate-300",
          )}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
