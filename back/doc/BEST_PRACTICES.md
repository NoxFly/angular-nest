
# Bonnes pratiques

Cette section peut évoluer.

Elle concerne la façon de développer en Typescript et non l'architecture du projet.

Elle vise à améliorer la lisibilité du code, la prévention de bugs, de performances et la bonne mise en place en amont pour faciliter le débogage.

## Renvoie de promesses

❌ Ne pas faire

En cas d'erreur, l'appel à la fonction `b` ne sera pas noté dans la stack trace :

```ts
function a() {
    return Promise.resolve(true);
}

function b() {
    return a();
}
```

✅ Faire

```ts
async function b() {
    const tmp = await a();
    return tmp;
}
```

En cas d'erreur, `b` sera dans la stack trace.
Cela rajoute des lignes certes, mais le débogage derrière est plus simple.


## Les virgules et les constructeurs

- (1) Mettre les arguments d'un constructeur 1 à la ligne.
- (2) Laisser une virgule au dernier élément d'une liste, ou d'un argument qui serait multi ligne :

❌ Ne pas faire

```ts
class MyClass {
    constructor(argument1: any, argument2: any) {}
}

const obj = {
    a: 1,
    b: 0
};
```


✅ Faire

```ts
class MyClass {
    constructor(
        argument1: any,
        argument2: any,
    ) {}
}

const obj = {
    a: 1,
    b: 0,
};
```

Cela permet
- (1) de supprimer une ligne rapidement
- (1) cela amène plus de clarté de quels sont les arguments / injections de dépendances, et aide au point suivant
- (1) Si beaucoup d'arguments avec un nom / type assez long, n'a pas à scroller pour lire.
- (2) de permuter les lignes (avec le raccourcis `Alt+DownArrow`) sans provoquer d'erreur si on remonte la dernière ligne (car il faudrait rajouter une virgule)

## Arguments nombreux

Au delà de 4 arguments, utiliser plutôt un seul paramètre complexe typé.

❌ Ne pas faire

```ts
function(arg1: string, arg2: number, arg3: boolean, arg4: number, arg5: CustomType) {

}
```

✅ Faire

```ts
interface CustomParam {
    arg1: string;
    arg2: number;
    arg3: boolean;
    arg4: number;
    arg5: CustomType;
}

function(params: CustomParam) {

}
```

## Placement de la logique

Prendre l'habitude de ne pas placer la logique là où ce n'est pas l'endroit, même si ça paraît plus rapide sur le moment, que ce soit pour débugguer ou créer rapidement une nouvelle feature.

- Les contrôleurs de doivent contenir aucune logique. Seulement les actions/endpoints à appeler, ainsi que la documentation swagger.
- Toute logique cruciale d'une fonctionnalité doit se trouver dans un service.
- Ne pas faire des fonctions ou des fichiers trop volumineux.
    - Lorsqu'une fonction est trop volumineuse, peut-être est-il possible de split les différentes étapes de cette fonction dans de sous-fonctions
    - Lorsqu'un fichier est trop volumineux, se demander si ce fichier ne fait réellement que ce qui le concerne. Si on prend l'exemple d'un service qui communique avec l'API de Riot Games, il est séparé en plusieurs sous-services. L'un s'occupe de généralités, comme l'accès à un compte Riot. Ensuite, 1 service par jeu (1 qui concerne les données propres à LoL, 1 propre à TFT, et 1 propre à Valorant).
    - Peut-être que certaines parties de code sont en réalités des instructions utilitaires, qui peuvent être factorisées dans des helpers, et ne sont pas vraiment propre à un service, car ne concernent pas directement des données propres à celui-ci. Par exemple, la gestion des dates.

## Décomplexification de la logique

### Négation des conditions

Éviter de faire une négation d'une condition si on sait qu'on aura un traitement dans le cas opposé, ce qui pose une double négation, et complexifie la compréhension et l'analyse par un reviewer.

❌ Ne pas faire

```ts
if(!foo) {
    a();
}
else {
    b();
}
```

✅ Faire

```ts
if(foo) {
    b();
}
else {
    a();
}
```

### Marquer plus pour moins bien

Le point sur les [renvoies de promesses](#renvoie-de-promesses) montrent au final qu'il faut écrire un peu plus de lignes que l'on pourrait pour un meilleur débogage.

Cependant, pour certains cas, il peut n'y avoir aucun avantage à marquer plus.

Par exemple :

❌ Ne pas faire

```ts
function foo() {
    if(bar) {
        return 'toto';
    }
    else {
        return 'titi';
    }
}
```

✅ Faire

Le `else` ici ne sert à rien, et rajoute un décalage vers la droite de tout son contenu, qui est potentiellement plusieurs dizaines de lignes, ce qui, répété, peut emméler les esprits.

```ts
function foo() {
    if(bar) {
        return 'toto';
    }

    return 'titi';
}
```

### Marquer moins pour moins bien

Au contraire, éviter de marquer certaines choses peuvent avoir l'effet inverse.

Par exemple :

❌ Ne pas faire

```ts
function foo() {
    if(bar)
        return 'toto';

    // ...
}
```

✅ Faire

Les accolades devraient toujours être présentes, même pour des one-line-statement.
Le jour où l'on souhaite rajouter du contenu dans ce `if`, il faudra les rajouter.
De plus, cela permet de plus facilement / rapidement voir la délimitation de ce if comparé à d'autres blocs.

```ts
function foo() {
    if(bar) {
        return 'toto';
    }

    // ...
}
```
