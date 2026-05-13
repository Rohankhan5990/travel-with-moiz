import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  text,
  className,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";

  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <p
        className={cn(
          "mb-2 text-xs font-bold uppercase tracking-[0.28em] sm:mb-3 sm:text-sm sm:tracking-[0.35em]",
          isLight ? "text-emerald-700" : "text-cyan-300",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-2xl font-black tracking-tight sm:text-3xl md:text-5xl",
          isLight ? "text-[#073b2c]" : "text-white",
        )}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={cn(
            "mt-3 text-sm leading-7 sm:mt-4 sm:text-base sm:leading-8 md:mt-5 md:text-lg",
            isLight ? "text-slate-600" : "text-slate-300",
          )}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
