---
title: Deriv uygulaması oluşturma
sidebar_label: Bir Deriv uygulaması kurma
sidebar_position: 7
sidebar_class_name: hide-sidebar-item
tags:
  - GİRİŞ
  - uygulama
  - kurulum
keywords:
  - GİRİŞ
  - uygulama
  - kurulum
description: Deriv API token'ınızı oluşturmaya ve ticaret API'mızın yardımıyla ticaret uygulamanızı oluşturmaya yönelik adım adım kılavuz. Daha fazla öğrenin.
---

#### Deriv hesabı

Henüz bir Deriv hesabınız yoksa, kayıt sayfamızı ziyaret ederek veya <a href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a> API çağrısını kullanarak kolayca bir hesap oluşturabilirsiniz. Tamamen ücretsiz. Zaten bir hesabınız varsa, lütfen hesap bilgilerinizi kullanarak giriş yapın. Test sırasında kazara para kaybını önlemek için, gerçek bir hesap yerine demo hesabınızı kullanmanızı öneririz.

Kar yüzdesi kazanmak için, aylık kazancınızı almak üzere bir Deriv gerçek hesabı alın. Ayrıca <a href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</a> veya <a href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</a> API çağrılarını kullanarak gerçek bir hesap oluşturabilirsiniz.

:::caution
Deriv uygulamaları oluşturmak için, uygulamanız için kullanmak istediğiniz hesabın Yönetici kapsamına sahip bir API belirtecine ihtiyacınız olacaktır.
:::

## Deriv API tokeni nasıl oluşturulur

API tokenınızı oluşturmak için Dashboard'a gidin ve **Manage Tokens** sekmesini seçin. Buradan, uygulamanızın özellikleri için gereken erişim düzeyiyle eşleşen yeni bir token oluşturun.

Yeni bir API tokeni oluşturmak için aşağıdaki adımları izleyin:

1. İhtiyacınız olan kapsamları seçin.
2. Tokeniniz için bir ad girin
3. Oluştur\*\* seçeneğine tıklayın

Alternatif olarak, <a href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a> API çağrısı aracılığıyla bir API belirteci oluşturabilirsiniz.

:::caution
Bir uygulama oluşturmak için `Admin` kapsamına sahip bir belirtece ihtiyacınız vardır.
:::

## Deriv uygulaması nasıl oluşturulur

Uygulamanızı uygun yapılandırma seçenekleriyle oluşturmak için Gösterge Tablosundaki **Uygulama Kaydet** sekmesini seçin. Uygulamanızın yapılandırmasında istediğiniz zaman **Uygulamaları Yönet** sekmesinden değişiklik yapabilirsiniz.

| Uygulama bilgi alanı | Tanımlama                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| Hesap                | Uygulamayı oluşturmak istediğiniz hesap                                                                     |
| API Token            | Uygulamayı oluşturmak istediğiniz API token                                                                 |
| Uygulama Adı         | Uygulama adı                                                                                                |
| Kar yüzdesi          | Ek gelir elde etmek için işlem fiyatına eklenen komisyon                                                    |
| Yetkilendirme URL'si | Müşterilerin API belirteci olmadan Deriv hesaplarını kullanarak uygulamanıza giriş yapmalarını sağlayan URL |
| Doğrulama URL'si     | OAuth yetkilendirmesi için OAuth yönlendirme URL'si                                                         |

**Bir uygulama oluşturmak için aşağıdaki adımları izleyin:**

1. Uygulamayı oluşturmak istediğiniz hesabı seçin.
2. Hesabınıza eklenen API tokeni seçin (\`Admin\` kapsamına sahip olmalıdır).
3. Başvurunuz için bir ad girin.
4. İşaretleme\*\* ve **OAuth ayrıntıları** alanlarını doldurun.
5. Uygulamanızın ihtiyaç duyduğu **Yetkilendirme Kapsamlarını** seçin.
6. Başvuru Kaydı\*\* butonuna tıklayınız.

Uygulamanıza göre **Yetkilendirme** ve **Doğrulama** URL'lerinin doğru olduğundan emin olun.

Örneğin, alan adınız **`https://example.com`** ise ve **yetkilendirme ve kimlik doğrulama işlemleriniz** `verify` tarafından gerçekleştiriliyorsa, URL'leriniz şöyle olacaktır:

**`https://example.com/verify`**
