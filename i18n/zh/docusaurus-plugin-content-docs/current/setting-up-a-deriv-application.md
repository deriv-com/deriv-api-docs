---
title: 建立 Deriv 應用程式
sidebar_label: 設定 Deriv 應用程式
sidebar_position: 7
sidebar_class_name: 隱藏側欄項目
tags:
  - 簡介
  - 應用程式
  - 設定
keywords:
  - 簡介
  - 應用程式
  - 設定
description: 關於使用交易 API 建立 Deriv API 權杖和建立交易應用程式的逐步指南。 瞭解詳細資訊。
---

#### Deriv 帳戶

如果還沒有 Deriv 帳戶，可以前往註冊頁面或使用 <a href="api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a> API 呼叫輕鬆開立帳戶。 完全免費。 如果已經有帳戶，請使用帳戶資訊登入。 為避免資金在測試過程中意外虧損，建議使用示範帳戶而不是真實帳戶。

要賺取加成，請註冊 Deriv 真實帳戶，以便每月領取收益。 還可以使用 <a href="api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</a> 或 <a href="api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</a> API 呼叫開立真實帳戶。

:::caution
要建立 Deriv 應用程式，需要具有管理員範圍的 API 權杖，用於傾向的應用程式的帳戶。
:::

## 如何建立 Deriv API 權杖

要建立 API 權杖，只需進入儀表板，選擇**管理權杖**標籤即可。 然後，建立與應用程式功能所需存取級別相匹配的新權杖。

要建立新的 API 權杖，請依照下列步驟執行：

1. 選擇需要的範圍。
2. 提供權杖名稱
3. 按一下 \*\* 建立 \*\*

另外，也可以透過 <a href="api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a> API 呼叫建立 API 權杖。

:::caution
需要具有`管理員`權限的權杖才能建立應用程式。
:::

## 如何建立 Deriv 應用程式

要使用適當的組態選項建立應用程式，請選取儀表板中的**註冊應用程式**標籤。 可以隨時在**管理應用程式**標籤中變更應用程式的組態。

| 應用程式資訊欄 | 描述                                                      |
| ------- | ------------------------------------------------------- |
| 帳戶      | 要用來建立應用程式的帳戶                                            |
| API 權杖  | 要用來建立應用程式的 API 權杖                                       |
| 應用程式名稱  | 應用程式名稱                                                  |
| 加成      | 在交易價格上加收佣金，以賺取額外收入                                      |
| 授權網址    | 使客戶無需 API 權杖即可使用其 Deriv 帳戶登入應用程式的 URL                   |
| 驗證網址    | 用於電子郵件驗證。 如果提供，則帶有驗證權杖的 URL 將傳送到使用者的電子郵件；否則，則會使用驗證 URL。 |

**若要建立應用程式，請依照下列步驟執行：**

1. 選取要建立應用程式的帳戶。
2. 選擇新增到帳戶中的 API 權杖（必須具有 \`管理員\`權限。）
3. 為應用程式提供名稱。
4. 填寫**加成**和 **OAuth 詳細資訊**欄位。
5. 選擇應用程式所需的**授權範圍**。
6. 按一下**註冊應用程式**。

根據實施情況，確保**授權**和**驗證**網址正確無誤。

例如，如果域名是\*\*`https://example.com`\*\* ，而**授權和驗證由`驗證`處理**，則網址將是：

**`https://example.com/verify`**
