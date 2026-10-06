import { RevealHeading } from "@/components/ui/reveal-heading";

export function PageHero({
  kicker,
  title,
  accent,
  description,
  children,
}: {
  kicker: string;
  title: string;
  accent?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative px-4 pb-14 pt-36 md:pb-20 md:pt-48">
      <div className="mx-auto max-w-4xl text-center">
        <p
          className="animate-fade-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-aqua backdrop-blur"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="size-1.5 rounded-full bg-turquoise shadow-[0_0_12px_#00b8d9]" aria-hidden="true" />
          {kicker}
        </p>
        <RevealHeading text={title} accent={accent} className="text-4xl sm:text-6xl lg:text-7xl" />
        {description && (
          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg"
            style={{ animationDelay: "0.45s" }}
          >
            {description}
          </p>
        )}
        {children && (
          <div className="animate-fade-up mt-9" style={{ animationDelay: "0.6s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
