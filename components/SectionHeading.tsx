import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  text,
  className,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{text}</p>
      ) : null}
    </div>
  );
}
