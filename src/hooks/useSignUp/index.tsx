import { useCallback } from 'react';
import Cookies from 'js-cookie';

/**
 * Hook to handle sign-up functionality
 * Sets a cookie with redirect_to: api under the deriv.com domain
 * and redirects to the sign-up page
 * @returns {Object} - An object with the handleSignUp function
 */
export const useSignUp = () => {
  const handleSignUp = useCallback(() => {
    Cookies.set('redirect_to', 'api', {
      domain: '.deriv.com',
      expires: 30,
      path: '/',
      secure: true,
      sameSite: 'none',
    });

    // Redirect to sign-up page
    location.assign('https://deriv.com/signup/');
  }, []);

  return { handleSignUp };
};

export default useSignUp;
