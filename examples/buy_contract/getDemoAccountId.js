
const bc = new BroadcastChannel('auth');
const account_input = document.querySelector('#accountInput');

const getDemoAccountId = () => {
  try {
    const token_data_object = localStorage.getItem('token_data_object');
    const token_data = JSON.parse(token_data_object);
    Object.values(token_data).forEach((item) => {
      if (item.account.includes('VRTC')) {
        account_input.value = item.account;
      }
    });
  } catch (error) {
    const errorMessage = error.error?.message || '';
    console.log(errorMessage);
  }
};

bc.onmessage = function (event) {
  if (event.data === 'login_success') {
    getDemoAccountId();
  }
};
