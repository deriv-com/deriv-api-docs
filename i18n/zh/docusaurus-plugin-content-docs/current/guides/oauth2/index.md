---
title: 開放授權
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - 概念
  - 賺取
  - 收入
  - 佣金
  - 加成
keywords:
  - 概念
  - 賺取
  - 收入
  - 佣金
  - 加成
description: 了解 OAuth 授權、無需 API 權杖登入以及如何使用它來改善交易應用程式的使用者體驗。
---

## 什麼是 OAuth2？

OAuth 代表開放授權，該定議讓客戶在不洩露使用者登入憑據的情況下存取伺服器上託管的資源。

這種類型的授權讓客戶使用其 Deriv 帳戶登入第三方應用程式，而無需建立 API 權杖。 在這種情況下，第三方應用程式不會看到使用者的密碼或永久 API 權杖，這使其更安全。

OAuth2 身份驗證需要更多的設定步驟，但這是開發人員為客戶授予其應用程式存取權限的最安全方式。

欲了解 OAuth2 的更詳細資訊，請[參閱本指南](https://aaronparecki.com/oauth-2-simplified/)。

### 如何使用 OAuth 授權

1. 在**網站網址欄位**的應用程式註冊頁面上，指定將用作 **OAuth 重新導向網址**的 URL。

2. 在網站或應用程式新增登入按鈕，並將使用者引導到 `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` ，其中 your_app_id 是應用程式的 ID。

3. 使用者註冊後將被重新導向您輸入為**重新導向網址**的 URL。 此 URL 將使用使用者的會話權杖新增參數，看起來類似於：`https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acccx2 cur2=usd&state=`

4. 在 URL 的參數中可看到所有帳戶和每個帳戶的工作階段權杖。 將這些權杖傳遞至授權 API 呼叫，以便代表帳戶執行動作。
