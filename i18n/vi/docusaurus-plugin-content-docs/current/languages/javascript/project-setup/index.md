---
title: Thiết lập dự án | JavaScript
sidebar_label: Thiết lập dự án
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - thiết lập dự án
description: Tạo một thư mục cho dự án ứng dụng giao dịch API tiếp theo của bạn bằng WebSocket.
---

### Tạo một dự án

Chúng tôi sẽ tạo một trang `HTML` đơn giản chứa tệp JavaScript của chúng tôi, sẽ xử lý kết nối WebSocket của chúng tôi. Đầu tiên, hãy tạo một thư mục cho dự án tiếp theo của bạn:

```bash
mkdir deriv-websocket-demo
```

Điều hướng đến thư mục `deriv-websocket-demo`:

```bash
cd deriv-websocket-demo
```

Tiếp theo, tạo các tệp cần thiết như bên dưới:

```bash
touch index.html index.css index.js
```

:::tip
Chúng tôi khuyên bạn nên sử dụng [Mã Visual Studio] (https://code.visualstudio.com/) với [Tiện ích mở rộng máy chủ trực tiếp] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) đã bật. Bước này sẽ giúp bạn rất nhiều trong quá trình triển khai.
:::

Bây giờ, mở tệp `index.html` hoặc sử dụng [Tiện ích mở rộng máy chủ trực tiếp] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Thay đổi nội dung của các tệp bằng cách sử dụng cách tiếp cận sau:

```js title="index.js" showLineNumbers
console.log ('chúng tôi sẽ tạo kết nối websocket của chúng tôi ở đây');
```

```html title="index.html" showLineNumbers
<DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>
  <body>
    <h2>Deriv WebSocket API demo</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Sau khi thêm nội dung, chúng ta có thể chạy ứng dụng bằng cách thực hiện tệp `index.html` hoặc bằng cách sử dụng <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server Extension</a>. Khi chạy ứng dụng của bạn, hãy xem trong bảng điều khiển xem `console.log` có xuất hiện hay không. Như vậy bạn sẽ biết rằng tệp JavaScript đang hoạt động và kết nối websocket đang được thực hiện đúng cách.

Để thiết lập Deriv websocket, bạn có thể tiến tới trang [Kết nối WebSocket] (/docs/languages/javascript/websocket-connection).
