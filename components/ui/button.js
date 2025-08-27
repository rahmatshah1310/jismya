import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand-600 shadow-card hover:shadow-hover",
        destructive: "bg-rose text-white hover:bg-rose/90 shadow-card hover:shadow-hover",
        outline: "border border-border text-ink hover:bg-sand/60 dark:hover:bg-white/5 dark:border-d-border dark:text-d-ink",
        secondary: "bg-sand text-ink hover:bg-sand/70 dark:bg-white/10 dark:text-d-ink dark:hover:bg-white/20",
        ghost: "text-ink hover:bg-sand/40 dark:text-d-ink dark:hover:bg-white/10",
        link: "text-brand underline-offset-4 hover:underline hover:text-brand-600",
        subtle: "bg-sand/60 text-ink hover:bg-sand/80 dark:bg-white/10 dark:text-d-ink dark:hover:bg-white/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 py-1.5 text-xs",
        lg: "h-12 px-6 py-3 text-base",
        xl: "h-14 px-8 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
