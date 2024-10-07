import React from 'react'

interface LineProps {
  size: number
  color?: string
}

const Line: React.FC<LineProps> = ({ size, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <line x1="0" y1="0" x2="100" y2="100" stroke={color} strokeWidth="4" />
  </svg>
)

export default Line