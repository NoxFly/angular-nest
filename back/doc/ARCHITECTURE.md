# Architecture

- Le dossier `dist/` contient le build bundlé du back, et si possible, du front.
- Tous les fichiers de configuration sont à la racine du projet. A voir par la suite quand NodeJS supportera que toute la configuration soit dans un dossier `conf[ig]/`.
- Le dossier `scripts/` contient des scripts shell.
- Toute documentation ne se trouvant pas dans le readme à la racine se trouve dans un dossier `doc/`.
- Tout fichier source est dans le dossier `src/`.
    - `main.ts` : entrée principale de l'exécution.
    - `_core/` contient ce qui est central à l'application. Par exemple, un fichier pour tout le lancement et la configuration de l'application nest.
    - `_tools/` contient des fichiers utilitaires qui peuvent être utilisés à travers l'ensemble du projet.
    - `environment/` contient le fichier ayant les propriétés globales du projet, et les variables d'environnement. Il permet de ne pas passer par `process.env`, donc d'avoir des variables dont on est sûr qu'elles existent, et typées. De plus, en mode développement, une vérification est faite sur les variables d'environnement injectées/présentes.
    - `middlewares/` contient les différents middlewares qui peuvent être appelés lors d'une requête, suivant le routage de l'application.
    - `modules/` : contient les endpoints de l'application. Voir la section dédiée.

## Modules

Un module est un bloc, modulaire, qui peut potentiellement être remplacé sans affecter le reste de l'application.

Chaque bloc est dédié à un type de ressource / de traitement.

Le dossier `src/modules/` contient ces blocs. Ce dossier ne doit contenir **que** des sous-dossiers, caractérisants ces blocs.

Un bloc doit avoir un nom significatif de ce à quoi il touche.

Un bloc peut en contenir d'autres (nesting). Cela peut être particulièrement efficace pour du sous-routage, lorsqu'il y a des sous-domaines d'application. Par exemple, concernant l'API de Riot Games, il y a un module concernant les données propres aux comptes Riot, puis autant de sous-domaines que leurs jeux, chacun ayant leur propre types de données et API.

Certaines conventions doivent être respectées :

Un bloc nommé [BLC] contient au minimum ces fichiers :
```
src/
 |- modules/
    |- BLC/
        |- BLC.module.ts
        |- BLC.service.ts
        |- BLC.controller.ts
```
Si des types sont propres à ce bloc, on les trouvera dans les dossiers
- `src/modules/BLC/entities/`,
- `src/modules/BLC/dto/`,
- `src/modules/BLC/interfaces/`,
et seront nommés de la manière suivante : `[nom].[type].ts`, par exemple `credentials.dto.ts`, `user.entity.ts`.

Si le service principal de ce bloc doit être séparé en plusieurs sous-services, on les trouveras dans un dossier `src/modules/BLC/services/`

Le module de se bloc doit :
- avoir déclaré comme
    - providers ses différents services
    - controllers ses différents controleurs
    - potentiellement exporter certains de ses services si utilisés dans d'autres blocs
    - potentiellement importer des services d'autres blocs si nécessaire.
    ```ts
    @Module({
        imports: [], // peut être omis si vide
        exports: [], // peut être omis si vide
        providers: [BlocService],
        controllers: [BlocController],
    })
    export class BlocModule {}
    ```
- Doit être déclaré dans `AppModule` pour être accessible
    ```ts
    @Module({
        imports: [BlocModule],
    })
    export class AppModule {}
    ```

## Nomenclature

Chaque type de fichier dans la liste qui suit doit recevoir un suffixe, ce qui donnera cette forme : `[nomFichier].[suffixe].ts`.

Le suffixe doit être le nom du type de fichier.

Par exemple, pour un guard sur l'authentification : `auth.guard.ts`.

- middleware
- guard
- service
- module
- controller
- entity
- helper

De plus :

- Tout fichier et tout dossier sont écrits en `kebab-case`.
- Toute variable est écrite en `camelCase`.
- Tout fichier ou constante écrits en majuscule doivent être en `snake_case`,
- Toute classe est écrite en `PascalCase`.

## Structures de données Entity et DTO

### Entity, Schema

- Concerne les fichiers `.entity.ts` dans les dossiers `entities/`
- Concerne les fichiers `.schema.ts` dans les dossiers `schemas/`
- Représentent les modèles de données utilisés pour l'application en elle-même
- Généralement correspondant aux structures de données de la base de données, et des ORM.

### DTO

- Data Transfer Objects
- Représentent les types de données utilisés dans les requêtes (in et out).
- Généralement utilisés pour les requêtes, et les réponses, en tant que payload.


## Documentation

La documentation technique est maintenue par Swagger de façon automatique, à travers le code.

Des décorateurs sont mis à disposition, et sont utilisés pour
- décrire les signatures d'actions de contrôleurs
- décrire les propriétés des DTO afin de comprendre quelles sont les données de requête et de réponse

Ces décorateurs commencent par `@Api`, comme `@ApiParam`, `@ApiBody`, `@ApiOperation` et `@ApiResponse`.
