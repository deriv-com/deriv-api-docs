import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 32436; // Replace with your app_id or leave the current test app_id.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

// Use a demo account token to test with demo currency.
// WARNING: Be careful to not leak your token here in the sandbox.
let token = '';
const account_input = document.querySelector('#accountInput');

const buy_contract_request = {
  buy: 1,
  subscribe: 1,
  price: 10,
  parameters: {
    amount: 1,
    duration: 1,
    basis: 'stake',
    symbol: 'R_10',
    currency: 'USD',
    duration_unit: 'm',
    contract_type: 'CALL',
  },
};

const buyContractResponse = async (res) => {
  const data = JSON.parse(res.data);
  const is_sold = data.proposal_open_contract?.is_sold;
  if (data.error !== undefined) {
    console.log('Error : ', data.error.message);
    connection.removeEventListener('message', buyContractResponse, false);
    await api.disconnect();
  }

  if (data.msg_type === 'buy') {
    const sanitizedDataString = JSON.stringify(data);
    console.log(JSON.parse(sanitizedDataString));
    console.log(`Contract Id ${String(data.buy.contract_id)} \n`);
    console.log(`Details ${data.buy.longcode} \n`);
  }

  if (data.msg_type === 'proposal_open_contract') {
    // If `is_sold` is true it means our contract has finished and we can see if we won or not.
    if (is_sold) {
      const contract_status = data.proposal_open_contract.status;
      const contract_profit = data.proposal_open_contract.profit;
      console.log(`Profit ${String(contract_profit)} \n`);
      console.log(`Contract ${String(contract_status)} \n`);
      connection.removeEventListener('message', buyContractResponse, false);
      await api.disconnect();
    } else {
      // We can track the status of our contract as updates to the spot price occur.
      let entry_spot = 0;
      const entry_tick = data.proposal_open_contract.entry_tick;
      const current_spot = data.proposal_open_contract.current_spot;
      if (typeof entry_tick !== 'undefined') entry_spot = entry_tick;
      const sanitizedEntrySpot = String(entry_spot).replace(/\n|\r/g, "");
      console.log(`Entry spot ${sanitizedEntrySpot} \n`);
      console.log(`Current spot ${String(current_spot)} \n`);
      console.log(`Difference ${String(current_spot - entry_spot)} \n`);
    }
  }
};

const getAccountToken = () => {
  try {
    let selected_account_token;
    const token_data_object = localStorage.getItem('token_data_object');
    const token_data = JSON.parse(token_data_object);
    const account = account_input.value;
    Object.values(token_data).forEach((item) => {
      if (account === item.account) {
        selected_account_token = item.token;
      }
    });
    return selected_account_token;
  } catch (error) {
    const sanitizedErrorMessage = error.error?.message?.replace(/\n|\r/g, "") || "";
    console.log(sanitizedErrorMessage);
  }
};

const buyContract = async () => {
  token = getAccountToken();
  await api.authorize(token);
  connection.addEventListener('message', buyContractResponse);
  await api.buy(buy_contract_request);
};

const active_symbols_button = document.querySelector('#buyContract');
active_symbols_button.addEventListener('click', buyContract);
