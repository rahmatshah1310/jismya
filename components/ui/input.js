import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-xl border border-border dark:border-d-border bg-white dark:bg-d-card px-3 py-2 text-sm text-ink dark:text-d-ink placeholder:text-ink/50 dark:placeholder:text-d-ink/50 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand dark:focus:border-brand/70 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
