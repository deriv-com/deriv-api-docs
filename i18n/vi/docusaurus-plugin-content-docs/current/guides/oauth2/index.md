---
title: Mở ủy quyền
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - khái niệm
  - kiếm tiền
  - kiếm tiền
  - Hoa hồng
  - phí
keywords:
  - khái niệm
  - kiếm tiền
  - kiếm tiền
  - Hoa hồng
  - phí
description: Tìm hiểu về ủy quyền OAuth, đăng nhập mà không cần mã thông báo API và cách bạn có thể sử dụng nó để cải thiện trải nghiệm người dùng của ứng dụng giao dịch của mình.
---

## OAuth2 là gì?

OAuth là viết tắt của Open Authorization — một giao thức cho phép khách hàng truy cập tài nguyên của người dùng trên máy chủ mà không tiết lộ thông tin đăng nhập của người dùng.

Loại ủy quyền này cho phép khách hàng đăng nhập vào các ứng dụng của bên thứ ba bằng tài khoản Deriv của họ mà không cần tạo mã API token. Ứng dụng của bên thứ ba không nhìn thấy mật khẩu của người dùng hoặc mã API token vĩnh viễn nên quá trình ủy quyền an toàn hơn.

Xác thực OAuth2 yêu cầu nhiều bước thiết lập hơn, nhưng đó là cách an toàn nhất để các nhà phát triển cấp quyền truy cập vào ứng dụng của họ cho khách hàng.

Để biết thêm thông tin về OAuth2, [xem hướng dẫn này] (https://aaronparecki.com/oauth-2-simplified/).

### Cách sử dụng ủy quyền OAuth

1. Xác định URL sẽ được sử dụng như là **OAuth URL chuyển hướng** trên trang đăng ký của ứng dụng trong trường **URL trang web**.

2. Thêm nút đăng nhập trên trang web hoặc ứng dụng của bạn và hướng người dùng đến `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` trong đó your_app_id là ID của ứng dụng của bạn.

3. Sau khi người dùng đăng ký, họ sẽ được chuyển hướng đến URL mà bạn đã nhập dưới dạng **URL chuyển hướng**. URL này sẽ có các đối số được thêm vào nó với mã thông báo phiên của người dùng và sẽ trông giống như: `https://[YOUR_WEBSITE_URL]/redirect/? acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2usd&state = `

4. Trong các parameter của URL, bạn sẽ thấy tất cả các tài khoản và mã session token cho mỗi tài khoản. Sử dụng các mã token này cho lệnh gọi Authorize API call để thay mặt cho tài khoản thực hiện các hành động.
