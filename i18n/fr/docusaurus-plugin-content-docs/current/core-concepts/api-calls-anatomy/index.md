---
title: Functions of API Calls
hide_title: false
draft: false
sidebar_label: Functions of API Calls
sidebar_position: 1
tags:
  - concept
  - appels
  - anatomie
keywords:
  - trading app
  - api calls
  - api example
description: Set up API calls for your trading app using the API call feature. With API examples, learn to subscribe, send requests, and get response data.
---

## S'abonner et envoyer

Tous les appels d'API disposent d'une fonctionnalité d'envoi qui permet de soumettre une demande et de recevoir une réponse. Certains appels d'API proposent également une fonctionnalité d'abonnement qui permet d'envoyer des mises à jour à votre application lorsque de nouvelles informations sont disponibles.

### Subscribe

Several API calls provide the `subscribe` functionality. Après votre abonnement à un appel d'API, vous recevrez un flux continu à partir des données de cet appel d'API en particulier.

Some of these API calls automatically subscribe (e.g. [ticks](/api-explorer#ticks)) and some have an optional `subscribe` field. If you pass `1` to the `subscribe` field, the subscription will start and the server will continue to send the requested data until you unsubscribe by calling the `Forget` or `Forget all` API calls.

For example, you can call [Tick History](/api-explorer#ticks_history) to receive tick history data. But when you add the `subscribe` option to this call, you will receive the tick history data you requested in the first response, and you will continue to receive a new response every time there is a new tick published by the server for the given symbol.

In the message stream from `subscribe`, there is a field called `subscription`. This is the `Stream ID`. With this ID, you can identify the message stream in your logic and stop the stream with `Forget` and `Forget All` API calls.

The data provided by API calls with the `subscribe` functionality can be used as a data source for other API calls and features.

### Envoyer

If you call the API with the `send` functionality, then the server will only send back the requested data one time. Pour obtenir des données à jour, vous devez renvoyer l'appel d'API. Usually, this method is used when you get other API call responses or UI events such as `Click`, `Scroll`, and more.

### Forget

If you want to stop the message stream created by `subscribe`, you will have to call the `Forget` API call with the correct `Stream ID`. Otherwise, you can use the `Forget All` API call to stop streams by their `Method name`.

:::caution
For more information on the `Forget` API call, have a look at [Forget](/api-explorer#forget) and [Forget All](/api-explorer#forget_all) in the API explorer.
:::

## Données de requête

Pour vous permettre de gérer plus facilement le flux de requêtes et de réponses de votre connexion WebSocket, chaque appel d'API Deriv WebSocket suit une structure normalisée. Vous pouvez l'utiliser pour la mise en cache, la validation, la synchronisation des requêtes et des réponses.

#### Nom de la méthode de l'appel d'API

Every `request` in the WebSocket API includes a `method name` field that serves as a unique identifier for the request. In most cases, this `method name` will get a numerical value of `1`. Cependant, dans certains cas, la propriété d'identifiant peut avoir une valeur de chaîne.

:::caution
API Call Method Name is always required. Ce champ indique les données que vous recevrez de notre serveur WebSocket.
:::

### Champs obligatoires

Les données de chaque requête comportent des champs obligatoires que vous devez renseigner, ainsi que de potentiels champs facultatifs. Let's explore this with an example from `Residence List`.

A `Residence List` call returns a list of countries and 2-letter country codes, suitable for populating the account opening form.

Les données de requête de cet appel sont les suivantes :

```ts showLineNumbers
{
  residence_list: 1; // Nom de la méthode de l'appel d'Api
  passthrough?: object; // Facultatif
  req_id?: number; // Facultatif
}
```

The `residence_list` field is the `method name` for the call and is required. Le type de requête que vous souhaitez envoyer peut comporter des champs obligatoires supplémentaires. To know more about `Residence List` and other API calls, please check them out in [API Explorer](/api-explorer#residence_list).

### Champs facultatifs

Every call has several `Optional` fields as well. `Passthrough` and `req_id` are always part of the request data but you can choose to opt out and not use them.

#### The `passthrough` field

Whatever you pass to this field will be returned back to you inside a `response` object. This can be helpful when you need to simulate a stateful flow for your `requests` and `responses`.

#### The `req_id` field

You may need to `tag` your requests and pass them through our `WebSocket` calls. You can do so by passing a `number` to this field. It can be helpful when you need to map `requests` to `responses`.

:::caution
To learn about additional optional fields specific to each API call, please refer to our [API Explorer](/api-explorer).
:::

## Données de réponse

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

Here the `residence_list` is the `method name`, and it contains the actual data you requested. En bref, nous n'avons pas inclus le reste du tableau. You can check the actual response [here](/api-explorer#residence_list).

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
