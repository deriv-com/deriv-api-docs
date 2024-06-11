---
title: Tạo một ứng dụng Deriv
sidebar_label: Cách tạo ứng dụng Deriv
sidebar_position: 7
sidebar_class_name: vật phẩm ẩn thanh bên
tags:
  - giới thiệu
  - ứng dụng
  - thiết lập
keywords:
  - giới thiệu
  - ứng dụng
  - thiết lập
description: Hướng dẫn từng bước về cách tạo mã thông báo Deriv API của bạn và xây dựng ứng dụng giao dịch của bạn với sự trợ giúp của API giao dịch của chúng tôi. Tìm hiểu thêm.
---

#### Tài khoản Deriv

Nếu bạn chưa có tài khoản Deriv, bạn có thể dễ dàng tạo tài khoản bằng cách truy cập trang đăng ký của chúng tôi hoặc sử dụng lệnh gọi <a href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a> API. Bạn sẽ không bị thu bất kỳ khoản phí nào khi tạo tài khoản. Nếu bạn đã có tài khoản, vui lòng đăng nhập bằng thông tin tài khoản của bạn. Để tránh trường hợp vô tình bị trừ tiền khi đang thử sử dụng, chúng tôi khuyên bạn nên sử dụng tài khoản thử nghiệm của mình thay vì tài khoản thực.

Để nhận khoản lợi nhuận hàng tháng của bạn, bạn cần tạo một tài khoản Deriv thực. Bạn cũng có thể tạo tài khoản thực bằng cách sử dụng các cuộc gọi API <a href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</a> hoặc <a href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</a> .

:::caution
Để tạo các ứng dụng Deriv, bạn sẽ cần một mã thông báo API với phạm vi quản trị cho tài khoản bạn muốn sử dụng cho ứng dụng của mình.
:::

## Cách tạo mã Deriv API token

Để tạo mã thông báo API của bạn, chỉ cần truy cập Bảng điều khiển và chọn tab Quản lý Token\*\*. Từ đó, hãy tạo một mã token mới có cấp độ truy cập phù hợp với các tính năng của ứng dụng.

Để tạo mã API token mới, bạn hãy làm theo các bước sau:

1. Chọn cấp độ quyền hạn bạn cần.
2. Đặt tên cho mã token của bạn
3. Nhấp vào **Tạo**

Ngoài ra, bạn có thể tạo mã thông báo API thông qua lệnh gọi API <a href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a> .

:::caution
Bạn cần một mã thông báo với phạm vi `Admin` để tạo một ứng dụng.
:::

## Cách tạo ứng dụng Deriv

Để tạo ứng dụng của bạn với các tùy chọn cấu hình thích hợp, hãy chọn tab \*\* Đăng ký ứng dụng\*\* trong Bảng điều khiển. Bạn có thể thay đổi cấu hình ứng dụng của mình bất cứ lúc nào trong tab Quản lý ứng dụng\*\*.

| Trường thông tin ứng dụng | Mô tả                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Tài khoản                 | Tài khoản bạn muốn dùng để tạo ứng dụng                                                                      |
| Mã API Token             | Mã API token bạn muốn dùng để tạo ứng dụng                                                                   |
| Tên ứng dụng              | Tên ứng dụng                                                                                                 |
| Phí                       | Phí hoa hồng được thêm vào giá mỗi giao dịch để kiếm thu nhập                                                |
| URL ủy quyền              | URL cho phép khách hàng đăng nhập vào ứng dụng của bạn bằng tài khoản Deriv của họ mà không cần mã API token |
| URL xác minh              | URL chuyển hướng OAuth để ủy quyền OAuth                                                                     |

**Để tạo ứng dụng, hãy làm theo các bước sau:**

1. Chọn tài khoản bạn muốn sử dụng để tạo ứng dụng.
2. Chọn mã API token để thêm vào tài khoản của bạn (phải có quyền \`Admin\`).
3. Đặt tên cho ứng dụng của bạn.
4. Điền vào các trường **Markup** và **Chi tiết OAuth**.
5. Chọn **Phạm vi ủy quyền** cần thiết cho đơn đăng ký của bạn.
6. Nhấp vào **Đăng ký ứng dụng**.

Đảm bảo URL **Authorisation** và **Verification** là chính xác dựa trên việc triển khai của bạn.

Ví dụ: nếu tên miền của bạn là **`https://example.com`** và **ủy quyền và xác thực của bạn được xử lý bởi** `verify`, URL của bạn sẽ là:

**`https://example.com/verify`**
