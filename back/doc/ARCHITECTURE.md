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

### Modules

Un module est un bloc, modulaire, qui peut potentiellement être remplacé sans affecter le reste de l'application.

Chaque bloc est dédié à un type de ressource / de traitement.

Le dossier `src/modules/` contient ces blocs. Ce dossier ne doit contenir **que** des sous-dossiers, caractérisants ces blocs.

Un bloc doit avoir un nom significatif de ce à quoi il touche.

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
Si des types sont propres à ce bloc, on les trouvera dans le dossier `src/modules/BLC/entities/`, et seront nommés de la manière suivante : `[nom].entity.ts`.

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

### Nomenclature

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

- Tout fichier et toute variable sont écrits en `camelCase`.
- Toute classe est écrite en `PascalCase`.
