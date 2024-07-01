---
title: Thiết lập kết nối WebSocket
sidebar_label: Kết nối WebSocket
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - kết nối websocket
description: Hướng dẫn về cách thiết lập kết nối WebSocket với API WebSocket trên ứng dụng giao dịch của bạn.
---

:::caution

Nếu bạn không quen thuộc với WebSockets, vui lòng xem [tài liệu của chúng tôi] (/docs/core-concepts/websocket).

:::

### Thiết lập kết nối WebSocket

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

Tiếp theo, chúng ta sẽ tạo một kết nối WebSocket đến Deriv WebSocket Server như hình dưới đây:

```js title="index.js" showLineNumbers
const app_id = 1089;//Thay thế bằng app_id của bạn hoặc để lại là 1089 để thử nghiệm.
const websocket = WebSocket mới (`wss: //ws.derivws.com/websocket/v3? app_id =${app_id}`);
```

:::info
`app_id = 1089` chỉ dành cho mục đích thử nghiệm. Vui lòng cập nhật app_id của bạn khi phát hành ứng dụng. Vui lòng kiểm tra [hướng dẫn này] (/docs/setting-up-a-deriv-application) để tạo một ứng dụng mới cho chính bạn.
:::

Tại thời điểm này, chúng tôi được kết nối với `WebSocket server`. Tuy nhiên, chúng ta sẽ không nhận được bất kỳ dữ liệu nào. Để gửi hoặc nhận dữ liệu, chúng tôi phải `đăng ký` sự kiện <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">websocket</a>.

Nói chung, chúng tôi có 4 sự kiện trên `kết nối WebSocket`:

- **close**:
  Bị kích hoạt khi kết nối với WebSocket bị đóng. Cũng có trên onclose property.
- **mở**:
  Bị kích hoạt khi kết nối với WebSocket được mở. Cũng có trên onopen property.
- **message**:
  Bị kích hoạt khi dữ liệu được nhận thông qua WebSocket. Cũng có trên onmessage property.
- **lỗi**:
  Bị kích hoạt khi kết nối với WebSocket đã bị đóng vì lỗi, chẳng hạn như khi không thể gửi một số dữ liệu. Cũng có trên onerror property.

Hãy thêm một event listener cho các event này trên kết nối WebSocket của chúng tôi.

```js title="index.js" showLineNumbers
//Đăng ký sự kiện `open`
WebSocket.addEventListener ('open', (event) => {
  console.log ('kết nối websocket được thiết lập: ', event);
});

//đăng ký sự kiện `message`
WebSocket.addEventListener (' message ', (event) => {console.log ('tin nhắn mới nhận được từ máy chủ:', event);
});


//đăng ký sự kiện `close`
WebSocket.addEventListener ('close', (event) => {
  console.log ('websocket connecched: ', event);
});

//đăng ký sự kiện `error`
WebSocket.addEventListener (' error ', (event) => {
  console.log ('lỗi xảy ra trong kết nối websocket của chúng tôi', sự kiện);
});
```

Bây giờ, hãy mở tệp `index.html` trong trình duyệt của chúng tôi và kiểm tra bảng điều khiển nhà phát triển của bạn. Bạn sẽ chỉ thấy nhật ký cho `kết nối WebSocket đã thiết lập`.

### Gửi và nhận dữ liệu

Máy chủ WebSocket của chúng tôi cung cấp chức năng <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a> . Hãy sử dụng tính năng này cho dự án thử nghiệm để gửi và nhận dữ liệu. Thay đổi trình nghe sự kiện cho `open` và `message` như sau:

:::caution
Hàm `send` trên kết nối WebSocket, chỉ nhận `string`, `ArrayBuffer`, `Blob`, `TypedArray` và `DataView`. Bạn có thể đọc thêm về chúng trên [MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). Điều này có nghĩa là, nếu chúng ta muốn gửi một `object`, chúng ta phải xâu chuỗi nó bằng `JSON.stringIfy` trước.
:::

```js title="index.js" showLineNumbers
//đăng ký sự kiện `open`
WebSocket.addEventListener ('open', (event) => {
  console.log ('kết nối websocket được thiết lập: ', sự kiện);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);
});

//đăng ký sự kiện `message`
WebSocket.addEventListener ( 'message', (event) => {
  const ReceivedMessage = JSON.parse (event.data);
  console.log ('tin nhắn mới nhận được từ máy chủ: ', ReceivedMessage);
});
```

`ReceivedMessage` sẽ là một đối tượng như sau:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Và xin chúc mừng :tada:

Bạn vừa tạo dự án thử nghiệm đầu tiên của mình với WebSockets.

:::tip
Yêu cầu `ping` chủ yếu được sử dụng để kiểm tra kết nối hoặc để giữ cho nó tồn tại.
:::

### Giữ cho kết nối WebSocket tồn tại

Theo mặc định, `kết nối WebSocket` sẽ bị đóng khi không có lưu lượng truy cập nào được gửi giữa chúng trong khoảng **180 giây**. Một cách để duy trì kết nối là gửi yêu cầu [ping] (/api-explorer #ping) với khoảng thời gian **120 giây**. Điều này sẽ giữ cho kết nối tồn tại và hoạt động.

Một ví dụ thiết lập đơn giản sẽ như sau:

```js title="index.js" showLineNumbers
const ping_interval = 12000;//tính bằng mili giây, tương đương với 120 giây
let interval;
WebSocket.addEventListener ('open', (event) => {
  console.log ('kết nối websocket được thiết lập: ', event);
  const sendMessage = JSON.stringify ({ ping: 1 }); websocket.send (sendMessage);
  //để giữ cho kết nối sống


  interval = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//đăng ký sự kiện `close`
WebSocket.addEventListener ('close', (event) => {
  console.log ('websocket đã kết nối đóng: ', sự kiện);
  clearInterval (interval);
});
```

Bây giờ, khi kết nối được `thiết lập`, chúng tôi bắt đầu gửi yêu cầu `ping` với khoảng `12000ms`.

Mã cuối cùng của bạn phải là:

```js title="index.js" showLineNumbers
const app_id = 1089;//Thay thế bằng app_id của bạn hoặc để lại là 1089 để thử nghiệm.
const websocket = new WebSocket (`wss: //ws.derivws.com/websocket/v3? app_id =${app_id}`);
const ping_interval = 12000;//tính bằng mili giây, tương đương với 120 giây
let interval;

//đăng ký vào sự kiện `open` WebSocket.addEventListener ('open', (event) => {
  console.log ('web( 'websocket.
'kết nối socket được thiết lập:', event);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);

  //để giữ cho kết nối hoạt động
  interval = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//đăng ký sự kiện `message`
WebSocket.addEventListener ('message', (event) => {
  const ReceivedMessage = JSON.parse (event.data);
  console.log ('tin nhắn mới nhận được từ máy chủ: ', ReceivedMessage);
});

//đăng ký sự kiện `close`
WebSocket.addEventListener (' close', (event) => {
  console.log ('websocket đã kết nối đóng: ', event);
  clearInterval (interval);
});

//đăng ký sự kiện `error`
websocket.addEventListener (' error ', (event) => {
  console.log ('một lỗi xảy ra trong kết nối websocket của chúng tôi', sự kiện);
});
```
