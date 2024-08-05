---
title: การตั้งค่าโครงการ | จาวาสคริปต์
sidebar_label: การตั้งค่าโครงการ
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - project-setup
description: สร้างไดเรกทอรีสำหรับโครงการแอปซื้อขาย API ถัดไปโดยใช้ WebSocket
---

### สร้างโครงการ

เราจะสร้างหน้า `HTML` ง่ายๆที่มีไฟล์ JavaScript ของเราซึ่งจะจัดการการเชื่อมต่อ WebSocket ของเรา ก่อนอื่นให้สร้างไดเรกทอรี่หรือโครงสร้างการจัดเรียงไฟล์สำหรับโครงการอันถัดไปของคุณ: ก่อนอื่นให้สร้างไดเรกทอรี่หรือโครงสร้างการจัดเรียงไฟล์สำหรับโครงการอันถัดไปของคุณ: ก่อนอื่นให้สร้างไดเรกทอรี่หรือโครงสร้างการจัดเรียงไฟล์สำหรับโครงการอันถัดไปของคุณ:

```bash
mkdir deriv-websocket-demo
```

ไปที่โฟลเดอร์ “deriv-websocket-demo”:

```bash
cd deriv-websocket-demo
```

ขั้นตอนถัดไปคือ สร้างไฟล์ต่างๆ ที่ต้องการตามที่คุณเห็นด้านล่างนี้:

```bash
touch index.html index.css index.js
```

:::tip
เราขอแนะนำให้ใช้ [Visual Studio Code] (https://code.visualstudio.com/) โดยเปิดใช้งาน [ส่วนขยายเซิร์ฟเวอร์สด] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) นี่จะช่วยให้คุณได้มากในการใช้งานต่างๆ นี่จะช่วยให้คุณได้มากในการใช้งานต่างๆ นี่จะช่วยให้คุณได้มากในการใช้งานต่างๆ นี่จะช่วยให้คุณได้มากในการใช้งานต่างๆ นี่จะช่วยให้คุณได้มากในการใช้งานต่างๆ นี่จะช่วยให้คุณได้มากในการใช้งานต่างๆ นี่จะช่วยให้คุณได้มากในการใช้งานต่างๆ
:::

ตอนนี้เปิดไฟล์ `index.html` หรือใช้ [ส่วนขยายเซิร์ฟเวอร์สด] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

แล้วตอนนี้ก็ให้คุณเปลี่ยนเนื้อหาของไฟล์โดยใช้วิธีการต่อไปนี้:

```js title="index.js" showLineNumbers
console.log ('เราจะสร้างการเชื่อมต่อเว็บซ็อกเก็ตของเราที่นี่');
```

```html title="index.html" showLineNumbers
<DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deriv HTML JS เดโมเดโม</title>
  </head>
  <body>
    <h2>เดริฟ เว็บซ็อกเก็ต API สาธิต</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

หลังจากเพิ่มเนื้อหาเราสามารถเรียกใช้แอปพลิเคชันได้โดยเพียงแค่เรียกใช้ไฟล์ `index.html` หรือโดยใช้ <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server Extension</a> เมื่อเรียกใช้แอพของคุณ ให้ดูในคอนโซล “console.log” ปรากฏขึ้นหรือไม่ แล้วคุณจะรู้ว่าไฟล์ JavaScript นั้นกำลังทำงานอยู่ เพื่อสามารถดำเนินการเชื่อมต่อ websocket ได้อย่างถูกต้อง เมื่อเรียกใช้แอปของคุณ ให้ดูในคอนโซล “console.log” ปรากฏขึ้นหรือไม่ แล้วคุณจะรู้ว่าไฟล์ JavaScript นั้นกำลังทำงานอยู่ เพื่อสามารถดำเนินการเชื่อมต่อ websocket ได้อย่างถูกต้อง เมื่อเรียกใช้แอปของคุณ ให้ดูในคอนโซล “console.log” ปรากฏขึ้นหรือไม่ แล้วคุณจะรู้ว่าไฟล์ JavaScript นั้นกำลังทำงานอยู่ เพื่อสามารถดำเนินการเชื่อมต่อ websocket ได้อย่างถูกต้อง เมื่อเรียกใช้แอปของคุณ ให้ดูในคอนโซล “console.log” ปรากฏขึ้นหรือไม่ แล้วคุณจะรู้ว่าไฟล์ JavaScript นั้นกำลังทำงานอยู่ เพื่อสามารถดำเนินการเชื่อมต่อ websocket ได้อย่างถูกต้อง เมื่อเรียกใช้แอปของคุณ ให้ดูในคอนโซล “console.log” ปรากฏขึ้นหรือไม่ แล้วคุณจะรู้ว่าไฟล์ JavaScript นั้นกำลังทำงานอยู่ เพื่อสามารถดำเนินการเชื่อมต่อ websocket ได้อย่างถูกต้อง เมื่อเรียกใช้แอปของคุณ ให้ดูในคอนโซล “console.log” ปรากฏขึ้นหรือไม่ แล้วคุณจะรู้ว่าไฟล์ JavaScript นั้นกำลังทำงานอยู่ เพื่อสามารถดำเนินการเชื่อมต่อ websocket ได้อย่างถูกต้อง เมื่อเรียกใช้แอปของคุณ ให้ดูในคอนโซล “console.log” ปรากฏขึ้นหรือไม่ แล้วคุณจะรู้ว่าไฟล์ JavaScript นั้นกำลังทำงานอยู่ เพื่อสามารถดำเนินการเชื่อมต่อ websocket ได้อย่างถูกต้อง

สำหรับการตั้งค่าเว็บซ็อกเก็ต Deriv คุณสามารถดำเนินการไปยังหน้า [การเชื่อมต่อ WebSocket] (/docs/languages /javascript/websocket-connection)
