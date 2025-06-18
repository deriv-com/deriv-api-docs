import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

const proposal_request = {
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
};

const proposalResponse = async (res) => {
  function sanitizeLogMessage(message) {
    if (typeof message !== 'string') return '';
    return message.replace(/[\r\n]+/g, ' ');
  }

  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    console.log('Error: %s ', sanitizeLogMessage(data.error.message));
    connection.removeEventListener('message', proposalResponse, false);
    await api.disconnect();
  } else if (data.msg_type === 'proposal') {
    console.log('Details: %s', sanitizeLogMessage(data.proposal.longcode));
    console.log('Ask Price: %s', sanitizeLogMessage(String(data.proposal.display_value)));
    console.log('Payout: %f', data.proposal.payout);
    console.log('Spot: %f', data.proposal.spot);
  }
};

const getProposal = async () => {
  connection.addEventListener('message', proposalResponse);
  await api.proposal(proposal_request);
};

const unsubscribeProposal = () => {
  connection.removeEventListener('message', proposalResponse, false);
};

const proposal = document.querySelector('#proposal');
proposal.addEventListener('click', getProposal);

const proposal_unsubscribe = document.querySelector('#proposal-unsubscribe');
proposal_unsubscribe.addEventListener('click', unsubscribeProposal);
