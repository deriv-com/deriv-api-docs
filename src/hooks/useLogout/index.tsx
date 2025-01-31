import apiManager from '@site/src/configs/websocket';
import { useCallback } from 'react';
import useAuthContext from '../useAuthContext';
import { OAuth2Logout } from '@deriv-com/auth-client';

const useLogout = () => {
  const { updateLoginAccounts, updateCurrentLoginAccount } = useAuthContext();

  // we clean up everything related to the user here, for now it's just user's account
  // later on we should clear user tokens as well
  const logout = useCallback(async () => {
    await apiManager.logout();
    updateLoginAccounts([]);
    updateCurrentLoginAccount({
      name: '',
      token: '',
      currency: '',
    });
  }, [updateCurrentLoginAccount, updateLoginAccounts]);

  const handleLogout = () => {
    OAuth2Logout({ WSLogoutAndRedirect: logout, postLogoutRedirectUri: window.location.origin, redirectCallbackUri: `${window.location.origin}/callback` });
  };

  return { logout: handleLogout };
};

export default useLogout;
