---
title: Configuração do projeto | JavaScript
sidebar_label: Configuração do projeto
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - configuração do projeto
description: Crie um diretório para o seu próximo projeto de aplicação de negociação API utilizando um WebSocket.
---

### Criar um projeto

Vamos criar uma página `HTML` simples que contém o nosso ficheiro JavaScript, que irá tratar da nossa ligação WebSocket. Primeiro, crie um diretório para o seu próximo projeto:

```bash
mkdir deriv-websocket-demo
```

Navegue até a pasta `deriv-websocket-demo`:

```bash
cd deriv-websocket-demo
```

Depois, crie os ficheiros necessários, como demonstrado abaixo:

```bash
touch index.html index.css index.js
```

:::tip
Sugerimos que utilize [Visual Studio Code] (https://code.visualstudio.com/) com [Live Server Extension] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) ativado. Isto irá ajudá-lo bastante com as implementações.
:::

Agora, abra o ficheiro `index.html` ou utilize a [Live Server Extension] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Agora, altere o conteúdo dos ficheiros utilizando a seguinte abordagem:

```js title="index.js" showLineNumbers
consola.log('vamos criar a nossa ligação websocket aqui');
```

```html title="index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demonstração do Deriv HTML JS</title>
  </head>
  <body>
    <h2>Demonstração do Deriv WebSocket API</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Depois de adicionar o conteúdo, pode executar a aplicação simplesmente executando o ficheiro `index.html` ou utilizando a <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">extensão Live Server</a>. Ao executar a sua aplicação, veja na consola se o `console.log` está a aparecer. Assim, sabe que o ficheiro JavaScript funciona, permitindo que a ligação websocket possa ser implementada corretamente.

Para configurar o websocket Deriv, pode ir para a página [Ligação WebSocket](/docs/languages/javascript/websocket-connection).
