const url = new URL(window.location.href);
const bc = new BroadcastChannel('auth');
const login_button = document.querySelector('#loginButton');
const authorized_message = document.querySelector('#authorized');
const unauthorized_message = document.querySelector('#unauthorized');
const buy_contract_button = document.querySelector('#buyContract');
const search_parameters = url.searchParams;
var incognito = true;

let token_data_object;
let account_value;
let token_value;
let currency_value;
let account_key;

// Whitelist of allowed account key prefixes
const ALLOWED_ACCOUNT_KEYS = ['acct1', 'acct2', 'acct3', 'acct4', 'acct5'];

for (const [key, value] of search_parameters) {
  if (key.includes('acct')) {
    // Validate the account key against the whitelist
    const isValidKey = ALLOWED_ACCOUNT_KEYS.some(allowedKey => key === allowedKey);
    if (isValidKey) {
      account_key = key;
      account_value = value;
    } else {
      console.log('Invalid account key detected');
      continue;
    }
  }
  if (key.includes('token')) {
    token_value = value;
  }
  if (key.includes('cur')) {
    currency_value = value;
  }
  if (account_key !== undefined) {
    // Use a safe property name from the whitelist only
    if (ALLOWED_ACCOUNT_KEYS.includes(account_key)) {
      token_data_object = {
        ...token_data_object,
        [account_key]: {
          account: account_value,
          token: token_value,
          currency: currency_value,
        },
      };
    }
  }
}

// Import the sanitization function

try {
  token_data_object = JSON.stringify(token_data_object);
} catch (error) {
  const sanitizedErrorMessage = error.error?.message?.replace(/\n|\r/g, "") || "";
  console.log(sanitizedErrorMessage);
}

const browserCheck = () => {
  var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
  fs(
    window.TEMPORARY,
    100,
    function (fs) {},
    function (e) {
      alert(
        'You are using Incognito mode. The Log in functionality for Code Sandbox will not work in Incognito mode.',
      );
      incognito = false;
    },
  );
};
browserCheck();

const updateElementStyles = () => {
  login_button.style.display = 'none';
  authorized_message.style.display = 'inline-block';
  unauthorized_message.style.display = 'none';
  buy_contract_button.style.opacity = '1';
  buy_contract_button.style.pointerEvents = 'auto';
  buy_contract_button.style.cursor = 'pointer';
};

const buttonResponse = () => {
  browserCheck();
  if (incognito === true) {
    window.open(
      'https://oauth.deriv.com/oauth2/authorize?app_id=32436&l=EN&brand=deriv',
      'newwindow',
      'width=320,height=800',
    );
  }
};

login_button.addEventListener('click', buttonResponse);

window.onload = () => {
  const localstore_token = localStorage.getItem('token_data_object');
  if (localstore_token.length > 0) {
    updateElementStyles();
  }
};

bc.onmessage = function (event) {
  if (event.data.token_data_object) {
    bc.postMessage('close');
    localStorage.setItem('token_data_object', event.data.token_data_object);
  }
  if (event.data === 'close') {
    bc.postMessage('login_success');
    window.close();
  }
  if (event.data === 'login_success') {
    updateElementStyles();
  }
};

if (Object.keys(token_data_object).length > 0) {
  bc.postMessage({ token_data_object });
}
