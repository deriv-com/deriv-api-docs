const url = new URL(window.location.href);
const bc = new BroadcastChannel('auth');
const login_token = url.searchParams.get('token1');
const login_button = document.querySelector('#loginButton');
const authorized_message = document.querySelector('#authorized');
const unauthorized_message = document.querySelector('#unauthorized');
const expired_contracts_button = document.querySelector('#expiredContracts');
var incognito = true;

const browserCheck = () => {
  var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
  fs(
    window.TEMPORARY,
    100,
    function (fs) {},
    function (e) {
      alert(
        'You are in Incognito Mode. The Log in functionality will not work in the Code Sandbox',
      );
      incognito = false;
    },
  );
};

browserCheck();
const updateElementStyles = () => {
  login_button.style.display = 'none';
  authorized_message.style.display = 'inline-block';
  unauthorized_message.style.display = 'none';
  expired_contracts_button.style.opacity = '1';
  expired_contracts_button.style.pointerEvents = 'auto';
  expired_contracts_button.style.cursor = 'pointer';
};

const buttonResponse = () => {
  browserCheck();
  if (incognito === true) {
    window.open(
      'https://oauth.deriv.com/oauth2/authorize?app_id=32404&l=EN&brand=deriv',
      'newwindow',
      'width=320,height=800',
    );
  }
};

login_button.addEventListener('click', buttonResponse);

window.onload = () => {
  const localstore_token = localStorage.getItem('login_token');
  if (localstore_token.length >= 0) {
    updateElementStyles();
  }
};

bc.onmessage = function (event) {
  if (event.data.login_token) {
    bc.postMessage('close');
    localStorage.setItem('login_token', event.data.login_token);
  }
  if (event.data === 'close') {
    bc.postMessage('login_success');
    window.close();
  }
  if (event.data === 'login_success') {
    updateElementStyles();
  }
};

if (login_token) {
  bc.postMessage({ login_token });
}
