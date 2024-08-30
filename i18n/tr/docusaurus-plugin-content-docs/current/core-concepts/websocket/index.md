---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - konsept
  - websocket
keywords:
  - ticaret uygulaması
  - websocket protokolü
  - websocket bağlantıları
description: WebSocket protokolü ve WebSocket bağlantıları hakkında bilgi edinin ve bunları nasıl entegre edeceğinizi öğrenin, böylece ticaret uygulamanızda veri alışverişini etkinleştirebilirsiniz.
---

## WebSockets nedir?

RFC 6455] (https://datatracker.ietf.org/doc/html/rfc6455) spesifikasyonunda açıklanan `WebSocket` protokolü, kalıcı bir bağlantı aracılığıyla tarayıcı ve sunucu arasında veri alışverişi için bir yol sağlar. Veriler, bağlantıyı kesmeden veya ek HTTP isteklerine ihtiyaç duymadan her iki yönde de “paketler” olarak iletilebilir.

WebSocket, sürekli veri alışverişi gerektiren hizmetler için özellikle harikadır, örneğin gerçek zamanlı ticaret sistemleri vb.

## Basit bir örnek

Bir WebSocket bağlantısı açmak için, url`de `ws`veya`wss`özel protokolünü kullanarak`new WebSocket`oluşturmamız gerekir. İşte bunu`JavaScript\` ile nasıl yapabileceğiniz:

```js
let socket = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

Öte yandan, `ws://` verileri şifrelenmez ve aracılar tarafından görülebilir. Eski proxy sunucuları “garip” başlıklarla karşılaşabilir ve bağlantıyı sonlandırabilir.

wss://\`, HTTPS'nin TLS üzerinden HTTP olmasına benzer şekilde TLS üzerinden WebSocket anlamına gelir. Taşıma güvenlik katmanı ile veriler gönderen tarafından şifrelenir ve alıcı tarafından şifresi çözülür. Bu, şifrelenmiş veri paketlerinin denetlenmeden proxy'lerden başarıyla geçebileceği anlamına gelir.
:::

Soket oluşturulduktan sonra, üzerindeki olayları dinlemeliyiz. Toplamda 4 etkinlik var:

- Açık — Bağlantı kuruldu
- Mesaj — Alınan veriler
- Hata — WebSocket hatası
- Kapat — Bağlantı kapalı

Mesaj gönderme socket.send (data) aracılığıyla yapılabilir.

İşte `JavaScript`te bir örnek:

```js showLineNumbers
const app_id = 1089; // App_id ile değiştirin veya test için 1089 olarak bırakın.
const socket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

socket.onopen = function (e) {
  console.log('[open] Connection established');
  console.log('Sending to server');
  const sendMessage = JSON.stringify({ ping: 1 });
  socket.send(sendMessage);
};

socket.onmessage = function (event) {
  console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    consloe.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};
```

## Neden WebSockets'e ihtiyacımız var ve onlardan ne zaman kaçınmalıyız?

WebSockets önemli bir istemci-sunucu iletişim aracıdır. Potansiyellerinden en iyi şekilde yararlanmak için, nasıl yardımcı olabileceklerini ve bunları kullanmaktan kaçınmanın en iyi ne zaman olduğunu anlamak önemlidir. Bir sonraki bölümde kapsamlı bir şekilde açıklanmıştır.

Aşağıdaki durumlarda WebSockets kullanın:

1. Gerçek zamanlı bir web uygulaması geliştirirken.
   WebSocket'in en geleneksel kullanımı, müşteri ucunda sürekli veri görüntülenmesine yardımcı olduğu gerçek zamanlı uygulama geliştirmedir. Back-end sunucusu bu verileri sürekli olarak geri gönderdiğinden, bir WebSocket zaten açık olan bağlantıda bu verilerin kesintisiz olarak itilmesine veya iletilmesine izin verir. WebSockets kullanımı, bu tür veri iletimini hızlandırır ve uygulamanın performansından yararlanır.
2. Deriv gibi ticaret siteleri için.
   Burada WebSocket, dağıtılan arka uç sunucusu tarafından istemciye yönlendirilen veri işlemeye yardımcı olur.
3. Bir sohbet uygulaması oluştururken.
   Sohbet uygulaması geliştiricileri, tek seferlik değişim ve mesaj yayınlama/yayımlama gibi işlemlerde yardım için WebSockets'ı çağırır. Aynı WebSocket bağlantısı mesaj göndermek/almak için kullanıldığından, iletişim kolay ve hızlı hale gelir.

Artık WebSockets'ın nerede kullanılması gerektiğini belirlediğimize göre, bunlardan kaçınmanın en iyi nerede olduğunu görelim. Bu, gereksiz operasyonel zorluklardan uzak durmanıza yardımcı olacaktır.

İhtiyaç duyulan tek şey eski verileri veya yalnızca bir kez işlenecek verileri almak olduğunda WebSockets kullanılmamalıdır. Bu durumlarda, HTTP protokollerini kullanmak akıllıca bir seçimdir.

## WebSocket vs HTTP

Uygulama iletişimi için hem HTTP hem de WebSocket protokolleri kullanıldığından, insanlar genellikle kafası karışır ve birini seçmekte zorlanır.

Daha önce söylendiği gibi, WebSocket çerçeveli ve çift yönlü bir protokoldür. Öte yandan HTTP, TCP protokolünün üzerinde çalışan tek yönlü bir protokoldür.

WebSocket protokolü sürekli veri iletimini destekleyebildiğinden, büyük ölçüde gerçek zamanlı uygulama geliştirmede kullanılır. HTTP durum bilgisi içermez ve [RESTful] (https://de.wikipedia.org/wiki/Representational_State_Transfer) ve [SOAP] (https://de.wikipedia.org/wiki/SOAP) uygulamalarının geliştirilmesi için kullanılır. SOAP, uygulama için hala HTTP'yi kullanabilir, ancak REST geniş bir şekilde yaygındır ve kullanılır.

WebSocket'te, iletişim her iki uçta da gerçekleşir ve bu da onu daha hızlı bir protokol yapar. HTTP'de, bağlantı bir uçta kurulur ve WebSocket'ten biraz daha durgun hale gelir.

WebSocket, birleşik bir TCP bağlantısı kullanır ve bağlantıyı sonlandırmak için bir tarafa ihtiyaç duyar. Bu gerçekleşene kadar, bağlantı aktif kalır. HTTP'nin ayrı istekler için ayrı bir bağlantı kurması gerekir. İstek tamamlandığında, bağlantı otomatik olarak kesilir.

## WebSocket bağlantıları nasıl kurulur?

Süreç, yeni bir şema (ws veya wss) kullanmayı içeren bir WebSocket el sıkışma ile başlar. Anlamanıza yardımcı olmak için, bunları sırasıyla HTTP ve güvenli HTTP'ye (HTTPS) eşdeğer olarak düşünün.

Bu şemayı kullanarak, sunucuların ve istemcilerin standart WebSocket bağlantı protokolünü izlemesi beklenir. WebSocket connection establishment, Bağlantı gibi birkaç başlık içeren bir HTTP istek upgrading ile başlar: Upgrade, Upgrade: WebSocket, Sec-WebSocket- Key, vb.

Bu bağlantının nasıl kurulduğu aşağıda açıklanmıştır:

1. **İstek :** Bağlantı Upgrade başlığı WebSocket el sıkışmasını belirtirken Sec-WebSocket-Key Base64 kodlu rastgele değer içerir. Bu değer, her WebSocket el sıkışması sırasında keyfi olarak oluşturulur. Yukarıdakilerin yanı sıra, anahtar başlık da bu isteğin bir parçasıdır.

Yukarıda listelenen başlıklar birleştirildiğinde bir HTTP GET isteği oluşturur. İçinde benzer veriler olacak:

```
GET ws://websocketexample.com:8181/ HTTP/1.1
Host: localhost:8181
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: b6gjhT32u488lpuRwKaOWs==
```

Sec-WebSocket-Version açıklığa kavuşturmak için, istemci için kullanıma hazır WebSocket protokol sürümü açıklanabilir.

2. **Yanıt:** Yanıt başlığı Sec-WebSocket-Accept, Sec-WebSocket-Key istek başlığında gönderilen değerin geri kalanını içerir. Bu, belirli bir protokol spesifikasyonu ile bağlantılıdır ve yanıltıcı bilgileri uzak tutmak için yaygın olarak kullanılır. Başka bir deyişle, API güvenliğini artırır ve kötü yapılandırılmış sunucuların uygulama geliştirmede hatalar oluşturmasını engeller.

Daha önce gönderilen talebin başarısı üzerine, aşağıda belirtilen metin dizisine benzer bir yanıt alınacaktır:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## Referanslar

- \*\* [WebSockets API'leri - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)\*\*
- \*\* [WebSocket - Javascript Bilgisi](https://javascript.info/websocket)\*\*
