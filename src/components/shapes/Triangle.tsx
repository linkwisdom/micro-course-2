import React from 'react'

interface TriangleProps {
  size: number
  color?: string
}

const Triangle: React.FC<TriangleProps> = ({ size, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <polygon points="50,0 100,100 0,100" fill={color} />
  </svg>
)

export default Triangle