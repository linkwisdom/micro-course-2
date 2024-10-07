import React from 'react'

interface CircleProps {
  size: number
  color?: string
}

const Circle: React.FC<CircleProps> = ({ size, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill={color} />
  </svg>
)

export default Circle