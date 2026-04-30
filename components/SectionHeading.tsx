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
          "mb-3 text-sm font-bold uppercase tracking-[0.35em]",
          isLight ? "text-emerald-700" : "text-cyan-300",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-3xl font-black tracking-tight md:text-5xl",
          isLight ? "text-[#073b2c]" : "text-white",
        )}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={cn(
            "mt-5 text-base leading-8 md:text-lg",
            isLight ? "text-slate-600" : "text-slate-300",
          )}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
