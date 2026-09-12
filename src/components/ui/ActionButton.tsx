import type { ComponentProps } from "react"

type ActionElementProps = ComponentProps<"button"> & {
  href?: never
} | ComponentProps<"a"> & { href: string }

interface ActionAppearance {
  variant?: "gold" | "dark" | "outline"
}

type ActionButtonProps = ActionElementProps & ActionAppearance

export default function ActionButton({
  variant = "gold",
  className = "",
  ...props
}: ActionButtonProps) {
  const classes = `action-button action-button--${variant} font-display tracking-[0.28em] uppercase ${className}`

  if (props.href !== undefined) {
    return <a className={classes} {...props} />
  }

  return <button type="button" className={classes} {...props} />
}
