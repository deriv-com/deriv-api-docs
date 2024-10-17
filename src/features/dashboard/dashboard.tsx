import React, { useEffect } from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useAppManager from '@site/src/hooks/useAppManager';
import ManageDashboard from './manage-dashboard';
import { Login } from '../Login/Login';
import { getAccountsFromSearchParams } from '@site/src/utils';
import axios from 'axios';

const Dashboard = () => {
  const { is_logged_in, updateLoginAccounts } = useAuthContext();
  const { setIsDashboard } = useAppManager();

  useEffect(() => {
    setIsDashboard(true);
    const exchangeToken = async () => {
      try {
        const urlParams = new URLSearchParams(window?.location?.search);
        const oidc_endpoints = localStorage.getItem('config.oidc_endpoints') || '{}';

        const token_endpoint = JSON.parse(oidc_endpoints).token_endpoint || '';

        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const oidc_key = `oidc.${state}`;

        const oidc_data = localStorage.getItem(oidc_key);
        const code_verifier = oidc_data ? JSON.parse(oidc_data).code_verifier : null;
        const appId = localStorage.getItem('config.app_id');

        if (!code_verifier) return;

        const response = await fetch(token_endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            redirect_uri: `${window.location.origin}/dashboard`,
            code: code,
            code_verifier: code_verifier,
            client_id: appId,
          }).toString(),
        });

        const data = await response.json();
        if (response.ok) {
          // Handle the access token here (e.g., save it or use it in further API calls)
          localStorage.setItem('id_token', data.id_token);

          try {
            const response = await axios.post(
              'https://qa101.deriv.dev/oauth2/legacy/tokens',
              {},
              {
                headers: {
                  Authorization: `Bearer ${data.access_token}`,
                  'Content-Type': 'application/json',
                },
              },
            );

            const legacyData = response.data;
            const accounts = getAccountsFromSearchParams(legacyData);
            updateLoginAccounts(accounts);
            window.history.replaceState({}, document.title, '/dashboard');
          } catch (error) {
            if (error.response) {
              const legacyData = error.response.data;
              console.error('Error fetching legacy tokens:', legacyData);
            } else {
              console.error('Failed to fetch legacy tokens:', error);
            }
          }
        } else {
          console.error('Error exchanging token:', data);
        }
      } catch (error) {
        console.error('Token exchange failed:', error);
      }
    };

    exchangeToken();
    return () => {
      setIsDashboard(false);
    };
  }, [setIsDashboard, updateLoginAccounts]);

  if (is_logged_in) return <ManageDashboard />;
  return <Login />;
};

export default Dashboard;
