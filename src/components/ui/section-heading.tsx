import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  kicker,
  title,
  accent,
  description,
  align = "center",
  className,
}: {
  kicker: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <Reveal>
        <p
          className={cn(
            "mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-aqua",
            align === "center" && "mx-auto"
          )}
        >
          <span className="size-1.5 rounded-full bg-turquoise shadow-[0_0_12px_#00b8d9]" aria-hidden="true" />
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl font-semibold leading-[1.08] text-white sm:text-4xl md:text-5xl">
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-gradient">{accent}</span>
            </>
          )}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
