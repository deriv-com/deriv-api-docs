import React from 'react';
import { Heading, Text } from '@deriv-com/quill-ui';
import Translate from '@docusaurus/Translate';
import useAppManager from '@site/src/hooks/useAppManager';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import CtaBanner from '../cta-banner';
import './dashboard-container.scss';

const hideHeaderForTabs = [TDashboardTab.UPDATE_APP, TDashboardTab.REGISTER_TOKENS];

const DashboardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTab } = useAppManager();

  return (
    <div className='app-dashboard-container'>
      <div className='app-dashboard-container__main'>
        {!hideHeaderForTabs.includes(currentTab) && (
          <div className='app-dashboard-container__top'>
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
      <CtaBanner />
    </div>
  );
};

export default DashboardContainer;
