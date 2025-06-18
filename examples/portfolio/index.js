import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 32445; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });
// WARNING: Be careful to not leak your token here in the sandbox.
let token = '';

const portfolioResponse = async (res) => {
  const data = JSON.parse(res.data);
  console.log(JSON.stringify(data));

  if (data.error !== undefined) {
    console.log('Error : ', data.error.message);
    connection.removeEventListener('message', portfolioResponse, false);
    await api.disconnect();
  }

  if (data.msg_type === 'portfolio') {
    const contracts = data.portfolio?.contracts;
    if (contracts.length === 0) {
      console.log('No portfolio items available.');
    } else {
      console.log(JSON.stringify(contracts));
    }
  }

  connection.removeEventListener('message', portfolioResponse, false);
};

const getPortfolio = async () => {
  token = localStorage.getItem('login_token');
  await api.authorize(token);
  connection.addEventListener('message', portfolioResponse);
  await api.portfolio();
};

const symbol_button = document.querySelector('#portfolio');
symbol_button.addEventListener('click', getPortfolio);
