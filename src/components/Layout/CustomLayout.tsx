import HomepageFeatures from '@site/src/features/Home';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import HomePageSkeleton from '../HomePageSkeleton';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import useTMB from '@site/src/hooks/useTmp';

const CustomLayout: React.FC = () => {
  const { onRenderTMBCheck } = useTMB();
  const [loader, setLoader] = useState(true);
  const [isSilentLoginExcluded, setIsSilentLoginExcluded] = useState(false);
  const isTMBEnabled =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('is_tmb_enabled') ?? 'false');

  const initRef = useRef(false);

  // Use useCallback to memoize the init function
  const initSession = useCallback(async () => {
    // Check both the module-level flag and the ref
    if (initRef.current) return;

    await onRenderTMBCheck();
    setLoader(false);

    initRef.current = true;
  }, [onRenderTMBCheck]);

  useEffect(() => {
    isTMBEnabled && initSession();
  }, [initSession, isTMBEnabled]);

  useEffect(() => {
    // Only execute in browser environment
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }
    if (isTMBEnabled) {
      return;
    }

    // Now we can safely use browser-specific APIs
    const pathname = window.location.pathname;
    setIsSilentLoginExcluded(pathname.includes('callback') || pathname.includes('endpoint'));

    const mainElement = document.querySelector('[aria-label="Main"]') as HTMLElement;
    if (!mainElement) {
      setLoader(false);
      return;
    }

    const loggedState = Cookies.get('logged_state');
    let isLocalLoggedIn = false;

    try {
      isLocalLoggedIn =
        !!sessionStorage.getItem('login-accounts') &&
        JSON.parse(sessionStorage.getItem('login-accounts') || '[]').length > 0;
    } catch (error) {
      console.log(error);
    }
    // SSO = Single Sign On: When user is logged in on deriv.com but not locally
    const willEventuallySSO = loggedState === 'true' && !isLocalLoggedIn;
    // SLO = Single Log Out: When user is logged out on deriv.com but still logged in locally
    const willEventuallySLO = loggedState === 'false' && isLocalLoggedIn;

    if ((willEventuallySSO || willEventuallySLO) && !isSilentLoginExcluded) {
      mainElement.style.display = 'none';
      setLoader(true);
    } else {
      mainElement.style.display = '';
      setLoader(false);
    }
  }, [isSilentLoginExcluded, isTMBEnabled]);

  return (
    <>
      {loader ? (
        <HomePageSkeleton />
      ) : (
        <>
          <Head>
            <title>Deriv API | Customise your trading app</title>
            <meta
              name='description'
              content='Use our trading API to build a trading app that offers comprehensive trading functionalities similar to the Deriv Trader platform.'
            />
          </Head>
          <HomepageFeatures />
        </>
      )}
    </>
  );
};

export default CustomLayout;
