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
    // Properly encode the redirect URL to handle slashes and special characters
    const encodedRedirectUrl = encodeURIComponent('https://api.deriv.com/');

    // Redirect to sign-up page
    // If language is not English, include it in the URL
    if (!is_en) {
      location.assign(
        `https://hub.deriv.com/tradershub/signup?redirect_url=${encodedRedirectUrl}&lang=${currentLocale}`,
      );
    } else {
      location.assign(`https://hub.deriv.com/tradershub/signup?redirect_url=${encodedRedirectUrl}`);
    }
  }, [currentLocale]);

  return { handleSignUp };
};

export default useSignUp;
