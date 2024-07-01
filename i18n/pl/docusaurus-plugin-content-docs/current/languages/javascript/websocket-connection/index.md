---
title: Konfigurowanie połączenia WebSocket
sidebar_label: Połączenie WebSocket
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - websocket-connection
description: Przewodnik, jak skonfigurować połączenie WebSocket z interfejsem API WebSocket w aplikacji handlowej.
---

:::caution

Jeśli nie znasz WebSockets, sprawdź [naszą dokumentację] (/docs/core-concepts/websocket).

:::

### Konfigurowanie połączenia WebSocket

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

Następnie utworzymy połączenie WebSocket z serwerem Deriv WebSocket, jak widać poniżej:

```js title="index.js" showLineNumbers
const app_id = 1089;//Zastąp na swój app_id lub pozostaw jako 1089 do testowania.
const websocket = nowy WebSocket (`wss: //ws.derivws.com/websockets/v3? app_id =${app_id}`);
```

:::info
`app_id = 1089` służy tylko do celów testowych. Podczas publikowania aplikacji w środowisku produkcyjnym należy go zaktualizować za pomocą własnego identyfikatora app_id. Sprawdź [ten przewodnik] (/docs/setting-up-a-deriv-application), aby utworzyć nową aplikację dla siebie.
:::

W tym momencie jesteśmy połączeni z `serwerem WebSocket`. Ale nie otrzymujemy żadnych danych. Aby wysłać lub odbierać dane, musimy „subskrybować” wydarzenia <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">websocket</a>.

Ogólnie rzecz biorąc, mamy 4 zdarzenia na `WebSocket connections`:

- **zamknij**:
  Wywoływane, gdy połączenie z WebSocket jest zamknięte. Dostępne również za pośrednictwem obiektu Onclose.
- **otwórz**:
  Uruchomione po otwarciu połączenia z WebSocket. Dostępne również za pośrednictwem nieruchomości onopen.
- **wiadomość**:
  Wywoływane, gdy dane są odbierane przez WebSocket. Dostępne również za pośrednictwem właściwości onmessage.
- **error**:
  Wywołano, gdy połączenie z WebSocket zostało zamknięte z powodu błędu, na przykład gdy niektóre dane nie mogą zostać wysłane. Dostępne również za pośrednictwem właściwości onerror.

Dodajmy słuchacz zdarzeń dla tych zdarzeń w naszym połączeniu WebSocket.

```js title="index.js" showLineNumbers
//subskrybuj wydarzenie `open`
WebSocket.addEventListener ('open', (event) => {
  console.log ('nawiązano połączenie websocket: ', event);
});

//subskrybuj wydarzenie `message`
WebSocket.addEventListener (' message ', (event) => {
  console.log ('nowa wiadomość otrzymana z serwera:', event);
});

//subskrybuj zdarzenie `close`
WebSocket.addEventListener ('close', (event) => {
  console.log ('websocket connectized closed: ', event);
});

//subskrybuj zdarzenie `error`
WebSocket.addEventListener (' error ', (event) => {
  console.log ('zdarza się błąd w naszym połączeniu websocket, event);
});
```

Teraz otwórz plik `index.html` w naszej przeglądarce i sprawdź konsolę programisty. Powinieneś zobaczyć tylko dziennik „Ustanowione połączenie WebSocket”.

### Wysyłanie i odbieranie danych

Nasz serwer WebSocket zapewnia funkcjonalność <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a> . Wykorzystajmy go w naszym projekcie demonstracyjnym do wysyłania i odbierania danych. Zmień wyświetlacze zdarzeń dla `open` i `message` jak poniżej:

:::caution
Funkcja `send` w połączeniu WebSocket otrzymuje tylko `string`, `ArrayBuffer`, `Blob`, `TypeDarray` i `DataView`. Możesz przeczytać więcej o nich na [MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). Oznacza to, że jeśli chcemy wysłać „obiekt”, musimy najpierw go stringifikować za pomocą `JSON.stringify`.
:::

```js title="index.js" showLineNumbers
//subskrybuj wydarzenie `open`
WebSocket.addEventListener ('open', (event) => {
  console.log ('nawiązano połączenie websocket: ', zdarzenie);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);
});

//subskrybuj wydarzenie `message`
WebSocket.addEventListener ( 'message', (event) => {
  const receivedMessage = JSON.parse (event.data);
  console.log ('nowa wiadomość odebrana z serwera: ', receivedMessage);
});
```

„ReceivedMessage” byłby obiektem w następujący sposób:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Gratulacje :tada:

Właśnie stworzyłeś swój pierwszy projekt demonstracyjny z WebSockets.

:::tip
Żądanie „ping” jest najczęściej używane do przetestowania połączenia lub utrzymania go przy życiu.
:::

### Utrzymuj połączenie WebSocket przy życiu

Domyślnie „połączenia WebSocket” zostaną zamknięte, gdy nie będzie wysyłany ruch między nimi przez około 180 sekund\*\*. Jednym ze sposobów utrzymania połączenia przy życiu jest wysyłanie żądań [ping] (/api-explorer #ping) w odstępach wynosząch**120 sekund**. Dzięki temu połączenie będzie żywe i aktywne.

Prosty przykład konfiguracji byłby następujący:

```js title="index.js" showLineNumbers
const ping_interval = 12000;//jest w milisekundach, co równa się 120 sekund
let interval;
websocket.addEventListener ('open', (event) => {
  console.log ('ustanowiono połączenie websocket: ', zdarzenie);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);

  //to Utrzymać połączenie przy życiu
  interval = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//subskrybuj wydarzenie `close`
WebSocket.addEventListener ('close', (event) => {
  console.log ('websocket połączone zamknięte: ', zdarzenie);
  clearInterval (interval);
});
```

Teraz, gdy połączenie jest „ustanowione”, zaczynamy wysyłać żądania `ping` z odstępami `12000ms`.

Twój ostateczny kod powinien być:

```js title="index.js" showLineNumbers
const app_id = 1089;//Zastąp na swój app_id lub pozostaw jako 1089 do testowania.
const websocket = new WebSocket (`wss: //ws.derivws.com/websockets/v3? app_id=${app_id}`);
const ping_interval = 12000;//jest w milisekundach, co równa się 120 sekund
let interval;

//subskrybuj zdarzenie `open`
WebSocket.addEventListener ('open', (event)
  => {console.log ('websocket' ustanowione połączenie:”, zdarzenie);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);

  //aby utrzymać połączenie przy życiu
  interval = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//subskrybuj zdarzenie `message`
WebSocket.addEventListener ('message', (event) => {
  const receivedMessage = JSON.parse (event.data);
  console.log ('nowa wiadomość odebrana z serwera: ', receivedMessage);
});

//subskrybuj wydarzenie `close`
WebSocket.addEventListener (' close', (event) => {
  console.log ('websocket połączony zamknięty: ', zdarzenie);
  clearInterval (interval);
});

//subskrybuj zdarzenie `error`
WebSocket.addEventListener (' error ', (event) => {
  console.log ('zdarzył się błąd w naszym połączeniu websocket, event);
});
```
