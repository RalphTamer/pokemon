import React from "react"

type Props = {
  size?: number
  color?: string
  //   strokeWidth?: number
}

const ActivityIndicator = (props: Props) => {
  const size = props.size || 24
  const color = props.color || "#000000"
  //   const strokeWidth = props.strokeWidth || 1.5
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke={color}
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="3">
            <circle
              strokeOpacity="1"
              cx="18"
              cy="18"
              r="18"
              strokeWidth={"2"}
            />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default ActivityIndicator
