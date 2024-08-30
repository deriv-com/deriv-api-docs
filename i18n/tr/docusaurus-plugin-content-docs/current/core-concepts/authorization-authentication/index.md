---
title: API kimlik doğrulaması
hide_title: false
draft: false
sidebar_label: API kimlik doğrulaması
sidebar_position: 2
tags:
  - onaylama
  - türev-yetki̇lendi̇rme
keywords:
  - deriv kimlik doğrulama
  - türev-yetki̇lendi̇rme
description: Kullanıcıların kimliğini bir API belirteci ile doğrulayarak işlem uygulamanızdaki Deriv API özelliklerinin tamamına erişin. Bir API örneği ile bunu yapmayı öğrenin.
---

Yetkilendirme ve kimlik doğrulama olmadan, API calls ve özelliklerimizin yalnızca yaklaşık yarısına erişebilirsiniz. Örneğin, sözleşme satın almak veya `Copy Trading` özelliklerini kullanmak için, kullanıcılarınızın **OAuth** sağlayıcımız ve **WebSocket Server** tarafından doğrulanması ve yetkilendirilmesi gerekir.

## Başlamadan önce

Devam etmek için lütfen aşağıda belirtilen tüm gereksinimlere sahip olduğunuzdan emin olun.

### Gereksinimler

1. Türev Müşteri hesabı
2. Uygun erişim düzeyine sahip API belirteci Deriv
3. Deriv Uygulama Kimliği

:::note
Deriv API belirteci ve uygulamasının nasıl oluşturulacağına ilişkin ayrıntılı talimatlar için lütfen [Deriv uygulaması kurma] (/docs/setting-up-a-deriv-application) bölümüne bakın.
:::

### API token

API token, bir sunucudan erişim isteyen bir istemcinin benzersiz bir tanımlayıcısıdır. Bu, yetkilendirmenin en basit yoludur.

Her API belirteci için erişim düzeyi, [API Explorer](/api-explorer)'da da bulunabilen her API çağrısının gerekli erişim düzeyiyle eşleşmelidir.

Örneğin, aşağıdaki ekran görüntüsünde, Hesap Durumunu kullanabilmek için okuma erişim düzeyine sahip bir token kullanılması gerektiğini görebilirsiniz.

![](/img/acc_status_scope_api_explorer.png)

Bir WebSocket bağlantısının yetkilendirilmesinin ardından, bu bağlantıdaki sonraki çağrılar kullanıcı eylemleri olarak kabul edilir.

Lütfen API tokenin herhangi bir uygulama ile kullanılabileceğini unutmayın, bu nedenle hem uygulamanızın hem de müşterilerinizin onu güvende tutması gerekir.

### OAuth2

OAuth, `Açık Yetkilendirme` anlamına gelir - bir istemcinin kimlik bilgilerini açıklamadan kullanıcı adına bir sunucuda barındırılan kaynaklara erişmesine olanak tanıyan bir protokoldür.

Bu tür yetkilendirme, istemcilerin bir API token oluşturmadan Deriv hesaplarını kullanarak üçüncü taraf uygulamalarda oturum açmalarına olanak tanır. Bu durumda, üçüncü taraf uygulaması kullanıcının şifresini veya kalıcı API tokeni görmez, bu da onu daha güvenli hale getirir.

OAuth2 kimlik doğrulaması, kurulum için daha fazla adım gerektirir, ancak geliştiricilerin uygulamalarına erişimi istemcileriyle paylaşmasının en güvenli yoludur.

OAuth2 hakkında daha fazla bilgi için [bu kılavuzu] (https://aaronparecki.com/oauth-2-simplified/) ziyaret edin.

İşte OAuth yetkilendirme bağlantısının nasıl çalıştığının görsel temsili:

![OAuth akışı](/img/how_oauth_works.png "OAuth akışı")

## Kimlik doğrulama süreci

Kullanıcınızın kimliğini doğrulamak için, [Dashboard](/dashboard) sayfasında, **Register application** sekmesinde **OAuth details** alanlarında OAuth Yönlendirme URL'si olarak kullanılacak URL'yi belirtin. Ardından, web sitenize veya uygulamanıza bir giriş düğmesi ekleyin ve kullanıcıları **`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`** adresine yönlendirin; burada your_app_id uygulamanızın kimliğidir.

![Deriv OAuth Girişi](/img/oauth_login.png "Deriv OAuth Girişi")

Bir kullanıcı oturum açtığında/oturum açtıktan sonra, Yönlendirme URL'si olarak girdiğiniz URL'ye yönlendirilir. Bu URL, kullanıcının oturum belirteçleriyle eklenen argümanlara sahip olacak ve buna benzer görünecektir:

`https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## Yetkilendirme süreci

Yönlendirme URL'sinde sorgu parametreleri, kullanıcının hesapları ve ilgili oturum belirteçleridir. Aşağıdaki yaklaşımı kullanarak sorgu parametrelerini bir diziye eşleyebilirsiniz:

```js showLineNumbers
const user_accounts = [
  {
    account: 'cr799393', token: 'a1-f7pnteezo4jzhpxclctizt27hyeot', currency: 'usd',}, {account: 'vrtc1859315',
    token: 'a1clwe3vfuuus5kraceykdsoqm4snfq',





    para birimi: 'usd',
  },
];
```

Kullanıcının **seçilen** hesabına göre kullanıcıyı yetkilendirmek için, kullanıcının **seçilen** hesabının **oturum belirteci** ile [authorize](/api-explorer#authorize) API çağrısını çağırın:

```js showLineNumbers
{
  “authorize”: “a1-f7pnteezo4jzhpxclctizt27hyeot”}

```

Yetkilendir\\\\\\\\` çağrısının yanıtı aşağıdaki gibi bir nesne olacaktır:

```js showLineNumbers
{
    “account_list”: [
      {
        “account_type”: “ticaret”, “oluşturuldu”: 1647509550,
        “currency”: “USD”, “is_disabled”: 0,
        “is_virtual”: 0, “landing_company_name”:
        “svg”,


        “loginid”: “CR799393", “ticaret”: {}
      }, {
        “account_type”: “ticaret”,

        “created_at”: 1664132232,
        “currency”: “ETH”, “is_disabled”: 0,
        “is_virtual”: 0

        ,
        “landing_company_name”: “svg”, “oturum açma”:
        “VRTC1859315", “ticaret”: {}
      },
    ],
        “denge”: 0, “ülke”: “id”,
    “para birimi”: “USD”,
    “e-posta”: “kullanıcı_

    mail@email_provider.com “,
    “fullname”: "John Doe”,
    “is_virtual”: 0, “landing_company_fullname”:
    “Deriv (SVG) LLC”, “landing_company_name”: “svg”, “local_currencies”: {“IDR”: {
    “kesir_basamaklar”: 2



      }
    },
    “loginid”: “CR799393", “preferred_language”:
    “EN”, “scopes”: [“read”,
    “trade”,
      “trading_information”,
      “payments”,


      “admin”
    ],
    “trading”: {},
    “upgradeable_landing_companies”: [“svg”],
      “kullanıcı kimliği”: 12345678}



```

Artık kullanıcı yetkilidir ve Deriv API çağrılarını hesap adına kullanabilirsiniz.
