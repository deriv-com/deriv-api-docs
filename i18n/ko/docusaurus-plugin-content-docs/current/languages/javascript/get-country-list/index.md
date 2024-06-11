---
title: 국가 목록 가져오기
sidebar_label: 국가 목록 보기
sidebar_position: 2
tags:
  - 국가 목록
  - 자바스크립트
keywords:
  - 국가 목록
  - 자바스크립트
description: 거래 앱에 국가 목록을 추가하여 사용자에 대한 정보를 얻으세요. 이 JavaScript API 예제를 통해 그 방법을 알아보세요.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

국가 목록을 가져오려면 다음 방법을 사용하여 열린 이벤트 리스너를 업데이트하세요:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // 밀리초 단위로, 120초와 같습니다
let interval;
// `open` 이벤트에 가입
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // 연결 유지
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});
```

이제 데이터를 렌더링하도록 `message` 이벤트 리스너를 업데이트합니다:

```js title="index.js" showLineNumbers
// `메시지` 이벤트 구독
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('국가 목록', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong 응답: ', receivedMessage.ping);
      break;
    default:
      console.log('받은 메시지: ', receivedMessage);
      break;
  }
});
```

응답은 객체여야 합니다:

```json showLineNumbers
{
  "echo_req": {
    "req_id": 1,
    "residence_list": 1
  },
  "msg_type": "residence_list",
  "req_id": 1,
  "residence_list": [
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {},
            "is_country_supported": 0
          }
        }
      },
      "phone_id": "35818",
      "text": "알란드 제도",
      "value": "ax"
    },
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {
              "driving_licence": {
                "display_name": "운전면허증"
              },
              "national_identity_card": {
                "display_name": "주민등록증"
              },
              "여권": {
                "display_name": "여권"
              }
            },
            "is_country_supported": 1
          }
        }
      },
      "phone_id": "355",
      "text": "알바니아",
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

이 통화를 통해 다음과 같은 지원 국가에 대한 유용한 정보를 얻을 수 있습니다:

- 각 국가별 '2글자' 코드
- 각 국가별 `아이덴티티` 서비스 공급자
- 국가 세금 식별자 형식(`tin_format`)
- 등

이는 거주 국가에 따라 사용자에게 신원 기반에 대한 검증된 정보를 제공하도록 요청해야 하는 계정 생성 양식에 유용할 수 있습니다.

:::주의
주소 및 납세자 번호 확인을 위해 제공된 'tin_format'을 국가에 맞게 사용하세요.
:::

다음 단계에서는 사용자의 국가가 중요합니다. 사용할 수 있는 에셋과 기능을 결정합니다.

:::tip
양식을 채우기 전에 국가 목록을 가져오는 것이 좋습니다.
:::

:::danger
IDV`및`ONFIDO\` 신원 서비스, 그 차이점 및 가능성에 대한 자세한 내용이 필요합니다.
:::

최종 코드는 다음과 같습니다:

```js title="index.js" showLineNumbers
const app_id = 1089; // 앱_id로 바꾸거나 테스트를 위해 1089로 남겨둡니다.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // 밀리초 단위로, 120초와 같습니다
let interval;

// `open` 이벤트에 가입
websocket.addEventListener('open', (event) => {
  console.log('websocket 연결 설정됨: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // 연결 유지
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// `message` 이벤트에 가입
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('국가 목록', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong 응답: ', receivedMessage.ping);
      break;
    default:
      console.log('수신 메시지: ', receivedMessage);
      break;
  }
});

// `close` 이벤트에 가입
websocket.addEventListener('close', (event) => {
  console.log('websocket connected closed: ', event);
  clearInterval(interval);
});

// `error` 이벤트에 가입
websocket.addEventListener('error', (event) => {
  console.log('웹소켓 연결에서 오류가 발생했습니다', event);
});
```
