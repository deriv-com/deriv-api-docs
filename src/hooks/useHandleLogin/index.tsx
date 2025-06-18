import { requestOidcAuthentication } from '@deriv-com/auth-client';
import useTmbEnabled from '../useTmbEnabled';
/**
 * Handles the new login flow for the user using OIDC.
 *
 * If the user is not logged in and OAuth2 is enabled, it will redirect the user to the
 * OAuth2 authorization page from the OIDC config endpoint. If OAuth2 is not enabled it will
 * redirect the user to the legacy oauth url coming from the onClickLogin callback.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.onClickLogin - The callback to be called when the user is logged in.
 * @returns {Object} - An object with the `handleLogin` function.
 */
export const useHandleLogin = ({ onClickLogin }: { onClickLogin?: () => void }) => {
  const [isTMBEnabled, isTmbLoading] = useTmbEnabled();

  const handleLogin = async () => {
    // Don't perform any login actions if TMB is still loading
    if (isTmbLoading) {
      return;
    }

    try {
      if (!isTMBEnabled) {
        await requestOidcAuthentication({
          redirectCallbackUri: `${window.location.origin}/callback`,
        });
      } else {
        onClickLogin();
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
    if (onClickLogin) {
      onClickLogin();
    }
  };
  return { handleLogin };
};
