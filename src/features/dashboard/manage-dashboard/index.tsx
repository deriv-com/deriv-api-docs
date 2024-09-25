import React, { useCallback, useEffect, useState } from 'react';
import { translate } from '@docusaurus/Translate';
import { ApplicationObject } from '@deriv/api-types';
import { Breadcrumbs } from '@deriv-com/quill-ui';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import useAppManager from '@site/src/hooks/useAppManager';
import useApiToken from '@site/src/hooks/useApiToken';
import Spinner from '@site/src/components/Spinner';
import useWS from '@site/src/hooks/useWs';
import { RegisterAppDialogError } from '../components/Dialogs/RegisterAppDialogError';
import { AppRegisterSuccessModal } from '../components/Modals/AppRegisterSuccessModal';
import AppDashboardContainer from '../components/AppDashboardContainer';
import AppRegister from '../components/AppRegister';
import TokenRegister from '../components/TokenRegister';
import AppManagement from '../manage-apps';
import UpdateApp from '../update-app';
import './manage-dashboard.scss';

const ManageDashboard = () => {
  const {
    apps,
    getApps,
    setAppRegisterModalOpen,
    currentTab,
    updateCurrentTab,
    handleCurrentUpdatingItem,
  } = useAppManager();
  const { tokens } = useApiToken();
  const { send: registerApp, error, clear, data, is_loading } = useWS('app_register');
  const [created_app_data, setCreatedAppData] = useState({});

  useEffect(() => {
    if (!is_loading && data?.name && !error) {
      setAppRegisterModalOpen(true);
      setCreatedAppData(data);
      clear();
      getApps();
    }
  }, [data, clear, error, setAppRegisterModalOpen, is_loading, getApps]);

  useEffect(() => {
    getApps();
  }, [getApps]);

  useEffect(() => {
    if (!apps?.length) {
      updateCurrentTab(TDashboardTab.REGISTER_APP);
    } else {
      updateCurrentTab(TDashboardTab.MANAGE_APPS);
    }
  }, [apps, updateCurrentTab]);

  const submit = useCallback(
    (data) => {
      const { name } = data;
      registerApp({
        name,
        scopes: [],
      });
    },
    [registerApp],
  );

  if (!apps || is_loading || !tokens)
    return (
      <div className='manage_dashboard__spinner'>
        <Spinner />
      </div>
    );

  const renderScreen = () => {
    switch (currentTab) {
      case TDashboardTab.REGISTER_APP:
        return <AppRegister submit={submit} />;
      case TDashboardTab.MANAGE_APPS:
        return <AppManagement />;
      case TDashboardTab.UPDATE_APP:
        return <UpdateApp />;
      case TDashboardTab.MANAGE_TOKENS:
        return <AppManagement />;
      case TDashboardTab.REGISTER_TOKENS:
        return <TokenRegister />;
      default:
        return <AppRegister submit={submit} />;
    }
  };

  const handleAppConfigure = () => {
    setAppRegisterModalOpen(false);
    handleCurrentUpdatingItem(created_app_data as ApplicationObject);
    updateCurrentTab(TDashboardTab.UPDATE_APP);
  };

  const commonLinks = [
    { content: translate({ message: 'Home' }), href: '/', target: '_self' },
    { content: translate({ message: 'Dashboard' }), href: '/dashboard', target: '_self' },
  ];

  const tabSecndryLinks = {
    [TDashboardTab.REGISTER_APP]: {
      content: translate({ message: 'Register application' }),
      href: '/dashboard',
      target: '_self',
    },
    [TDashboardTab.UPDATE_APP]: {
      content: translate({ message: 'Edit application' }),
      href: '/dashboard',
      target: '_self',
    },
    [TDashboardTab.REGISTER_TOKENS]: {
      content: translate({ message: 'Create token' }),
      href: '/dashboard',
      target: '_self',
    },
  };

  const breadcrumbsLinks = [...commonLinks, tabSecndryLinks[currentTab]].filter(Boolean);

  return (
    <React.Fragment>
      {error && <RegisterAppDialogError error={error} onClose={clear} />}
      <AppRegisterSuccessModal
        onCancel={() => setAppRegisterModalOpen(false)}
        onConfigure={handleAppConfigure}
      />
      <div className='breadcrumbs'>
        <Breadcrumbs links={breadcrumbsLinks} size='md' />
      </div>
      <AppDashboardContainer>{renderScreen()}</AppDashboardContainer>
    </React.Fragment>
  );
};

const MemoizedManageDashboard = React.memo(ManageDashboard);

export default MemoizedManageDashboard;
