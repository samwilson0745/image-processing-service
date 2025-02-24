// src/components/Crop.tsx
import React, { useState } from 'react';

interface CropProps {
  onCrop: (width: number, height: number, aspectRatio: string, positionX: number, positionY: number) => void;
  onReset: () => void;
  onDownload: () => void;
}

const Crop: React.FC<CropProps> = ({ onCrop, onReset, onDownload }) => {
  const [width, setWidth] = useState<number>(819);
  const [height, setHeight] = useState<number>(819);
  const [aspectRatio, setAspectRatio] = useState<string>('FreeForm');
  const [positionX, setPositionX] = useState<number>(102);
  const [positionY, setPositionY] = useState<number>(102);

  const handleCrop = () => {
    onCrop(width, height, aspectRatio, positionX, positionY);
  };

  return (
    <div className="crop-container">
      <h2>Crop Rectangle</h2>
      <div className="dimensions">
        <label>
          Width
          <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </label>
        <label>
          Height
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </label>
      </div>
      <label>
        Aspect Ratio
        <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
          <option value="FreeForm">FreeForm</option>
          <option value="16:9">16:9</option>
          <option value="4:3">4:3</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <h2>Crop Position</h2>
      <div className="dimensions">
        <label>
          Position (X)
          <input type="number" value={positionX} onChange={(e) => setPositionX(Number(e.target.value))} />
        </label>
        <label>
          Position (Y)
          <input type="number" value={positionY} onChange={(e) => setPositionY(Number(e.target.value))} />
        </label>
      </div>
      <div className="crop-actions">
        <button onClick={handleCrop}>Crop</button>
        <button onClick={onReset}>Reset</button>
      </div>
      <button className="download-button" onClick={onDownload}>Download Image ➔</button>
    </div>
  );
};

export default Crop;