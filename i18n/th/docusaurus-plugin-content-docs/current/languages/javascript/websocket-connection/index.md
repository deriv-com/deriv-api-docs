---
title: ตั้งค่าการเชื่อมต่อ WebSocket
sidebar_label: การเชื่อมต่อ WebSocket
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - websocket-connection
description: คำแนะนำเกี่ยวกับวิธีการตั้งค่าการเชื่อมต่อ WebSocket กับ WebSocket API บนแอพการซื้อขายของคุณ
---

:::caution

หากคุณไม่คุ้นเคยกับ WebSockets โปรดดูที่ [เอกสารของเรา] (/docs/core concepts/websocket)

:::

### ตั้งค่าการเชื่อมต่อ WebSocket

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

ในขั้นตอนต่อไป เราจะสร้างการเชื่อมต่อ WebSocket เข้ากับเซิร์ฟเวอร์ Deriv WebSocket ตามที่เห็นด้านล่าง:

```js title="index.js" showLineNumbers
const app_id = 1089;//แทนที่ด้วย app_id ของคุณหรือทิ้งเป็น 1089 สำหรับการทดสอบ
const websocket = เว็บซ็อกเก็ตใหม่ (`wss: //ws.derivws.com/websockets/v3? app_id =${app_id}`);
```

:::info
`app_id = 1089` เป็นเพียงเพื่อวัตถุประสงค์ในการทดสอบ กรุณาอัปเดตด้วย app_id ของคุณเองเมื่อคุณเผยแพร่แอปพลิเคชั่นของคุณในสภาพแวดล้อมการใช้งานจริง โปรดตรวจสอบ [คู่มือนี้] (/docs/setting-up-a-deriv-application) เพื่อสร้างแอปใหม่สำหรับตัวคุณเอง
:::

ณ จุดนี้เราเชื่อมต่อกับ “เซิร์ฟเวอร์ WebSocket” แต่เราไม่ได้รับข้อมูลใดๆ ณ จุดนี้เราเชื่อมต่อกับ “เซิร์ฟเวอร์ WebSocket” แต่เราไม่ได้รับข้อมูลใดๆ ในการส่งหรือรับข้อมูล เราต้องสมัครสมาชิก <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">Websocket event</a> แต่เราไม่ได้รับข้อมูลใดๆ เซิร์ฟเวอร์ WebSocket ของเรามีฟังก์ชั่น <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a> เรามาใช้มันในโครงการสาธิตของเราเพื่อการส่งและรับข้อมูลกันเถอะ เปลี่ยนผู้ฟังเหตุการณ์สำหรับ `open `และ `message` ดังต่อไปนี้: เรามาใช้มันในโครงการสาธิตของเราเพื่อการส่งและรับข้อมูลกันเถอะ เปลี่ยนผู้ฟังเหตุการณ์สำหรับ `open `และ `message` ดังต่อไปนี้:

โดยทั่วไปเรามี 4 เหตุการณ์ในการเชื่อมต่อ WebSocket:

- **ปิด**:
  ถูกปิดเมื่อปิดการเชื่อมต่อกับ WebSocket นอกจากนี้ ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onclose นอกจากนี้ ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onclose นอกจากนี้ ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onclose
- **เปิด**:
  ถูกเปิดเมื่อเปิดการเชื่อมต่อกับ WebSocket นอกจากนี้ ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onopen นอกจากนี้ ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onopen นอกจากนี้ ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onopen
- **ข้อความ**:
  ถูกเรียกใช้เมื่อได้รับข้อมูลผ่าน WebSocket นอกจากนี้ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onmessage นอกจากนี้ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onmessage นอกจากนี้ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onmessage
- **ข้อผิดพลาด**:
  ถูกปิดเมื่อการเชื่อมต่อกับ WebSocket ถูกปิดเนื่องจากข้อผิดพลาด เช่น เมื่อไม่สามารถส่งข้อมูลบางอย่างได้ นอกจากนี้ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onerror นอกจากนี้ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onerror นอกจากนี้ยังสามารถใช้ได้ผ่านทางฟีเจอร์ onerror

มาเพิ่มตัวจัดการเหตุการณ์สำหรับเหตุการณ์เหล่านี้ในการเชื่อมต่อ WebSocket ของเรากันเถอะ

```js title="index.js" showLineNumbers
//สมัครสมาชิกอีเวนต์ `open`
WebSocket.addEventListener ('เปิด', (กิจกรรม) => {
  console.log ('สร้างการเชื่อมต่อ websocket: ', กิจกรรม);
});

//สมัครรับอีเวนต์ `message`
WebSocket.addEventListener (' ข้อความ ', (กิจกรรม) => {
  console.log ('ข้อความใหม่ที่ได้รับจากเซิร์ฟเวอร์:', กิจกรรม);


//สมัครสมาชิกอีเวนต์ `ปิด`
websocket.addEventListener ('close', (event) => {
  console.log ('เว็บซ็อกเก็ตปิดแล้ว: ', event);
});

//สมัครรับเหตุการณ์ `error`
WebSocket.addEventListener (' error ', (event) => {
  console.log ('เกิดข้อผิดพลาดในการเชื่อมต่อเว็บซ็อกเก็ต', กิจกรรม);
});
```

ตอนนี้เปิดไฟล์ `index.html` ในเบราว์เซอร์ของเราและตรวจสอบคอนโซลนักพัฒนาของคุณ คุณควรเห็นเฉพาะบันทึกสำหรับ `การเชื่อมต่อ WebSocket สร้างขึ้น` ตอนนี้เปิดไฟล์ `index.html` ในเบราว์เซอร์ของเราและตรวจสอบคอนโซลนักพัฒนาของคุณ คุณควรเห็นเฉพาะบันทึกสำหรับ `การเชื่อมต่อ WebSocket สร้างขึ้น` คุณควรเห็นเฉพาะบันทึกสำหรับ `การเชื่อมต่อ WebSocket สร้างขึ้น`

### ส่งและรับข้อมูล

เซิร์ฟเวอร์ WebSocket ของเรามีฟังก์ชั่น <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a> เรามาใช้มันในโครงการสาธิตของเราเพื่อการส่งและรับข้อมูลกันเถอะ เปลี่ยนผู้ฟังเหตุการณ์สำหรับ `open `และ `message` ดังต่อไปนี้: เรามาใช้มันในโครงการสาธิตของเราเพื่อการส่งและรับข้อมูลกันเถอะ เปลี่ยนผู้ฟังเหตุการณ์สำหรับ `open `และ `message` ดังต่อไปนี้:

:::caution
ฟังก์ชัน “send” ในการเชื่อมต่อ WebSocket จะได้รับเพียง `สตริง`, `ArrayBuffer`, `Blob`, `TypeDarray` และ `DataView` คุณสามารถอ่านเพิ่มเติมเกี่ยวกับพวกเขาได้ที่ [MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) ซึ่งหมายความว่าถ้าเราต้องการส่ง “วัตถุ” เราต้องกรอกรอบด้วย `JSON.stringify` ก่อน ฟังก์ชัน “send” ในการเชื่อมต่อ WebSocket จะได้รับเพียง `สตริง`, `ArrayBuffer`, `Blob`, `TypeDarray` และ `DataView` คุณสามารถอ่านเพิ่มเติมเกี่ยวกับพวกเขาได้ที่ [MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) ซึ่งหมายความว่าถ้าเราต้องการส่ง “วัตถุ” เราต้องกรอกรอบด้วย `JSON.stringify` ก่อน คุณสามารถอ่านเพิ่มเติมเกี่ยวกับพวกเขาได้ที่ [MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) ซึ่งหมายความว่าถ้าเราต้องการส่ง “วัตถุ” เราต้องกรอกรอบด้วย `JSON.stringify` ก่อน ซึ่งหมายความว่าถ้าเราต้องการส่ง “วัตถุ” เราต้องกรอกรอบด้วย `JSON.stringify` ก่อน
:::

```js title="index.js" showLineNumbers
//สมัครสมาชิกอีเวนต์ `เปิด '
websocket.addEventListener (' เปิด ', (กิจกรรม) => {
  console.log ('สร้างการเชื่อมต่อเว็บซ็อกเก็ต:', กิจกรรม);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);
});

//สมัครรับอีเวนต์ `ข้อความ
WebSocket.addEventListener ('message', (กิจกรรม) => {
  const receivedMessage = JSON.parse (event.data);
  console.log ('ข้อความใหม่ที่ได้รับจากเซิร์ฟเวอร์: ', ReceivedMessage);
});
```

“ReceivedMessage” จะเป็นวัตถุดังนี้:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

ขอแสดงความยินดี :tada:

คุณเพิ่งสร้างโครงการสาธิตอันแรกของคุณกับ WebSockets ได้สำเร็จแล้ว

:::tip
คำขอ “ping” ส่วนใหญ่จะใช้เพื่อทดสอบการเชื่อมต่อหรือเพื่อรักษาให้มีชีวิต
:::

### รักษาการเชื่อมต่อ WebSocket connection ให้คงอยู่

โดยค่าเริ่มต้น “การเชื่อมต่อ WebSocket” จะถูกปิดเมื่อไม่มีการส่งข้อมูลระหว่างกันเป็นเวลาประมาณ**180 วินาที** โดยค่าเริ่มต้น “การเชื่อมต่อ WebSocket” จะถูกปิดเมื่อไม่มีการส่งข้อมูลระหว่างกันเป็นเวลาประมาณ**180 วินาที** วิธีหนึ่งในการรักษาการเชื่อมต่อให้มีชีวิตอยู่คือการส่งคำขอ [ping] (/api-explorer #ping) โดยมีช่วงเวลา**120 วินาที** นี่จะรักษาการเชื่อมต่อให้คงอยู่และพร้อมใช้งาน นี่จะรักษาการเชื่อมต่อให้คงอยู่และพร้อมใช้งาน โดยค่าเริ่มต้น “การเชื่อมต่อ WebSocket” จะถูกปิดเมื่อไม่มีการส่งข้อมูลระหว่างกันเป็นเวลาประมาณ**180 วินาที** วิธีหนึ่งในการรักษาการเชื่อมต่อให้มีชีวิตอยู่คือการส่งคำขอ [ping] (/api-explorer #ping) โดยมีช่วงเวลา**120 วินาที** นี่จะรักษาการเชื่อมต่อให้คงอยู่และพร้อมใช้งาน นี่จะรักษาการเชื่อมต่อให้คงอยู่และพร้อมใช้งาน

ตัวอย่างการตั้งค่าอย่างง่ายจะเป็นดังต่อไปนี้:

```js title="index.js" showLineNumbers
const ping_interval = 12000;//เป็นมิลลิวินาทีซึ่งเท่ากับ 120 วินาที
ให้ช่วงเวลา;
websocket.addEventListener ('เปิด', (กิจกรรม) => {
  console.log ('สร้างการเชื่อมต่อwebsocket: ', กิจกรรม);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);

  //เพื่อรักษาการเชื่อมต่อให้มีชีวิต
  ช่วง = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//สมัครรับอีเวนต์`ปิด`
WebSocket.addEventListener ('ปิด', (กิจกรรม) => {
  console.log ('websocketปิดการเชื่อมต่อ: ', เหตุการณ์);
  clearInterval (ช่วงเวลา);
});
```

ตอนนี้เมื่อมีการเชื่อมต่อ “สร้างขึ้น” เราจะเริ่มส่งคำขอ “ping” ด้วยช่วงเวลา “12000ms”

รหัสโค้ดแบบล่าสุดของคุณควรเป็น:

```js title="index.js" showLineNumbers
const app_id = 1089;//แทนที่ด้วย app_id ของคุณหรือทิ้งเป็น 1089 สำหรับการทดสอบ
const websocket = เว็บซ็อกเก็ตใหม่ (`wss: //ws.derivws.com/websockets/v3? app_id=${app_id}`);
const ping_interval = 12000;//เป็นมิลลิวินาทีซึ่งเท่ากับ 120 วินาที
ช่วงเวลา;

//สมัครรับกิจกรรม `open`
WebSocket.addEventListener ('open', (event)
  => {console.log ('websocket' การเชื่อมต่อที่สร้างขึ้น: ',กิจกรรม);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);

  //เพื่อรักษาการเชื่อมต่อให้มีชีวิต
  ช่วง = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//สมัครรับอีเวนต์ “ข้อความ”
websocket.addEventListener ('ข้อความ', (กิจกรรม) => {
  const receivedMessage = json.parse (event.data);
  console.log ('ข้อความใหม่ที่ได้รับจากเซิร์ฟเวอร์: ', ReceivedMessage);
});

//สมัครสมาชิกกิจกรรม`ปิด`
WebSocket.addEventListener ('close ', (event) => {
  console.log ('เว็บซ็อกเก็ตปิดแล้ว:', กิจกรรม);
  clearInterval (ช่วงเวลา);
});

//สมัครรับเหตุการณ์ `error`
websocket.addEventListener ('error', (event) => {
  console.log ('เกิดข้อผิดพลาดในการเชื่อมต่อเว็บซ็อกเก็ต', กิจกรรม);
});
```
