import React from 'react';

interface ShapeStyleSelectorProps {
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  fillColor: string;
  borderSize: number;
  borderColor: string;
  zIndex: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onPositionChange: (x: number, y: number) => void;
  onRotationChange: (rotation: number) => void;
  onFillColorChange: (color: string) => void;
  onBorderSizeChange: (size: number) => void;
  onBorderColorChange: (color: string) => void;
  onZIndexChange: (zIndex: number) => void;
}

const ShapeStyleSelector: React.FC<ShapeStyleSelectorProps> = ({
  width,
  height,
  x,
  y,
  rotation,
  fillColor,
  borderSize,
  borderColor,
  zIndex,
  onWidthChange,
  onHeightChange,
  onPositionChange,
  onRotationChange,
  onFillColorChange,
  onBorderSizeChange,
  onBorderColorChange,
  onZIndexChange,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex items-center space-x-4">
      <div>
        <label>Width:</label>
        <input
          type="number"
          value={width}
          onChange={(e) => onWidthChange(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="number"
          value={height}
          onChange={(e) => onHeightChange(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <div>
        <label>X:</label>
        <input
          type="number"
          value={x}
          onChange={(e) => onPositionChange(Number(e.target.value), y)}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <div>
        <label>Y:</label>
        <input
          type="number"
          value={y}
          onChange={(e) => onPositionChange(x, Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <div>
        <label>Rotation:</label>
        <input
          type="number"
          value={rotation}
          onChange={(e) => onRotationChange(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <div>
        <label>Fill Color:</label>
        <input
          type="color"
          value={fillColor}
          onChange={(e) => onFillColorChange(e.target.value)}
          className="w-8 h-8"
        />
      </div>
      <div>
        <label>Border Size:</label>
        <input
          type="number"
          value={borderSize}
          onChange={(e) => onBorderSizeChange(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <div>
        <label>Border Color:</label>
        <input
          type="color"
          value={borderColor}
          onChange={(e) => onBorderColorChange(e.target.value)}
          className="w-8 h-8"
        />
      </div>
      <div>
        <label>Z-Index:</label>
        <input
          type="number"
          value={zIndex}
          onChange={(e) => onZIndexChange(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
    </div>
  );
};

export default ShapeStyleSelector;