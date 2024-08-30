---
title: API Calls İşlevleri
hide_title: false
draft: false
sidebar_label: API Çağrılarının İşlevleri
sidebar_position: 1
tags:
  - konsept
  - calls
  - anatomi
keywords:
  - ticaret uygulaması
  - api calls
  - api örneği
description: API çağrısı özelliğini kullanarak ticaret uygulamanız için API çağrıları ayarlayın. API örnekleri ile abone olmayı, istek göndermeyi ve yanıt verilerini almayı öğrenin.
---

## Abone ol ve gönder

Tüm API calls, bir istekte bulunmak ve yanıt almak için bir gönderme işlevine sahiptir. Bazı API calls, yeni bilgiler mevcut olduğunda güncellemelerin uygulamanıza gönderilmesine izin veren bir abonelik işlevi de sunar.

### Abone ol

Birkaç API çağrısı `abone ol` işlevini sağlar. Bir API call için abone olduğunuzda, bu belirli API çağrısına ait verilerden sürekli bir akış alırsınız.

Bu API çağrılarından bazıları otomatik olarak abone olur (örneğin [ticks](/api-explorer#ticks)) ve bazılarında isteğe bağlı bir `abone ol` alanı vardır. Eğer `subscribe` alanına `1` geçerseniz, abonelik başlar ve sunucu siz `Forget` veya `Forget all` API çağrılarını kullanarak aboneliğinizi iptal edene kadar istenen verileri göndermeye devam eder.

Örneğin, tik geçmişi verilerini almak için [Tick History](/api-explorer#ticks_history) çağrısı yapabilirsiniz. Ancak bu çağrıya `abone ol` seçeneğini eklediğinizde, ilk yanıtta talep ettiğiniz tik geçmişi verilerini alacaksınız ve verilen sembol için sunucu tarafından yayınlanan her yeni tik olduğunda yeni bir yanıt almaya devam edeceksiniz.

Abonelik`ten gelen mesaj akışında, `abonelik`adlı bir alan vardır. Bu`Akış Kimliği`dir. Bu ID ile mantığınızdaki mesaj akışını tanımlayabilir ve akışı `Forget`ve`Forget All\\\\\\\\` API çağrıları ile durdurabilirsiniz.

API çağrıları tarafından `subscribe` işlevselliği ile sağlanan veriler, diğer API çağrıları ve özellikleri için veri kaynağı olarak kullanılabilir.

### Gönder

API'yi `send` işlevi ile çağırırsanız, sunucu istenen verileri yalnızca bir kez geri gönderecektir. Güncellenen verileri almak için API call'u tekrar göndermeniz gerekir. Bu yöntem genellikle diğer API çağrı yanıtlarını veya `Click`, `Scroll` gibi UI olaylarını aldığınızda kullanılır.

### Unut

Eğer `subscribe` tarafından oluşturulan mesaj akışını durdurmak istiyorsanız, `Forget` API çağrısını doğru `Akış Kimliği` ile çağırmanız gerekecektir. Aksi takdirde, akışları `Method name`lerine göre durdurmak için `Forget All` API çağrısını kullanabilirsiniz.

:::caution
Forget\\\\\\\\` API çağrısı hakkında daha fazla bilgi için API gezginindeki [Forget](/api-explorer#forget) ve [Forget All](/api-explorer#forget_all) sayfalarına göz atın.
:::

## Veri talep et

WebSocket bağlantınızın istek ve yanıt akışını işlemenizi kolaylaştırmak için, her Deriv WebSocket API call standart bir yapı izler. Önbelleğe alma, doğrulama, istek ve yanıt eşitlemesi için kullanabilirsiniz.

#### API call yöntemi adı

WebSocket API'sindeki her `istek', istek için benzersiz bir tanımlayıcı görevi gören bir `metot adı' alanı içerir. Çoğu durumda, bu `metot adı` `1` sayısal değerini alacaktır. Ancak, identifier özelliğinin bir dize değerine sahip olabileceği bazı durumlar vardır.

:::caution
API Çağrı Yöntemi Adı her zaman gereklidir. Bu alan WebSocket sunucumuzdan alacağınız verileri belirler.
:::

### Zorunlu alanlar

Her istek verisi, sağlamanız gereken zorunlu alanlara sahiptir ve isteğe bağlı alanlar da içerebilir. Bunu `İkamet Listesi`nden bir örnekle inceleyelim.

Bir `İkamet Listesi` çağrısı, hesap açma formunu doldurmak için uygun olan ülkelerin ve 2 harfli ülke kodlarının bir listesini döndürür.

Bu çağrı için talep verileri aşağıdaki gibidir:

```ts showLineNumbers
{
  residence_list: 1;//Api Çağrı Yöntemi Adı geçidi?
  : object;//İsteğe bağlı
  req_id? : number;//Opsiyonel
}
```

Residence_list`alanı çağrı için`metod adı`dır ve gereklidir. Göndermek istediğiniz isteğin bu türüyle ilgili başka zorunlu alanlar olabilir. `Residence List' ve diğer API calls hakkında daha fazla bilgi edinmek için lütfen bunları [API Explorer](/api-explorer#residence_list)'de kontrol edin.

### İsteğe bağlı alanlar

Her call birkaç `Opsiyonel` alana sahiptir. Passthrough`ve`req_id\` her zaman istek verilerinin bir parçasıdır, ancak bunları kullanmamayı seçebilirsiniz.

#### `passthrough` alanı

Bu alana aktardığınız her şey size bir `response` nesnesi içinde geri döndürülecektir. Bu, `istekleriniz' ve `yanıtlarınız' için durumsal bir akışı simüle etmeniz gerektiğinde yararlı olabilir.

#### `req_id` alanı

İsteklerinizi `etiketlemeniz` ve `WebSocket` çağrılarımızdan geçirmeniz gerekebilir. Bunu, bu alana bir `sayı` geçirerek yapabilirsiniz. Bu, `talepleri' `cevaplarla' eşleştirmeniz gerektiğinde yardımcı olabilir.

:::caution
Her bir API call için ek isteğe bağlı alanlar hakkında bilgi edinmek için lütfen [API Explorer](/api-explorer) adresimize bakın.
:::

## Yanıt verileri

Çağrı için yanıt aldığınızda, gerçek verileri içeren `metod adı` ile aynı ada sahip bir `Field` olacaktır.

İkamet Listesi\` call için yanıt:

```js showLineNumbers
{
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  residence_list: [
       {
            "identity": {
                "services": {
                    "idv": {
                        "documents_supported": {},
                        "has_visual_sample": 0,
                        "is_country_supported": 0
                    },
                    "onfido": {
                        "documents_supported": {
                            "driving_licence": {
                                "display_name": "Driving Licence"
                            }
                        },
                        "is_country_supported": 0
                    }
                }
            },
            "phone_idd": "35818",
            "text": "Aland Adaları",
            "value": "ax"
        },
        {
            "identity": {
                "services": {
                    "idv": {
                        "documents_supported": {},
                        "has_visual_sample": 0,
                        "is_country_supported": 0
                    },
                    "onfido": {
                        "documents_supported": {
                            "driving_licence": {
                                "display_name": "Driving Licence"
                            },
                            "national_identity_card": {
                                "display_name": "Ulusal Kimlik Kartı"
                            },
                            "pasaport": {
                                "display_name": "Pasaport"
                            }
                        },
                        "is_country_supported": 1
                    }
                }
            },
            "phone_idd": "355",
            "text": "Albania",
            "tin_format": [
                "^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"
            ],
            "value": "al"
        },
        // ....
  ],
};
```

Burada `residence_list`, `method name`dir ve talep ettiğiniz gerçek verileri içerir. Kısa tutmak için dizinin geri kalanını dahil etmedik. Gerçek yanıtı [buradan] kontrol edebilirsiniz (/api-explorer#residence_list).

#### echo_req\` alanı

Bu `Alan` sunucuya gönderdiğiniz `İstek Verisi`nin aynısını içerir.

#### msg_type\` alanı

Bu `Alan`, WebSocket bağlantısının mesaj olayında hangi `mesaj` verisini aldığınızı belirlemenize yardımcı olur. Örneğin, `JavaScript`te WebSocket bağlantınız için `onmessage` olay işleyiciniz şöyle olacaktır:

```js showLineNumbers
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);

  switch (receivedMessage.msg_type) {
    case "residence_list":
      console.log("The residence list is : ",receivedMessage.residence_list)
      break;
    case "other_request_identifier"
      console.log("the response", receivedMessage.some_other_request_identifier)
    default:
      console.log("receivedMessage", receivedMessage)
      break;
  }
}
```

#### req_id\` alanı

Bu, `Request Data`ya aktarılan `Opsiyonel`dır, `doğrulama`, `senkronizasyon`, `önbelleğe alma` vb. için kullanabilirsiniz.

:::tip
msg_type\` her zaman yanıt verisinde bulunur.
:::
