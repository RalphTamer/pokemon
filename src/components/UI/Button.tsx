import { styles } from "@/lib/styles"
import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
  style?: React.CSSProperties
  className?: string
  name?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const Button = (props: Props) => {
  const { children } = props
  return (
    <button
      name={props.name || "button"}
      aria-label={props.name || "button"}
      onClick={props.onClick}
      className={`px-4 py-2  text-center font-bold ${props.className}`}
      style={{
        borderRadius: 22,
        color: styles.colors.blue,
        background: styles.colors.yellow,
        ...props.style
      }}
    >
      {children}
    </button>
  )
}

export default Button
