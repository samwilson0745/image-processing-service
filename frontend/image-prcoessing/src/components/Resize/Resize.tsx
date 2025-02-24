// src/components/Resize.tsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface ResizeProps {
  onResize: (width: number, height: number) => void;
}

const Resize: React.FC<ResizeProps> = ({ onResize }) => {
  const [width, setWidth] = useState<number>(1024);
  const [height, setHeight] = useState<number>(1024);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [targetFileSize, setTargetFileSize] = useState<string>('');

  const handleOnResize =()=>{
    onResize(width,height)
  }
  return (
    <div className="resize-container">
      <h2>Resize Settings</h2>
      <div className="resize-mode">
        <button>By Dimensions</button>
        <button>As Percentage</button>
      </div>
      <div className="dimensions">
        <label>
          Width
          <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </label>
        <label>
          Height
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </label>
        <span>px</span>
      </div>
      <label>
        <input type="checkbox" checked={lockAspectRatio} onChange={() => setLockAspectRatio(!lockAspectRatio)} />
        Lock Aspect Ratio
      </label>
      <h2>Export Settings</h2>
      <div className="export-settings">
        <label>
          Target File Size (optional)
          <input type="text" value={targetFileSize} onChange={(e) => setTargetFileSize(e.target.value)} />
        </label>
        <span>KB</span>
      </div>
      <button className="resize-button" onClick={handleOnResize}>Resize Image ➔</button>
    </div>
  );
};

export default Resize;