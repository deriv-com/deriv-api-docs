import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

const ticks_history_request = {
  ticks_history: 'R_50',
  adjust_start_time: 1,
  count: 10,
  end: 'latest',
  start: 1,
  style: 'ticks',
};

const ticks_request = {
  ...ticks_history_request,
  subscribe: 1,
};

const tickSubscriber = () => api.subscribe(ticks_request);

const ticksHistoryResponse = async (res) => {
  function sanitizeLogMessage(message) {
    if (typeof message !== 'string') return '';
    return message.replace(/[\r\n]+/g, ' ');
  }

  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    console.log('Error : ', sanitizeLogMessage(data.error.message));
    connection.removeEventListener('message', ticksHistoryResponse, false);
    await api.disconnect();
  }
  if (data.msg_type === 'history') {
    console.log(sanitizeLogMessage(JSON.stringify(data.history)));
  }
  connection.removeEventListener('message', ticksHistoryResponse, false);
};

const ticksResponse = async (res) => {
  function sanitizeLogMessage(message) {
    if (typeof message !== 'string') return '';
    return message.replace(/[\r\n]+/g, ' ');
  }

  const data = JSON.parse(res.data);
  // This example returns an object with a selected amount of past ticks.
  if (data.error !== undefined) {
    console.log('Error : ', sanitizeLogMessage(data.error.message));
    connection.removeEventListener('message', ticksResponse, false);
    await api.disconnect();
  }
  // Allows you to monitor ticks.
  if (data.msg_type === 'tick') {
    console.log(sanitizeLogMessage(JSON.stringify(data.tick)));
  }
};

const subscribeTicks = async () => {
  connection.addEventListener('message', ticksResponse);
  await tickSubscriber();
};

const unsubscribeTicks = async () => {
  connection.removeEventListener('message', ticksResponse, false);
  await tickSubscriber().unsubscribe();
};

const getTicksHistory = async () => {
  connection.addEventListener('message', ticksHistoryResponse);
  await api.ticksHistory(ticks_history_request);
};

const subscribe_ticks_button = document.querySelector('#ticks');
subscribe_ticks_button.addEventListener('click', subscribeTicks);

const unsubscribe_ticks_button = document.querySelector('#ticks-unsubscribe');
unsubscribe_ticks_button.addEventListener('click', unsubscribeTicks);

const ticks_history_button = document.querySelector('#ticks-history');
ticks_history_button.addEventListener('click', getTicksHistory);
