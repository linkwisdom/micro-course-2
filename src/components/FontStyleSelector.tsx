import React from 'react';

interface FontStyleSelectorProps {
  fontSize: number;
  fontColor: string;
  fontFamily: string;
  lineHeight: number;
  isBold: boolean;
  isItalic: boolean;
  zIndex: number;
  onFontSizeChange: (size: number) => void;
  onFontColorChange: (color: string) => void;
  onFontFamilyChange: (family: string) => void;
  onLineHeightChange: (height: number) => void;
  onBoldToggle: () => void;
  onItalicToggle: () => void;
  onZIndexChange: (zIndex: number) => void;
}

const FontStyleSelector: React.FC<FontStyleSelectorProps> = ({
  fontSize,
  fontColor,
  fontFamily,
  lineHeight,
  isBold,
  isItalic,
  zIndex,
  onFontSizeChange,
  onFontColorChange,
  onFontFamilyChange,
  onLineHeightChange,
  onBoldToggle,
  onItalicToggle,
  onZIndexChange,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex items-center space-x-4">
      <select
        value={fontFamily}
        onChange={(e) => onFontFamilyChange(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </select>
      <input
        type="number"
        value={fontSize}
        onChange={(e) => onFontSizeChange(Number(e.target.value))}
        className="border rounded px-2 py-1 w-16"
      />
      <input
        type="color"
        value={fontColor}
        onChange={(e) => onFontColorChange(e.target.value)}
        className="w-8 h-8"
      />
      <input
        type="number"
        value={lineHeight}
        onChange={(e) => onLineHeightChange(Number(e.target.value))}
        className="border rounded px-2 py-1 w-16"
        step="0.1"
      />
      <button
        onClick={onBoldToggle}
        className={`px-2 py-1 rounded ${isBold ? 'bg-gray-300' : 'bg-gray-100'}`}
      >
        B
      </button>
      <button
        onClick={onItalicToggle}
        className={`px-2 py-1 rounded ${isItalic ? 'bg-gray-300' : 'bg-gray-100'}`}
      >
        I
      </button>
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

export default FontStyleSelector;