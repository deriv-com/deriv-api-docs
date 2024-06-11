---
title: Установите соединение WebSocket
sidebar_label: Соединение WebSocket
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - websocket-connection
description: Руководство по настройке соединения WebSocket с API WebSocket в Вашем торговом приложении.
---

:::caution

Если Вы не знакомы с WebSockets, ознакомьтесь с [нашей документацией](/docs/core-concepts/websocket).

:::

### Установите соединение WebSocket

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

Далее мы создадим WebSocket-соединение с Deriv WebSocket Server, как показано ниже:

```js title="index.js" showLineNumbers
const app_id = 1089; // Замените свой app_id или оставьте 1089 для тестирования.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
```

:::info
`app_id = 1089` - это просто для тестирования. Пожалуйста, обновите его на свой собственный app_id, когда будете выпускать свое приложение в производственной среде. Пожалуйста, ознакомьтесь с [этим руководством](/docs/setting-up-a-deriv-application), чтобы создать новое приложение для себя.
:::

На данном этапе мы подключены к `WebSocket-серверу`. Но мы не получаем никаких данных. Чтобы отправить или получить данные, мы должны `подписаться` на <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">события websocket</a>.

В общем, у нас есть 4 события на `WebSocket соединениях`:

- **close**:
  Выполняется, когда соединение с WebSocket закрывается. Также доступно через свойство onclose.
- **open**:
  Выполняется, когда открывается соединение с WebSocket. Также доступно через свойство onopen.
- **message**:
  Запускается, когда данные получены через WebSocket. Также доступно через свойство onmessage.
- **error**:
  Срабатывает, когда соединение с WebSocket было закрыто из-за ошибки, например, когда не удалось отправить некоторые данные. Также доступно через свойство onerror.

Давайте добавим слушателя этих событий для нашего WebSocket-соединения.

```js title="index.js" showLineNumbers
// подпишитесь на событие `open`
websocket.addEventListener('open', (event) => {
  console.log('соединение с вебсокетом установлено: ', event);
});

// подпишитесь на событие `message`
websocket.addEventListener('message', (event) => {
  console.log('новое сообщение получено от сервера: ', event);
});

// подпишитесь на событие `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
});

// подпишитесь на событие `error`
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```

Теперь откройте файл `index.html` в нашем браузере и проверьте консоль разработчика. Вы должны увидеть только журнал для `WebSocket connection established`.

### Отправляйте и получайте данные

Наш сервер WebSocket обеспечивает функциональность <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">пинг/понг</a>. Давайте используем его в нашем демонстрационном проекте для отправки и получения данных. Измените слушателей событий для `open` и `message` следующим образом:

:::caution
Функция `send` на соединении WebSocket принимает только `string`, `ArrayBuffer`, `Blob`, `TypedArray` и `DataView`. Подробнее о них Вы можете прочитать на [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). Это означает, что если мы хотим отправить `объект`, то сначала мы должны строгать его с помощью `JSON.stringify`.
:::

```js title="index.js" showLineNumbers
// подпишитесь на событие `open`
websocket.addEventListener('open', (event) => {
  console.log('соединение с вебсокетом установлено: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// подписка на событие `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('новое сообщение получено с сервера: ', receivedMessage);
});
```

Объект `receivedMessage` будет выглядеть следующим образом:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Поздравляем :tada:

Вы только что создали свой первый демонстрационный проект с WebSockets.

:::tip
Запрос `ping` в основном используется для проверки соединения или его поддержания.
:::

### Поддерживайте соединение WebSocket

По умолчанию `WebSocket-соединения` будут закрыты, когда между ними не будет передаваться трафик в течение примерно **180 секунд**. Один из способов поддержания соединения - отправлять запросы [ping](/api-explorer#ping) с интервалом **120 секунд**. Это позволит сохранить соединение живым и активным.

Простой пример настройки может быть следующим:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // это в миллисекундах, что равно 120 секундам
let interval;
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // для поддержания соединения
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// подписываемся на событие `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});
```

Теперь, когда соединение `установлено`, мы начинаем посылать запросы `ping` с интервалом `12000 мс`.

Ваш окончательный код должен быть таким:

```js title="index.js" showLineNumbers
const app_id = 1089; // Замените свой app_id или оставьте 1089 для тестирования.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // это в миллисекундах, что равно 120 секундам
let interval;

// подпишитесь на событие `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // для поддержания соединения
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// подпишитесь на событие `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('новое сообщение получено от сервера: ', receivedMessage);
});

// подпишитесь на событие `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// подписаться на событие `error`
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```
