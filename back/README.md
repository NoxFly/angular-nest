# Backend du site web

Technologie : NodeJS >= 18, NestJS (v10.0)

Projet Typescript.

Utilise Express ou Fastify au fond (peut être choisi, fastify est bien plus rapide mais a bien plus de risques de conflits de packages).

Pour lancer le projet :
```sh
npm run start
# en hot-reload
npm run start:dev
# en prod (après un build)
npm run start:prod
```

Pour build le projet :
```sh
npm run build
```

La commande pour build exécutera automatiquement la commande `npm run postbuild`, qui s'occupe de copier le dossier build d'Angular dans un dossier `public/` à la racine de ce projet (nécessaire pour avoir avoir l'interface du site en prod).

- [origin]/be pour accéder aux endpoints
- [origin]/be/api pour accéder à l'interface Swagger.

Extensions recommandées pour le développement :
- ESLint (par Microsoft)
- JavaScript and TypeScript Nightly (par Microsoft)
- LintLens - ESLint rules made easier (par Gabriel McAdams) - Si édition des fichiers eslint et tsconfig

## POC

Le poc se porte sur l'univers de Riot Games et l'utilisation de son API. Cela permet de faire un exemple légèrement complexe mais compréhensible, et complet.

> **Les clés et autres données sensibles de configuration doivent rester dans le fichier `.env` à la racine du projet, qui est ignoré par git.**

Voir [l'architecture à respecter](./doc/ARCHITECTURE.md) ainsi que les [les bonnes pratiques](./doc/GOOD_PRACTICES.md).
