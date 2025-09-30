import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "./utils"

// 색상별 스타일 정의
const colorStyles = {
  primary: {
    contained: "bg-gray-10 !text-mono-white disabled:bg-gray-03",
    outlined:
      "border border-gray-03 !text-gray-10 disabled:border-gray-03 disabled:!text-gray-04 bg-mono-white",
    text: "!text-gray-10 disabled:!text-gray-04",
  },
  secondary: {
    contained:
      "bg-gray-02 !text-gray-08 disabled:bg-gray-01 disabled:!text-gray-04",
  },
  accent: {
    contained: "bg-sky-05 !text-mono-white disabled:bg-sky-02",
    outlined:
      "border border-sky-05 !text-sky-05 disabled:border-sky-02 disabled:!text-gray-04 bg-mono-white",
    text: "!text-sky-05 disabled:!text-gray-04",
  },
  critical: {
    contained: "bg-red-05 !text-mono-white disabled:bg-red-02",
    outlined:
      "border border-red-05 !text-red-05 disabled:border-red-02 disabled:!text-gray-04 bg-mono-white",
    text: "!text-red-05 disabled:!text-gray-04",
  },
}

// 레거시 variant를 새 형식으로 매핑
const mapLegacyVariant = (
  legacyVariant: string
): { variant: "contained" | "outlined" | "text"; color: ButtonColor } => {
  switch (legacyVariant) {
    case "primary":
      return { variant: "contained", color: "primary" }
    case "secondary":
      return { variant: "contained", color: "secondary" }
    case "tertiary":
      return { variant: "outlined", color: "primary" }
    case "quaternary":
      return { variant: "text", color: "primary" }
    case "accent":
      return { variant: "contained", color: "accent" }
    case "critical":
      return { variant: "contained", color: "critical" }
    default:
      return { variant: "contained", color: "primary" }
  }
}

const buttonVariants = cva(
  "inline-flex w-fit shrink-0 flex-row items-center gap-1 rounded-medium transition-colors hover:opacity-80 focus-visible:outline-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "bg-transparent",
        text: "bg-transparent",
      },
      color: {
        primary: "",
        secondary: "",
        accent: "",
        critical: "",
      },
      size: {
        xlarge: "h-[40px] px-2.5 text-body-1 font-medium leading-[22.4px]",
        large: "h-[32px] px-2 text-body-2 font-medium leading-[19.6px]",
        medium: "h-[28px] px-1.5 text-body-2 font-medium leading-[19.6px]",
        small: "h-[24px] px-1 text-body-3 font-medium leading-[16.8px]",
      },
      align: {
        start: "justify-start",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        center: "justify-center",
        startEnd: "justify-between [&>span]:mr-auto",
      },
    },
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "medium",
      align: "center",
    },
    compoundVariants: [
      // Primary 색상 조합
      {
        variant: "contained",
        color: "primary",
        className: colorStyles.primary.contained,
      },
      {
        variant: "outlined",
        color: "primary",
        className: colorStyles.primary.outlined,
      },
      {
        variant: "text",
        color: "primary",
        className: colorStyles.primary.text,
      },
      // Secondary 색상 조합 (contained만 지원)
      {
        variant: "contained",
        color: "secondary",
        className: colorStyles.secondary.contained,
      },
      // Accent 색상 조합
      {
        variant: "contained",
        color: "accent",
        className: colorStyles.accent.contained,
      },
      {
        variant: "outlined",
        color: "accent",
        className: colorStyles.accent.outlined,
      },
      {
        variant: "text",
        color: "accent",
        className: colorStyles.accent.text,
      },
      // Critical 색상 조합
      {
        variant: "contained",
        color: "critical",
        className: colorStyles.critical.contained,
      },
      {
        variant: "outlined",
        color: "critical",
        className: colorStyles.critical.outlined,
      },
      {
        variant: "text",
        color: "critical",
        className: colorStyles.critical.text,
      },
    ],
  }
)

const IconSize = {
  small: "h-4 w-4",
  medium: "h-4 w-4",
  large: "h-4 w-4",
  xlarge: "h-5 w-5",
}

export type ButtonColor = "primary" | "secondary" | "accent" | "critical"
type ButtonVariant = "contained" | "outlined" | "text"
type LegacyVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "accent"
  | "critical"
type VariantType = ButtonVariant | LegacyVariant

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<VariantProps<typeof buttonVariants>, "variant" | "color"> & {
    variant?: VariantType
    color?: ButtonColor
    size?: "small" | "medium" | "large" | "xlarge"
    leftIcon?: React.ReactElement<{ className?: string }>
    rightIcon?: React.ReactElement<{ className?: string }>
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "contained",
      color = "primary",
      size = "medium",
      leftIcon,
      align,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    // 레거시 variant 처리
    const isLegacyVariant = [
      "primary",
      "secondary",
      "tertiary",
      "quaternary",
      "accent",
      "critical",
    ].includes(variant as string)

    let finalVariant: ButtonVariant = "contained"
    let finalColor: ButtonColor = color

    if (isLegacyVariant) {
      const mapped = mapLegacyVariant(variant as string)
      finalVariant = mapped.variant
      finalColor = mapped.color
    } else {
      // 유효한 variant인 경우만 할당
      if (["contained", "outlined", "text"].includes(variant as string)) {
        finalVariant = variant as ButtonVariant
        finalColor = color
      }
    }

    // Secondary color는 contained variant만 허용
    const safeVariant: ButtonVariant =
      finalColor === "secondary" ? "contained" : finalVariant

    const content = (
      <>
        {leftIcon &&
          React.cloneElement(leftIcon, {
            className: cn(
              "shrink-0 [&>path]:fill-current",
              leftIcon.props.className,
              IconSize[size ?? "medium"]
            ),
          })}
        {typeof children === "string" ? (
          <span className="truncate px-0.5">{children}</span>
        ) : (
          children
        )}
        {rightIcon &&
          React.cloneElement(rightIcon, {
            className: cn(
              "shrink-0 [&>path]:fill-current",
              rightIcon.props.className,
              IconSize[size ?? "medium"]
            ),
          })}
      </>
    )

    return (
      <button
        className={cn(
          buttonVariants({
            variant: safeVariant,
            color: finalColor,
            size,
            align,
            className,
          })
        )}
        ref={ref}
        {...props}
      >
        {content}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
