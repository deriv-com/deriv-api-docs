import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { requestSessionActive } from '@deriv-com/auth-client';
import useLoginUrl from '../useLoginUrl';
import { domains, transformAccountsFromResponseBody } from '@site/src/utils';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useAuthContext from '../useAuthContext';
import { useHistory } from '@docusaurus/router';
import apiManager from '@site/src/configs/websocket';

type UseTMBReturn = {
  handleLogout: VoidFunction;
  onRenderTMBCheck: VoidFunction;
};

/**
 * useTMB - hooks to help with TMB function such getting the active sessions and tokens
 * @returns {UseOAuthReturn}
 */
const useTMB = (): UseTMBReturn => {
  const { getUrl } = useLoginUrl();
  const { updateLoginAccounts, updateCurrentLoginAccount } = useAuthContext();
  const history = useHistory();
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const oauthUrl = getUrl(currentLocale);

  // we clean up everything related to the user here, for now it's just user's account
  // later on we should clear user tokens as well
  const logout = useCallback(async () => {
    if (typeof window !== 'undefined' && apiManager) {
      await apiManager.logout();
    }
    updateLoginAccounts([]);
    updateCurrentLoginAccount({
      name: '',
      token: '',
      currency: '',
    });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }, [updateCurrentLoginAccount, updateLoginAccounts]);

  const currentDomain =
    typeof window !== 'undefined' ? window.location.hostname.split('.').slice(-2).join('.') : '';

  const handleLogout = useCallback(async () => {
    if (domains.includes(currentDomain)) {
      //where they set session id
      Cookies.set('logged_state', 'false', {
        domain: currentDomain,
        expires: 30,
        path: '/',
        secure: true,
      });
    }
    logout();
  }, [currentDomain, domains, oauthUrl]);

  const getActiveSessions = useCallback(async () => {
    try {
      const data = await requestSessionActive();

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to get active sessions', error);
    }
  }, []);

  const onRenderTMBCheck = useCallback(async () => {
    const activeSessions = await getActiveSessions();

    if (activeSessions?.active) {
      //have to add the success redirection functions here
      // For backward compatibility, we need to set logged_state cookie to tell other apps about authentication state
      // Can be removed when all the apps are using TMB
      if (domains.includes(currentDomain)) {
        Cookies.set('logged_state', 'true', {
          domain: currentDomain,
          expires: 30,
          path: '/',
          secure: true,
        });
      }
      const accountObj = activeSessions?.tokens?.reduce(
        (acc, data, i) => ({
          ...acc,
          [`cur${i + 1}`]: data.cur,
          [`acct${i + 1}`]: data.loginid,
          [`token${i + 1}`]: data.token,
        }),
        {},
      );
      const accounts = transformAccountsFromResponseBody(accountObj);
      updateLoginAccounts(accounts);
      if (
        typeof window !== 'undefined' &&
        window.location.pathname === '/' &&
        window.location.search
      ) {
        history.push('/');
      }
    } else {
      Cookies.set('logged_state', 'false', {
        domain: currentDomain,
        expires: 30,
        path: '/',
        secure: true,
      });
      updateLoginAccounts([]);
      updateCurrentLoginAccount({
        name: '',
        token: '',
        currency: '',
      });
    }
  }, [getActiveSessions, handleLogout, domains, currentDomain]);

  return { handleLogout, onRenderTMBCheck };
};

// Export both as default and named export to ensure compatibility
export { useTMB as A };
export default useTMB;
