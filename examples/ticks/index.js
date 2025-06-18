import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';
import { sanitizeLogMessage } from '../../src/utils/logSanitizer.js';

const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });
const tickStream = () => api.subscribe({ ticks: 'R_100' });

const tickResponse = async (res) => {
  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    const sanitizedErrorMessage = data.error?.message?.replace(/\n|\r/g, "") || "";
    console.log('Error : ', sanitizeLogMessage(sanitizedErrorMessage));
    connection.removeEventListener('message', tickResponse, false);
    await api.disconnect();
  }
  if (data.msg_type === 'tick') {
    const sanitizedDataString = sanitizeLogMessage(JSON.stringify(data.tick));
    console.log(JSON.parse(sanitizedDataString));
  }
};

const subscribeTicks = async () => {
  await tickStream();
  connection.addEventListener('message', tickResponse);
};

const unsubscribeTicks = () => {
  connection.removeEventListener('message', tickResponse, false);
  tickStream().unsubscribe();
};

const ticks_button = document.querySelector('#ticks');
ticks_button.addEventListener('click', subscribeTicks);

const unsubscribe_ticks_button = document.querySelector('#ticks-unsubscribe');
unsubscribe_ticks_button.addEventListener('click', unsubscribeTicks);
