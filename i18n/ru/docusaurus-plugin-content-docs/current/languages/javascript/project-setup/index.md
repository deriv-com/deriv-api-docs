---
title: Настройка проекта | JavaScript
sidebar_label: Настройка проекта
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - project-setup
description: Создайте каталог для Вашего следующего проекта торгового приложения API с помощью WebSocket.
---

### Создайте проект

Мы создадим простую страницу `HTML`, содержащую наш JavaScript-файл, который будет обрабатывать наше WebSocket-соединение. Во-первых, создайте директорию для Вашего следующего проекта:

```bash
mkdir deriv-websocket-demo
```

Перейдите в папку `deriv-websocket-demo`:

```bash
cd deriv-websocket-demo
```

Затем создайте необходимые файлы, как показано ниже:

```bash
touch index.html index.css index.js
```

:::tip
Мы рекомендуем использовать [Visual Studio Code](https://code.visualstudio.com/) с включенным [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Это очень поможет Вам при реализации.
:::

Теперь откройте файл `index.html` или воспользуйтесь [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Теперь измените содержимое файлов, используя следующий подход:

```js title="index.js" showLineNumbers
console.log('здесь мы создадим наше websocket-соединение');
```

```html title="index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Демонстрация Deriv HTML JS</title>
  </head>
  <body>
    <h2>Демонстрация Deriv WebSocket API</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

После добавления содержимого мы можем запустить приложение, просто выполнив файл `index.html` или используя <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">расширение Live Server Extension</a>. Запустив свое приложение, посмотрите в консоли, появляется ли `console.log`. Тогда Вы будете знать, что файл JavaScript работает, и соединение через websocket может быть реализовано правильно.

Для настройки вебсокета Deriv Вы можете перейти на страницу [WebSocket connection](/docs/languages/javascript/websocket-connection).
