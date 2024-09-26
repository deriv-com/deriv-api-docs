import React from 'react';
import { Heading, Text } from '@deriv-com/quill-ui';
import './dashboard-container.scss';
import useAppManager from '@site/src/hooks/useAppManager';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';

const hideHeaderForTabs = [TDashboardTab.UPDATE_APP, TDashboardTab.REGISTER_TOKENS];

const DashboardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTab } = useAppManager();

  return (
    <div className='app-dashboard-container'>
      <div className='app-dashboard-container__main'>
        {!hideHeaderForTabs.includes(currentTab) && (
          <div className='app-dashboard-container__top'>
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

export default DashboardContainer;
