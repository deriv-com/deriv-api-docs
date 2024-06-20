---
title: Configurer une connexion WebSocket
sidebar_label: Connexion WebSocket
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - connexion WebSocket
description: Un guide sur la façon d'établir une connexion WebSocket à une API WebSocket sur votre application de trading.
---

:::caution

Si vous n'êtes pas familier avec les WebSockets, veuillez consulter [notre documentation] (/docs/core-concepts/websocket).

:::

### Configurer une connexion WebSocket

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

Ensuite, nous allons créer une connexion WebSocket au serveur WebSocket de Deriv comme indiqué ci-dessous :

```js title="index.js" showLineNumbers
const app_id = 1089 ; // Remplacez par votre app_id ou laissez 1089 pour les tests.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`) ;
```

:::info
`app_id = 1089` est juste à des fins de test. Veuillez mettre cela à jour avec votre propre app_id lorsque vous publiez votre application dans un environnement de production. Veuillez consulter [ce guide] (/docs/setting-up-a-deriv-application) pour créer une nouvelle application pour vous-même.
:::

A ce stade, nous sommes connectés au serveur `WebSocket`. Mais nous ne recevons aucune donnée. Pour envoyer ou recevoir des données, nous devons nous abonner aux <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">événements websocket</a>.

En général, nous avons 4 événements sur les `WebSocket connections` :

- **close** :
  Déclenché lorsqu'une connexion avec une WebSocket est fermée. Également disponible au moyen de la propriété onclose.
- **open** :
  Déclenché lorsqu'une connexion avec une WebSocket est ouverte. Également disponible au moyen de la propriété onopen.
- **message** :
  Déclenché lorsque des données sont reçues par l'intermédiaire d'une WebSocket. Également disponible au moyen de la propriété onmessage.
- **error** :
  Déclenché lorsqu'une connexion avec une WebSocket a été fermée en raison d'une erreur, par exemple lorsque des données n'ont pas pu être envoyées. Également disponible au moyen de la propriété onerror.

Ajoutons un écouteur d'événements pour ces événements sur notre connexion WebSocket.

```js title="index.js" showLineNumbers
// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established:', event) ;
}) ;

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  console.log('new message received from server:', event) ;
}) ;

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed:', event) ;
}) ;

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event) ;
}) ;
```

Maintenant, ouvrez le fichier `index.html` dans notre navigateur et vérifiez votre console de développement. Vous ne devriez voir que le journal pour `WebSocket connection established`.

### Envoyer et recevoir des données

Notre serveur WebSocket offre la fonctionnalité <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong.</a> Utilisons cela dans notre projet démo pour envoyer et recevoir des données. Utilisons cela dans notre projet démo pour envoyer et recevoir des données. Modifiez les récepteurs d'événements pour `open` et `message` comme suit :

:::caution
La fonction `send` de la connexion WebSocket ne reçoit que des `string`, `ArrayBuffer`, `Blob`, `TypedArray` et `DataView`. Pour en savoir plus, consultez le site [MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). Cela signifie que si nous voulons envoyer un `objet`, nous devons d'abord le filtrer avec `JSON.stringify`.
:::

```js title="index.js" showLineNumbers
// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established:', event) ;
  const sendMessage = JSON.stringify({ ping: 1 }) ;
  websocket.send(sendMessage) ;
}) ;

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data) ;
  console.log('new message received from server : ', receivedMessage) ;
}) ;
```

Le `receivedMessage` serait un objet comme celui-ci :

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Félicitations :tada:

Vous avez créé votre premier projet démo avec WebSockets.

:::tip
La requête `ping` est principalement utilisée pour tester la connexion ou pour la maintenir en vie.
:::

### Garder la connexion WebSocket active

Par défaut, les connexions `WebSocket` seront fermées si aucun trafic n'est envoyé entre elles pendant environ **180 secondes**. Une façon de maintenir la connexion en vie est d'envoyer des requêtes [ping](/api-explorer#ping) à des intervalles de **120 secondes**. Cela permettra de garder la connexion active.

Voici un exemple de configuration simple :

```js title="index.js" showLineNumbers
const ping_interval = 12000 ; // c'est en millisecondes, ce qui équivaut à 120 secondes
let interval ;
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established:', event) ;
  const sendMessage = JSON.stringify({ ping: 1 }) ;
  websocket.send(sendMessage) ;

  // pour maintenir la connexion en vie
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 }) ;
    websocket.send(sendMessage) ;
  }, ping_interval) ;
}) ;

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed : ', event) ;
  clearInterval(interval) ;
}) ;
```

Maintenant, quand la connexion est `établie`, nous commençons à envoyer des requêtes `ping` avec des intervalles de `12000ms`.

Votre code final devrait ressembler à ceci :

```js title="index.js" showLineNumbers
const app_id = 1089 ; // Remplacez par votre app_id ou laissez 1089 pour les tests.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`) ;
const ping_interval = 12000 ; // c'est en millisecondes, ce qui équivaut à 120 secondes
let interval ;

// souscrire à l'événement `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established:', event) ;
  const sendMessage = JSON.stringify({ ping: 1 }) ;
  websocket.send(sendMessage) ;

  // pour maintenir la connexion vivante
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 }) ;
    websocket.send(sendMessage) ;
  }, ping_interval) ;
}) ;

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data) ;
  console.log('new message received from server : ', receivedMessage) ;
}) ;

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed:', event) ;
  clearInterval(interval) ;
}) ;

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event) ;
}) ;
```
