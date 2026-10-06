import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "shine group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-tight transition-[transform,box-shadow,background-color,border-color,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-white text-ink hover:bg-foam",
        primary:
          "bg-linear-to-b from-[#3adbf5] to-turquoise text-[#031018] shadow-[0_10px_40px_-8px_rgba(0,184,217,0.7)] hover:shadow-[0_16px_54px_-6px_rgba(34,211,238,0.85)]",
        whatsapp:
          "bg-linear-to-b from-[#3be07f] to-[#25d366] text-[#052e16] shadow-[0_10px_40px_-8px_rgba(37,211,102,0.6)] hover:shadow-[0_16px_54px_-6px_rgba(37,211,102,0.8)]",
        outline:
          "border border-white/20 bg-white/[0.03] text-white backdrop-blur hover:border-aqua/60 hover:bg-white/10",
        ghost: "text-white/80 hover:bg-white/10 hover:text-white",
        glass: "glass text-white hover:bg-white/10",
      },
      size: {
        default: "h-12 px-6 text-sm",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
