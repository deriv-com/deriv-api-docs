import apiManager from '@site/src/configs/websocket';
import { useCallback } from 'react';
import useAuthContext from '../useAuthContext';
import useGrowthbookGetFeatureValue from '../useGrowthbookGetFeatureValue';
import { useOAuth2, TOAuth2EnabledAppList } from '@deriv-com/auth-client';

const useLogout = () => {
  const { updateLoginAccounts, updateCurrentLoginAccount } = useAuthContext();
  const [OAuth2EnabledApps, OAuth2EnabledAppsInitialised] =
    useGrowthbookGetFeatureValue<TOAuth2EnabledAppList>({
      featureFlag: 'hydra_be',
    });

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

  const { OAuth2Logout } = useOAuth2({ OAuth2EnabledApps, OAuth2EnabledAppsInitialised }, logout);

  return { logout: OAuth2Logout };
};

export default useLogout;
