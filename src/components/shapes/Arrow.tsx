import React from 'react'

interface ArrowProps {
  start: { x: number; y: number } | null
  end: { x: number; y: number }
  color: string
}

const Arrow: React.FC<ArrowProps> = ({ start, end, color }) => {
  if (!start) return null; // Return null if start is null

  const dx = end.x - start.x
  const dy = end.y - start.y
  const angle = Math.atan2(dy, dx)
  const length = Math.sqrt(dx * dx + dy * dy)

  const arrowHeadSize = 10
  const arrowHeadAngle = Math.PI / 6

  return (
    <svg
      width={Math.abs(dx) + 2 * arrowHeadSize}
      height={Math.abs(dy) + 2 * arrowHeadSize}
      style={{
        position: 'absolute',
        left: Math.min(start.x, end.x) - arrowHeadSize,
        top: Math.min(start.y, end.y) - arrowHeadSize,
      }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth={arrowHeadSize}
          markerHeight={arrowHeadSize}
          refX={arrowHeadSize}
          refY={arrowHeadSize / 2}
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d={`M0,0 L${arrowHeadSize},${arrowHeadSize / 2} L0,${arrowHeadSize} Z`}
            fill={color}
          />
        </marker>
      </defs>
      <line
        x1={arrowHeadSize + (start.x < end.x ? 0 : Math.abs(dx))}
        y1={arrowHeadSize + (start.y < end.y ? 0 : Math.abs(dy))}
        x2={arrowHeadSize + (start.x < end.x ? Math.abs(dx) : 0)}
        y2={arrowHeadSize + (start.y < end.y ? Math.abs(dy) : 0)}
        stroke={color}
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  )
}

export default Arrow