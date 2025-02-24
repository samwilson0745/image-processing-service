// src/components/ImageEditorLayout.tsx

import React, { useEffect, useRef, useState } from 'react';
import './EditScreen.css';
import Canvas from '../../components/Canvas/Canvas';
import MainTab from '../../components/Tab/Main';

const ImageEditorLayout: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [width, setWidth] = useState<number>(500)
  const [height, setHeight] = useState<number>(500)
  const [imageDimensions, setImageDimensions] = useState({width:500,height:500})
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="image-editor-layout" style={{ height: dimensions.height, width: dimensions.width }}>
      <div className="tabs">tabs</div>
      <div className="main-content">
        <div className="actions">
            <MainTab onResize={(width,height)=>{
              setImageDimensions({
                width,
                height
              })
            }} onCrop={()=>{}}/>
        </div>
        <div className="image-section">
            <Canvas/>
        </div>
      </div>
      <div className="free-space">
        free space
        <button className="upload-button">⬆️</button>
      </div>
    </div>
  );
};

export default ImageEditorLayout;