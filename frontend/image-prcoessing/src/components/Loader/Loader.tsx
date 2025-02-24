// src/components/Loader.tsx
import React from 'react';
import './Loader.css';

interface LoaderProps {
  fileName: string;
  progress: number;
}

const Loader: React.FC<LoaderProps> = ({ fileName, progress }) => {
  return (
    <div className="loader-container">
      <div className="loader-header">
        <span>Your Image</span>
      </div>
      <div className="loader-content">
        <div className="file-info">
          <img src="/path/to/your/image/icon.png" alt="File Icon" className="file-icon" />
          <span className="file-name">{fileName}</span>
        </div>
        <div className="progress-bar-container">
          <progress value={progress} max="100" className="progress-bar"></progress>
          <span className="progress-text">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;