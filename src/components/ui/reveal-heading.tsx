import { cn } from "@/lib/utils";

// Pure-CSS word-by-word mask reveal (works before hydration, SEO-safe: plain text in the DOM).
export function RevealHeading({
  text,
  accent,
  id,
  className,
}: {
  text: string;
  accent?: string;
  id?: string;
  className?: string;
}) {
  const words = [
    ...text.split(" ").map((w) => ({ w, accent: false })),
    ...(accent ? accent.split(" ").map((w) => ({ w, accent: true })) : []),
  ];

  return (
    <h1 id={id} className={cn("font-semibold leading-[1.05] text-white", className)}>
      {words.map((t, i) => (
        <span key={`${t.w}-${i}`}>
          <span className="reveal-word">
            <span style={{ ["--i" as string]: i }} className={cn(t.accent && "text-gradient")}>
              {t.w}
            </span>
          </span>{" "}
        </span>
      ))}
    </h1>
  );
}
