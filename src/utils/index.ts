import moment from 'moment';
import { IUserLoginAccount } from '../contexts/auth/auth.context';
import { TScopes } from '../types';
import {
  LOCALHOST_APP_ID,
  PRODUCTION_APP_ID,
  STAGING_APP_ID,
  VERCEL_DEPLOYMENT_APP_ID,
  OAUTH_URL,
  DEFAULT_WS_SERVER,
  PRODUCTION_ME_APP_ID,
  PRODUCTION_BE_APP_ID,
  STAGING_ME_APP_ID,
  STAGING_BE_APP_ID,
} from './constants';

const CURRENCY_MAP = new Map([
  ['Demo', { icon: 'demo', name: 'Demo' }],
  ['UST', { icon: 'tether', name: 'Tether Omni' }],
  ['eUSDT', { icon: 'tether', name: 'Tether ERC20' }],
  ['tUSDT', { icon: 'tether', name: 'Tether TRC20' }],
  ['BTC', { icon: 'bitcoin', name: 'Bitcoin' }],
  ['ETH', { icon: 'ethereum', name: 'Ethereum' }],
  ['LTC', { icon: 'litecoin', name: 'Litecoin' }],
  ['USDC', { icon: 'usdcoin', name: 'USD Coin' }],
  ['USD', { icon: 'usdollar', name: 'US Dollar' }],
  ['EUR', { icon: 'euro', name: 'Euro' }],
  ['GBP', { icon: 'gbp', name: 'British Pound' }],
  ['AUD', { icon: 'aud', name: 'Australian Dollar' }],
]);

export const domains = [
  'deriv.be',
  'deriv.me',
  'deriv.com',
  'api.deriv.me',
  'api.deriv.be',
  'api.deriv.com',
  'staging.deriv.be',
  'staging.deriv.me',
  'staging.deriv.com',
  'localhost',
  'deriv-com-git-fork',
  'deriv-developers-portal-git-fork',
  'deriv-api-docs-git-fork',
  'binary.sx',
  'staging-api.deriv.be',
  'staging-api.deriv.me',
  'staging-api.deriv.com',
  'api.binary.sx',
  'staging-api.binary.sx',
];

export const getCurrencyObject = (currency: string) => {
  const currencyObject = CURRENCY_MAP.get(currency);
  if (!currencyObject) {
    return {
      icon: 'placeholder_icon',
      name: 'Currency',
    };
  }

  return currencyObject;
};

type TIsNotDemoCurrency = {
  name: string;
  currency: string;
};

export const isNotDemoCurrency = (account: TIsNotDemoCurrency) => {
  const currency = account?.name?.includes('VRTC') ? 'Demo' : account?.currency;
  return currency;
};

/**
 *
 * @returns {boolean} return true if the window hostname contains the given hostname
 */
export const isHost = (hostname: string) => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.includes(hostname) ? true : false;
};

/**
 * @description based on the environment which the project is running we must use different appIds, to get the proper redirect url
 * @returns {string} proper appId for the project
 */
export const getAppId = () => {
  if (isHost('localhost')) return LOCALHOST_APP_ID;
  if (isHost('staging-api.deriv.com')) return STAGING_APP_ID;
  if (isHost('deriv-api-docs.binary.sx')) return VERCEL_DEPLOYMENT_APP_ID;
  if (isHost('staging-api.deriv.me')) return STAGING_ME_APP_ID;
  if (isHost('staging-api.deriv.be')) return STAGING_BE_APP_ID;
  if (isHost('api.deriv.com')) return PRODUCTION_APP_ID;
  if (isHost('api.deriv.me')) return PRODUCTION_ME_APP_ID;
  if (isHost('api.deriv.be')) return PRODUCTION_BE_APP_ID;

  return PRODUCTION_APP_ID;
};

/**
 * @description use this when you wanna check if the application is running on browser (not ssr)
 * @returns {boolean} true if the application is running in the browser ( not ssr )
 */
export const getIsBrowser = () => {
  return typeof window !== 'undefined';
};

/**
 * @description Safely gets the current pathname, with a fallback for server-side rendering
 * @returns {string} The current pathname if in browser, or '/' if in server-side rendering
 */
export const getPathname = () => {
  return typeof window !== 'undefined' ? window.location.pathname : '/';
};

/**
 * @description This function takes the response data from the accounts endpoint and transforms it into an array of objects
 * @param {object} data - The response data from the accounts endpoint
 * @returns {array} An array of objects with the shape of { currency: string, name: string, token: string }
 */
export const transformAccountsFromResponseBody = (data) => {
  const result = [];
  const keys = Object.keys(data);
  for (let i = 1; i <= keys.length / 3; i++) {
    const groupedObject = {
      currency: data[`cur${i}`],
      name: data[`acct${i}`],
      token: data[`token${i}`],
    };
    if (groupedObject.currency && groupedObject.name && groupedObject.token) {
      result.push(groupedObject);
    }
  }
  return result;
};

/**
 * @description based on the received query params after successful login, generates the array of user's accounts
 * @param searchParams the query params in the auth path when user does the login successfully
 * @returns {IUserLoginAccount[]} array of user accounts
 */
export const getAccountsFromSearchParams = (searchParams: string) => {
  let accountCount = 0;
  const params = new URLSearchParams(searchParams);
  const accounts: IUserLoginAccount[] = [];

  for (const key of params.keys()) {
    if (key.includes('acct')) {
      accountCount += 1;
    }
  }

  for (let index = 0; index < accountCount; index++) {
    const queryIndex = index + 1;

    // we should check each account in the search params, this is some kind of validation for the URL search params
    if (params.has(`acct${queryIndex}`) && params.has(`token${queryIndex}`)) {
      accounts.push({
        name: params.get(`acct${queryIndex}`),
        token: params.get(`token${queryIndex}`),
        currency: params.get(`cur${queryIndex}`) || '',
      });
    }
  }
  return accounts;
};

export const formatDate = (date?: moment.MomentInput, date_format = 'YYYY-MM-DD') => {
  return moment(date).format(date_format);
};

export const formatTokenScope = (tokenScope: string) => {
  const cleanedTokenScope = tokenScope.replace(/-|_/g, ' ');
  return cleanedTokenScope[0].toUpperCase() + cleanedTokenScope.slice(1).toLowerCase();
};

export const getServerConfig = () => {
  const isBrowser = getIsBrowser();
  if (isBrowser) {
    const config_server_url = localStorage.getItem('config.server_url');
    const config_app_id = localStorage.getItem('config.app_id');
    const is_qa_server = config_server_url?.toLowerCase().includes('qa');
    const oauth = is_qa_server ? config_server_url : OAUTH_URL;

    return {
      serverUrl: config_server_url ?? DEFAULT_WS_SERVER,
      appId: config_app_id ?? getAppId(),
      oauth,
    };
  } else {
    return {
      serverUrl: DEFAULT_WS_SERVER,
      appId: getAppId(),
      oauth: OAUTH_URL,
    };
  }
};

export const generateLoginUrl = (
  language: string,
  oauthUrl: string,
  appId: string,
  route: string,
) => {
  return `https://${oauthUrl}/oauth2/authorize?app_id=${appId}&l=${language}&route=${route}`;
};

interface IScopesLike {
  admin: boolean;
  read: boolean;
  trade: boolean;
  trading_information: boolean;
  payments: boolean;
}

export const scopesObjectToArray = (scopesObject: IScopesLike) => {
  const keys = Object.keys(scopesObject) as Array<TScopes>;
  const scopes = keys.filter((key) => scopesObject[key]);
  return scopes;
};

export const scopesArrayToObject = (scopes: string[]) => {
  const scopesObject: IScopesLike = {
    admin: false,
    read: false,
    trade: false,
    trading_information: false,
    payments: false,
  };
  scopes.forEach((scope) => {
    scopesObject[scope] = true;
  });
  return scopesObject;
};

export const findVirtualAccount = (accounts: IUserLoginAccount[]) => {
  return accounts.find((item) => item.name.includes('VRTC'));
};
