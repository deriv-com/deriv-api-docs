import React from 'react';
import { Heading, Text } from '@deriv-com/quill-ui';
import './app-dashboard-container.scss';
import useAppManager from '@site/src/hooks/useAppManager';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';

const hideHeaderForTabs = [TDashboardTab.UPDATE_APP];

const AppDashboardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTab } = useAppManager();

  return (
    <div className='app_dashboard_container'>
      <div className='app_dashboard_container_main'>
        {!hideHeaderForTabs.includes(currentTab) && (
          <div className='app_dashboard_container_top'>
            <Heading.H2>App Dashboard</Heading.H2>
            <Text size='md'>
              Start using Deriv API to bring custom integrations and powerful automation to your
              apps.
            </Text>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AppDashboardContainer;
