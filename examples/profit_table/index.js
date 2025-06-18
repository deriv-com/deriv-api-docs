import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 32450; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });
// WARNING: Be careful to not leak your token here in the sandbox.
let token = '';

const profit_table_request = {
  profit_table: 1,
  description: 1,
  limit: 25,
  offset: 25,
  sort: 'ASC',
};

const profitTableResponse = async (res) => {
  const data = JSON.parse(res.data);

  if (data.error !== undefined) {
    console.log('Error : ', data.error.message);
  }

  if (data.msg_type === 'profit_table') {
    console.log(JSON.stringify(data.profit_table?.transactions));
    console.log('Amount of table elements: ', String(data.profit_table?.count));
  }

  connection.removeEventListener('message', profitTableResponse);
};

const getProfitTable = async () => {
  token = localStorage.getItem('login_token');
  await api.authorize(token);
  connection.addEventListener('message', profitTableResponse);
  await api.profitTable(profit_table_request);
};

const symbol_button = document.querySelector('#profit_table');
symbol_button.addEventListener('click', getProfitTable);
