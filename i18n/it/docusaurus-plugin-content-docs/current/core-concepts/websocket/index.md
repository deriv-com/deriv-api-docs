---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - concetto
  - websocket
keywords:
  - app di trading
  - protocollo websocket
  - connessioni websocket
description: Impari a conoscere il protocollo WebSocket e le connessioni WebSocket, e come integrarli in modo da poter attivare lo scambio di dati sulla sua app di trading.
---

## Cosa sono i WebSocket?

Il protocollo `WebSocket`, descritto nella specifica [RFC 6455] (https://datatracker.ietf.org/doc/html/rfc6455), fornisce un modo per scambiare dati tra il browser e il server tramite una connessione persistente. I dati possono essere trasmessi in entrambe le direzioni come "pacchetti", senza interrompere la connessione o inviare ulteriori richieste HTTP.

WebSocket è particolarmente indicato per i servizi che richiedono uno scambio continuo di dati, ad esempio i sistemi di trading in tempo reale e così via.

## Ecco un semplice esempio

Per aprire una connessione WebSocket, dobbiamo creare un `nuovo WebSocket` utilizzando il protocollo speciale `ws` o `wss` nell'url. Ecco come può farlo in `JavaScript`:

```js
let socket = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

D'altra parte, i dati `ws://` non sono criptati e possono essere visibili agli intermediari. I vecchi server proxy possono trovare intestazioni "strane" e interrompere la connessione.

`wss://` sta per WebSocket over TLS, in modo simile a come HTTPS è HTTP over TLS. Con il livello di sicurezza del trasporto, i dati vengono crittografati dal mittente e decifrati dal destinatario. Ciò significa che i pacchetti di dati criptati possono passare con successo attraverso i proxy senza essere ispezionati.
:::

Una volta creato il socket, dobbiamo ascoltare gli eventi su di esso. Ci sono 4 eventi in tutto:

- Aperto - Connessione stabilita
- Messaggio - Dati ricevuti
- Errore - Errore WebSocket
- Chiudi - Connessione chiusa

L'invio di un messaggio può essere effettuato tramite socket.send(data).

Ecco un esempio in `JavaScript`:

```js showLineNumbers
const app_id = 1089; // Sostituisca con il suo app_id o lo lasci come 1089 per i test.
const socket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

socket.onopen = function (e) {
  console.log('[open] Connessione stabilita');
  console.log('Invio al server');
  const sendMessage = JSON.stringify({ ping: 1 });
  socket.send(sendMessage);
};

socket.onmessage = function (event) {
  console.log(`[messaggio] Dati ricevuti dal server: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    consloe.log(`[close] La connessione si è chiusa in modo pulito, codice=${event.code} motivo=${event.reason}`);
  } else {
    // ad esempio, il processo del server è stato ucciso o la rete è stata interrotta
    // il codice dell'evento è solitamente 1006 in questo caso
    console.log('[close] La connessione è morta');
  } }; socket.onclose
};

socket.onerror = function (error) {
  console.log(`[error]`);
};
```

## Perché abbiamo bisogno dei WebSocket e quando dovremmo evitarli?

I WebSocket sono uno strumento di comunicazione client-server essenziale. Per trarre il massimo vantaggio dal loro potenziale, è importante capire come possono essere utili e quando è meglio evitare di usarli. La prossima sezione approfondisce questo tema.

Utilizza WebSockets nei seguenti casi:

1. Quando stai sviluppando un'applicazione web in tempo reale.
   L'uso più consueto di WebSocket è nello sviluppo di applicazioni in tempo reale, offrendo supporto per visualizzare continuamente i dati sul lato client. Poiché il server back-end invia questi dati in modo continuo, un WebSocket consente di inviare o trasmettere questi dati in modo ininterrotto nella connessione già aperta. L'uso di WebSockets rende la trasmissione dei dati rapida e sfrutta le prestazioni dell'applicazione.
2. Per i siti web di trading, come Deriv.
   Qui, WebSocket assiste nella gestione dei dati che vengono inviati dal server back-end distribuito al client.
3. ‍Quando crei un'applicazione di chat.
   Gli sviluppatori di applicazioni di chat chiedono aiuto a WebSockets per operazioni come lo scambio una tantum e la pubblicazione o diffusione di messaggi. Poiché la stessa connessione WebSocket viene utilizzata per inviare e ricevere messaggi, la comunicazione diventa facile e veloce.

Ora che abbiamo stabilito dove i WebSocket dovrebbero essere utilizzati, vediamo dove è meglio evitarli. Questo ti aiuterà a evitare inutili seccature operative.

I WebSocket non dovrebbero essere presi in considerazione quando si tratta solo di recuperare vecchi dati o dati che devono essere elaborati una sola volta. In questi casi, l'utilizzo dei protocolli HTTP è la scelta migliore.

## WebSocket vs HTTP

Poiché entrambi i protocolli HTTP e WebSocket sono utilizzati per la comunicazione delle applicazioni, molti spesso si confondono e trovano difficile sceglierne uno.

Come detto in precedenza, WebSocket è un protocollo incorniciato e bidirezionale. Al contrario, HTTP è un protocollo unidirezionale che funziona al di sopra del protocollo TCP.

Poiché il protocollo WebSocket è in grado di supportare la trasmissione continua di dati, viene utilizzato principalmente nello sviluppo di applicazioni in tempo reale. HTTP è senza stato e viene utilizzato per lo sviluppo di applicazioni [RESTful](https://de.wikipedia.org/wiki/Representational_State_Transfer) e [SOAP](https://de.wikipedia.org/wiki/SOAP). SOAP è ancora in grado di utilizzare HTTP per l'implementazione, ma REST è ampiamente diffuso e utilizzato.

In WebSocket, la comunicazione avviene su entrambe le estremità e ciò lo rende un protocollo più veloce. In HTTP, la connessione è costruita ad un'estremità e questo la rende un po' più lenta rispetto a WebSocket.

WebSocket utilizza una connessione TCP unificata e necessita di una parte per terminare la connessione. Finché non accade, la connessione rimane attiva. HTTP deve creare una connessione distinta per richieste separate. Una volta completata la richiesta, la connessione si interrompe automaticamente.

## Come vengono stabilite le connessioni WebSocket?

Il processo inizia con un handshake WebSocket che prevede l'utilizzo di un nuovo schema (ws o wss). Per capire meglio, consideralii equivalenti rispettivamente a HTTP e HTTP sicuro (HTTPS).

Utilizzando questo schema, si prevede che i server e i client seguano il protocollo di connessione standard WebSocket. La creazione di una connessione WebSocket inizia con una richiesta HTTP di aggiornamento che presenta un paio di intestazioni come onnection: Upgrade, Upgrade: WebSocket, Sec-WebSocket- Key, e così via.

Ecco come viene stabilita questa connessione:

1. **La richiesta :** L'intestazione Connection Upgrade denota l'handshake WebSocket, mentre la Sec-WebSocket-Key presenta un valore casuale codificato Base64. Questo valore viene generato arbitrariamente durante ogni handshake WebSocket. Oltre a quanto sopra, anche l'intestazione della chiave fa parte di questa richiesta.

Le intestazioni sopra elencate, se combinate, formano una richiesta HTTP GET. che conterrà dati simili:

```
GET ws://websocketexample.com:8181/ HTTP/1.1
Host: localhost:8181
Connessione: Aggiornamento
Pragma: no-cache
Cache-Control: no-cache
Aggiornamento: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: b6gjhT32u488lpuRwKaOWs==
```

Per rendere più chiaro Sec-WebSocket-Version, è possibile spiegare la versione del protocollo WebSocket pronta all'uso per il cliente.

2. **La risposta:** L'intestazione di risposta, Sec-WebSocket-Accept, contiene il resto del valore presentato nell'intestazione di richiesta Sec-WebSocket-Key. Questa risposta è collegata a una particolare specifica di protocollo ed è ampiamente utilizzata per tenere a bada le informazioni fuorvianti. In altre parole, migliora la sicurezza dell'API e impedisce ai server mal configurati di creare errori nello sviluppo dell'applicazione.

Se la richiesta inviata in precedenza dovesse andare a buon fine, si riceverà una risposta simile alla sequenza di testo riportata di seguito:

```
HTTP/1.1 101 Cambio di protocollo
Aggiornamento: websocket
Connessione: Aggiornamento
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## Riferimenti

- \*\* [API WebSockets - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)\*\*
- \*\* [WebSocket - Info Javascript](https://javascript.info/websocket)\*\*
