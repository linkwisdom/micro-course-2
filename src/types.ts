export type ElementType = 'text' | 'image' | 'shape'
export type ShapeType = 'circle' | 'square' | 'triangle' | 'line' | 'arrow'

export interface Element {
  id: string
  type: ElementType
  content: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
  shapeType?: ShapeType
  fontSize?: number
  color?: string
  fontFamily?: string
  lineHeight?: number
  isBold?: boolean
  isItalic?: boolean
  borderSize?: number
  borderColor?: string
  zIndex: number
}

export interface Slide {
  id: string
  elements: Element[]
}