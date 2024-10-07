import React from 'react'
import { Circle, Square, Triangle, Minus } from 'lucide-react'
import { ShapeType } from '../types'

interface ShapeSelectorProps {
  onSelectShape: (shapeType: ShapeType) => void
}

const ShapeSelector: React.FC<ShapeSelectorProps> = ({ onSelectShape }) => {
  return (
    <div className="flex space-x-2">
      <button onClick={() => onSelectShape('circle')} className="p-2 bg-gray-200 rounded">
        <Circle size={20} />
      </button>
      <button onClick={() => onSelectShape('square')} className="p-2 bg-gray-200 rounded">
        <Square size={20} />
      </button>
      <button onClick={() => onSelectShape('triangle')} className="p-2 bg-gray-200 rounded">
        <Triangle size={20} />
      </button>
      <button onClick={() => onSelectShape('line')} className="p-2 bg-gray-200 rounded">
        <Minus size={20} />
      </button>
    </div>
  )
}

export default ShapeSelector