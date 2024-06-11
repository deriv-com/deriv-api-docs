import { ApplicationObject } from '@deriv/api-types';
import useGetApps from '@site/src/features/dashboard/hooks/useGetApp';
import useAuthContext from '@site/src/hooks/useAuthContext';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AppManagerContext, TAppManagerContext, TDashboardTab } from './app-manager.context';

type TAppManagerContextProps = {
  children: React.ReactNode;
};

const AppManagerContextProvider = ({ children }: TAppManagerContextProps) => {
  const [apps, setApps] = useState<ApplicationObject[]>([]);
  const [currentTab, setCurrentTab] = useState<TDashboardTab>(TDashboardTab.MANAGE_APPS);
  const [is_dashboard, setIsDashboard] = useState(false);
  const [app_register_modal_open, setAppRegisterModalOpen] = useState(false);
  const [current_updating_item, setCurrentUpdateItem] = useState({});
  const { getAllApps, apps: updatedApps } = useGetApps();
  const { is_authorized } = useAuthContext();

  const getApps = useCallback(() => {
    if (is_authorized) {
      getAllApps();
    }
  }, [getAllApps, is_authorized]);

  const updateCurrentTab = useCallback((updatedTab: TDashboardTab) => {
    setCurrentTab(updatedTab);
  }, []);

  const handleCurrentUpdatingItem = useCallback((item: ApplicationObject) => {
    setCurrentUpdateItem(item);
  }, []);

  useEffect(() => {
    setApps(updatedApps);
  }, [updatedApps]);

  const context_object: TAppManagerContext = useMemo(() => {
    return {
      apps,
      getApps,
      currentTab,
      updateCurrentTab,
      setIsDashboard,
      is_dashboard,
      setAppRegisterModalOpen,
      app_register_modal_open,
      handleCurrentUpdatingItem,
      current_updating_item,
    };
  }, [
    apps,
    currentTab,
    getApps,
    updateCurrentTab,
    setIsDashboard,
    is_dashboard,
    app_register_modal_open,
    setAppRegisterModalOpen,
    handleCurrentUpdatingItem,
    current_updating_item,
  ]);

  return <AppManagerContext.Provider value={context_object}>{children}</AppManagerContext.Provider>;
};

export default AppManagerContextProvider;
