---
title: 웹소켓
hide_title: false
draft: false
sidebar_label: 웹소켓
sidebar_position: 0
tags:
  - 개념
  - 웹소켓
keywords:
  - 트레이딩 앱
  - 웹소켓 프로토콜
  - 웹소켓 연결
description: 웹소켓 프로토콜과 웹소켓 연결에 대해 알아보고 트레이딩 앱에서 데이터 교환을 활성화할 수 있도록 통합하는 방법을 알아보세요.
---

## 웹소켓이란 무엇인가요?

RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455) 사양에 설명된 `WebSocket` 프로토콜은 영구 연결을 통해 브라우저와 서버 간에 데이터를 교환하는 방법을 제공합니다. 데이터는 연결을 끊거나 추가 HTTP 요청 없이 '패킷'으로 양방향으로 전달할 수 있습니다.

WebSocket은 실시간 거래 시스템 등 지속적인 데이터 교환이 필요한 서비스에 특히 유용합니다.

## 간단한 예

웹소켓 연결을 열려면 URL에 특수 프로토콜 `ws` 또는 `wss`를 사용하여 `새 웹소켓`을 만들어야 합니다. 다음은 '자바스크립트'에서 이를 수행하는 방법입니다:

```js
let socket = 새 WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

반면에 `ws://` 데이터는 암호화되지 않으며 중개자가 볼 수 있습니다. 오래된 프록시 서버는 "이상한" 헤더를 발견하고 연결을 종료할 수 있습니다.

'wss://'는 HTTPS가 HTTP over TLS인 것과 유사하게 WebSocket over TLS를 의미합니다. 전송 보안 계층을 사용하면 발신자가 데이터를 암호화하고 수신자가 암호를 해독합니다. 즉, 암호화된 데이터 패킷은 검사 없이 프록시를 성공적으로 통과할 수 있습니다.
:::

소켓이 생성되면 소켓에서 이벤트를 수신해야 합니다. 총 4개의 이벤트가 있습니다:

- 열기 - 연결 설정
- 메시지 - 수신된 데이터
- 오류 - 웹소켓 오류
- 닫기 - 연결이 닫힘

메시지 전송은 socket.send(data)를 통해 할 수 있습니다.

다음은 '자바스크립트'의 예시입니다:

```js showLineNumbers
const app_id = 1089; // 테스트를 위해 app_id로 바꾸거나 1089로 남겨둡니다.
const socket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

socket.onopen = function (e) {
  console.log('[open] 연결 설정됨');
  console.log('서버로 전송 중');
  const sendMessage = JSON.stringify({ ping: 1 });
  socket.send(sendMessage);
};

socket.onmessage = function (event) {
  console.log(`[message] 서버로부터 받은 데이터: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    consloe.log(`[close] 연결이 깨끗하게 닫혔습니다, code=${event.code} reason=${event.reason}`);
  } else {
    // 예: 서버 프로세스 종료 또는 네트워크 다운
    // 이 경우 event.code는 보통 1006입니다
    console.log('[close] 연결이 끊어졌습니다');
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};
```

## 웹소켓은 왜 필요하며 언제 피해야 할까요?

웹소켓은 필수적인 클라이언트-서버 통신 도구입니다. 이러한 기능의 잠재력을 최대한 활용하려면 어떻게 도움이 될 수 있는지, 언제 사용하지 않는 것이 가장 좋은지 이해하는 것이 중요합니다. 다음 섹션에서 자세히 설명합니다.

다음과 같은 경우 웹소켓을 사용합니다:

1. 실시간 웹 애플리케이션을 개발하는 경우.
   웹소켓의 가장 일반적인 용도는 클라이언트 측에서 데이터를 지속적으로 표시하는 실시간 애플리케이션 개발입니다. 백엔드 서버가 이 데이터를 지속적으로 전송하므로 웹소켓을 사용하면 이미 열려 있는 연결에서 이 데이터를 중단 없이 푸시하거나 전송할 수 있습니다. 웹소켓을 사용하면 이러한 데이터 전송이 빨라지고 애플리케이션의 성능을 활용할 수 있습니다.
2. Deriv.
   여기서 WebSocket은 배포된 백엔드 서버가 클라이언트로 전송하는 데이터 처리를 지원합니다.
3. 채팅 애플리케이션을 만들 때.
   채팅 애플리케이션 개발자는 일회성 교환 및 메시지 게시/방송과 같은 작업에서 도움을 받기 위해 WebSocket을 호출합니다. 메시지 송수신에 동일한 웹소켓 연결이 사용되므로 커뮤니케이션이 쉽고 빨라집니다.

이제 웹소켓을 사용해야 하는 위치를 확인했으니 이제 웹소켓을 피하는 것이 가장 좋은 위치를 살펴봅시다. 이렇게 하면 불필요한 운영상의 번거로움을 피할 수 있습니다.

오래된 데이터나 한 번만 처리해야 하는 데이터를 가져오는 데만 필요한 경우에는 웹소켓을 사용해서는 안 됩니다. 이러한 경우 HTTP 프로토콜을 사용하는 것이 현명한 선택입니다.

## 웹소켓과 HTTP

애플리케이션 통신에 HTTP와 웹소켓 프로토콜이 모두 사용되기 때문에 사람들은 종종 혼란스러워하고 어느 쪽을 선택해야 할지 어려워합니다.

앞서 설명한 것처럼 WebSocket은 프레임형 양방향 프로토콜입니다. 반면에 HTTP는 TCP 프로토콜보다 상위에서 작동하는 단방향 프로토콜입니다.

웹소켓 프로토콜은 지속적인 데이터 전송을 지원할 수 있기 때문에 실시간 애플리케이션 개발에 주로 사용됩니다. HTTP는 상태 비저장형이며 [RESTful](https://de.wikipedia.org/wiki/Representational_State_Transfer) 및 [SOAP](https://de.wikipedia.org/wiki/SOAP) 애플리케이션 개발에 사용됩니다. SOAP는 여전히 구현에 HTTP를 사용할 수 있지만 REST는 널리 보급되어 사용되고 있습니다.

WebSocket에서는 양쪽 끝에서 통신이 이루어지므로 더 빠른 프로토콜입니다. HTTP에서는 연결이 한쪽 끝에서 이루어지기 때문에 웹소켓보다 약간 느립니다.

WebSocket은 통합 TCP 연결을 사용하며 연결을 종료하려면 한쪽 당사자가 필요합니다. 연결이 해제될 때까지 연결은 활성 상태로 유지됩니다. HTTP는 별도의 요청에 대해 별도의 연결을 구축해야 합니다. 요청이 완료되면 연결이 자동으로 끊어집니다.

## 웹소켓 연결은 어떻게 설정되나요?

이 프로세스는 새 스키마(ws 또는 wss)를 사용하는 웹소켓 핸드셰이크로 시작됩니다. 이해를 돕기 위해 각각 HTTP와 보안 HTTP(HTTPS)와 동일하다고 생각하시면 됩니다.

이 체계를 사용하면 서버와 클라이언트는 표준 웹소켓 연결 프로토콜을 따라야 합니다. 웹소켓 연결 설정은 연결과 같은 몇 가지 헤더를 포함하는 HTTP 요청 업그레이드로 시작됩니다: 업그레이드, 업그레이드: 웹소켓, Sec-WebSocket- 키 등과 같은 헤더가 있습니다.

이 연결이 설정되는 방법은 다음과 같습니다:

1. **요청 :** 연결 업그레이드 헤더는 웹소켓 핸드셰이크를 나타내며, Sec-WebSocket-Key는 Base64로 인코딩된 임의의 값을 사용합니다. 이 값은 모든 웹소켓 핸드셰이크 중에 임의로 생성됩니다. 위의 내용 외에도 키 헤더도 이 요청의 일부입니다.

위에 나열된 헤더를 결합하면 HTTP GET 요청을 구성합니다. 비슷한 데이터가 들어 있을 것입니다:

```
GET ws://websocketexample.com:8181/ HTTP/1.1
Host: localhost:8181
연결: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: b6gjhT32u488lpuRwKaOWs==
```

Sec-WebSocket-Version을 명확히 설명하기 위해 클라이언트에 사용할 수 있는 웹소켓 프로토콜 버전을 설명할 수 있습니다.

2. **응답:** 응답 헤더인 Sec-WebSocket-Accept에는 Sec-WebSocket-Key 요청 헤더에 제출된 나머지 값이 포함됩니다. 이는 특정 프로토콜 사양과 연결되어 있으며 잘못된 정보를 차단하기 위해 널리 사용됩니다. 즉, API 보안을 강화하고 잘못 구성된 서버로 인해 애플리케이션 개발 과정에서 실수가 발생하는 것을 방지합니다.

이전에 전송한 요청이 성공하면 아래에 언급된 텍스트 시퀀스와 유사한 응답이 수신됩니다:

```
HTTP/1.1 101 스위칭 프로토콜
업그레이드: 웹소켓
연결: 업그레이드:
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## 참조

- \*\* [웹소켓 API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)\*\*
- \*\* [웹소켓 - 자바스크립트 정보](https://javascript.info/websocket)\*\*
