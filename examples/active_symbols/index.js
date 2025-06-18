import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 1089; // Replace with your app_id or leave the current one for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

// Currently gets all available symbols.
const active_symbols_request = {
  // landing_company: "maltainvest", // Uncomment landing_company if you want to retrieve specific symbols.
  active_symbols: 'brief',
  product_type: 'basic',
};

const activeSymbolsResponse = async (res) => {
  const data = JSON.parse(res.data);

  if (data.error !== undefined) {
    console.log('Error : ', data.error?.message);
    connection.removeEventListener('message', activeSymbolsResponse, false);
    await api.disconnect();
  }

  if (data.msg_type === 'active_symbols') {
    const sanitizedDataString = JSON.stringify(data.active_symbols);
    console.log(JSON.parse(sanitizedDataString));
  }

  connection.removeEventListener('message', activeSymbolsResponse, false);
};

const getActiveSymbols = async () => {
  connection.addEventListener('message', activeSymbolsResponse);
  await api.activeSymbols(active_symbols_request);
};

const active_symbols_button = document.querySelector('#activeSymbols');
active_symbols_button.addEventListener('click', getActiveSymbols);
