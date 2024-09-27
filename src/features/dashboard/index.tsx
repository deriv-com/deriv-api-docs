import React, { useEffect } from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useAppManager from '@site/src/hooks/useAppManager';
import MemoizedManageDashboard from './manage-dashboard';
import { Login } from '../Login/Login';

export const AppManager = () => {
  const { is_logged_in } = useAuthContext();
  const { setIsDashboard } = useAppManager();

  useEffect(() => {
    setIsDashboard(true);
    return () => {
      setIsDashboard(false);
    };
  }, [setIsDashboard]);

  if (is_logged_in) return <MemoizedManageDashboard />;
  return <Login />;
};
