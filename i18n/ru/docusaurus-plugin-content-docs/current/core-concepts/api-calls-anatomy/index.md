---
title: Functions of API Calls
hide_title: false
draft: false
sidebar_label: Functions of API Calls
sidebar_position: 1
tags:
  - concept
  - calls
  - anatomy
keywords:
  - trading app
  - api calls
  - api example
description: Set up API calls for your trading app using the API call feature. With API examples, learn to subscribe, send requests, and get response data.
---

## Subscribe and send

All API calls have a send functionality for making a request and receiving a response. Certain API calls also offer a subscribe functionality allowing for updates to be sent to your application when new information becomes available.

### Subscribe

Several API calls provide the `subscribe` functionality. When you subscribe to an API call, you will receive a continuous stream from data of this particular API call.

Some of these API calls automatically subscribe (e.g. [ticks](/api-explorer#ticks)) and some have an optional `subscribe` field. If you pass `1` to the `subscribe` field, the subscription will start and the server will continue to send the requested data until you unsubscribe by calling the `Forget` or `Forget all` API calls.

For example, you can call [Tick History](/api-explorer#ticks_history) to receive tick history data. But when you add the `subscribe` option to this call, you will receive the tick history data you requested in the first response, and you will continue to receive a new response every time there is a new tick published by the server for the given symbol.

In the message stream from `subscribe`, there is a field called `subscription`. This is the `Stream ID`. With this ID, you can identify the message stream in your logic and stop the stream with `Forget` and `Forget All` API calls.

The data provided by API calls with the `subscribe` functionality can be used as a data source for other API calls and features.

### Send

If you call the API with the `send` functionality, then the server will only send back the requested data one time. In order to get updated data, you have to send the API call again. Usually, this method is used when you get other API call responses or UI events such as `Click`, `Scroll`, and more.

### Forget

If you want to stop the message stream created by `subscribe`, you will have to call the `Forget` API call with the correct `Stream ID`. Otherwise, you can use the `Forget All` API call to stop streams by their `Method name`.

:::caution
For more information on the `Forget` API call, have a look at [Forget](/api-explorer#forget) and [Forget All](/api-explorer#forget_all) in the API explorer.
:::

## Request data

To make it easier for you to handle the request and response flow of your WebSocket connection, each Deriv WebSocket API call follows a standardised structure. You can use it for caching, validation, request, and response synchronisation.

#### API call method name

Every `request` in the WebSocket API includes a `method name` field that serves as a unique identifier for the request. In most cases, this `method name` will get a numerical value of `1`. However, there are some cases where the identifier property may have a string value.

:::caution
API Call Method Name is always required. this field determines the data you'll get from our WebSocket server.
:::

### Required fields

Each request data has mandatory fields that you must provide, and it may also include optional fields. Let's explore this with an example from `Residence List`.

A `Residence List` call returns a list of countries and 2-letter country codes, suitable for populating the account opening form.

The request data for this call is as below:

```ts showLineNumbers
{
  residence_list: 1; // Api Call Method Name
  passthrough?: object; // Optional
  req_id?: number; // Optional
}
```

The `residence_list` field is the `method name` for the call and is required. There may be other required fields related to this type of the request you want to send. To know more about `Residence List` and other API calls, please check them out in [API Explorer](/api-explorer#residence_list).

### Optional fields

Every call has several `Optional` fields as well. `Passthrough` and `req_id` are always part of the request data but you can choose to opt out and not use them.

#### The `passthrough` field

Whatever you pass to this field will be returned back to you inside a `response` object. This can be helpful when you need to simulate a stateful flow for your `requests` and `responses`.

#### The `req_id` field

You may need to `tag` your requests and pass them through our `WebSocket` calls. You can do so by passing a `number` to this field. It can be helpful when you need to map `requests` to `responses`.

:::caution
To learn about additional optional fields specific to each API call, please refer to our [API Explorer](/api-explorer).
:::

## Response data

When you get the response for the call, there will be a `Field` with the same name as the `method name`, which contains the actual data.

The response for the `Residence List` call:

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
            "tin_format": [
                "^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"
            ],
            "value": "al"
        },
        // ....
  ],
};
```

Here the `residence_list` is the `method name`, and it contains the actual data you requested. To keep it short, we haven't included the rest of the array. You can check the actual response [here](/api-explorer#residence_list).

#### The `echo_req` field

This `Field` contains the exact `Request Data` you sent to the server.

#### The `msg_type` field

This `Field` helps you determine which `message` data you're getting on the message event of the WebSocket connection. For example, your `onmessage` event handler for your WebSocket connection in `JavaScript` would be:

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

#### The `req_id` field

This is the `Optional` passed to the `Request Data`, you can use it for `validation`, `synchronization`, `caching`, etc.

:::tip
The `msg_type` is always present on the response data.
:::
