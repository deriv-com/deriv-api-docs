---
title: Impostazione del progetto | JavaScript
sidebar_label: Impostazione del progetto
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - impostazione del progetto
description: Crei una directory per il suo prossimo progetto di app di trading API utilizzando un WebSocket.
---

### Creare un progetto

Creeremo una semplice pagina `HTML` che contiene il nostro file JavaScript, che gestirà la nostra connessione WebSocket. Per prima cosa, crea una directory per il prossimo progetto:

```bash
mkdir deriv-websocket-demo
```

Si rechi nella cartella `deriv-websocket-demo`:

```bash
cd deriv-websocket-demo
```

Successivamente, crea i file necessari come vedi di seguito:

```bash
tocca index.html index.css index.js
```

:::tip
Suggeriamo di utilizzare [Visual Studio Code](https://code.visualstudio.com/) con [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) abilitato. Questo ti aiuterà molto nelle implementazioni.
:::

Ora, apra il file `index.html` o utilizzi l'estensione [Live Server Extension] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Ora, modifica il contenuto dei file utilizzando il seguente approccio:

```js title="index.js" showLineNumbers
console.log('creeremo la nostra connessione websocket qui');
```

```html title="index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo di Deriv HTML JS</title>
  </head>
  <body>
    <h2>Demo API Deriv WebSocket</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Dopo aver aggiunto il contenuto, possiamo eseguire l'applicazione semplicemente eseguendo il file `index.html` o utilizzando l'<a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">estensione Live Server</a>. Quando esegue la sua applicazione, veda nella console se appare il `console.log`. Quindi saprai che il file JavaScript funziona e che la connessione websocket può essere implementata correttamente.

Per impostare il websocket Deriv, può procedere alla pagina [Connessione websocket](/docs/languages/javascript/websocket-connection).
