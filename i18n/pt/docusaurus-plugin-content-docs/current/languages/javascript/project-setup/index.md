---
title: Configuração do projeto | JavaScript
sidebar_label: Configuração do projeto
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - project-setup
description: Crie um diretório para o seu próximo projeto de aplicação de negociação API utilizando um WebSocket.
---

### Criar um projeto

Vamos criar uma página `HTML` simples que incluirá o nosso ficheiro JavaScript, responsável por gerir a ligação WebSocket. Primeiro, crie um diretório para o seu novo projeto:

```bash
mkdir deriv-websocket-demo
```

Navegue até a pasta `deriv-websocket-demo`:

```bash
cd deriv-websocket-demo
```

Em seguida, crie os ficheiros necessários, conforme demostrado abaixo:

```bash
touch index.html index.css index.js
```

:::tip
Recomendamos a utilização do [Visual Studio Code](https://code.visualstudio.com/) com a [extensão Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) ativada. Isto facilitará bastante as implementações.
:::

Agora, abra o ficheiro `index.html` ou utilize a [extensão Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Em seguida, altere o conteúdo dos ficheiros conforme a abordagem seguinte:

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
    <title>Deriv HTML JS Demo</title>
  </head>
  <body>
    <h2>Deriv WebSocket API demo</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Após adicionar o conteúdo, pode executar a aplicação simplesmente abrindo o ficheiro `index.html` ou utilizando a <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">extensão Live Server</a>. Ao executar a sua aplicação, verifique na consola se a mensagem `console.log` aparece. Assim, saberá que o ficheiro JavaScript está a funcionar, permitindo que a ligação WebSocket possa ser implementada corretamente.

Para configurar o Websocket da Deriv, pode visitar a página [Ligação WebSocket](/docs/languages/javascript/websocket-connection).
