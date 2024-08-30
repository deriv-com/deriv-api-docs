---
title: Impostare una connessione WebSocket
sidebar_label: Connessione WebSocket
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - connessione websocket
description: Una guida su come impostare una connessione WebSocket a un'API WebSocket sulla sua app di trading.
---

:::caution

Se non ha familiarità con i WebSocket, consulti la [nostra documentazione](/docs/core-concepts/websocket).

:::

### Configurare una connessione WebSocket

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

Ora creeremo una connessione WebSocket a Deriv WebSocket Server come mostrato di seguito:

```js title="index.js" showLineNumbers
const app_id = 1089; // Sostituisca il suo app_id o lo lasci come 1089 per i test.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
```

:::info
`app_id = 1089` è solo a scopo di test. Aggiornalo con il tuo app_id quando rilasci l'applicazione in un ambiente di produzione. Consulti [questa guida] (/docs/setting-up-a-deriv-application) per creare una nuova applicazione.
:::

A questo punto, siamo connessi al `server WebSocket`. Tuttavia, non riceviamo alcun dato. Per inviare o ricevere dati, dobbiamo "iscriverci" agli <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">eventi websocket</a>.

In genere, abbiamo 4 eventi sulle `connessioni WebSocket`:

- **close**:
  Si attiva quando una connessione con un WebSocket viene chiusa. Disponibile anche tramite la proprietà onclose.
- **open**:
  Si attiva quando viene aperta una connessione con un WebSocket. Disponibile anche tramite la proprietà onopen.
- **messaggio**:
  Viene attivato quando i dati vengono ricevuti attraverso un WebSocket. Disponibile anche tramite la proprietà onmessage.
- **errore**:
  Viene attivato quando una connessione con un WebSocket è stata chiusa a causa di un errore, ad esempio quando non è stato possibile inviare alcuni dati. Disponibile anche tramite la proprietà onerror.

Aggiungiamo un event listener per questi eventi sulla nostra connessione WebSocket.

```js title="index.js" showLineNumbers
// sottoscrivere l'evento `open`
websocket.addEventListener('open', (event) => {
  console.log('connessione websocket stabilita: ', event);
});

// sottoscrivere l'evento `message`
websocket.addEventListener('message', (event) => {
  console.log('nuovo messaggio ricevuto dal server: ', event);
});

// sottoscrivere l'evento `close`
websocket.addEventListener('close', (event) => {
  console.log('connessione websocket chiusa: ', event);
});

// sottoscrivere l'evento `error`
websocket.addEventListener('error', (event) => {
  console.log('si è verificato un errore nella nostra connessione websocket', event);
});
```

Ora, apra il file `index.html` nel nostro browser e controlli la sua console di sviluppatore. Dovrebbe vedere solo il registro per la `connessione WebSocket stabilita`.

### Inviare e ricevere dati

Il nostro server WebSocket fornisce la funzionalità <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a>. Usiamolo nel nostro progetto demo per inviare e ricevere dati. Modifichi gli ascoltatori di eventi per `open` e `message` come segue:

:::caution
La funzione `invio` sulla connessione WebSocket riceve solo `stringa`, `ArrayBuffer`, `Blob`, `TypedArray` e `DataView`. Può leggere maggiori informazioni su di loro su [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). Ciò significa che se vogliamo inviare un `oggetto`, dobbiamo prima stringerlo con `JSON.stringify`.
:::

```js title="index.js" showLineNumbers
// sottoscrivere l'evento `open`
websocket.addEventListener('open', (event) =>
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// sottoscrive l'evento `messaggio`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('nuovo messaggio ricevuto dal server: ', receivedMessage);
});
```

Il `Messaggio ricevuto` sarebbe un oggetto come questo:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: «ping», ping: «pong»}


```

Congratulazioni :tada:

Hai appena creato il tuo primo progetto demo con WebSockets.

:::tip
La richiesta `ping` viene utilizzata soprattutto per testare la connessione o per mantenerla in vita.
:::

### Mantieni attiva la connessione WebSocket

Per impostazione predefinita, le `connessioni WebSocket` vengono chiuse quando non viene inviato traffico tra di esse per circa **180 secondi**. Un modo per mantenere viva la connessione è inviare richieste [ping](/api-explorer#ping) con intervalli di **120 secondi**. Ciò manterrà la connessione viva e attiva.

Un semplice esempio di configurazione potrebbe essere il seguente:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // è in millisecondi, che equivale a 120 secondi
let interval;
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // per mantenere viva la connessione
  interval = setInterval(() =>
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// sottoscrivere l'evento `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});
```

Ora, quando la connessione è `stabilita`, iniziamo a inviare richieste `ping` con intervalli di `12000ms`.

Il codice finale dovrebbe essere:

```js title="index.js" showLineNumbers
const app_id = 1089; // Sostituisca con il suo app_id o lo lasci come 1089 per i test.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // è in millisecondi, che equivale a 120 secondi
let interval;

// sottoscrive l'evento `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // per mantenere viva la connessione
  interval = setInterval(() =>
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// sottoscrivere l'evento `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('nuovo messaggio ricevuto dal server: ', receivedMessage);
});

// sottoscrivere l'evento `close`
websocket.addEventListener('close', (event) => {
  console.log('connessione websocket chiusa: ', event);
  clearInterval(interval);
});

// sottoscrivere l'evento `error`
websocket.addEventListener('error', (event) => {
  console.log('si è verificato un errore nella nostra connessione websocket', event);
});
```
