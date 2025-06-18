
const url = new URL(window.location.href);
const token1 = url.searchParams.get('token1');

const login_button = document.getElementById('loginButton');
const buttonResponse = () => {
  window.open(
    'https://oauth.deriv.com/oauth2/authorize?app_id=32396&l=EN&brand=deriv',
    'newwindow',
    'width=320,height=800',
  );
};
login_button.addEventListener('click', buttonResponse);
const bc = new BroadcastChannel('auth');
bc.onmessage = function (event) {
  if (event.data.token1) {
    bc.postMessage('close');
    localStorage.setItem('token1', event.data.token1);
    console.log('Successfully authorized!');
  }
  if (event.data === 'close') {
    window.close();
  }
};
if (token1) {
  bc.postMessage({ token1 });
}
