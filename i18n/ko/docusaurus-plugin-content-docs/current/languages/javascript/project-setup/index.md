---
title: 프로젝트 설정 | 자바스크립트
sidebar_label: 프로젝트 설정
sidebar_position: 0
tags:
  - 자바스크립트
keywords:
  - js
  - 프로젝트 설정
description: 웹소켓을 사용하여 다음 API 트레이딩 앱 프로젝트의 디렉토리를 생성하세요.
---

### 프로젝트 만들기

웹소켓 연결을 처리할 자바스크립트 파일을 포함하는 간단한 `HTML` 페이지를 만들겠습니다. 먼저 다음 프로젝트를 위한 디렉터리를 만듭니다:

```bash
MKDIR 파생-웹소켓-데모
```

파생 웹소켓 데모\` 폴더로 이동합니다:

```bash
CD 파생-웹소켓-데모
```

그런 다음 아래와 같이 필요한 파일을 만듭니다:

```bash
touch index.html index.css index.js
```

:::tip
라이브 서버 확장](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)을 활성화한 상태에서 [Visual Studio Code](https://code.visualstudio.com/)를 사용하는 것이 좋습니다. 이는 구현에 많은 도움이 될 것입니다.
:::

이제 `index.html` 파일을 열거나 [라이브 서버 확장 프로그램](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)을 사용합니다.

이제 다음 방법을 사용하여 파일의 콘텐츠를 변경합니다:

```js title="index.js" showLineNumbers
console.log('여기에 웹소켓 연결을 생성합니다');
```

```html title="index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>파생 HTML JS 데모</title>
  </head>
  <body>
    <h2>파생 웹소켓 API 데모</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

콘텐츠를 추가한 후 `index.html` 파일을 실행하거나 <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">라이브 서버 확장</a> 프로그램을 사용하여 애플리케이션을 실행할 수 있습니다. 앱을 실행할 때 콘솔에서 `console.log`가 표시되는지 확인하세요. 그러면 웹소켓 연결이 제대로 구현될 수 있도록 자바스크립트 파일이 작동하고 있다는 것을 알 수 있습니다.

Deriv 웹소켓을 설정하려면 [웹소켓 연결](/docs/languages/javascript/websocket-connection) 페이지로 이동하세요.
