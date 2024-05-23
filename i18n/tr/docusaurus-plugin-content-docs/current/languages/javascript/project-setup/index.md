---
title: Project setup | JavaScript
sidebar_label: Project setup
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - project-setup
description: Create a directory for your next API trading app project using a WebSocket.
---

### Create a project

We are going to create a simple `HTML` page that contains our JavaScript file, which will handle our WebSocket connection. First, create a directory for your next project:

```bash
mkdir deriv-websocket-demo
```

Navigate to the `deriv-websocket-demo` folder:

```bash
cd deriv-websocket-demo
```

Next, create the required files as you see below:

```bash
touch index.html index.css index.js
```

:::tip
We suggest using [Visual Studio Code](https://code.visualstudio.com/) with [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) enabled. This will help you a lot with implementations.
:::

Now, open the `index.html` file or use the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Now, change the content of the files using the following approach:

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

After adding the content, we can run the application by simply executing the `index.html` file or by using the <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server Extension</a>. When running your app, see in the console if the `console.log` is appearing. Then you know that the JavaScript file is working so that the websocket connection can be implemented properly.

For setting up the Deriv websocket, you can proceed to the [WebSocket connection](/docs/languages/javascript/websocket-connection) page.
