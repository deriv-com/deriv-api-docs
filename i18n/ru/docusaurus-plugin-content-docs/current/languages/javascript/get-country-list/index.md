---
title: Получите список стран
sidebar_label: Получите список стран
sidebar_position: 2
tags:
  - список_стран
  - javascript
keywords:
  - список_стран
  - javascript
description: Получите информацию о своих пользователях, добавив список стран в свое торговое приложение. Узнайте, как это сделать с помощью этого примера JavaScript API.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Чтобы получить список стран, обновите слушатель события открытия, используя следующий подход:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // это в миллисекундах, что равно 120 секундам
let interval;
// подписываемся на событие `open`
websocket.addEventListener('open', (event) => {
  console.log('соединение с вебсокетом установлено: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // для поддержания соединения
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});
```

Теперь обновите слушатель события `message`, чтобы отобразить данные:

```js title="index.js" showLineNumbers
// подпишитесь на событие `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('list of countries', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong response: ', receivedMessage.ping);
      break;
    default:
      console.log('received message: ', receivedMessage);
      break;
  }
});
```

Ответом должен быть объект:

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
      } },
      "phone_idd": "35818",
      "text": "Аландские острова",
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
                "display_name": "Водительское удостоверение"
              },
              "national_identity_card": {
                "display_name": "National Identity Card"
              },
              "passport": {
                "display_name": "Passport"
              }
            } },
            "is_country_supported": 1
          }
        }
      } },
      "phone_idd": "355",
      "text": "Албания",
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

С помощью этого звонка Вы получите полезную информацию о поддерживаемых странах, например:

- Двухбуквенный код для каждой страны
- Поставщики услуг `Identity` для каждой страны
- Формат налогового идентификатора страны (`tin_format`)
- и т.д.

Это может быть полезно для форм создания учетных записей, в которых Вам необходимо попросить пользователей предоставить подтвержденную информацию об их идентификационной базе, в зависимости от страны проживания.

:::предостережение
Для проверки адреса и налогового идентификатора, пожалуйста, используйте предоставленный 'tin_format' для страны.
:::

Страна пользователя важна для Ваших дальнейших действий. Он определяет, какие активы и функции они могут использовать.

:::tip
Лучше получить список стран перед заполнением формы.
:::

:::danger
Вам понадобится подробная информация о сервисах идентификации `IDV` и `ONFIDO`, их различиях и возможностях.
:::

Ваш окончательный код будет таким:

```js title="index.js" showLineNumbers
const app_id = 1089; // Замените свой app_id или оставьте 1089 для тестирования.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // это в миллисекундах, что равно 120 секундам
let interval;

// подпишитесь на событие `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // для поддержания соединения
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// подписываемся на событие `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('список стран', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong response: ', receivedMessage.ping);
      break;
    default:
      console.log('received message: ', receivedMessage);
      break;
  }
});

// подпишитесь на событие `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// подпишитесь на событие `error`
websocket.addEventListener('error', (event) => {
  console.log('произошла ошибка в нашем соединении websocket', event);
});
```
