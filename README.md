# Angular / Nest POC

Chacun des dossiers front/back devraient être un repo distinct.

Node >= 18

`npm i` dans chacun des dossiers
Suivre les instructions énoncées dans chaque projet.

Au besoin, si pas les commandes globales pour le CLI :
- `npm i -g @angular/cli`
- `npm i -g @nestjs/cli`

Pour toute idée d'amélioration, créer une issue, et si motivé, faire une PR, en attachant cette issue.

## Note pour le développement :

Dans Visual Studio Code :
- aller dans les options (Ctrl + ,)
- chercher "Typescript Import Module Specifier"
- choisir "non-relative"

Cela aura pour effet de ne rajouter les includes de vos fichiers qu'en absolue par rapport au projet, et non de façon relative au fichier édité (donc évite les `import a from '../../../b'`, et fera plutôt `import 'src/app/core/b'`).