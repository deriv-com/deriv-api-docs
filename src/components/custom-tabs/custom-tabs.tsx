import React, { useState } from 'react';
import './custom-tabs.scss';

const CustomTabs: React.FC<{
  defaultActiveTab?: number;
  tabs: Array<{
    label: string;
    content: React.ReactNode;
  }>;
}> = ({ tabs, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || 0);

  return (
    <div className='tabs'>
      <div className='tabs_header'>
        <div className='tabs_header__items'>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tabs_header__item ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>
      <div className='tabs__content'>{tabs[activeTab].content}</div>
    </div>
  );
};

export default CustomTabs;
