---
title: Xác thực API
hide_title: false
draft: false
sidebar_label: Xác thực API
sidebar_position: 2
tags:
  - xác thực
  - ủy quyền
keywords:
  - deriv-authentication
  - ủy quyền dẫn xuất
description: Truy cập bộ đầy đủ các tính năng Deriv API trên ứng dụng giao dịch của bạn bằng cách xác thực người dùng bằng mã thông báo API. Tìm hiểu cách làm điều này với một ví dụ API.
---

Nếu không có ủy quyền và xác thực, bạn sẽ chỉ có quyền truy cập vào khoảng một nửa các API call và tính năng của chúng của chúng tôi. Ví dụ: để mua hợp đồng hoặc sử dụng các tính năng “Sao chép giao dịch”, người dùng của bạn phải được xác thực và ủy quyền bởi nhà cung cấp **OAuth** của chúng tôi và**WebSocket Server**.

## Trước khi bắt đầu

Hãy chắc chắn rằng bạn có tất cả các yêu cầu được đề cập dưới đây để tiếp tục.

### Yêu cầu

1. Tài khoản khách hàng Deriv
2. Mã API Deriv token với quyền truy cập thích hợp
3. ID ứng dụng Deriv

:::note
Vui lòng tham khảo [Thiết lập ứng dụng Deriv] (/docs/setting-up-a-deriv-application) để biết hướng dẫn chi tiết về cách tạo mã thông báo và ứng dụng API Deriv.
:::

### Mã API token

Mã API token là định danh duy nhất khi khách hàng yêu cầu quyền truy cập từ một máy chủ. Đây là cách đơn giản nhất để thực hiện ủy quyền.

Mức truy cập cho mỗi mã thông báo API phải khớp với mức truy cập bắt buộc của mỗi lệnh gọi API, cũng có thể tìm thấy trong [API Explorer] (/api-explorer).

Ví dụ, trong ảnh chụp màn hình bên dưới, bạn có thể thấy rằng để có thể sử dụng Trạng thái tài khoản, bạn phải sử dụng mã token có cấp độ truy cập đọc.

! [] (/img/acc_status_scope_api_explorer.png)

Sau khi ủy quyền kết nối WebSocket, các lệnh tiếp theo của kết nối đó sẽ được coi là hành động của người dùng.

Xin lưu ý rằng mã API token có thể được sử dụng với bất kỳ ứng dụng nào, vì vậy cả ứng dụng của bạn và khách hàng của bạn đều cần bảo mật mã này.

### OAuth2

OAuth là viết tắt của `Open Authorisation` - một giao thức cho phép khách truy cập các tài nguyên được lưu trữ trên máy chủ thay mặt cho người dùng mà không tiết lộ thông tin đăng nhập.

Loại ủy quyền này cho phép khách hàng đăng nhập vào các ứng dụng của bên thứ ba bằng tài khoản Deriv của họ mà không cần tạo mã API token. Ứng dụng của bên thứ ba không nhìn thấy mật khẩu của người dùng hoặc mã API token vĩnh viễn nên quá trình ủy quyền an toàn hơn.

Xác thực OAuth2 yêu cầu nhiều bước hơn để thiết lập, nhưng là cách an toàn nhất để các nhà phát triển chia sẻ quyền truy cập vào ứng dụng với khách hàng của họ.

Để biết thêm thông tin về OAuth2, hãy truy cập [hướng dẫn này] (https://aaronparecki.com/oauth-2-simplified/).

Dưới đây là minh họa trực quan về cách hoạt động của kết nối ủy quyền OAuth:

! [Luồng OAuth] (/img/how_oauth_works.png 'luồng OAuth')

## Quá trình xác thực

Để xác thực người dùng của bạn, hãy chỉ định URL sẽ được sử dụng làm URL ủy quyền OAuth trên trang [Bảng điều khiển] (/dashboard), tab **Đăng ký ứng dụng** trong các trường **Chi tiết OAuth**. Sau đó, thêm nút đăng nhập trên trang web hoặc ứng dụng của bạn và hướng người dùng đến **`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`** trong đó your_app_id là ID của ứng dụng của bạn.

! [Đăng nhập OAuth] (/img/oauth_login.png 'Đăng nhập OAuth')

Khi người dùng đăng nhập/đăng nhập, họ sẽ được chuyển hướng đến URL mà bạn đã nhập làm URL ủy quyền. URL này sẽ có các đối số (arguments) được thêm vào với mã session token của người dùng và sẽ trông tương tự như sau:

`https://[YOUR_WEBSITE_URL]/redirect/? acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## Quá trình ủy quyền

Các tham số truy vấn trong URL ủy quyền là tài khoản của người dùng và mã thông báo phiên liên quan của họ. Bạn có thể map các tham số truy vấn thành một mảng bằng cách sử dụng cách tiếp cận sau:

```js showLineNumbers
const user_accounts = [
  {
    account: 'cr799393',
    token: 'a1-f7pnteezo4jzhpxclctizt27hyeot',
    currency: 'usd',
  },
  {
    account: 'vrtc1859315',
    token: 'a1clwe3vfuuus5kraceykdsoqm4snfq',
    currency: 'usd',
  },
];
```

Để ủy quyền cho người dùng dựa trên tài khoản **đã chọn** của người dùng, hãy gọi lệnh gọi API [authorize] (/api-explorer #authorize) với tài khoản **đã chọn** mã thông báo phiên của người dùng\*\*:

```js showLineNumbers
{
  "authorize": "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

Phản hồi cho lệnh gọi `authorize` sẽ là một đối tượng như sau:

```js showLineNumbers
{
    "account_list": [
      {
        "account_type": "trading",
        "created_at": 1647509550,
        "currency": "USD",
        "is_disabled": 0,
        "is_virtual": 0,
        "landing_company_name": "svg",
        "loginid": "CR799393",
        "trading": {}
      },
      {
        "account_type": "trading",
        "created_at": 1664132232,
        "currency": "ETH",
        "is_disabled": 0,
        "is_virtual": 0,
        "landing_company_name": "svg",
        "loginid": "VRTC1859315",
        "trading": {}
      },
    ],
    "balance": 0,
    "country": "id",
    "currency": "USD",
    "email": "user_mail@email_provider.com",
    "fullname": " John Doe",
    "is_virtual": 0,
    "landing_company_fullname": "Deriv (SVG) LLC",
    "landing_company_name": "svg",
    "local_currencies": {
      "IDR": {
        "fractional_digits": 2
      }
    },
    "loginid": "CR799393",
    "preferred_language": "EN",
    "scopes": [
      "read",
      "trade",
      "trading_information",
      "payments",
      "admin"
    ],
    "trading": {},
    "upgradeable_landing_companies": [
      "svg"
    ],
    "user_id": 12345678
  }
```

Bây giờ, người dùng đã ủy quyền và bạn có thể sử dụng lệnh gọi Deriv API thay mặt cho tài khoản.
