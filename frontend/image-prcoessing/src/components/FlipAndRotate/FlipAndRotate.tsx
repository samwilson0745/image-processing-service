// src/components/FlipAndRotate.tsx
import React from 'react';

interface FlipAndRotateProps {
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onRotateClockwise: () => void;
  onRotateCounterClockwise: () => void;
  onDownload: () => void;
}

const FlipAndRotate: React.FC<FlipAndRotateProps> = ({ 
  onFlipHorizontal, 
  onFlipVertical, 
  onRotateClockwise, 
  onRotateCounterClockwise, 
  onDownload 
}) => {
  return (
    <div className="flip-rotate-container">
      <h2>Flip Image</h2>
      <div className="flip-options">
        <button onClick={onFlipHorizontal}><span className="icon-flip-horizontal"></span>Horizontally</button>
        <button onClick={onFlipVertical}><span className="icon-flip-vertical"></span>Vertically</button>
      </div>
      <h2>Rotate Image</h2>
      <div className="rotate-options">
        <button onClick={onRotateClockwise}><span className="icon-rotate-clockwise"></span>Clock-Wise</button>
        <button onClick={onRotateCounterClockwise}><span className="icon-rotate-counterclockwise"></span>Counter Clock Wise</button>
      </div>
      <button className="download-button" onClick={onDownload}>Download Image ➔</button>
    </div>
  );
};

export default FlipAndRotate;