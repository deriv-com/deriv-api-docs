---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - khái niệm
  - websocket
keywords:
  - ứng dụng giao dịch
  - giao thức websocket
  - kết nối websocket
description: Tìm hiểu về giao thức WebSocket và kết nối WebSocket cũng như cách tích hợp chúng để bạn có thể bật trao đổi dữ liệu trên ứng dụng giao dịch của mình.
---

## WebSockets là gì?

Giao thức `WebSocket`, được mô tả trong đặc tả [RFC 6455] (https://datatracker.ietf.org/doc/html/rfc6455), cung cấp một cách để trao đổi dữ liệu giữa trình duyệt và máy chủ thông qua kết nối liên tục. Dữ liệu có thể được truyền theo cả hai hướng dưới dạng “packets” mà không phá vỡ kết nối hoặc cần yêu cầu HTTP bổ sung.

WebSocket đặc biệt thích hợp cho các dịch vụ yêu cầu trao đổi dữ liệu liên tục, ví dụ như hệ thống giao dịch theo thời gian thực, v.v.

## Một ví dụ đơn giản

Để mở kết nối WebSocket, chúng ta cần tạo `new WebSocket` bằng cách sử dụng giao thức đặc biệt `ws`hoặc `wss` trong url. Đây là cách bạn có thể làm điều đó trong `JavaScript`:

```js
let socket = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

Mặt khác, dữ liệu `ws: //` không được mã hóa và có thể hiển thị cho các trung gian. Các máy chủ proxy cũ có thể gặp phải các tiêu đề “lạ” và chấm dứt kết nối.

`wss: //` là viết tắt của WebSocket over TLS, tương tự như cách HTTPS là HTTP qua TLS. Với lớp bảo mật truyền tải, dữ liệu được mã hóa bởi người gửi và được người nhận giải mã. Điều này có nghĩa là các gói dữ liệu được mã hóa có thể vượt qua proxy thành công mà không bị kiểm tra.
:::

Khi socket được tạo, chúng ta nên xem các event của nó. Tổng cộng có 4 event:

- Open - Kết nối được thiết lập
- Message - Dữ liệu đã nhận
- Error - Lỗi WebSocket
- Close - Kết nối đã đóng

Gửi message có thể được thực hiện thông qua socket.send(data).

Dưới đây là một ví dụ trong `JavaScript`:

```js showLineNumbers
const app_id = 1089;//Thay thế bằng app_id của bạn hoặc để lại là 1089 để thử nghiệm.
const socket = new WebSocket (`wss: //ws.derivws.com/websocket/v3? app_id =${app_id}`);

socket.onopen = function (e) {
  console.log ('[open] Kết nối được thiết lập');
  console.log ('Gửi đến máy chủ');
  const sendMessage = JSON.stringify ({ ping: 1 });
  socket.send (sendMessage);
};

socket.onmessage = function (event) {
  console.log (`[message] Dữ liệu nhận được từ máy chủ: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    consloe.log (`[close] Kết nối đóng sạch, code=${event.code} reason =${event.reason}`);
  } else {
    //ví dụ: quá trình máy chủ bị hỏng hoặc mạng bị hỏng
    //event.code thường là 1006 trong trường hợp này
    console.log ('[close] Kết nối chết');
  }
};

socket.onerror = function (error) {
  console.log (` [error] `);
};
```

## Tại sao cần WebSockets và khi nào nên tránh sử dụng?

WebSockets là một công cụ giao tiếp máy khách - máy chủ thiết yếu. Để hưởng lợi nhiều nhất, điều quan trọng là bạn phải hiểu cách sử dụng và khi nào là tốt nhất để tránh sử dụng chúng. Thông tin này sẽ được giải thích kỹ trong phần tiếp theo.

Sử dụng WebSockets trong các trường hợp sau:

1. Khi bạn đang phát triển một ứng dụng web theo thời gian thực.
   Ứng dụng thông dụng nhất của WebSocket là phát triển ứng dụng theo thời gian thực, hỗ trợ hiển thị dữ liệu liên tục ở máy khách hàng. Khi máy chủ back-end gửi lại dữ liệu liên tục, WebSocket cho phép đẩy hoặc truyền dữ liệu liên tục không bị gián đoạn khi kết nối đã mở. Sử dụng WebSockets giúp việc truyền dữ liệu trở nên nhanh chóng, tận dụng tối đa hiệu quả của ứng dụng.
2. Đối với các trang web giao dịch, chẳng hạn như Deriv.
   WebSocket sẽ hỗ trợ xử lý dữ liệu được thúc đẩy bởi máy chủ back-end được triển khai cho máy khách.
3. Khi tạo một ứng dụng chat.
   Các nhà phát triển ứng dụng chat gọi WebSockets để được trợ giúp trong các hoạt động như trao đổi một lần và đăng tải/truyền phát tin nhắn. Cùng một kết nối WebSocket được sử dụng cho cả gửi/nhận tin nhắn nên giao tiếp sẽ trở nên dễ dàng và nhanh chóng.

Sau khi tìm hiểu cách sử dụng WebSockets, hãy cùng tìm hiểu trong trường hợp nào nên tránh sử dụng giao thức này. Thông tin này sẽ giúp bạn tránh những rắc rối không cần thiết khi hoạt động.

Không nên được sử dụng WebSockets khi tất cả những gì bạn cần là nạp dữ liệu cũ hoặc dữ liệu chỉ qua xử lý một lần. Trong những trường hợp này, sử dụng giao thức HTTP là lựa chọn phù hợp hơn.

## WebSocket và HTTP

Vì cả hai giao thức HTTP và WebSocket đều được sử dụng để giao tiếp với ứng dụng, mọi người thường hay nhầm lẫn và cảm thấy khó khăn khi phải chọn một giao thức.

Như đã nói trước đây, WebSocket là một giao thức đóng khung và hai chiều. Mặt khác, HTTP là một giao thức đơn hướng hoạt động trên giao thức TCP.

Vì giao thức WebSocket có khả năng hỗ trợ truyền dữ liệu liên tục, giao thức chủ yếu được sử dụng trong phát triển ứng dụng theo thời gian thực. HTTP không có trạng thái và được sử dụng để phát triển các ứng dụng [RESTful] (https://de.wikipedia.org/wiki/Representational_State_Transfer) và [SOAP] (https://de.wikipedia.org/wiki/SOAP). SOAP vẫn có thể sử dụng HTTP, nhưng REST được phổ biến và sử dụng rộng rãi.

Với WebSocket, giao tiếp xảy ra ở cả hai đầu, khiến WebSocket trở thành một giao thức nhanh hơn. Trong HTTP, kết nối được xây dựng ở một đầu, làm giao thức sẽ chậm hơn một chút so với WebSocket.

WebSocket sử dụng kết nối TCP thống nhất và cần một bên hủy kết nối. Khi chưa thực hiện hủy, kết nối vẫn sẽ hoạt động. HTTP cần xây dựng một kết nối riêng biệt cho các yêu cầu riêng biệt. Sau khi yêu cầu được hoàn thành, kết nối sẽ tự động ngắt.

## Các kết nối WebSocket được thiết lập như thế nào?

Quá trình bắt đầu với WebSocket handshake sử dụng một scheme mới (ws hoặc wss). Để dễ hiểu, hãy nghĩ chúng giống như HTTP và HTTP an toàn (HTTPS).

Sử dụng scheme này, các máy chủ và máy khách dự kiến sẽ tuân theo giao thức kết nối WebSocket tiêu chuẩn. Việc thiết lập kết nối WebSocket bắt đầu bằng yêu cầu nâng cấp HTTP với header như Connection: Upgrade, Upgrade: WebSocket, Sec-WebSocket- Key, v.v.

Cách kết nối này thiết lập như sau:

1. \*\*Yêu cầu: \*\* Tiêu đề Nâng cấp Kết nối biểu thị bắt tay WebSocket trong khi khóa SEC-WebSocket-có giá trị ngẫu nhiên được mã hóa Base64. Giá trị này được tạo ra tùy ý trong mỗi WebSocket handshake. Ngoài những điều trên, key header cũng là một phần của yêu cầu này.

Các header được liệt kê ở trên, khi kết hợp, sẽ tạo thành một yêu cầu HTTP GET. Dữ liệu sẽ tương tự như:

```
GET ws://websocketexample.com:8181/ HTTP/1.1
Host: localhost:8181
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: b6gjhT32u488lpuRwKaOWs==
```

Để làm rõ Sec-WebSocket-Version, ta có thể giải thích phiên bản giao thức WebSocket đã sẵn sàng để sử dụng cho máy khách.

2. \*\*Phản hồi: \*\* Tiêu đề phản hồi, SEC-WebSocket-Accept, có phần còn lại của giá trị được gửi trong tiêu đề yêu cầu khóa SEC-WebSocket-. Giá trị này được kết nối với một đặc tả giao thức cụ thể và được sử dụng rộng rãi để ngăn chặn thông tin gây hiểu lầm. Nói cách khác, nó tăng cường bảo mật API và ngăn các máy chủ ill-configured mắc sai lầm trong quá trình phát triển ứng dụng.

Khi yêu cầu trước đó đã gửi thành công, bạn sẽ nhận một phản hồi tương tự như chuỗi văn bản dưới đây:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## Tài liệu tham khảo

- \*\* [API WebSockets - MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) \*\*
- \*\* [WebSocket - Thông tin Javascript] (https://javascript.info/websocket) \*\*
