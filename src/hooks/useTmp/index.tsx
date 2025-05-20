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
  const isEndpointPage = window.location.pathname.includes('endpoint');

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
    await apiManager.logout();
    updateLoginAccounts([]);
    updateCurrentLoginAccount({
      name: '',
      token: '',
      currency: '',
    });
    window.location.reload();
  }, [updateCurrentLoginAccount, updateLoginAccounts]);

  const currentDomain = window.location.hostname.split('.').slice(-2).join('.');

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

    if (!activeSessions?.active && !isEndpointPage) {
      return handleLogout();
    }

    if (activeSessions?.active) {
      //have to add the success redirection functions here
      // TODO:
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
      const accounts = transformAccountsFromResponseBody(activeSessions?.tokens);
      updateLoginAccounts(accounts);
      history.push('/');
    }
  }, [getActiveSessions, isEndpointPage, handleLogout, domains, currentDomain]);

  return { handleLogout, onRenderTMBCheck };
};

export default useTMB;
