import { cva, type VariantProps } from "class-variance-authority";

const typography = cva([""], {
  variants: {
    variant: {
      h2: "font-ubuntu font-bold text-lg decoration-ring inline-block",
      paragraph: "text-muted-foreground font-normal block text-base font-sans",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    font: {
      sans: "font-sans",
      ubuntu: "font-ubuntu",
      poem: "font-poem",
    },
  },
  defaultVariants: {
    variant: "h2",
  },
});

export type TypographyVariants = VariantProps<typeof typography>;

export const typo = typography;
