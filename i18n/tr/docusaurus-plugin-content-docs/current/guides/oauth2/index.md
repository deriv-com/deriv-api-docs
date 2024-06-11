---
title: Açık yetkilendirme
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - konsept
  - kazan
  - kazanç
  - komisyon
  - kar yüzdesi
keywords:
  - konsept
  - kazan
  - kazanç
  - komisyon
  - kar yüzdesi
description: OAuth yetkilendirmesi, API belirteci olmadan oturum açma ve ticaret uygulamanızın kullanıcı deneyimini iyileştirmek için bunu nasıl kullanabileceğiniz hakkında bilgi edinin.
---

## OAuth2 nedir?

OAuth Açık Yetkilendirme anlamına gelir - bir istemcinin kullanıcının oturum açma kimlik bilgilerini ifşa etmeden bir sunucudaki kullanıcının kaynaklarına erişmesini sağlayan bir protokol.

Bu tür yetkilendirme, istemcilerin bir API token oluşturmadan Deriv hesaplarını kullanarak üçüncü taraf uygulamalarda oturum açmalarına olanak tanır. Bu durumda, üçüncü taraf uygulaması kullanıcının şifresini veya kalıcı API tokeni görmez, bu da onu daha güvenli hale getirir.

OAuth2 kimlik doğrulaması daha fazla kurulum adımı gerektirir, ancak geliştiricilerin istemciler için uygulamalarına erişim izni vermesinin en güvenli yoludur.

OAuth2 hakkında daha fazla bilgi için [bu kılavuza bakın] (https://aaronparecki.com/oauth-2-simplified/).

### OAuth yetkilendirmesi nasıl kullanılır

1. Uygulama kayıt sayfasında **OAuth Yönlendirme URL'si** olarak kullanılacak URL'yi **Web Sitesi URL'si** alanında belirtin.

2. Web sitenize veya uygulamanıza bir giriş düğmesi ekleyin ve kullanıcıları your_app_id'nin uygulamanızın kimliği olduğu `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` adresine yönlendirin.

3. Bir kullanıcı kaydolduktan sonra, **Yönlendirme URL'si** olarak girdiğiniz URL'ye yönlendirilecektir. Bu URL'ye kullanıcının oturum belirteçleri ile argümanlar eklenecek ve şuna benzer görünecektir: `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. URL parametrelerinde, her hesap için tüm hesapları ve oturum tokeni göreceksiniz. Hesap adına eylemler gerçekleştirmek için bu tokenleri Yetkilendirme API call'a iletilir.
