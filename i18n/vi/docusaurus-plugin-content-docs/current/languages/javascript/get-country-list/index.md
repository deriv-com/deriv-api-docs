---
title: Nhận danh sách quốc gia
sidebar_label: Lấy thông tin danh sách các quốc gia
sidebar_position: 2
tags:
  - country_list
  - javascript
keywords:
  - country_list
  - javascript
description: Nhận thông tin về người dùng của bạn bằng cách thêm danh sách các quốc gia vào ứng dụng giao dịch của bạn. Tìm hiểu làm thế nào để làm điều đó với ví dụ API JavaScript này.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Để lấy danh sách các quốc gia, hãy cập nhật open event listener bằng cách sau:

```js title="index.js" showLineNumbers
const ping_interval = 12000;//tính bằng mili giây, tương đương với 120 giây
let interval;
//đăng ký sự kiện `open`
WebSocket.addEventListener ('open', (event) => {
  console.log ('kết nối websocket được thiết lập: ', event);
  const payload = JSON.stringify ({
    residence_list: 1,
  });
  websocket.send (payload);

  //để giữ cho kết nối tồn tại
  interval = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});
```

Bây giờ, cập nhật trình nghe sự kiện `message` để hiển thị dữ liệu:

```js title="index.js" showLineNumbers
//đăng ký sự kiện `message`
WebSocket.addEventListener ('message', (event) => {
  const ReceivedMessage = JSON.parse (event.data);
  switch (ReceivedMessage.msg_type) {
    case 'residence_list':
      console.log ('danh sách các quốc gia', ReceivedMessage.Residence_list);
      break;
    case ping '':
      console.log ('phản hồi ping/pong: ', ReceivedMessage.ping);
      break;
    mặc định:
      console.log ('tin nhắn đã nhận:', ReceivedMessage);
      break;
  }
});
```

Phản hồi phải là một đối tượng:

```json showLineNumbers
{
  "echo_req": {
    "req_id": 1,
    "residence_list": 1
  },
  "msg_type": "residence_list",
  "req_id": 1,
  "residence_list": [
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {},
            "is_country_supported": 0
          }
        }
      },
      "phone_idd": "35818",
      "text": "Aland Islands",
      "value": "ax"
    },
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {
              "driving_licence": {
                "display_name": "Driving Licence"
              },
              "national_identity_card": {
                "display_name": "National Identity Card"
              },
              "passport": {
                "display_name": "Passport"
              }
            },
            "is_country_supported": 1
          }
        }
      },
      "phone_idd": "355",
      "text": "Albania",
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

Với lệnh gọi này, bạn sẽ nhận được thông tin hữu ích về các quốc gia được hỗ trợ, chẳng hạn như:

- Mã “2 chữ cái” cho mỗi quốc gia
- Nhà cung cấp dịch vụ “Danh tính” cho mỗi quốc gia
- Định dạng Nhận dạng Thuế Quốc Gia (`tin_format`)
- v.v.

Thông tin này có thể hữu ích cho các biểu mẫu tạo tài khoản, trong đó bạn sẽ cần yêu cầu người dùng cung cấp thông tin xác thực về nhận dạng của họ, tùy thuộc vào quốc gia cư trú.

:: :warning
Để xác nhận địa chỉ và ID thuế, vui lòng sử dụng 'tin_format' được cung cấp cho quốc gia đó.
:::

Thông tin quốc gia của người dùng rất quan trọng cho các bước tiếp theo. Thông tin giúp xác định tài sản và tính năng nào họ có thể giao dịch và sử dụng.

:::tip
Tốt hơn là lấy danh sách các quốc gia trước khi điền vào biểu mẫu của bạn.
:::

:::danger
Bạn sẽ cần nội dung chi tiết về các dịch vụ nhận dạng `IDV` và `ONFIDO`, sự khác biệt và khả năng của chúng.
:::

Mã code cuối cùng của bạn sẽ là:

```js title="index.js" showLineNumbers
const app_id = 1089;//Thay thế bằng app_id của bạn hoặc để lại là 1089 để thử nghiệm.
const websocket = new WebSocket (`wss: //ws.derivws.com/websocket/v3? app_id =${app_id}`);
const ping_interval = 12000;//tính bằng mili giây, tương đương với 120 giây
let interval;

//đăng ký vào sự kiện `open` WebSocket.addEventListener ('open', (event) => {
  console.log ('web( 'websocket.
'kết nối socket được thiết lập:', event);
  const payload = JSON.stringify ({
    residence_list: 1,
  });
  websocket.send (payload);

  //để giữ cho kết nối hoạt động
  interval = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//đăng ký sự kiện `message`
WebSocket.addEventListener ('message', (event) => {
  const ReceivedMessage = JSON.parse (event.data);
  switch (ReceivedMessage.msg_type) {
    case 'residence_list':
      console.log ('danh sách các quốc gia', ReceivedMessage.Residence_List break);
      ;
    case 'ping':
      console.log ('ping/pong response: ', ReceivedMessage.ping);
      break;
    default:
      console.log ('đã nhận tin nhắn:', ReceivedMessage);
      break;
  }
});

//đăng ký vào sự kiện `close`
WebSocket.addEventListener ('close', (event) => {
  console.log ('websocket connecched: ', event);
  clearInterval (interval);
});

//đăng ký sự kiện `error`
WebSocket.addEventListener (' error ', (event) => {console.log ('lỗi xảy ra trong kết nối websocket của chúng tôi', sự kiện);
});

```
