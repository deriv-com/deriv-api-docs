import React, { useEffect } from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useAppManager from '@site/src/hooks/useAppManager';
import ManageDashboard from './manage-dashboard';
import { Login } from '../Login/Login';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Fallback } from '../Fallback';
import PermissionDeniedError from './components/permission-denied-error/permission-denied-error';

const Dashboard = () => {
  const { is_logged_in, siteActive } = useAuthContext();
  const { setIsDashboard, is_dashboard_blocked } = useAppManager();

  useEffect(() => {
    setIsDashboard(true);
    return () => {
      setIsDashboard(false);
    };
  }, [setIsDashboard]);

  if (!siteActive) return <Fallback />;

  // Show permission denied error if the flag is set
  if (is_logged_in && is_dashboard_blocked) return <PermissionDeniedError />;

  if (is_logged_in) return <ManageDashboard />;
  return <BrowserOnly>{() => <Login />}</BrowserOnly>;
};

export default Dashboard;
