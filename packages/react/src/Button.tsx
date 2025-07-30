import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx } from "clsx"
import { color, radius } from "exem-design-token"
import { type CSSProperties, forwardRef } from "react"
import "./Button.css"

const buttonVariants = cva(
  [
    // 기본 스타일
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "whitespace-nowrap",
    "border",
    "font-medium",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: "button-primary",
        "primary-subtle": "button-primary-subtle",
        accent: "button-accent",
        "accent-subtle": "button-accent-subtle",
        critical: "button-critical",
        "critical-subtle": "button-critical-subtle",
      },
      size: {
        xs: ["px-2", "py-1", "text-xs"],
        sm: ["px-3", "py-1.5", "text-sm"],
        md: ["px-4", "py-2", "text-sm"],
        lg: ["px-6", "py-3", "text-base"],
        xl: ["px-8", "py-4", "text-lg"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

// 버튼 variant별 CSS 변수 스타일
const getButtonStyles = (
  variant: NonNullable<VariantProps<typeof buttonVariants>["variant"]>
): CSSProperties => {
  const styles: Record<string, CSSProperties> = {
    primary: {
      backgroundColor: color["surface-primary-default"],
      color: color["text-inverse"],
      borderColor: color["border-primary"],
      borderRadius: radius.medium,
    },
    "primary-subtle": {
      backgroundColor: color["surface-primary-subtle-default"],
      color: color["text-primary"],
      borderColor: color["border-primary"],
      borderRadius: radius.medium,
    },
    accent: {
      backgroundColor: color["surface-accent-default"],
      color: color["text-inverse"],
      borderColor: color["border-accent"],
      borderRadius: radius.medium,
    },
    "accent-subtle": {
      backgroundColor: color["surface-accent-subtle-default"],
      color: color["text-accent"],
      borderColor: color["border-accent"],
      borderRadius: radius.medium,
    },
    critical: {
      backgroundColor: color["surface-critical-default"],
      color: color["text-inverse"],
      borderColor: color["border-critical"],
      borderRadius: radius.medium,
    },
    "critical-subtle": {
      backgroundColor: color["surface-critical-subtle-default"],
      color: color["text-critical"],
      borderColor: color["border-critical"],
      borderRadius: radius.medium,
    },
  }

  return styles[variant] || styles.primary
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size, asChild = false, style, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const buttonStyle = getButtonStyles(variant || "primary")

    return (
      <Comp
        className={clsx(buttonVariants({ variant, size }), className)}
        style={
          {
            ...buttonStyle,
            ...style,
            // hover 상태 CSS 변수 정의
            "--button-hover-bg":
              variant === "primary"
                ? color["surface-primary-hovered"]
                : variant === "primary-subtle"
                  ? color["surface-primary-subtle-hovered"]
                  : variant === "accent"
                    ? color["surface-accent-hovered"]
                    : variant === "accent-subtle"
                      ? color["surface-accent-subtle-hovered"]
                      : variant === "critical"
                        ? color["surface-critical-hovered"]
                        : variant === "critical-subtle"
                          ? color["surface-critical-subtle-hovered"]
                          : buttonStyle.backgroundColor,
            "--button-disabled-bg":
              variant === "primary"
                ? color["surface-primary-disabled"]
                : variant === "accent"
                  ? color["surface-accent-disabled"]
                  : variant === "critical"
                    ? color["surface-critical-disabled"]
                    : color["surface-primary-disabled"],
          } as CSSProperties
        }
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
