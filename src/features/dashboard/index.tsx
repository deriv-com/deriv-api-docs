import React, { useEffect } from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
// import DashboardTabs from './components/Tabs';
import useAppManager from '@site/src/hooks/useAppManager';
import MemoizedManageDashboard from './manage-dashboard';
import { Login } from '../Auth/Login/Login';

export const AppManager = () => {
  const { is_logged_in } = useAuthContext();
  const { setIsDashboard } = useAppManager();

  useEffect(() => {
    setIsDashboard(true);
    return () => {
      setIsDashboard(false);
    };
  }, [setIsDashboard]);

  return <React.Fragment>{is_logged_in ? <MemoizedManageDashboard /> : <Login />}</React.Fragment>;
};
