---
title: Fonctions des appels à l'API
hide_title: false
draft: false
sidebar_label: Fonctions des appels à l'API
sidebar_position: 1
tags:
  - concept
  - appels
  - anatomie
keywords:
  - application de trading
  - appels d'api
  - exemple d'api
description: Mettez en place des appels API pour votre application de trading à l'aide de la fonction d'appel API. À l'aide d'exemples d'API, apprenez à vous abonner, à envoyer des requêtes et à obtenir des données de réponse.
---

## S'abonner et envoyer

Tous les appels d'API disposent d'une fonctionnalité d'envoi qui permet de soumettre une demande et de recevoir une réponse. Certains appels d'API proposent également une fonctionnalité d'abonnement qui permet d'envoyer des mises à jour à votre application lorsque de nouvelles informations sont disponibles.

### Subscribe

Plusieurs appels d'API fournissent la fonctionnalité `subscribe`. Après votre abonnement à un appel d'API, vous recevrez un flux continu à partir des données de cet appel d'API en particulier.

Certains de ces appels d'API permettent de s'abonner automatiquement (par exemple [ticks](/api-explorer#ticks)) et d'autres ont un champ `subscribe` optionnel. Si vous passez `1` au champ `subscribe`, l'abonnement commencera et le serveur continuera à envoyer les données demandées jusqu'à ce que vous vous désabonniez en appelant l'API `Forget` ou `Forget all`.

Par exemple, vous pouvez appeler [Tick History](/api-explorer#ticks_history) pour recevoir des données sur l'historique des ticks. Mais si vous ajoutez l'option `subscribe` à cet appel, vous recevrez les données de l'historique des ticks que vous avez demandées dans la première réponse, et vous continuerez à recevoir une nouvelle réponse à chaque fois qu'un nouveau tick sera publié par le serveur pour le symbole donné.

Dans le flux de messages provenant de `subscribe`, il y a un champ appelé `subscription`. Il s'agit de l'identifiant du flux (`Stream ID`). Avec cet ID, vous pouvez identifier le flux de messages dans votre logique et arrêter le flux avec les appels API `Forget` et `Forget All`.

Les données fournies par les appels API avec la fonctionnalité `subscribe` peuvent être utilisées comme source de données pour d'autres appels API et fonctionnalités.

### Envoyer

Si vous appelez l'API avec la fonctionnalité `send`, le serveur ne renverra les données demandées qu'une seule fois. Pour obtenir des données à jour, vous devez renvoyer l'appel d'API. En général, cette méthode est utilisée lorsque vous obtenez d'autres réponses d'appels API ou des événements d'interface utilisateur tels que `Click`, `Scroll`, etc.

### Forget

Si vous voulez arrêter le flux de messages créé par `subscribe`, vous devrez appeler l'API `Forget` avec le bon `Stream ID`. Sinon, vous pouvez utiliser l'appel API `Forget All` pour arrêter les flux par leur `Method name`.

:::caution
Pour plus d'informations sur l'appel API `Forget`, consultez [Forget](/api-explorer#forget) et [Forget All](/api-explorer#forget_all) dans l'explorateur d'API.
:::

## Données de requête

Pour vous permettre de gérer plus facilement le flux de requêtes et de réponses de votre connexion WebSocket, chaque appel d'API Deriv WebSocket suit une structure normalisée. Vous pouvez l'utiliser pour la mise en cache, la validation, la synchronisation des requêtes et des réponses.

#### Nom de la méthode de l'appel d'API

Chaque `request` de l'API WebSocket comprend un champ `method name` qui sert d'identifiant unique pour la requête. Dans la plupart des cas, ce `nom de méthode` aura une valeur numérique de `1`. Cependant, dans certains cas, la propriété d'identifiant peut avoir une valeur de chaîne.

:::caution
Le nom de la méthode d'appel à l'API est toujours requis. Ce champ indique les données que vous recevrez de notre serveur WebSocket.
:::

### Champs obligatoires

Les données de chaque requête comportent des champs obligatoires que vous devez renseigner, ainsi que de potentiels champs facultatifs. Voyons cela avec un exemple tiré de `Residence List`.

L'appel "Liste de résidence" renvoie une liste de pays et de codes de pays à deux lettres, permettant de remplir le formulaire d'ouverture de compte.

Les données de requête de cet appel sont les suivantes :

```ts showLineNumbers
{
  residence_list: 1; // Nom de la méthode de l'appel d'Api
  passthrough?: object; // Facultatif
  req_id?: number; // Facultatif
}
```

Le champ `residence_list` est le `nom de la méthode` pour l'appel et est obligatoire. Le type de requête que vous souhaitez envoyer peut comporter des champs obligatoires supplémentaires. Pour en savoir plus sur `Residence List` et d'autres appels d'API, veuillez les consulter dans [API Explorer](/api-explorer#residence_list).

### Champs facultatifs

Chaque appel comporte également plusieurs champs "optionnels". `Passthrough` et `req_id` font toujours partie des données de la demande, mais vous pouvez choisir de ne pas les utiliser.

#### Le champ `passthrough` (passage)

Ce que vous indiquez dans ce champ vous sera renvoyé dans un objet `response`. Cela peut être utile lorsque vous avez besoin de simuler un flux avec état pour vos `requêtes` et `réponses`.

#### Le champ \\`req_id

Vous pouvez avoir besoin d'étiqueter vos requêtes et de les faire passer par nos appels `WebSocket`. Vous pouvez le faire en passant un "nombre" dans ce champ. Cela peut être utile lorsque vous avez besoin de faire correspondre des `requêtes` à des `réponses`.

:::caution
Pour connaître les champs facultatifs supplémentaires spécifiques à chaque appel d'API, veuillez consulter notre [API Explorer](/api-explorer).
:::

## Données de réponse

Lorsque vous obtenez la réponse à l'appel, il y aura un `Field` avec le même nom que le `nom de la méthode`, qui contient les données réelles.

La réponse pour l'appel `Residence List` :

```js showLineNumbers
{
  echo_req : {
    req_id: 1,
    residence_list: 1,
  },
  msg_type : 'residence_list',
  req_id : 1,
  residence_list : [
       {
            "identity" : {
                "services" : {
                    "idv" : {
                        "documents_supported" : {},
                        "has_visual_sample" : 0,
                        "is_country_supported" : 0
                    },
                    "onfido" : {
                        "documents_supported" : {
                            "driving_licence" : {
                                "display_name" : "Permis de conduire"
                            }
                        },
                        "is_country_supported" : 0
                    }
                }
            },
            "phone_idd" : "35818",
            "text" : "Îles Aland",
            "value" : "ax"
        },
        {
            "identity" : {
                "services" : {
                    "idv" : {
                        "documents_supported" : {},
                        "has_visual_sample" : 0,
                        "is_country_supported" : 0
                    },
                    "onfido" : {
                        "documents_supported" : {
                            "driving_licence" : {
                                "display_name" : "Driving Licence"
                            },
                            "national_identity_card" : {
                                "display_name" : "Carte nationale d'identité"
                            },
                            "passport" : {
                                "display_name" : "Passeport"
                            }
                        },
                        "is_country_supported" : 1
                    }
                }
            },
            "phone_idd" : "355",
            "text" : "Albanie",
            "tin_format" : [
                "^[A-Ta-t0-9]\d{8}[A-Wa-w]$"] ; [ "^[A-Ta-t0-9]\d [A-Wa-w]$"].
            ],
            "value" : "al"
        },
        // ....
  ],
} ;
```

Ici, `residence_list` est le `nom de la méthode` et contient les données que vous avez demandées. En bref, nous n'avons pas inclus le reste du tableau. Vous pouvez consulter la réponse [ici] (/api-explorer#residence_list).

#### Le champ \\\`echo_req

Ce `Field` contient les `Données de la demande` exactes que vous avez envoyées au serveur.

#### Le champ \\\`msg_type

Ce `Field` vous aide à déterminer quelles données `message` vous obtenez sur l'événement message de la connexion WebSocket. Par exemple, votre gestionnaire d'événement `onmessage` pour votre connexion WebSocket en `JavaScript` serait :

```js showLineNumbers
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data) ;

  switch (receivedMessage.msg_type) {
    case "residence_list" :
      console.log("La liste des résidences est : ",receivedMessage.residence_list)
      break ;
    case "other_request_identifier"
      console.log("the response", receivedMessage.some_other_request_identifier)
    default :
      console.log("receivedMessage", receivedMessage)
      break ;
  }
}
```

#### Le champ \`req_id

C'est le `Optionnel` passé aux `Données de la requête`, vous pouvez l'utiliser pour la `validation`, la `synchronisation`, la `mise en cache`, etc.

:::tip
Le `msg_type` est toujours présent dans les données de la réponse.
:::
