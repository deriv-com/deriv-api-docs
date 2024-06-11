---
title: 웹소켓 연결 설정
sidebar_label: WebSocket 연결
sidebar_position: 1
tags:
  - 자바스크립트
keywords:
  - js
  - 웹소켓-연결
description: 트레이딩 앱에서 웹소켓 API에 대한 웹소켓 연결을 설정하는 방법에 대한 안내서입니다.
---

:::caution

웹소켓에 익숙하지 않으시다면 [문서](/docs/core-concepts/websocket)를 확인하시기 바랍니다.

:::

### 웹소켓 연결 설정

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

다음으로 아래와 같이 파생 웹소켓 서버에 대한 웹소켓 연결을 생성합니다:

```js title="index.js" showLineNumbers
const app_id = 1089; // 앱_id로 바꾸거나 테스트를 위해 1089로 남겨둡니다.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
```

:::info
'app_id = 1089'는 테스트 용도로만 사용됩니다. 프로덕션 환경에서 애플리케이션을 릴리스할 때 고유한 app_id로 업데이트하세요. 새 앱을 직접 만들려면 [이 가이드](/docs/setting-up-a-deriv-application)를 확인하세요.
:::

이 시점에서 우리는 '웹소켓 서버'에 연결됩니다. 그러나 당사는 어떠한 데이터도 수신하지 않습니다. 데이터를 보내거나 받으려면 <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">웹소켓 이벤트에</a>'구독'해야 합니다.

일반적으로 `웹소켓 연결`에는 4개의 이벤트가 있습니다:

- **close**:
  웹소켓과의 연결이 닫힐 때 발생합니다. 가까운 부동산을 통해서도 이용할 수 있습니다.
- **open**:
  웹소켓과의 연결이 열릴 때 발생합니다. 온오픈 프로퍼티를 통해서도 이용 가능합니다.
- **메시지**:
  웹소켓을 통해 데이터가 수신될 때 발생합니다. 온메시지 속성을 통해서도 사용할 수 있습니다.
- **오류**:
  일부 데이터를 전송할 수 없는 경우와 같이 오류로 인해 웹소켓과의 연결이 닫혔을 때 발생하는 이벤트입니다. onerror 속성을 통해서도 사용할 수 있습니다.

웹소켓 연결에 이러한 이벤트에 대한 이벤트 리스너를 추가해 보겠습니다.

```js title="index.js" showLineNumbers
//
websocket.addEventListener('open', (event) => {
  console.log('websocket 연결 설정됨: ', event);
});

// `message` 이벤트 구독
websocket.addEventListener('message', (event) => {
  console.log('서버로부터 새 메시지 수신: ', event);
});

// `close` 이벤트 구독
websocket.addEventListener('close', (event) => {
  console.log('웹소켓 연결이 종료되었습니다: ', event);
});

// `error` 이벤트에 가입
websocket.addEventListener('error', (event) => {
  console.log('웹소켓 연결에서 오류가 발생했습니다', event);
});
```

이제 브라우저에서 `index.html` 파일을 열고 개발자 콘솔을 확인합니다. '웹소켓 연결이 설정됨'에 대한 로그만 표시되어야 합니다.

### 데이터 전송 및 수신

웹소켓 서버는 <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">핑/퐁</a> 기능을 제공합니다. 데모 프로젝트에서 이 기능을 사용하여 데이터를 주고받도록 해보겠습니다. 아래와 같이 `open` 및 `메시지`에 대한 이벤트 리스너를 변경합니다:

:::caution
웹소켓 연결의 'send' 함수는 '문자열', '배열 버퍼', '블롭', '유형 배열' 및 '데이터 뷰'만 수신합니다. 자세한 내용은 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send)에서 확인할 수 있습니다. 즉, `객체`를 보내려면 먼저 `JSON.stringify`로 문자열화해야 합니다.
:::

```js title="index.js" showLineNumbers
//
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// `메시지` 이벤트 구독
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('서버로부터 새 메시지 수신: ', receivedMessage);
});
```

수신된 메시지\`는 이와 같은 객체가 될 것입니다:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

축하드립니다 :tada:

방금 웹소켓으로 첫 번째 데모 프로젝트를 만들었습니다.

:::tip
'핑' 요청은 주로 연결을 테스트하거나 연결을 유지하는 데 사용됩니다.
:::

### 웹소켓 연결 유지

기본적으로 '웹소켓 연결'은 약 **180초** 동안 트래픽이 전송되지 않으면 닫힙니다. 연결을 유지하는 한 가지 방법은 **120초** 간격으로 [ping](/api-explorer#ping) 요청을 보내는 것입니다. 이렇게 하면 연결이 활성 상태로 유지됩니다.

간단한 설정 예는 다음과 같습니다:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // 밀리초 단위로, 120초와 같습니다
let interval;
websocket.addEventListener('open', (event) => {
  console.log('websocket 연결 설정: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // 연결 유지
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// `close` 이벤트에 가입
websocket.addEventListener('close', (event) => {
  console.log('websocket connected closed: ', event);
  clearInterval(interval);
});
```

이제 연결이 '설정'되면 '12000ms' 간격으로 '핑' 요청을 보내기 시작합니다.

최종 코드는 다음과 같아야 합니다:

```js title="index.js" showLineNumbers
const app_id = 1089; // 귀하의 app_id로 바꾸거나 테스트를 위해 1089로 남겨두세요.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // 밀리초 단위로, 120초와 같습니다
let interval;

// `open` 이벤트에 가입하세요
websocket.addEventListener('open', (event) => {
  console.log('websocket 연결 설정됨: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // 연결 유지
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// `message` 이벤트에 가입
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('서버로부터 받은 새 메시지: ', receivedMessage);
});

// `close` 이벤트에 가입
websocket.addEventListener('close', (event) => {
  console.log('웹소켓 연결 종료: ', event);
  clearInterval(interval);
});

// `error` 이벤트 구독
websocket.addEventListener('error', (event) => {
  console.log('웹소켓 연결에서 오류가 발생했습니다', event);
});
```
