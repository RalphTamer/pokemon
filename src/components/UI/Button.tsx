import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
  style?: React.CSSProperties
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const Button = (props: Props) => {
  const { children } = props
  return (
    <button
      onClick={props.onClick}
      className={`px-4 py-2  text-center font-bold ${props.className}`}
      style={{
        borderRadius: 22,
        color: "#3B4CCA",
        background: "#FFDE00",
        ...props.style
      }}
    >
      {children}
    </button>
  )
}

export default Button
