type Props = {
  text: string
  style?: React.CSSProperties
}
const Badge = (props: Props) => {
  return (
    <div
      className="px-4 py-2"
      style={{
        borderRadius: "10000px",
        background: "#FFDE00",
        color: "#3B4CCA",
        fontWeight: "bold",
        ...props.style
      }}
    >
      {props.text}
    </div>
  )
}

export default Badge
