import React from 'react'

interface SquareProps {
  size: number
  color?: string
}

const Square: React.FC<SquareProps> = ({ size, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect width="100" height="100" fill={color} />
  </svg>
)

export default Square