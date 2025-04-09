import HomepageFeatures from '@site/src/features/Home';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import HomePageSkeleton from '../HomePageSkeleton';

const CustomLayout: React.FC = () => {
  const [loader, setLoader] = React.useState(true);
  const isSilentLoginExcluded =
    window.location.pathname.includes('callback') || window.location.pathname.includes('endpoint');

  useEffect(() => {
    const mainElement = document.querySelector('[aria-label="Main"]') as HTMLElement;
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

    // eslint-disable-next-line
  }, []);

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
