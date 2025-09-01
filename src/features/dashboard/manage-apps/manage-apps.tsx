import React from 'react';
import useAppManager from '@site/src/hooks/useAppManager';
import AppManagePage from './app-manage-page';
import TokenManagePage from '../manage-tokens/token-manage-page';
import CustomTabs from '@site/src/components/custom-tabs';
import './manage-apps.scss';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import { translate } from '@docusaurus/Translate';

const AppManagement = () => {
  const { apps, currentTab } = useAppManager();

  const tabs = [
    {
      label: translate({ message: 'Applications' }),
      content: <AppManagePage apps={apps} />,
    },
    {
      label: translate({ message: 'API tokens' }),
      content: <TokenManagePage />,
    },
  ];

  return (
    <div className='manage_apps'>
      <CustomTabs
        tabs={tabs}
        defaultActiveTab={currentTab === TDashboardTab.MANAGE_APPS ? 0 : 1} />
    </div>
  );
};

export default AppManagement;
