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