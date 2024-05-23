---
title: Project setup | JavaScript
sidebar_label: Configuração do projeto
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - configuração do projeto
description: Create a directory for your next API trading app project using a WebSocket.
---

### Criar um projeto

We are going to create a simple `HTML` page that contains our JavaScript file, which will handle our WebSocket connection. Primeiro, crie um diretório para o seu próximo projeto:

```bash
mkdir deriv-websocket-demo
```

Navigate to the `deriv-websocket-demo` folder:

```bash
cd deriv-websocket-demo
```

Depois, crie os ficheiros necessários, como demonstrado abaixo:

```bash
touch index.html index.css index.js
```

:::tip
We suggest using [Visual Studio Code](https://code.visualstudio.com/) with [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) enabled. Isto irá ajudá-lo bastante com as implementações.
:::

Now, open the `index.html` file or use the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Agora, altere o conteúdo dos ficheiros utilizando a seguinte abordagem:

```js title="index.js" showLineNumbers
console.log('we will create our websocket connection here');
```

```html title="index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deriv HTML JS Demo</title>
  </head>
  <body>
    <h2>Deriv WebSocket API demo</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

After adding the content, we can run the application by simply executing the `index.html` file or by using the <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server Extension</a>. When running your app, see in the console if the `console.log` is appearing. Assim, sabe que o ficheiro JavaScript funciona, permitindo que a ligação websocket possa ser implementada corretamente.

For setting up the Deriv websocket, you can proceed to the [WebSocket connection](/docs/languages/javascript/websocket-connection) page.
