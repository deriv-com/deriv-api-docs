---
title: รับรายชื่อประเทศ
sidebar_label: รับรายชื่อประเทศ
sidebar_position: 2
tags:
  - country_list
  - javascript
keywords:
  - country_list
  - javascript
description: รับข้อมูลเกี่ยวกับผู้ใช้ของคุณโดยการเพิ่มรายชื่อประเทศลงในแอพการซื้อขายของคุณ เรียนรู้วิธีทำเช่นนั้นด้วยตัวอย่าง JavaScript API นี้
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

การที่จะได้รับรายชื่อประเทศต่างๆ ให้อัปเดตตัวจัดการเหตุการณ์แบบเปิด โดยใช้วิธีการดังนี้:

```js title="index.js" showLineNumbers
const ping_interval = 12000;//เป็นมิลลิวินาทีซึ่งเท่ากับ 120 วินาที
ให้ช่วงเวลา;
//สมัครรับกิจกรรม `open '
websocket.addEventListener (' เปิด ', (กิจกรรม) => {
  console.log ('สร้างการเชื่อมต่อwebsocket:', กิจกรรม);
  const payload = JSON.stringify ({
    residence_list: 1,
  });
  websocket.send (payload);

  //เพื่อรักษาการเชื่อมต่อให้มีชีวิตอยู่
  ช่วง = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});
```

ตอนนี้อัปเดตผู้ฟังเหตุการณ์ “ข้อความ” เพื่อแสดงข้อมูล:

```js title="index.js" showLineNumbers
//สมัครสมาชิกอีเวนต์ 'ข้อความ
WebSocket.addEventListener (' ข้อความ ', (กิจกรรม) => {
  const receivedMessage = json.parse (event.data);
  สวิตช์ (ReceivedMessage.msg_type) {
    case' residence_list ':
      console.log ('รายชื่อประเทศ', ReceivedMessage.residence_list);
      break;
    case' ปิง ':
      console.log ('การตอบสนองปิง/ปอง: ', ReceivedMessage.ping);
      break;
    เริ่มต้น:
      console.log ('ข้อความที่ได้รับ:', รับข้อความ);
      break;
  }
});
```

การตอบสนองควรจะเป็นโปรแกรมเชิงวัตถุ:

```json showLineNumbers
{
  "echo_req": {
    "req_id": 1,
    "residence_list": 1
  },
  "msg_type": "residence_list",
  "req_id": 1,
  "residence_list": [
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {},
            "is_country_supported": 0
          }
        }
      },
      "phone_idd": "35818",
      "text": "Aland Islands",
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
                "display_name": "National Identity Card"
              },
              "passport": {
                "display_name": "Passport"
              }
            },
            "is_country_supported": 1
          }
        }
      },
      "phone_idd": "355",
      "text": "Albania",
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

ด้วยการเรียกใช้งานนี้ คุณจะได้รับข้อมูลที่เป็นประโยชน์เกี่ยวกับประเทศที่รองรับสนับสนุน เช่น:

- รหัส “2 ตัวอักษร” สำหรับแต่ละประเทศ
- ผู้ให้บริการ “ตัวตน” สำหรับแต่ละประเทศ
- รูปแบบตัวระบุภาษีประเทศ (`tin_format`)
- ฯลฯ

นี่อาจจะเป็นประโยชน์สำหรับแบบฟอร์มการสร้างบัญชี ซึ่งคุณจำเป็นต้องขอให้ผู้ใช้นั้นให้ข้อมูลที่ผ่านการตรวจสอบเกี่ยวกับฐานข้อมูลระบุตัวตนของพวกเขา ซึ่งขึ้นอยู่กับประเทศที่พวกเขาอาศัยอยู่

:: :ข้อควรระวัง
สำหรับการตรวจสอบที่อยู่และรหัสภาษี โปรดใช้ 'tin_format' ที่ให้ไว้สำหรับประเทศ
:::

ประเทศของผู้ใช้เป็นสิ่งสำคัญสำหรับขั้นตอนต่อไปของคุณ เพราะมันเป็นตัวกำหนดว่าสินทรัพย์และคุณสมบัติใดบ้างที่พวกเขาสามารถใช้ได้

:::tip
มันจะดีกว่าที่จะรับรายชื่อประเทศก่อนที่จะกรอกแบบฟอร์มของคุณ
:::

:::danger
คุณจะต้องมีเนื้อหาโดยละเอียดเกี่ยวกับบริการระบุตัวตน `IDV` และ `ONFIDO` ความแตกต่างและความเป็นไปได้ของพวกเขา
:::

รหัสโค้ดแบบล่าสุดของคุณจะเป็น:

```js title="index.js" showLineNumbers
const app_id = 1089;//แทนที่ด้วย app_id ของคุณหรือทิ้งเป็น 1089 สำหรับการทดสอบ
const websocket = เว็บซ็อกเก็ตใหม่ (`wss: //ws.derivws.com/websockets/v3? app_id=${app_id}`);
const ping_interval = 12000;//เป็นมิลลิวินาทีซึ่งเท่ากับ 120 วินาที
ช่วงเวลา;

//สมัครสมาชิกเหตุการณ์ `open`
WebSocket.addEventListener ('open', (event)
  => {console.log ('websocket' การเชื่อมต่อที่สร้างขึ้น: ',กิจกรรม);
  const เพย์โหลด = JSON.stringify ({
    residence_list: 1,
  });
  websocket.send (เพย์โหลด);

  //เพื่อรักษาการเชื่อมต่อให้มีชีวิต
  ช่วง = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//สมัครรับอีเวนต์ “ข้อความ”
websocket.addEventListener ('ข้อความ', (กิจกรรม) => {
  const receivedMessage = json.parse (event.data);
  สวิตช์ (ReceivedMessage.msg_type) {
    case 'residence_list':
      console.log ('รายชื่อประเทศ', ReceivedMessage.residence_list); แตก;

    กรณี 'ping':
      console.log ('การตอบสนองปิง/ปอง: ', ReceivedMessage.ping);
      break;
    ค่าเริ่มต้น:
      console.log ('ข้อความที่ได้รับ:', รับข้อความ);
      break;
  }
});

//สมัครสมาชิกอีเวนต์ `ปิด`
WebSocket.addEventListener ('ปิด', (กิจกรรม) => {
  console.log ('ปิดการเชื่อมต่อเว็บซ็อกเก็ต: ', กิจกรรม);
  clearInterval (ช่วง);
});

//สมัครรับเหตุการณ์ `error`
WebSocket.addEventListener (' error ', (event) => {
  console.log ('เกิดข้อผิดพลาดในการเชื่อมต่อเว็บซ็อกเก็ต', กิจกรรม);};

```
