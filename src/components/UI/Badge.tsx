type Props = {
  text: string
  backgroundColor?: string
  textColor?: string
  style?: React.CSSProperties
}
const Badge = (props: Props) => {
  const backgroundColor = props.backgroundColor || "#FFDE00"
  const textColor = props.textColor || "#3B4CCA"

  return (
    <div
      className="px-4 py-2"
      style={{
        borderRadius: "10000px",
        background: backgroundColor,
        color: textColor,
        fontWeight: "bold",
        ...props.style
      }}
    >
      {props.text}
    </div>
  )
}

export default Badge
