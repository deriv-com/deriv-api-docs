import React from 'react';
import { Heading, Text } from '@deriv-com/quill-ui';
import Translate from '@docusaurus/Translate';
import useAppManager from '@site/src/hooks/useAppManager';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import './app-dashboard-container.scss';

const hideHeaderForTabs = [TDashboardTab.UPDATE_APP, TDashboardTab.REGISTER_TOKENS];

const AppDashboardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTab } = useAppManager();

  return (
    <div className='app_dashboard_container'>
      <div className='app_dashboard_container_main'>
        {!hideHeaderForTabs.includes(currentTab) && (
          <div className='app_dashboard_container_top'>
            <Heading.H2>
              <Translate>App Dashboard</Translate>
            </Heading.H2>
            <Text size='md'>
              <Translate>
                Start using Deriv API to bring custom integrations and powerful automation to your
                apps.
              </Translate>
            </Text>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AppDashboardContainer;
