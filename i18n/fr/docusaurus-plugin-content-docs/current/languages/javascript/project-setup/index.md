---
title: Configuration du projet | JavaScript
sidebar_label: Configuration du projet
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - configuration du projet
description: Créez un répertoire pour votre prochain projet d'application de négociation API à l'aide d'une WebSocket.
---

### Créer un projet

Nous allons créer une simple page `HTML` qui contient notre fichier JavaScript, qui gérera notre connexion WebSocket. Créez d'abord un répertoire pour votre prochain projet :

```bash
mkdir deriv-websocket-demo
```

Naviguez jusqu'au dossier `deriv-websocket-demo` :

```bash
cd deriv-websocket-demo
```

Ensuite, créez les fichiers nécessaires comme vous le voyez ci-dessous :

```bash
touch index.html index.css index.js
```

:::tip
Nous vous suggérons d'utiliser [Visual Studio Code](https://code.visualstudio.com/) avec l'[extension Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) activée. Cela vous sera très utile lors de la mise en œuvre.
:::

Ouvrez maintenant le fichier `index.html` ou utilisez l'[extension Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Modifiez maintenant le contenu des fichiers à l'aide de l'approche suivante :

```js title="index.js" showLineNumbers
console.log('nous allons créer notre connexion websocket ici') ;
```

```html title="index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deriv HTML JS Demo</title>
  </head>
  <body>
    <h2>Démonstration de l'API WebSocket de Deriv</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Après avoir ajouté le contenu, nous pouvons lancer l'application en exécutant simplement le fichier `index.html` ou en utilisant l'<a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">extension Live Server</a>. Lorsque vous exécutez votre application, voyez dans la console si le fichier `console.log` apparaît. Si c'est le cas, vous avez alors la confirmation que le fichier JavaScript fonctionne et que la connexion websocket peut être mise en œuvre correctement.

Pour configurer le websocket Deriv, vous pouvez vous rendre sur la page [Connexion WebSocket](/docs/languages/javascript/websocket-connection).
