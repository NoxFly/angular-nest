# Angular / Nest POC

Chacun des dossiers front/back devraient être un repo distinct.

Node >= 18

`npm i` dans chacun des dossiers
Suivre les instructions énoncées dans chaque projet.

Au besoin, si pas les commandes globales pour le CLI :
- `npm i -g @angular/cli`
- `npm i -g @nestjs/cli`

Pour toute idée d'amélioration, créer une issue, et si motivé, faire une PR, en attachant cette issue.


## Bun

https://bun.sh/

Voir la compatibilité Node :
https://bun.sh/docs/runtime/nodejs-apis

Test case sur nestjs fin 2023 :
https://medium.com/deno-the-complete-reference/can-bun-run-any-app-faster-use-case-nestjs-95097119b60c

**NOTE**

2024-10-23

- Bun n'est pas encore compatible avec NestJS pour faire tourner `Bun.Serve()`, c'est `Node.httpServer` en dessous.
- Idem pour Angular, son bundler et watcher reste webpack pour l'instant, ce qui ne change rien aux performances de build.
- Au final, pour l'instant, Bun sert juste à installer les dépendances (`bun i` au lieu de `npm i`), exécuter les commandes propres aux frameworks utilisés (`nest start`, `nest build`, `ng s`, `ng build`). Node ne peut pas être complètement remplacé, puisque nest et angular l'utilisent au fond. Donc, il faut installer node, puis installer bun, pour lancer via bun un processus utilisé par node.
- En revanche, même si on perd du temps à installer bun, passer de 24s (au moins) à 200ms pour l'installation des dépendances, vraiment pas mal.
- `bun build` ne marche pas sur le repo nestjs, et est quasiment instantané sur le repo angular, produit un fichier, mais qui ne peut être exécuté par la suite car throw une exception.

__PAS WORTH POUR L'INSTANT__


```sh
# linux
curl -fsSL https://bun.sh/install | bash
# windows
powershell -c "irm bun.sh/install.ps1 | iex"

######

bun i -g @angular/cli @nestjs/cli # 2.50s bun 16s npm

######

cd front

bun i # 473ms bun vs 15s npm
# run dev (watch mode) angular
bun start # ng s, build 1.65s bun, 1.76s npm. Equivalent because uses the ng s command which uses webpack under the hood

######

cd ../back

bun i # 1.99s bun vs 21s npm, but npm needs webpack to bundle, resulting in 24s npm

bun start # 300ms bun, 600ms npm

```