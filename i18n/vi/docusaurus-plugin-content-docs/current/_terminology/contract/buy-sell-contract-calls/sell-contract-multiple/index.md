---
title: Bán hợp đồng ở nhiều tài khoản
hide_title: false
draft: false
sidebar_label: Bán hợp đồng ở nhiều tài khoản
sidebar_position: 4
tags:
  - các khái niệm
  - bán
  - hợp đồng
  - nhiều
  - tài khoản
  - thuật ngữ
keywords:
  - các khái niệm
  - bán
  - hợp đồng
  - nhiều
  - tài khoản
  - thuật ngữ
description: Lệnh gọi API call để bán hợp đồng ở nhiều tài khoản là gì?
---

### Lệnh gọi API call để bán hợp đồng ở nhiều tài khoản là gì?

Bán hợp đồng cho nhiều tài khoản cùng một lúc.

Sử dụng phản hồi mã ngắn từ `buy_contract_for_multiple_accounts` để xác định hợp đồng và mã thông báo ủy quyền để chọn tài khoản nào để bán các hợp đồng đó.

Lưu ý rằng lệnh chỉ ảnh hưởng các tài khoản được xác định bằng mã token. Lệnh sẽ không bán hợp đồng ở tài khoản hiện được ủy quyền trừ khi bạn bao gồm mã token của tài khoản đó.
