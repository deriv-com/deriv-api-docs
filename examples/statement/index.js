import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 32462; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });
// WARNING: Be careful to not leak your token here in the sandbox.
let token = '';

const statement_request = {
  statement: 1,
  description: 1,
  limit: 10,
  offset: 25,
};

const statementResponse = async (res) => {
  function sanitizeLogMessage(message) {
    if (typeof message !== 'string') return '';
    return message.replace(/[\r\n]+/g, ' ');
  }

  const data = JSON.parse(res.data);

  if (data.error !== undefined) {
    console.log('Error : ', sanitizeLogMessage(data.error.message));
    connection.removeEventListener('message', statementResponse, false);
    await api.disconnect();
  }

  if (data.msg_type === 'statement') {
    console.log('Statement Object:', sanitizeLogMessage(JSON.stringify(data.statement)));
  }

  connection.removeEventListener('message', statementResponse, false);
};

const getStatement = async () => {
  token = localStorage.getItem('login_token');
  await api.authorize(token);
  connection.addEventListener('message', statementResponse);
  await api.statement(statement_request);
};

const symbol_button = document.querySelector('#statement');
symbol_button.addEventListener('click', getStatement);
