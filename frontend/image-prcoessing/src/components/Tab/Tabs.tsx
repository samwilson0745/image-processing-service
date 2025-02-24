// src/components/Tabs.tsx
import React from 'react';

interface Tab {
  label: string;
  icon: string;
  onClick: () => void;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab }) => {
  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <button 
          key={index} 
          className={`tab ${activeTab === index ? 'active' : ''}`}
          onClick={tab.onClick}
        >
          <span className={`icon-${tab.icon}`}></span> {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;