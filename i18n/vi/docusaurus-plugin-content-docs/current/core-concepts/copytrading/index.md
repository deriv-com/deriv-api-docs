---
title: Sao chép cơ sở giao dịch
hide_title: false
draft: false
sidebar_label: Sao chép giao dịch
sidebar_position: 4
tags:
  - sao chép giao dịch
  - giao dịch
keywords:
  - giao dịch
  - khái niệm
  - API call
  - anatomy
description: Kinh doanh sao chép
---

## Nó là gì?

Copy Trading đang trở nên phổ biến trên thị trường tài chính; nó cho phép khách hàng (Copier) tự động sao chép giao dịch của một khách hàng khác (Nhà giao dịch).

## Trở thành nhà giao dịch

Để trở thành Nhà giao dịch (tức là cho phép người khác theo dõi giao dịch của bạn), hãy đặt cài đặt “allow_copiers” thông qua lệnh gọi [set settings] (/api-explorer #set_settings).

Nhà giao dịch sau đó tạo một mã thông báo API chỉ đọc và cung cấp nó cho Máy sao chép.

Bật cài đặt allow_copiers cũng sẽ làm cho cuộc gọi [copytrading statistics] (/api-explorer #copytrading_statistics) hoạt động. Cuộc gọi API thống kê cung cấp thông tin về tài khoản (điều này là để những người sao chép tiềm năng có ý tưởng về hiệu suất trong quá khứ của nhà giao dịch).

## Trở thành một máy photocopy

Để trở thành một máy photocopy, hãy sử dụng lệnh gọi [copy start] (/api-explorer #copy_start). Để dừng sao chép, hãy sử dụng lệnh gọi [copy stop] (/api-explorer #copy_stop).
