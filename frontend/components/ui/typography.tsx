import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"

export const typographyVariants = cva("text", {
    variants: {
        variant: {
            h1: "scroll-m-20 font-extrabold tracking-tight text-xl lg:text-2xl",
            h2: "scroll-m-20 pb-2 text-lg lg:text-xl font-semibold tracking-tight first:mt-0",
            h3: "scroll-m-20 text-lg lg:text-md font-semibold tracking-tight",
            h4: "scroll-m-20 text-md font-semibold tracking-tight",
            p: "[&:not(:first-child)]:mt-1",
            label: "text-sm text-muted-foreground",
            // blockquote: "mt-6 border-l-2 pl-6 italic",
            // list: "my-6 ml-6 list-disc [&>li]:mt-2",
        },
        affects: {
            default: "",
            lead: "text-xl text-muted-foreground",
            large: "text-lg font-semibold",
            small: "text-sm font-medium leading-none",
            description: "text-sm text-muted-foreground",
            muted: "text-sm text-muted-foreground",
            removePMargin: "[&:not(:first-child)]:mt-0",
        },
        color: {
            default: "",
            primary: "text-primary",
            secondary: "text-secondary",
            accent: "text-accent",
            error: "text-error",
            success: "text-success",
            warning: "text-warning",
            info: "text-info",
            muted: "text-muted",
            "muted-foreground": "text-muted-foreground",
            destructive: "text-destructive",
        },
        size: {
            default: "",
            xs: "text-xs",
            sm: "text-sm",
            md: "text-md",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl",
            "5xl": "text-5xl",
            "6xl": "text-6xl",
            "7xl": "text-7xl",
            "8xl": "text-8xl",
            "9xl": "text-9xl",
        },

    },
    defaultVariants: {
        variant: "p",
        affects: "default",
        color: "default",
    },
})

export interface TypographyProps
    extends Omit<React.HTMLAttributes<HTMLElement>, "color" | "variant" | "affects">,
    VariantProps<typeof typographyVariants> { }

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
    ({ className, variant, affects, size, color, ...props }, ref) => {
        const Comp = variant || "p"
        return (
            <Comp
                className={cn(typographyVariants({ variant, affects, size, color, className }))}
                ref={ref as any}
                {...props}
            />
        )
    },
)
Typography.displayName = "H1"

export default Typography


