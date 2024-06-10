---
title: Configuración del proyecto | JavaScript
sidebar_label: Configuración del proyecto
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - project-setup
description: Cree un directorio para su próximo proyecto de aplicación comercial API utilizando un WebSocket.
---

### Crear un proyecto

Vamos a crear una simple página `HTML` que contenga nuestro archivo JavaScript, el cual manejará nuestra conexión WebSocket. En primer lugar, cree un directorio para su próximo proyecto:

```bash
mkdir deriv-websocket-demo
```

Navegue hasta la carpeta `deriv-websocket-demo`:

```bash
cd deriv-websocket-demo
```

A continuación, cree los archivos necesarios tal y como ve a continuación:

```bash
touch index.html index.css index.js
```

:::tip
Le sugerimos que utilice [Visual Studio Code](https://code.visualstudio.com/) con [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) activado. Esto le ayudará mucho con las implementaciones.
:::

Ahora, abra el archivo `index.html` o utilice la extensión [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Ahora, cambie el contenido de los archivos utilizando el siguiente método:

```js title="index.js" showLineNumbers
console.log('crearemos aquí nuestra conexión websocket');
```

```html title="index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demostración Deriv HTML JS</title>
  </head>
  <body>
    <h2>Demostración Deriv WebSocket API</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Tras añadir el contenido, podemos ejecutar la aplicación simplemente ejecutando el archivo `index.html` o utilizando la <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">extensión Live Server</a>. Cuando ejecute su aplicación, compruebe en la consola si aparece el `console.log`. Entonces sabrá que el archivo JavaScript funciona para que la conexión websocket pueda implementarse correctamente.

Para configurar el websocket Deriv, puede ir a la página [WebSocket connection](/docs/languages/javascript/websocket-connection).
