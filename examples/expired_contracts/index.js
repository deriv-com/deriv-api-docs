import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 32512; // Replace with your app_id or leave current one for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

let token = '';

const expiredContractsResponse = async (res) => {
  const data = JSON.parse(res.data);

  if (data.error !== undefined) {
    const sanitizedErrorMessage = data.error?.message ? data.error.message : "";
    console.log('Error : ', sanitizedErrorMessage);
    connection.removeEventListener('message', expiredContractsResponse, false);
    await api.disconnect();
  }

  if (data.msg_type === 'sell_expired') {
    // Sanitize the entire data object before logging
    const sanitizedDataString = JSON.stringify(data);
    console.log(JSON.parse(sanitizedDataString));
    
    // Sanitize the count value before logging
    const count = data.sell_expired?.count;
    const sanitizedCount = count !== undefined ? String(count) : "undefined";
    console.log('amount of expired contracts sold: ', sanitizedCount);
  }

  connection.removeEventListener('message', expiredContractsResponse, false);
};

const sellExpiredContracts = async () => {
  token = localStorage.getItem('login_token');
  await api.authorize(token);
  connection.addEventListener('message', expiredContractsResponse);
  await api.sellExpired();
};

const expired_contracts_button = document.querySelector('#expiredContracts');
expired_contracts_button.addEventListener('click', sellExpiredContracts);
