import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import DashboardContainer from '../components/dashboard-container';
import AppRegister from '../components/app-register';
import { Breadcrumbs } from '@deriv-com/quill-ui';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import useAppManager from '@site/src/hooks/useAppManager';
import useApiToken from '@site/src/hooks/useApiToken';
import Spinner from '@site/src/components/Spinner';
import useWS from '@site/src/hooks/useWs';
import AppManagement from '../manage-apps';
import UpdateApp from '../update-app';
import TokenRegister from '../components/token-register';
import './manage-dashboard.scss';

const ManageDashboard = () => {
  const { apps, getApps, currentTab, updateCurrentTab } = useAppManager();
  const { tokens } = useApiToken();
  const { is_loading } = useWS('app_register');
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const locale_Links = React.useMemo(() => {
    const is_en = currentLocale === 'en';
    const get_url = (path: string) => {
      const pathInfo = `${!is_en ? `/${currentLocale}` : ''}/${path}`;
      return pathInfo;
    };
    return {
      root: get_url(''),
      dashboard: get_url('dashboard'),
    };
  }, [currentLocale]);

  useEffect(() => {
    getApps();
  }, [getApps]);

  useEffect(() => {
    if (currentTab != TDashboardTab.REGISTER_TOKENS && currentTab != TDashboardTab.UPDATE_APP) {
      if (!apps?.length) {
        updateCurrentTab(TDashboardTab.REGISTER_APP);
      } else {
        updateCurrentTab(TDashboardTab.MANAGE_APPS);
      }
    }
  }, [apps, updateCurrentTab]);

  if (!apps || is_loading || !tokens)
    return (
      <div className='dashboard-spinner'>
        <Spinner />
      </div>
    );

  const renderScreen = () => {
    switch (currentTab) {
      case TDashboardTab.REGISTER_APP:
        return <AppRegister />;
      case TDashboardTab.MANAGE_APPS:
        return <AppManagement />;
      case TDashboardTab.UPDATE_APP:
        return <UpdateApp />;
      case TDashboardTab.REGISTER_TOKENS:
        return <TokenRegister />;
      case TDashboardTab.MANAGE_TOKENS:
        return <AppManagement />;
      default:
        return <AppRegister />;
    }
  };

  const commonLinks = [
    { content: translate({ message: 'Home' }), href: locale_Links.root, target: '_self' },
    { content: translate({ message: 'Dashboard' }), href: locale_Links.dashboard, target: '_self' },
  ];

  const tabSecondaryLinks = {
    [TDashboardTab.REGISTER_APP]: {
      content: translate({ message: 'Register application' }),
      href: locale_Links.dashboard,
      target: '_self',
    },
    [TDashboardTab.UPDATE_APP]: {
      content: translate({ message: 'Edit application' }),
      href: locale_Links.dashboard,
      target: '_self',
    },
    [TDashboardTab.REGISTER_TOKENS]: {
      content: translate({ message: 'Create token' }),
      href: locale_Links.dashboard,
      target: '_self',
    },
  };

  const breadcrumbsLinks = [...commonLinks, tabSecondaryLinks[currentTab]].filter(Boolean);

  return (
    <div className='container'>
      <div className='breadcrumbs-wrapper'>
        <Breadcrumbs links={breadcrumbsLinks} size='md' />
      </div>
      <DashboardContainer>{renderScreen()}</DashboardContainer>
    </div>
  );
};

const MemoizedManageDashboard = React.memo(ManageDashboard);

export default MemoizedManageDashboard;
