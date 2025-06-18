import apiManager from '@site/src/configs/websocket';
import { useCallback } from 'react';
import useAuthContext from '../useAuthContext';
import { OAuth2Logout } from '@deriv-com/auth-client';
import useTMB from '../useTmb';
import useTmbEnabled from '../useTmbEnabled';

const useLogout = () => {
  const { updateLoginAccounts, updateCurrentLoginAccount } = useAuthContext();
  const [isTMBEnabled, isTmbLoading] = useTmbEnabled();
  const { handleLogout: handleTMBLogout } = useTMB();

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
    window.location.reload();
  }, [updateCurrentLoginAccount, updateLoginAccounts]);

  const handleLogout = () => {
    // Don't perform any logout actions if TMB is still loading
    if (isTmbLoading) {
      return;
    }

    if (isTMBEnabled) {
      return handleTMBLogout();
    } else {
      try {
        OAuth2Logout({
          WSLogoutAndRedirect: logout,
          postLogoutRedirectUri: window.location.origin,
          redirectCallbackUri: `${window.location.origin}/callback`,
        }).catch((err) => {
          console.error('Error during logout:', err);
        });
      } catch (err) {
        console.error('Error during logout:', err);
      }
    }
  };

  return { logout: handleLogout };
};

export default useLogout;
