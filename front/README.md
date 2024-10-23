# Front

Technologie : NodeJS >= 18, Angular (v18.1)

Projet Typescript.

Pour lancer le projet :

```sh
npm run start
# ou
ng s # ou ng serve
```

Pour build :

```sh
npm run build
# ou
ng build

# en prod
ng build:prod
```

Le dossier produit contient les fichiers statiques de l'application / interface web, et doivent être servis par un serveur web (ou un service d'Azure comme Azure CDN, Azure Blob Storage ou Azure Static Web Apps)

Une commande dans le dossier pour le back permet d'intégrer ce build dans le build final de l'application (côté back).

Extensions recommandées pour le développement :
- Angular Language Service (par Angular)
- ESLint (par Microsoft)
- JavaScript and TypeScript Nightly (par Microsoft)
- LintLens - ESLint rules made easier (par Gabriel McAdams) - Si édition des fichiers eslint et tsconfig
