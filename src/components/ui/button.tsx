import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F3D67] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#171A3D] via-[#263A68] to-[#342852] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
        secondary:
          "bg-transparent text-[#171A3D] border-2 border-[#171A3D] hover:bg-[#171A3D] hover:text-white",
        accent:
          "bg-gradient-to-r from-[#342852] to-[#4F3D67] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
        ghost:
          "text-[#171A3D] hover:bg-[#E5E5E6]",
        link:
          "text-[#263A68] underline-offset-4 hover:underline hover:text-[#4F3D67]",
        outline:
          "border-2 border-[#736F89] text-[#736F89] hover:bg-[#736F89] hover:text-white",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
