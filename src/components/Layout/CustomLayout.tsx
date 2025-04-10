import HomepageFeatures from '@site/src/features/Home';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import HomePageSkeleton from '../HomePageSkeleton';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const CustomLayout: React.FC = () => {
  const [loader, setLoader] = React.useState(true);
  const [isSilentLoginExcluded, setIsSilentLoginExcluded] = React.useState(false);

  useEffect(() => {
    // Only execute in browser environment
    if (!ExecutionEnvironment.canUseDOM) {
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
    
    const willEventuallySSO = loggedState === 'true' && !isLocalLoggedIn;
    const willEventuallySLO = loggedState === 'false' && isLocalLoggedIn;

    if ((willEventuallySSO || willEventuallySLO) && !isSilentLoginExcluded) {
      mainElement.style.display = 'none';
      setLoader(true);
    } else {
      mainElement.style.display = '';
      setLoader(false);
    }
  }, [isSilentLoginExcluded]);

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
