import useAppManager from '@site/src/hooks/useAppManager';
import React, { useEffect } from 'react';
import AppManagePage from './app-manage-page';
import TokenManagePage from '../manage-tokens/token-manage-page';
import CustomTabs from '@site/src/components/CustomTabs';
import useApiToken from '@site/src/hooks/useApiToken';
import './manage-apps.scss';

const AppManagement = () => {
  const { getApps, apps } = useAppManager();
  const { tokens } = useApiToken();

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
      content: <TokenManagePage tokens={tokens} />,
    },
  ];

  return (
    <div className='manage_apps'>
      <CustomTabs tabs={tabs} />
    </div>
  );
};

export default AppManagement;
