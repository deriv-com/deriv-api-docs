---
title: Einrichten einer WebSocket-Verbindung
sidebar_label: WebSocket-Verbindung
sidebar_position: 1
tags:
  - Javascript
keywords:
  - js
  - Websocket-Verbindung
description: Eine Anleitung, wie Sie eine WebSocket-Verbindung zu einer WebSocket-API in Ihrer Handelsanwendung einrichten.
---

:::caution

Wenn Sie mit WebSockets nicht vertraut sind, sehen Sie sich bitte [unsere Dokumentation](/docs/core-concepts/websocket) an.

:::

### Richten Sie eine WebSocket-Verbindung ein

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

Als Nächstes erstellen wir eine WebSocket-Verbindung zum Deriv WebSocket Server, wie unten gezeigt:

```js title="index.js" showLineNumbers
const app_id = 1089; // Ersetzen Sie durch Ihre app_id oder belassen Sie es zum Testen bei 1089.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
```

:::info
`app_id = 1089` ist nur für Testzwecke. Bitte aktualisieren Sie es mit Ihrer eigenen app_id, wenn Sie Ihre Anwendung in einer Produktionsumgebung veröffentlichen. Bitte sehen Sie sich [diese Anleitung](/docs/setting-up-a-deriv-application) an, um eine neue App für sich selbst zu erstellen.
:::

An diesem Punkt sind wir mit dem WebSocket-Server verbunden. Wir erhalten jedoch keine Daten. Um Daten zu senden oder zu empfangen, müssen wir uns bei <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">Websocket-Ereignissen</a>"anmelden".

In der Regel gibt es 4 Ereignisse für "WebSocket-Verbindungen":

- **Schließen**:
  Wird ausgelöst, wenn eine Verbindung mit einem WebSocket geschlossen wird. Auch über die Onclose-Eigenschaft verfügbar.
- **öffnen**:
  Wird ausgelöst, wenn eine Verbindung mit einem WebSocket geöffnet wird. Auch über die onopen-Eigenschaft verfügbar.
- **Nachricht**:
  Wird ausgelöst, wenn Daten über einen WebSocket empfangen werden. Auch über die onmessage-Eigenschaft verfügbar.
- **Fehler**:
  Wird ausgelöst, wenn eine Verbindung mit einem WebSocket aufgrund eines Fehlers geschlossen wurde, z.B. wenn einige Daten nicht gesendet werden konnten. Auch über die onerror-Eigenschaft verfügbar.

Fügen wir unserer WebSocket-Verbindung einen Event-Listener für diese Ereignisse hinzu.

```js title="index.js" showLineNumbers
//
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  console.log('new message received from server: ', event);
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```

Öffnen Sie nun die Datei "index.html" in unserem Browser und überprüfen Sie Ihre Entwicklerkonsole. Sie sollten nur das Protokoll für `WebSocket-Verbindung hergestellt` sehen.

### Daten senden und empfangen

Unser WebSocket-Server bietet <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">Ping/Pong-Funktionen</a>. Verwenden wir es in unserem Demo-Projekt, um Daten zu senden und zu empfangen. Ändern Sie die Ereignis-Listener für `open` und `message` wie folgt:

:::caution
Die Funktion `send` auf der WebSocket-Verbindung empfängt nur `string`, `ArrayBuffer`, `Blob`, `TypedArray` und `DataView`. Sie können mehr darüber auf [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) lesen. Das heißt, wenn wir ein `Objekt` senden wollen, müssen wir es zuerst mit `JSON.stringify` stringifizieren.
:::

```js title="index.js" showLineNumbers
//
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});
```

Die `receivedMessage` wäre ein Objekt wie dieses:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Herzlichen Glückwunsch :tada:

Sie haben gerade Ihr erstes Demo-Projekt mit WebSockets erstellt.

:::tip
Die "Ping"-Anfrage wird meist verwendet, um die Verbindung zu testen oder sie aufrechtzuerhalten.
:::

### Halten Sie die WebSocket-Verbindung am Leben

Standardmäßig werden "WebSocket-Verbindungen" geschlossen, wenn etwa **180 Sekunden lang** kein Datenverkehr zwischen ihnen stattfindet. Eine Möglichkeit, die Verbindung aufrechtzuerhalten, besteht darin, [ping](/api-explorer#ping) Anfragen in Abständen von **120 Sekunden** zu senden. Dadurch bleibt die Verbindung lebendig und aktiv.

Ein einfaches Setup-Beispiel wäre das Folgende:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // in Millisekunden, was 120 Sekunden entspricht
let interval;
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // um die Verbindung aufrecht zu erhalten
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// Abonnieren des Ereignisses 'close'
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});
```

Sobald die Verbindung hergestellt ist, beginnen wir mit dem Senden von Ping-Anfragen in Abständen von 12000 ms.

Ihr endgültiger Code sollte wie folgt lauten:

```js title="index.js" showLineNumbers
const app_id = 1089; // Ersetzen Sie durch Ihre app_id oder belassen Sie es zum Testen bei 1089.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // in Millisekunden, was 120 Sekunden entspricht
let interval;

// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // um die Verbindung aufrecht zu erhalten
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// Ereignis 'message' abonnieren
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('neue Nachricht vom Server erhalten: ', receivedMessage);
});

// Ereignis 'close' abonnieren
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```
