---
title: Ticaret uygulamanızdan para kazanın
hide_title: true
draft: false
sidebar_label: Deriv API'den Para Kazanma
sidebar_position: 1
sidebar_class_name: hide-sidebar-item
tags:
  - konsept
  - kazan
  - kazanç
  - para kazanma
  - para kazanma
  - api
  - websocket
keywords:
  - konsept
  - kazan
  - kazanç
  - para kazanma
  - para kazanma
  - api
  - websocket
description: Deriv API'sinden Deriv satış ortağı olarak, ticaret uygulamanızda reklam vererek veya premium özellikler sunarak nasıl para kazanabileceğinizi öğrenin.
---

## Deriv API'den Para Kazanma

Deriv API'den para kazanmanın çeşitli yolları vardır:

1. **Ticaret uygulamanıza erişim için ücretlendirme**: Deriv API tabanlı özel alım satım uygulamanız kullanıcılara değer sunuyorsa, bu uygulamaya erişim için onlardan bir abonelik veya tek seferlik bir ücret talep ederek bunu işletmeniz için uygun bir gelir akışı haline getirebilirsiniz.

2. **Premium özellikler için ücretlendirme**: Yatırım uygulamanızda gerçek zamanlı piyasa verileri, gelişmiş grafik araçları ve kullanıcılara katma değer sunan diğer premium özellikler gibi gelişmiş özellikler varsa, kullanıcıları bu özelliklere erişim için ücretlendirerek ek gelir elde edebilirsiniz.

3. **Ortaklık pazarlaması**: Deriv'in ortaklık programına katılabilir ve yeni kullanıcıları Deriv platformuna yönlendirerek komisyon kazanabilirsiniz. Ticaret veya yatırımla ilgilenen bir kitleniz varsa bu iyi bir seçenek olabilir.

4. **Yönlendirme ücretleri**: Deriv platformuyla entegre olan bir ticaret uygulaması oluşturduysanız, yeni kullanıcıları uygulamanıza yönlendiren mevcut kullanıcılara yönlendirme ücretleri sunabilirsiniz. Bu teşvik, onları uygulamanız hakkında bilgi yaymaya teşvik ederek kullanıcı tabanınızı büyütmenize yardımcı olabilir.

5. **Reklamcılık**: Geniş bir kullanıcı tabanına sahip bir ticaret uygulaması oluşturduysanız, ilgili reklamverenlere reklam alanı satmayı düşünebilirsiniz. Bu, ek gelir elde etmek için iyi bir yol olabilir.

6. **İşaretleme**: Kendi web sitelerinizi ve uygulamalarınızı oluşturmak için Deriv API'sini kullanın ve müşterilerinizin yaptığı işlemlerden ve ödemelerden komisyon kazanın, yarattıklarınızdan işaretleme yoluyla para kazanın.

## Kar yüzdesi

Deriv API kullanarak geliştirdiğiniz alım satım uygulaması aracılığıyla satın alınan her sözleşmeye fiyat artışı uygulayarak gelirinizi artırın. Maksimum %3'e kadar olmak üzere fiyat artışını kendiniz belirleyebilirsiniz.

Tüm ticaret türlerini destekliyoruz, hem vanilla hem de turbo seçenekler dahil.

İşte işaretlemenin nasıl hesaplandığına dair bir örnek:

Dijital Seçenekler (Mevcut) için:

- Bahis: **USD 25.50**
- Ödeme: **USD 50**
- Kar Payı: **USD 50** (Ödeme) üzerinden **%2** = **USD 1**
- Müşteri Bakiyesi Tahsil Edildi: **USD 26.50**
- Ticaret Detayları: Göster **USD 26.50**
- Sözleşme değer hesaplaması: **USD 25.50** üzerinden
- Kar Hesaplaması: **USD 26.50** bahis üzerinden

Multipliers, Accumulators, Turbos ve Vanilla seçenekleri için (Yeni eklenen):

- Kar Payı: **USD 50** (Bahis) üzerinden **%2** = **USD 1**
- Müşteri Bakiyesi Tahsil Edildi: **USD 50**
- İşlem Detayları: **USD 50** göster
- Sözleşme değer hesaplaması: **USD 49** üzerinden
- Kar Hesabı: **USD 50** temele dayanarak

## Komisyon kazanma

Deriv API ile oluşturduğunuz web siteleri ve uygulamalar aracılığıyla müşterileriniz tarafından yapılan işlemlerden ve ödemelerden komisyon kazanın. Komisyon planları hakkında daha fazla bilgi edinin [burada](https://www.deriv.com/partners/affiliate-ib).
