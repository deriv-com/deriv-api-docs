---
title: Open authorisation
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - concept
  - earn
  - earning
  - commission
  - markup
keywords:
  - concept
  - earn
  - earning
  - commission
  - markup
description: Learn about OAuth authorisation, logging in without an API token, and how you can use it to improve the user experience of your trading app.
---

## What is OAuth2?

OAuth stands for Open Authorisation — a protocol that enables a client to access a user's resources on a server without revealing the user's login credentials.

This type of authorisation allows clients to log in to third-party apps using their Deriv accounts without creating an API token. In this case, the third-party app does not see the user's password or permanent API token, which makes it safer.

The OAuth2 authentication requires more setup steps, but it is the most secure way for developers to grant access to their app for clients.

For more information on OAuth2, [see this guide](https://aaronparecki.com/oauth-2-simplified/).

### How to use OAuth authorisation

1. Specify the URL that will be used as the **OAuth Redirect URL** on the app registration page in the **Website URL field**.

2. Add a login button on your website or app and direct users to `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` where your_app_id is the ID of your app.

3. Once a user signs up, they will be redirected to the URL that you entered as the **Redirect URL**. This URL will have arguments added to it with the user's session tokens, and will look similar to: `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. In the parameters of the URL, you will see all the accounts and the session token for each account. Pass these tokens to the Authorize API call in order to perform actions on behalf of the account.
