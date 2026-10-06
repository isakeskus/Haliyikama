import { cn } from "@/lib/utils";

export function Marquee({
  items,
  reverse = false,
  className,
  itemClassName,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <li key={item} className={cn("flex items-center gap-10 whitespace-nowrap", itemClassName)}>
          <span>{item}</span>
          <span className="size-1.5 rounded-full bg-turquoise" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]",
        className
      )}
    >
      <div className={cn("marquee-track", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
