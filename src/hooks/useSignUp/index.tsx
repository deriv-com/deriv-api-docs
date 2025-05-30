import { useCallback } from 'react';
import Cookies from 'js-cookie';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Hook to handle sign-up functionality
 * Sets a cookie with redirect_to: api under the deriv.com domain
 * and redirects to the sign-up page
 * @returns {Object} - An object with the handleSignUp function
 */
export const useSignUp = () => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const handleSignUp = useCallback(() => {
    const is_en = currentLocale === 'en';
    Cookies.set('redirect_to', 'api', {
      domain: '.deriv.com',
      expires: 30,
      path: '/',
      secure: true,
      sameSite: 'none',
    });

    // Redirect to sign-up page
    // If language is not English, include it in the URL
    if (!is_en) {
      location.assign(`https://deriv.com/${currentLocale}/signup/`);
    } else {
      location.assign('https://deriv.com/signup/');
    }
  }, [currentLocale]);

  return { handleSignUp };
};

export default useSignUp;
