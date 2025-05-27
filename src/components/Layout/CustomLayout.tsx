import HomepageFeatures from '@site/src/features/Home';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import HomePageSkeleton from '../HomePageSkeleton';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import useTMB from '@site/src/hooks/useTmb';
import useTmbEnabled from '@site/src/hooks/useTmbEnabled';

const CustomLayout: React.FC = () => {
  const { onRenderTMBCheck } = useTMB();
  const [loader, setLoader] = useState(true);
  const [isSilentLoginExcluded, setIsSilentLoginExcluded] = useState(false);
  const [isTMBEnabled, isTmbLoading] = useTmbEnabled();
  console.log(isTMBEnabled, 'isTMBEnabled');

  const initRef = useRef(false);

  // Use useCallback to memoize the init function
  const initSession = useCallback(async () => {
    // Check both the module-level flag and the ref
    if (initRef.current) return;

    await onRenderTMBCheck();
    setLoader(false);

    initRef.current = true;
  }, [onRenderTMBCheck]);

  const hideMainElement = () => {
    const mainElement = document.querySelector('[aria-label="Main"]') as HTMLElement;
    if (mainElement) {
      mainElement.style.display = 'none';
    }
  };

  useEffect(() => {
    // Don't execute any TMB-related code until we know if TMB is enabled
    if (isTmbLoading) {
      // Hide main element while TMB status is loading
      hideMainElement();
      setLoader(true);
      return;
    }

    if (isTMBEnabled) {
      // Hide main element while TMB is loading
      hideMainElement();
      initSession();
    }
  }, [initSession, isTMBEnabled, isTmbLoading]);

  useEffect(() => {
    // Only execute in browser environment
    if (!ExecutionEnvironment.canUseDOM || isTmbLoading || isTMBEnabled) {
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
    } else if (!isTMBEnabled) {
      // Only show main element if TMB is not enabled
      // When TMB is enabled, the display will be controlled by the TMB loading effect
      mainElement.style.display = '';
      setLoader(false);
    }
  }, [isSilentLoginExcluded, isTMBEnabled, isTmbLoading]);

  // Effect to restore main element display when TMB loading is complete
  useEffect(() => {
    if (isTMBEnabled && !loader) {
      const mainElement = document.querySelector('[aria-label="Main"]') as HTMLElement;
      if (mainElement) {
        mainElement.style.display = '';
      }
    }
  }, [loader, isTMBEnabled]);

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
