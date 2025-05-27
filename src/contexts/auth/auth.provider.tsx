import React, { useMemo, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import { AuthContext, IAuthContext, IUser, IUserAccounts, IUserLoginAccount } from './auth.context';
import apiManager from '@site/src/configs/websocket';
import {
  CURRENT_LOGIN_ACCOUNT_SESSION_STORAGE_KEY,
  LOGIN_ACCOUNTS_SESSION_STORAGE_KEY,
  USER_ACCOUNTS_SESSION_STORAGE_KEY,
  USER_SESSION_STORAGE_KEY,
} from '@site/src/utils/constants';
import { findVirtualAccount, getIsBrowser, getTmbConfigUrl } from '@site/src/utils';
import useServerInfo from '@site/src/hooks/useServerInfo';

type TAuthProviderProps = {
  children: ReactNode;
};

if (getIsBrowser()) {
  apiManager.init();
}

const AuthProvider = ({ children }: TAuthProviderProps) => {
  const [is_logged_in, setIsLoggedIn] = useState(false);
  const [is_authorized, setIsAuthorized] = useState(false);
  const [is_switching_account, setisSwitchingAccount] = useState(false);
  const [is_connected, setIsConnected] = useState(true);
  const [is_tmb_enabled_ff, setIsTmbEnabledFF] = useState(false);
  const [isTmbLoading, setIsTmbLoading] = useState(true);
  const { siteActive } = useServerInfo();

  // Get the TMB config URL from utils
  const configUrl = getTmbConfigUrl();

  // Fetch TMB enabled status from remote config
  useEffect(() => {
    if (!configUrl) return;

    const fetchTmbStatus = async () => {
      setIsTmbLoading(true);
      try {
        const response = await fetch(configUrl);
        const data = await response.json();

        // Use the "api" key from the response, default to false if undefined
        const isEnabled = JSON.parse(localStorage.getItem('is_tmb_enabled')) ?? data?.api === true;

        // Update the TMB status
        setIsTmbEnabledFF(!!isEnabled);
      } catch (error) {
        console.error('Failed to fetch TMB status:', error);
        setIsTmbEnabledFF(true);
      } finally {
        setIsTmbLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      fetchTmbStatus();
    }
  }, [configUrl]);

  const [loginAccounts, setLoginAccounts] = useSessionStorage<IUserLoginAccount[]>(
    LOGIN_ACCOUNTS_SESSION_STORAGE_KEY,
    [],
  );
  const [currentLoginAccount, setCurrentLoginAccount] = useSessionStorage<IUserLoginAccount>(
    CURRENT_LOGIN_ACCOUNT_SESSION_STORAGE_KEY,
    {
      name: '',
      token: '',
      currency: '',
    },
  );

  const [userAccounts, setUserAccounts] = useSessionStorage<IUserAccounts>(
    USER_ACCOUNTS_SESSION_STORAGE_KEY,
    [],
  );
  const [user, setUser] = useSessionStorage<IUser>(USER_SESSION_STORAGE_KEY, {});

  const updateAuthorize = useCallback(async () => {
    if (currentLoginAccount.token) {
      const { authorize } = await apiManager.authorize(
        currentLoginAccount.token,
        setIsConnected,
        setIsAuthorized,
      );
      setIsAuthorized(true);
      setisSwitchingAccount(false);
      const { account_list, ...user } = authorize;
      setUserAccounts(account_list);
      setUser(user);
    }
  }, [currentLoginAccount.token, setUser, setUserAccounts]);

  useEffect(() => {
    if (!is_authorized && is_connected) {
      updateAuthorize();
    }
  }, [is_authorized, is_connected, updateAuthorize]);

  const updateLoginAccounts = useCallback(
    (loginAccounts: IUserLoginAccount[], updateCurrentAccount = true) => {
      setLoginAccounts(loginAccounts);
      if (!updateCurrentAccount) return;

      if (loginAccounts.length) {
        const virtualAccount = findVirtualAccount(loginAccounts);
        if (virtualAccount) {
          setCurrentLoginAccount(virtualAccount);
        } else {
          setCurrentLoginAccount(loginAccounts[0]);
        }
      }
    },
    [setCurrentLoginAccount, setLoginAccounts],
  );

  const updateCurrentLoginAccount = useCallback(
    (account: IUserLoginAccount, isValidateAccount = true) => {
      if (isValidateAccount) {
        setIsAuthorized(false);
        setisSwitchingAccount(true);
      }
      setCurrentLoginAccount(account);
    },
    [setCurrentLoginAccount],
  );

  useEffect(() => {
    if (loginAccounts.length) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loginAccounts.length]);

  const context_object: IAuthContext = useMemo(() => {
    return {
      is_switching_account,
      is_logged_in,
      is_authorized,
      loginAccounts,
      updateLoginAccounts,
      currentLoginAccount,
      updateCurrentLoginAccount,
      userAccounts,
      user,
      siteActive,
      is_tmb_enabled_ff,
      isTmbLoading,
    };
  }, [
    currentLoginAccount,
    is_switching_account,
    is_authorized,
    is_logged_in,
    loginAccounts,
    updateCurrentLoginAccount,
    updateLoginAccounts,
    userAccounts,
    user,
    siteActive,
    is_tmb_enabled_ff,
    isTmbLoading,
  ]);

  return <AuthContext.Provider value={context_object}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
