// src/App.tsx
import React, { useState } from 'react';
import Tabs from './Tabs';
import FlipAndRotate from '../FlipAndRotate/FlipAndRotate';
import Resize from '../Resize/Resize';
import Crop from '../Crop/Crop';
import { toast } from 'react-toastify';
interface TabProps{
  onResize: (width: number, height: number)=>void,
  onCrop: (width: number, height: number, aspectRatio: string, positionX: number, positionY: number) => void,
}
const MainTab: React.FC<TabProps> = ({ onResize, onCrop }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };
  const handleResize = (width: number,height: number)=>{
    onResize(width,height)
  }
  const tabs = [
    { label: 'Resize', icon: 'resize', onClick: () => handleTabChange(0) },
    { label: 'Crop', icon: 'crop', onClick: () => handleTabChange(1) },
    { label: 'Flip & Rotate', icon: 'flip-rotate', onClick: () => handleTabChange(2) },
  ];

  return (
    <div className="app">
      <Tabs tabs={tabs} activeTab={activeTab} />
      {activeTab === 0 && <Resize onResize={(width, height)=>{
        console.log(width,height)
      }} />}
      {activeTab === 1 && <Crop onCrop={() => {}} onReset={() => {}} onDownload={() => {}} />}
      {activeTab === 2 && <FlipAndRotate 
        onFlipHorizontal={() => {}} 
        onFlipVertical={() => {}} 
        onRotateClockwise={() => {}} 
        onRotateCounterClockwise={() => {}} 
        onDownload={() => {}} 
      />}
    </div>
  );
};

export default MainTab;