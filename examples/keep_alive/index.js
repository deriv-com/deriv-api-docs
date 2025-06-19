import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

const api = new DerivAPIBasic({ connection });

// Store the subscription reference
let proposalSubscription;

const proposal = () => {
  proposalSubscription = api.subscribe({
    proposal: 1,
    subscribe: 1,
    amount: 10,
    basis: 'payout',
    contract_type: 'CALL',
    currency: 'USD',
    duration: 1,
    duration_unit: 'm',
    symbol: 'R_100',
    barrier: '+0.1',
  });
  
  return proposalSubscription;
};

// Send a ping every 30 seconds to keep the connection alive
// Needs to use the same websocket connection as the one you want to maintain.
const ping = () => {
  setInterval(() => {
    api.ping();
  }, 30000);
};

const wsResponse = async (res) => {
  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    const sanitizedErrorMessage = data.error?.message?.replace(/\n|\r/g, "") || "";
    console.log('Error: %s ', sanitizedErrorMessage);
    connection.removeEventListener('message', wsResponse, false);
    await api.disconnect();
  } else if (data.msg_type === 'proposal') {
    console.log('Details: %s', String(data.proposal.longcode));
    console.log('Ask Price: %s', String(data.proposal.display_value));
    // Sanitize numeric values as well
    console.log('Payout: %f', String(data.proposal.payout));
    console.log('Spot: %f', String(data.proposal.spot));
  } else if (data.msg_type === 'ping') {
    console.log('ping');
  }
};

const checkSignal = () => {
  proposal();
  ping();
  connection.addEventListener('message', wsResponse);
};

const endCall = () => {
  connection.removeEventListener('message', wsResponse, false);
  
  // Check if we have an active subscription before trying to unsubscribe
  if (proposalSubscription) {
    proposalSubscription.unsubscribe();
  }
};

const keep_alive_button = document.querySelector('#keep_alive');
keep_alive_button.addEventListener('click', checkSignal);

const end_call_button = document.querySelector('#end_call');
end_call_button.addEventListener('click', endCall);
