import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';
import { sanitizeLogMessage } from '../../src/utils/logSanitizer.js';

const app_id = 32404; // Replace with your app_id or leave the current one for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

// WARNING: Be careful to not leak your token here in the sandbox.
let token = '';

const balance_request = {
  balance: 1,
  subscribe: 1,
  account: 'all',
};

const balanceSubscriber = async () => await api.subscribe(balance_request);

const accountBalanceResponse = async (res) => {
  const data = JSON.parse(res.data);

  if (data.error !== undefined) {
    console.log('Error: ', sanitizeLogMessage(data.error.message));
    connection.removeEventListener('message', accountBalanceResponse, false);
    await api.disconnect();
  }

  if (data.msg_type === 'balance') {
    console.log('Balance data: ', sanitizeLogMessage(String(data.balance)));
  }
};

const getAccountBalance = async () => {
  try {
    token = localStorage.getItem('login_token');
    await api.authorize(token);
    connection.addEventListener('message', accountBalanceResponse);
    console.log('Subscribed');
    balanceSubscriber();
  } catch (error) {
    const sanitizedErrorMessage = error.error?.message?.replace(/\n|\r/g, "") || "";
    console.error(sanitizeLogMessage(sanitizedErrorMessage));
  }
};

const unsubscribeBalance = async () => {
  connection.removeEventListener('message', accountBalanceResponse, false);
  console.log('Unsubscribed');
  await balanceSubscriber().unsubscribe();
};

const account_balance_button = document.querySelector('#accountBalance');
account_balance_button.addEventListener('click', getAccountBalance);

const unsubscribe_button = document.querySelector('#unsubscribeAccountBalance');
unsubscribe_button.addEventListener('click', unsubscribeBalance);
