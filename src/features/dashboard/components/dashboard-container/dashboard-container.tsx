import React from 'react';
import { Heading, Text } from '@deriv-com/quill-ui';
import Translate from '@docusaurus/Translate';
import useAppManager from '@site/src/hooks/useAppManager';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import './dashboard-container.scss';
import CtaBanner from '../cta-banner';
import useAuthContext from '@site/src/hooks/useAuthContext';

const hideHeaderForTabs = [TDashboardTab.UPDATE_APP, TDashboardTab.REGISTER_TOKENS];

const DashboardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTab } = useAppManager();
  const { userAccounts } = useAuthContext();
  const isRealAccountAvailable = userAccounts?.some((account) => account.is_virtual === 0);

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
      {(currentTab === TDashboardTab.MANAGE_APPS || currentTab === TDashboardTab.MANAGE_TOKENS) &&
        !isRealAccountAvailable && <CtaBanner />}
    </div>
  );
};

export default DashboardContainer;
