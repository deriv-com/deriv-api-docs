import React, { useCallback, useEffect, useState } from 'react';
import DashboardContainer from '../components/dashboard-container';
import AppRegister from '../components/app-register';
import { Breadcrumbs } from '@deriv-com/quill-ui';
import useAppManager from '@site/src/hooks/useAppManager';
import useApiToken from '@site/src/hooks/useApiToken';
import Spinner from '@site/src/components/Spinner';
import useWS from '@site/src/hooks/useWs';
import RegisterAppDialogError from '../components/dialogs/register-app-dialog-error';
import AppRegisterSuccessModal from '../components/app-register-success-modal';
import AppManagement from '../manage-apps';
import './manage-dashboard.scss';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import UpdateApp from '../update-app';
import { ApplicationObject } from '@deriv/api-types';
import TokenRegister from '../components/token-register';

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
      <div className='dashboard-spinner'>
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
    { content: 'Home', href: '/', target: '_self' },
    { content: 'Dashboard', href: '/dashboard', target: '_self' },
  ];

  const tabSecndryLinks = {
    [TDashboardTab.REGISTER_APP]: {
      content: 'Register application',
      href: '/dashboard',
      target: '_self',
    },
    [TDashboardTab.UPDATE_APP]: {
      content: 'Edit application',
      href: '/dashboard',
      target: '_self',
    },
    [TDashboardTab.REGISTER_TOKENS]: {
      content: 'Create token',
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
      <div className='breadcrumbs-wrapper'>
        <Breadcrumbs links={breadcrumbsLinks} size='md' />
      </div>
      <DashboardContainer>{renderScreen()}</DashboardContainer>
    </React.Fragment>
  );
};

const MemoizedManageDashboard = React.memo(ManageDashboard);

export default MemoizedManageDashboard;
