import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      white: "text-white",
      black: "text-black",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  strokeWidth?: number;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size, color, strokeWidth = 4, className }) => {
  return (
    <svg
      className={cn(spinnerVariants({ size, color }), className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="opacity-25"
      />
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        className="opacity-75"
      />
    </svg>
  );
};

export { Spinner };
