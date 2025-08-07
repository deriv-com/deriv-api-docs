/**
 * Application routes
 * This file contains all the URLs used across the application
 */

export const Routes = {
  // External URLs
  DERIV_COM: 'https://deriv.com',
  PARTNERS_HUB_LOGIN: 'https://oauth.deriv.com/oauth2/authorize?app_id=62837&l=en&brand=deriv',
  PARTNERS_HUB_SIGNUP: 'https://hub.deriv.com/partnershub/signup',
  GET_REAL_ACCOUNT: 'https://hub.deriv.com/tradershub/redirect?action=real-account-signup',

  // Internal routes
  TRADERS_HUB: [
    {
      isWalletAccount: true,
      url: 'https://hub.deriv.com/tradershub',
    },
    {
      isWalletAccount: false,
      url: 'https://app.deriv.com',
    },
  ],
};

export default Routes;
