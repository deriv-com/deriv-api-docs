---
title: Project setup | JavaScript
sidebar_label: Configuración del proyecto
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - project-setup
description: Create a directory for your next API trading app project using a WebSocket.
---

### Crear un proyecto

We are going to create a simple `HTML` page that contains our JavaScript file, which will handle our WebSocket connection. En primer lugar, cree un directorio para su próximo proyecto:

```bash
mkdir deriv-websocket-demo
```

Navigate to the `deriv-websocket-demo` folder:

```bash
cd deriv-websocket-demo
```

A continuación, cree los archivos necesarios tal y como ve a continuación:

```bash
touch index.html index.css index.js
```

:::tip
We suggest using [Visual Studio Code](https://code.visualstudio.com/) with [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) enabled. Esto le ayudará mucho con las implementaciones.
:::

Now, open the `index.html` file or use the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Ahora, cambie el contenido de los archivos utilizando el siguiente método:

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

After adding the content, we can run the application by simply executing the `index.html` file or by using the <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server Extension</a>. When running your app, see in the console if the `console.log` is appearing. Entonces sabrá que el archivo JavaScript funciona para que la conexión websocket pueda implementarse correctamente.

For setting up the Deriv websocket, you can proceed to the [WebSocket connection](/docs/languages/javascript/websocket-connection) page.
