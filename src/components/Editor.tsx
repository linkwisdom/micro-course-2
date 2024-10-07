import React, { useState, useRef, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { Slide, Element, ShapeType } from '../types'
import Circle from './shapes/Circle'
import Square from './shapes/Square'
import Triangle from './shapes/Triangle'
import Line from './shapes/Line'
import Arrow from './shapes/Arrow'
import FontStyleSelector from './FontStyleSelector'
import ShapeStyleSelector from './ShapeStyleSelector'

interface EditorProps {
  slide: Slide
  updateSlide: (updatedSlide: Slide) => void
}

const Editor: React.FC<EditorProps> = ({ slide, updateSlide }) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  const updateElement = (updatedElement: Element) => {
    const updatedElements = slide.elements.map((el) =>
      el.id === updatedElement.id ? updatedElement : el
    )
    updateSlide({ ...slide, elements: updatedElements })
  }

  const handleEditorClick = () => {
    setSelectedElement(null)
  }

  const renderShape = (element: Element) => {
    const { shapeType, size, color, borderSize, borderColor, position } = element
    const shapeSize = Math.min(size.width, size.height)

    switch (shapeType) {
      case 'circle':
        return <Circle size={shapeSize} color={color} borderSize={borderSize} borderColor={borderColor} />
      case 'square':
        return <Square size={shapeSize} color={color} borderSize={borderSize} borderColor={borderColor} />
      case 'triangle':
        return <Triangle size={shapeSize} color={color} borderSize={borderSize} borderColor={borderColor} />
      case 'line':
        return <Line size={shapeSize} color={color} borderSize={borderSize} borderColor={borderColor} />
      case 'arrow':
        return <Arrow start={position} end={{ x: position.x + size.width, y: position.y + size.height }} color={color || '#000000'} />
      default:
        return null
    }
  }

  return (
    <div 
      className="w-full h-full bg-white shadow-lg rounded-lg relative" 
      style={{ width: '1024px', height: '576px' }}
      ref={editorRef}
      onClick={handleEditorClick}
    >
      {slide.elements.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0)).map((element) => (
        <Rnd
          key={element.id}
          size={{ width: element.size.width, height: element.size.height }}
          position={{ x: element.position.x, y: element.position.y }}
          onDragStop={(e, d) => {
            updateElement({ ...element, position: { x: d.x, y: d.y } })
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            updateElement({
              ...element,
              position,
              size: { 
                width: parseInt(ref.style.width), 
                height: parseInt(ref.style.height) 
              },
            })
          }}
          style={{ 
            transform: `rotate(${element.rotation}deg)`,
            border: selectedElement === element.id ? '2px solid blue' : 'none',
            zIndex: element.zIndex || 0,
          }}
          onMouseDown={(e) => {
            e.stopPropagation()
            setSelectedElement(element.id)
          }}
          enableResizing={{
            top: true, right: true, bottom: true, left: true,
            topRight: true, topLeft: true, bottomRight: true, bottomLeft: true
          }}
          dragHandleClassName="drag-handle"
        >
          <div className="w-full h-full drag-handle">
            {element.type === 'text' && (
              <div
                style={{
                  fontSize: `${element.fontSize}px`,
                  fontFamily: element.fontFamily,
                  color: element.color,
                  lineHeight: `${element.lineHeight}`,
                  fontWeight: element.isBold ? 'bold' : 'normal',
                  fontStyle: element.isItalic ? 'italic' : 'normal',
                }}
              >
                {element.content}
              </div>
            )}
            {element.type === 'image' && <img src={element.content} alt="" className="w-full h-full object-contain" />}
            {element.type === 'shape' && element.shapeType && (
              <div className="w-full h-full flex items-center justify-center">
                {renderShape(element)}
              </div>
            )}
          </div>
        </Rnd>
      ))}
      {selectedElement && (
        <div className="absolute top-0 left-0 right-0">
          {slide.elements.find(el => el.id === selectedElement)?.type === 'text' ? (
            <FontStyleSelector
              fontSize={slide.elements.find(el => el.id === selectedElement)?.fontSize || 16}
              fontColor={slide.elements.find(el => el.id === selectedElement)?.color || '#000000'}
              fontFamily={slide.elements.find(el => el.id === selectedElement)?.fontFamily || 'Arial'}
              lineHeight={slide.elements.find(el => el.id === selectedElement)?.lineHeight || 1.2}
              isBold={slide.elements.find(el => el.id === selectedElement)?.isBold || false}
              isItalic={slide.elements.find(el => el.id === selectedElement)?.isItalic || false}
              zIndex={slide.elements.find(el => el.id === selectedElement)?.zIndex || 0}
              onFontSizeChange={(size) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, fontSize: size })}
              onFontColorChange={(color) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, color: color })}
              onFontFamilyChange={(family) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, fontFamily: family })}
              onLineHeightChange={(height) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, lineHeight: height })}
              onBoldToggle={() => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, isBold: !slide.elements.find(el => el.id === selectedElement)?.isBold })}
              onItalicToggle={() => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, isItalic: !slide.elements.find(el => el.id === selectedElement)?.isItalic })}
              onZIndexChange={(zIndex) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, zIndex: zIndex })}
            />
          ) : (
            <ShapeStyleSelector
              width={slide.elements.find(el => el.id === selectedElement)?.size.width || 100}
              height={slide.elements.find(el => el.id === selectedElement)?.size.height || 100}
              x={slide.elements.find(el => el.id === selectedElement)?.position.x || 0}
              y={slide.elements.find(el => el.id === selectedElement)?.position.y || 0}
              rotation={slide.elements.find(el => el.id === selectedElement)?.rotation || 0}
              fillColor={slide.elements.find(el => el.id === selectedElement)?.color || '#000000'}
              borderSize={slide.elements.find(el => el.id === selectedElement)?.borderSize || 0}
              borderColor={slide.elements.find(el => el.id === selectedElement)?.borderColor || '#000000'}
              zIndex={slide.elements.find(el => el.id === selectedElement)?.zIndex || 0}
              onWidthChange={(width) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, size: { ...slide.elements.find(el => el.id === selectedElement)!.size, width } })}
              onHeightChange={(height) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, size: { ...slide.elements.find(el => el.id === selectedElement)!.size, height } })}
              onPositionChange={(x, y) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, position: { x, y } })}
              onRotationChange={(rotation) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, rotation })}
              onFillColorChange={(color) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, color })}
              onBorderSizeChange={(size) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, borderSize: size })}
              onBorderColorChange={(color) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, borderColor: color })}
              onZIndexChange={(zIndex) => updateElement({ ...slide.elements.find(el => el.id === selectedElement)!, zIndex })}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Editor