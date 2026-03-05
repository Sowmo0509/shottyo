import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Semantic base definitions for dynamic application
const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      span: "",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(({ className, variant, asChild = false, as, ...props }, ref) => {
  let defaultAs: React.ElementType = "div";
  if (variant === "p" || variant === "lead" || variant === "muted" || variant === "large") defaultAs = "p";
  if (variant === "span" || variant === "small") defaultAs = "span";
  if (variant === "inlineCode") defaultAs = "code";
  if (variant === "blockquote") defaultAs = "blockquote";
  if (variant === "list") defaultAs = "ul";
  if (variant?.startsWith("h")) defaultAs = variant as React.ElementType;

  const Comp = asChild ? Slot : as || defaultAs;

  return <Comp className={cn(typographyVariants({ variant, className }), "font-dynamic")} ref={ref as React.ForwardedRef<any>} {...props} />;
});
Typography.displayName = "Typography";

export function Heading({ as, variant, ...props }: TypographyProps) {
  const defaultVariant = as ? (as as any) : "h2";
  return <Typography as={as || "h2"} variant={variant || defaultVariant} {...props} />;
}

export function Text({ as, variant, ...props }: TypographyProps) {
  return <Typography as={as || "p"} variant={variant || "p"} {...props} />;
}

export { Typography, typographyVariants };
