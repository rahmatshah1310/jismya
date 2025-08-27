import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand text-white hover:bg-brand-600",
        secondary: "border-transparent bg-sand text-ink dark:bg-white/10 dark:text-d-ink hover:bg-sand/70 dark:hover:bg-white/20",
        outline: "border-border dark:border-d-border text-ink dark:text-d-ink hover:bg-sand/40 dark:hover:bg-white/10",
        success: "border-transparent bg-moss text-white hover:bg-moss-600",
        warning: "border-transparent bg-rose text-white hover:bg-rose/90",
        info: "border-transparent bg-accent text-white hover:bg-accent/90",
      },
      size: {
        default: "px-2.5 py-1 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Badge = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <div className={cn(badgeVariants({ variant, size, className }))} ref={ref} {...props} />
))
Badge.displayName = "Badge"

export { Badge, badgeVariants }
