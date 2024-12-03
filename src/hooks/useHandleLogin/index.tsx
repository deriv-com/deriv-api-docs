import useGrowthbookGetFeatureValue from '@site/src/hooks/useGrowthbookGetFeatureValue';
import {
  requestOidcAuthentication,
  TOAuth2EnabledAppList,
  useIsOAuth2Enabled,
} from '@deriv-com/auth-client';

/**
 * Handles the new login flow for the user using OIDC.
 *
 * If the user is not logged in and OAuth2 is enabled, it will redirect the user to the
 * OAuth2 authorization page. If the user is logged in, it will call the `onClickLogin`
 * callback.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.onClickLogin - The callback to be called when the user is logged in.
 *
 * @returns {Object} - An object with the `handleLogin` function.
 */
export const useHandleLogin = ({ onClickLogin }: { onClickLogin: () => void }) => {
  const [OAuth2EnabledApps, OAuth2EnabledAppsInitialised] =
    useGrowthbookGetFeatureValue<TOAuth2EnabledAppList>({
      featureFlag: 'hydra_be',
    });

  const isOAuth2Enabled = useIsOAuth2Enabled(OAuth2EnabledApps, OAuth2EnabledAppsInitialised);

  const handleLogin = async () => {
    if (isOAuth2Enabled) {
      await requestOidcAuthentication({
        redirectCallbackUri: `${window.location.origin}/callback`,
      });
    }
    onClickLogin();
  };

  return { handleLogin };
};
