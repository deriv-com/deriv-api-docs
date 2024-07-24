import React, { useCallback, useEffect, useState } from 'react';
import AppDashboardContainer from '../components/AppDashboardContainer';
import AppRegister from '../components/AppRegister';
import useAppManager from '@site/src/hooks/useAppManager';
import useApiToken from '@site/src/hooks/useApiToken';
import Spinner from '@site/src/components/Spinner';
import useWS from '@site/src/hooks/useWs';
import { RegisterAppDialogError } from '../components/Dialogs/RegisterAppDialogError';
import { AppRegisterSuccessModal } from '../components/Modals/AppRegisterSuccessModal';
import AppManagement from '../manage-apps';
import './manage-dashboard.scss';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import UpdateApp from '../update-app';
import { ApplicationObject } from '@deriv/api-types';

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
    if (!apps?.length && !tokens?.length) {
      updateCurrentTab(TDashboardTab.REGISTER_APP);
    } else {
      updateCurrentTab(TDashboardTab.MANAGE_APPS);
    }
  }, [tokens, apps, updateCurrentTab]);

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
      default:
        return <AppRegister submit={submit} />;
    }
  };

  const handleAppConfigure = () => {
    setAppRegisterModalOpen(false);
    handleCurrentUpdatingItem(created_app_data as ApplicationObject);
    updateCurrentTab(TDashboardTab.UPDATE_APP);
  };

  return (
    <React.Fragment>
      {error && <RegisterAppDialogError error={error} onClose={clear} />}
      <AppRegisterSuccessModal
        onCancel={() => setAppRegisterModalOpen(false)}
        onConfigure={handleAppConfigure}
      />
      <AppDashboardContainer>{renderScreen()}</AppDashboardContainer>
    </React.Fragment>
  );
};

const MemoizedManageDashboard = React.memo(ManageDashboard);

export default MemoizedManageDashboard;
