---
title: Các chức năng của các cuộc gọi API
hide_title: false
draft: false
sidebar_label: Các chức năng của các cuộc gọi API
sidebar_position: 1
tags:
  - khái niệm
  - API call
  - anatomy
keywords:
  - ứng dụng giao dịch
  - cuộc gọi api
  - ví dụ api
description: Thiết lập các lệnh gọi API cho ứng dụng giao dịch của bạn bằng tính năng gọi API. Với các ví dụ API, hãy học cách đăng ký, gửi yêu cầu và nhận dữ liệu phản hồi.
---

## Subscribe and send

Tất cả các API call đều có tính năng gửi để thực hiện yêu cầu và nhận phản hồi. Một số API call cũng cung cấp tính năng subscribe cho phép các bản cập nhật được gửi đến ứng dụng của bạn khi có thông tin mới.

### Subscribe

Một số lệnh gọi API cung cấp chức năng `subscribe`. Khi bạn subscribe một API call, bạn sẽ nhận được một luồng dữ liệu liên tục từ API call này.

Một số cuộc gọi API này tự động đăng ký (ví dụ: [ticks] (/api-explorer #ticks)) và một số có trường `subscribe` tùy chọn. Nếu bạn chuyển `1` vào trường `subscribe`, đăng ký sẽ bắt đầu và máy chủ sẽ tiếp tục gửi dữ liệu được yêu cầu cho đến khi bạn hủy đăng ký bằng cách gọi các lệnh gọi API `Forget` hoặc `Forget all`.

Ví dụ: bạn có thể gọi [Tick History] (/api-explorer #ticks_history) để nhận dữ liệu lịch sử đánh dấu. Nhưng khi bạn thêm tùy chọn \`đăng ký' vào cuộc gọi này, bạn sẽ nhận được dữ liệu lịch sử đánh dấu mà bạn yêu cầu trong phản hồi đầu tiên và bạn sẽ tiếp tục nhận được phản hồi mới mỗi khi có một đánh dấu mới được xuất bản bởi máy chủ cho biểu tượng đã cho.

Trong dòng tin nhắn từ `subscribe`, có một trường gọi là `subscription`. Đây là `Stream ID`. Với ID này, bạn có thể xác định luồng tin nhắn trong logic của mình và dừng stream bằng các lệnh gọi API `Forget` và `Forget All`.

Dữ liệu được cung cấp bởi các cuộc gọi API với chức năng `subscribe` có thể được sử dụng làm nguồn dữ liệu cho các cuộc gọi và tính năng API khác.

### Send

Nếu bạn gọi API với chức năng `send`, thì máy chủ sẽ chỉ gửi lại dữ liệu được yêu cầu một lần. Để có được dữ liệu cập nhật, bạn sẽ phải gửi lại lệnh API call. Thông thường, phương pháp này được sử dụng khi bạn nhận được các phản hồi cuộc gọi API khác hoặc các sự kiện UI như `Click`, `Scroll`, v.v.

### Forget

Nếu bạn muốn dừng luồng tin nhắn được tạo bởi `subscribe`, bạn sẽ phải gọi lệnh gọi API `Forget` với `Stream ID` chính xác. Nếu không, bạn có thể sử dụng lệnh gọi API `Forget All` để dừng các luồng theo `Method name` của chúng.

:::caution
Để biết thêm thông tin về lệnh gọi API `Forget`, hãy xem [Forget] (/api-explorer #forget) và [Forget All] (/api-explorer #forget_all) trong API explorer.
:::

## Request data

Để giúp bạn dễ dàng xử lý luồng yêu cầu và phản hồi của kết nối WebSocket, mỗi API call Deriv WebSocket đều tuân theo cấu trúc đã được tiêu chuẩn hóa. Bạn có thể sử dụng nó để lưu vào bộ nhớ đệm, xác thực, yêu cầu và đồng bộ hóa phản hồi.

#### API call method name

Mỗi `request` trong API WebSocket bao gồm một trường `method name` đóng vai trò là một định danh duy nhất cho yêu cầu. Trong hầu hết các trường hợp, `tên phương thức` này sẽ nhận được giá trị số là `1`. Tuy nhiên, có một số trường hợp thuộc tính định danh có thể có giá trị chuỗi.

:::caution
Tên phương thức gọi API luôn được yêu cầu. Trường này xác định dữ liệu bạn sẽ nhận được từ máy chủ WebSocket của chúng tôi.
:::

### Các trường bắt buộc

Mỗi dữ liệu yêu cầu đều có các trường bắt buộc mà bạn phải cung cấp thông tin và các trường tùy chọn. Hãy khám phá điều này với một ví dụ từ `Danh sách cư ngữ`.

Cuộc gọi “Danh sách cư trú” trả về danh sách các quốc gia và mã quốc gia 2 chữ cái, phù hợp để điền vào biểu mẫu mở tài khoản.

Dữ liệu yêu cầu cho API call này như sau:

```ts showLineNumbers
{
  residence_list: 1; // Api Call Method Name
  passthrough?: object; // Optional
  req_id?: number; // Optional
}
```

Trường `residence_list` là `tên phương thức` cho cuộc gọi và là bắt buộc. Có thể có các trường thông tin bắt buộc khác liên quan đến loại yêu cầu mà bạn muốn gửi này. Để biết thêm về `Residence List` và các lệnh gọi API khác, vui lòng kiểm tra chúng trong [API Explorer] (/api-explorer #residence_list).

### Các trường tùy chọn

Mỗi cuộc gọi cũng có một số trường `Optional`. `Passthrough` và `req_id` luôn là một phần của dữ liệu yêu cầu nhưng bạn có thể chọn không tham gia và không sử dụng chúng.

#### Lĩnh vực “thông qua”

Bất cứ điều gì bạn chuyển đến trường này sẽ được trả lại cho bạn bên trong một đối tượng `response`. Điều này có thể hữu ích khi bạn cần mô phỏng một luồng trạng thái cho `requests` và `responses` của bạn.

#### Trường `req_id`

Bạn có thể cần “gắn thẻ” các yêu cầu của bạn và chuyển chúng qua các cuộc gọi `WebSocket` của chúng tôi. Bạn có thể làm như vậy bằng cách chuyển một `số` vào trường này. Nó có thể hữu ích khi bạn cần ánh xạ `requests` thành `responses`.

:::caution
Để tìm hiểu về các trường tùy chọn bổ sung dành riêng cho từng lệnh gọi API, vui lòng tham khảo [API Explorer] (/api-explorer) của chúng tôi.
:::

## Response data

Khi bạn nhận được phản hồi cho cuộc gọi, sẽ có một `Field` có cùng tên với `method name`, chứa dữ liệu thực tế.

Phản hồi cho cuộc gọi “Danh sách cư trú”:

```js showLineNumbers
{
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  residence_list: [
       {
            “danh tính”: {
                “dịch vụ”: {
                    “idv”: {
                        “documents_supported”: {},
                        “has_visual_ sample”: 0,
                        “is_country_supported”: 0
                    },
                    “onfido”: {
                        “documents_supported”: {
                            “driving_license”: {
                                “display_name”: “Giấy phép lái xe”
                            }
                        },
                        “is_country_supported”: 0
                    }
                }
            },
            “phone_idd”: “35818",
            “text”: “Quần đảo Aland”,
            “value”: “ax”
        },
        {
            “identity”: {
                “dịch vụ”: {
                    “idv”: {“documents_supported”: {},

                        “has_visual_sample”: 0,
                        “is_country_supported”: 0
                    },
                    “onfido”: {
                        “documents_supported”: {
                            “driving_license”: {
                                “display_name”: “Giấy phép lái xe”
                            },
                            “national_identity_card”: {
                                “display_name” : “Thẻ căn cước quốc gia”
                            },
                            “hộ chiếu”: {
                                “display_name”: “Hộ chiếu”
                            }
                        },
                        “is_country_supported”: 1
                    }
                }
            },
            “phone_idd”: “355",
            “text”: “Albania”,
            “tin_format”: [
                “^ [a-TA-t0-9]\\ d{8}[a-wa-W] $”
            ],
            “giá trị”: “al”
        },
        //...
  ],
};
```

Ở đây `residence_list` là `tên phương thức` và nó chứa dữ liệu thực tế bạn yêu cầu. Để giữ cho trường ngắn gọn, chúng tôi không bao gồm phần còn lại của mảng. Bạn có thể kiểm tra phản hồi thực tế [tại đây] (/api-explorer #residence_list).

#### Trường `echo_req`

`Field` này chứa `Dữ liệu yêu cầu` chính xác mà bạn đã gửi đến máy chủ.

#### Trường `msg_type`

`Field` này giúp bạn xác định dữ liệu `message` nào bạn đang nhận được trong sự kiện tin nhắn của kết nối WebSocket. Ví dụ: trình xử lý sự kiện `onmessage` của bạn cho kết nối WebSocket của bạn trong `JavaScript` sẽ là:

```js showLineNumbers
socket.onmessage = (event) => {
  const ReceivedMessage = JSON.parse (event.data);

  switch (ReceivedMessage.msg_type) {
    case “residence_list”:
      console.log (“Danh sách cư trú là: “, ReceivedMessage.Residence_List)
      break; case “other_request_identifier” console.log (“the response”,
    case) edMessage.some_other_
      request_identifier)
    mặc định:
      console.log (“ReceivedMessage”, ReceivedMessage)
      break;
  }
}
```

#### Trường `req_id`

Đây là `Tùy chọn` được chuyển đến `Dữ liệu yêu cầu`, bạn có thể sử dụng nó để `xác thị`, `đồng bộ hóa', `caching\`, v.v.

:::tip
`msg_type` luôn hiện diện trên dữ liệu phản hồi.
:::
