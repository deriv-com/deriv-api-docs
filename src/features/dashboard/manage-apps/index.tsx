import useAppManager from '@site/src/hooks/useAppManager';
import React, { useEffect } from 'react';
import AppManagePage from './app-manage-page';
import TokenManagePage from '../manage-tokens/token-manage-page';
import CustomTabs from '@site/src/components/CustomTabs';
import './manage-apps.scss';

const AppManagement = () => {
  const { getApps, apps } = useAppManager();

  useEffect(() => {
    getApps();
  }, [getApps]);

  const tabs = [
    {
      label: 'Applications',
      content: <AppManagePage apps={apps} />,
    },
    {
      label: 'API tokens',
      content: <TokenManagePage />,
    },
  ];

  return (
    <div className='manage_apps'>
      <CustomTabs tabs={tabs} />
    </div>
  );
};

export default AppManagement;
