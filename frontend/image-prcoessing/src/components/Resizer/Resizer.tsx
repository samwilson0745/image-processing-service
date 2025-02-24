import React, { useState } from 'react';
import './ImageResizer.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

const ImageResizer: React.FC = () => {
  const [width, setWidth] = useState<number>(1024);
  const [height, setHeight] = useState<number>(1024);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(false);
  const [targetFileSize, setTargetFileSize] = useState<string>('');
  const imageUrl = useSelector((state: RootState)=>state.imageUrl.url)
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
    if (lockAspectRatio) {
      setHeight(Math.round((Number(e.target.value) / 1024) * 1024));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
    if (lockAspectRatio) {
      setWidth(Math.round((Number(e.target.value) / 1024) * 1024));
    }
  };

  const handleLockAspectRatioChange = () => {
    setLockAspectRatio(!lockAspectRatio);
  };

  const handleTargetFileSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetFileSize(e.target.value);
  };

  const handleResizeImage = () => {
    // Here you would implement the logic to resize the image
    console.log('Resizing image to', width, 'x', height, 'with target file size:', targetFileSize);
  };

  return (
    <div className="image-resizer">
    <div className="sidebar">
      <h3>Resize Settings</h3>
      <div className="resize-mode">
        <button>By Dimensions</button>
        <button>As Percentage</button>
      </div>
      <div className="dimensions">
        <label>
          Width
          <input type="number" value={width} onChange={handleWidthChange} />
        </label>
        <label>
          Height
          <input type="number" value={height} onChange={handleHeightChange} />
        </label>
        <span>px</span>
      </div>
      <label>
        <input type="checkbox" checked={lockAspectRatio} onChange={handleLockAspectRatioChange} />
        Lock Aspect Ratio
      </label>
      <h3>Export Settings</h3>
      <div className="export-settings">
        <label>
          Target File Size (optional)
          <input type="number" value={targetFileSize} onChange={handleTargetFileSizeChange} />
        </label>
        <span>KB</span>
      </div>
      <button onClick={handleResizeImage}>Resize Image</button>
    </div>
    <div className="main-content">
      <img src={imageUrl!} alt="Image to be resized" />
    </div>
  </div>
  )
};

export default ImageResizer;