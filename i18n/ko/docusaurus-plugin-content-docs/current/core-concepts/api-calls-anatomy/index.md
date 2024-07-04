---
title: API 호출의 기능
hide_title: false
draft: false
sidebar_label: API 호출의 기능
sidebar_position: 1
tags:
  - 개념
  - 통화
  - 해부학
keywords:
  - 트레이딩 앱
  - API 호출
  - API 예제
description: API 호출 기능을 사용하여 트레이딩 앱의 API 호출을 설정합니다. API 예제를 통해 구독하고, 요청을 보내고, 응답 데이터를 받는 방법을 알아보세요.
---

## 구독 및 보내기

모든 API 호출에는 요청을 하고 응답을 받기 위한 보내기 기능이 있습니다. 특정 API 호출은 새로운 정보가 제공되면 애플리케이션에 업데이트를 전송할 수 있는 구독 기능도 제공합니다.

### 구독

여러 API 호출을 통해 '구독' 기능을 제공합니다. API 호출을 구독하면 이 특정 API 호출의 데이터 스트림을 지속적으로 수신하게 됩니다.

이러한 API 호출 중 일부는 자동으로 구독을 신청하고(예: [ticks](/api-explorer#ticks)), 일부는 선택적 '구독' 필드가 있습니다. 구독`필드에`1`을 전달하면 구독이 시작되고 `포기`또는`모두 삭제\\\\` API 호출을 호출하여 구독을 취소할 때까지 서버가 요청된 데이터를 계속 전송합니다.

예를 들어, [틱 기록](/api-explorer#ticks_history)을 호출하여 틱 기록 데이터를 받을 수 있습니다. 하지만 이 호출에 '구독' 옵션을 추가하면 첫 번째 응답에서 요청한 틱 기록 데이터를 받게 되며, 해당 심볼에 대해 서버에서 새 틱이 게시될 때마다 계속해서 새 응답을 받게 됩니다.

'구독'의 메시지 스트림에는 '구독'이라는 필드가 있습니다. 이것이 바로 '스트림 ID'입니다. 이 ID를 사용하면 로직에서 메시지 스트림을 식별하고 '잊어버림' 및 '모두 잊어버림' API 호출로 스트림을 중지할 수 있습니다.

'구독' 기능이 있는 API 호출로 제공된 데이터는 다른 API 호출 및 기능의 데이터 소스로 사용할 수 있습니다.

### 보내기

'보내기' 기능으로 API를 호출하면 서버는 요청된 데이터를 한 번만 다시 전송합니다. 업데이트된 데이터를 받으려면 API 호출을 다시 보내야 합니다. 일반적으로 이 메서드는 '클릭', '스크롤' 등과 같은 다른 API 호출 응답이나 UI 이벤트를 받을 때 사용됩니다.

### 잊어버림

'구독'으로 생성된 메시지 스트림을 중지하려면 올바른 '스트림 ID'를 사용하여 '잊어버림' API 호출을 호출해야 합니다. 그렇지 않으면 '모두 삭제' API 호출을 사용하여 '메서드 이름'으로 스트림을 중지할 수 있습니다.

:::caution
'잊어버리기' API 호출에 대한 자세한 내용은 API 탐색기에서 [잊어버리기](/api-explorer#forget) 및 [모두 잊어버리기](/api-explorer#forget_all)를 참조하세요.
:::

## 데이터 요청

웹소켓 연결의 요청 및 응답 흐름을 보다 쉽게 처리할 수 있도록 각 파생 웹소켓 API 호출은 표준화된 구조를 따릅니다. 캐싱, 유효성 검사, 요청 및 응답 동기화에 사용할 수 있습니다.

#### API 호출 메서드 이름

WebSocket API의 모든 '요청'에는 요청의 고유 식별자 역할을 하는 '메소드 이름' 필드가 포함되어 있습니다. 대부분의 경우 이 `메소드 이름`은 `1`이라는 숫자 값을 갖습니다. 그러나 식별자 속성이 문자열 값을 가질 수 있는 경우가 있습니다.

:::caution
API 호출 메서드 이름은 항상 필수입니다. 이 필드는 웹소켓 서버에서 가져올 데이터를 결정합니다.
:::

### 필수 필드

각 요청 데이터에는 반드시 제공해야 하는 필수 필드가 있으며, 선택 필드도 포함될 수 있습니다. '거주지 목록'의 예를 통해 이를 살펴보겠습니다.

'거주지 목록' 호출은 계좌 개설 양식을 채우는 데 적합한 국가 목록과 2글자 국가 코드를 반환합니다.

이 호출의 요청 데이터는 다음과 같습니다:

```ts showLineNumbers
{
  residence_list: 1; // Api Call Method Name
  passthrough?: object; // Optional
  req_id?: number; // Optional
}
```

거주지_목록`필드는 호출의`메소드 이름\\\\`이며 필수 입력 항목입니다. 보내려는 요청 유형과 관련된 다른 필수 입력란이 있을 수 있습니다. '거주지 목록' 및 기타 API 호출에 대한 자세한 내용은 [API 탐색기](/api-explorer#residence_list)에서 확인하실 수 있습니다.

### 선택 필드

모든 통화에는 여러 개의 '옵션' 필드도 있습니다. 패스스루`와 `req_id\\\\`는 항상 요청 데이터의 일부이지만 옵트아웃하여 사용하지 않도록 선택할 수 있습니다.

#### '패스스루' 필드

이 필드에 전달한 내용은 무엇이든 '응답' 객체 안에 다시 반환됩니다. 이는 '요청'과 '응답'에 대한 상태 저장 흐름을 시뮬레이션해야 할 때 유용할 수 있습니다.

#### 요청_ID\\` 필드

요청에 '태그'를 지정하고 `WebSocket` 호출을 통해 전달해야 할 수도 있습니다. 이 필드에 '숫자'를 전달하면 됩니다. '요청'을 '응답'에 매핑해야 할 때 유용하게 사용할 수 있습니다.

:::caution
각 API 호출과 관련된 추가 선택 필드에 대해 알아보려면 [API 탐색기](/api-explorer)를 참조하세요.
:::

## 응답 데이터

호출에 대한 응답을 받으면 실제 데이터가 들어 있는 '메서드 이름'과 같은 이름의 '필드'가 있습니다.

거주지 목록\\\\` 호출에 대한 응답입니다:

```js showLineNumbers
{
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  residence_list: [
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
                            }
                        },
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
            "tin_format": [
                "^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"
            ],
            "value": "al"
        },
        // ....
  ],
};
```

여기서 `residence_list`는 `메소드 이름`이며, 요청하신 실제 데이터가 포함되어 있습니다. 간결하게 하기 위해 나머지 배열은 포함하지 않았습니다. 실제 응답은 [여기](/api-explorer#residence_list)에서 확인할 수 있습니다.

#### `echo_req` 필드

이 `필드`에는 서버로 전송한 정확한 `요청 데이터`가 포함되어 있습니다.

#### 메시지 유형\\\\` 필드

이 `필드`는 웹소켓 연결의 메시지 이벤트에서 어떤 `메시지` 데이터를 수신하고 있는지 확인하는 데 도움이 됩니다. 예를 들어, '자바스크립트'의 웹소켓 연결에 대한 `온메시지` 이벤트 핸들러가 될 수 있습니다:

```js showLineNumbers
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);

  switch (receivedMessage.msg_type) {
    case "residence_list":
      console.log("거주지 목록은 : ",receivedMessage.residence_list)
      break;
    case "other_request_identifier"
      console.log("the response", receivedMessage.some_other_request_identifier)
    default:
      console.log("receivedMessage", receivedMessage)
      break;
  }
}
```

#### 요청_ID\` 필드

이것은 '요청 데이터'에 전달되는 '옵션'으로, '유효성 검사', '동기화', '캐싱' 등에 사용할 수 있습니다.

:::tip
메시지 유형\\\\`은 응답 데이터에 항상 존재합니다.
:::
