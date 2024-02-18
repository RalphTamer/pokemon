import React, { useState, ReactNode } from "react"
import SVGIcon from "./SVGIcon"

type CollapsibleItemProps = {
  title: string
  children: ReactNode
}

const CollapsibleItem: React.FC<CollapsibleItemProps> = ({
  title,
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div>
      <div
        onClick={toggleCollapse}
        style={{
          cursor: "pointer",
          borderBottom: "1px solid #ccc",
          padding: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1>{title}</h1>
        <span>
          {isCollapsed ? (
            <SVGIcon name="chevron-right" />
          ) : (
            <SVGIcon name="chevron-down" />
          )}
        </span>
      </div>
      {!isCollapsed && (
        <div style={{ padding: "8px", borderTop: "1px solid #ccc" }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default CollapsibleItem
