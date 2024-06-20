---
title: API 驗證
hide_title: false
draft: false
sidebar_label: API 驗證
sidebar_position: 2
tags:
  - 驗證
  - 授權
keywords:
  - deriv-驗證
  - deriv-授權
description: 使用 API 權杖對使用者驗證身份，以交易應用程式存取全套的 Deriv API 功能。 透過 API 範例學習做法。
---

如果沒有授權和驗證，將只能存取大約一半的 API 呼叫和功能。 例如，為了買入合約或使用`跟單交易`功能，您的使用者必須由**OAuth**提供者和**WebSocket 伺服器**驗證和授權。

## 開始之前

請確保您具有以下提到的所有要求才能繼續。

### 要求

1. Deriv 客戶帳戶
2. 具有適當存取級別的 Deriv API 權杖
3. Deriv 應用程式 ID

:::note
有關如何建立 Deriv API 權杖和應用程式的詳細說明，請參閱 [設定 Deriv 應用程式](/docs/setting-up-a-deriv-application)。
:::

### API 權杖

API 權杖是客戶請求存取伺服器的唯一標識符。 這是最簡單的授權方式。

每個 API 權杖的存取級別必須與每個 API 呼叫的所需存取級別相匹配，也可以在 [API 總管](/api-explorer) 中找到。

例如，在下面的螢幕擷取畫面中，可以看到要使用帳戶狀態，必須使用具有讀取權限級別的權杖。

![](/img/acc_status_scope_api_explorer.png)

在 WebSocket 連線獲得授權後，對該連線的後續呼叫將被視為使用者操作。

請記住，API 權杖可用於任何應用程式，因此應用程式和客戶都需要確保其安全。

### OAuth2

OAuth 代表`開放授權`，該定議讓客戶在不洩露使用者登入憑據的情況下存取伺服器上託管的資源。

這種類型的授權讓客戶使用其 Deriv 帳戶登入第三方應用程式，而無需建立 API 權杖。 在這種情況下，第三方應用程式不會看到使用者的密碼或永久 API 權杖，這使其更安全。

OAuth2 驗證需要更多設定步驟，但這是開發人員與客戶共享應用程式存取權限的最安全方式。

欲了解 OAuth2 的更詳細資訊，請造訪 [本指南](https://aaronparecki.com/oauth-2-simplified/)。

以下是 OAuth 授權連接工作原理的可視化表示：

![OAuth 流程](/img/how_oauth_works.png "OAuth flow")

## 驗證過程

為了驗證您的用戶，請在 [儀表板]（/儀表板）頁面，\*\* OAuth 詳細信息 \*\* 字段中 \*\* 註冊應用程序 \*\* 標籤中指定將用作 OAuth 授權 URL 的 URL。 然後，在網站或應用程式新增登入按鈕，並將使用者引導至 **`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`**，其中 your_app_id 是應用程式的 ID。

![Deriv OAuth 登入](/img/oauth_login.png "Deriv OAuth Login")

一旦使用者註冊/登入，他們將被重定向到您輸入為授權 URL 的 URL。 此 URL 將使用使用者的工作階段權杖向其新增參數，其外觀類似於：

`https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## 授權過程

授權 URL 中的查詢參數是使用者的帳戶及其相關工作階段令牌。 可以使用下列方法將查詢參數對應至陣列：

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

若要根據使用者**所選**帳戶對使用者授權，請以使用者的**所選**帳戶**工作階段權杖**呼叫 [授權](/api-explorer#authorize) API 呼叫：

```js showLineNumbers
{
  "authorize": "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

`授權`呼叫的回應將是一個物件，如下所示：

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

現在，使用者已獲得授權，可以代表該帳戶使用 Deriv API 呼叫。
