# Starter Kit
Avant tout et afin de faciliter certaines tâches, un processus **GULP** a été mis en place.

**Pour une première installation, merci de suivre les instructions ci-dessous.**
1- **Créer tout d'abord un dossier (accessible par votre serveur local)** qui contiendra les "clones" des repositories Github des différents dossiers INITIAL MEDIA/STIM MEDIA (Journal du parfum, Sanoflore, Skinceuticals...) ainsi que celui du starter kit ci-présent.
2- Cloner ce repository dans un **dossier nommé starter-kit (NE PAS CHANGER LE NOM DU DOSSIER)**, situé à la racine de votre dossier.
3- Avant de **commencer le développement d'une formation, merci de mettre à jour votre starter-kit** via la commande git pull depuis le dossier starter-kit (cf ci-dessous).

## REQUIREMENTS
Afin de pouvoir utiliser ce process, il convient d'installer sur votre poste de travail :
- **Apache** : http://httpd.apache.org/docs/2.4/fr/install.html
- **Php** : http://php.net/manual/fr/install.php
- **Node.js** : https://docs.npmjs.com/getting-started/installing-node
- **Ruby** : https://www.ruby-lang.org/fr/documentation/installation/
- **Sass** : http://sass-lang.com/install
- **Compass** : http://compass-style.org/install/

Une fois ceci effectué, il faut installer les modules Node nécessaires au bon fonctionnement. Pour cela, une fois à la racine de votre dossier de travail, utilisez la commande **`npm install`**.

Afin de pouvoir accéder "facilement" aux formations, je vous conseille de créer un Virtual Host Apache et de modifier votre fichier système host. Voici un exemple :
- **Ajouter cette ligne dans votre fichier host système** : `127.0.0.31  www.jdp.local`
- **Ajouter le code ci-dessous dans votre configuration Virtual Host d'Apache**, en modifiant les chemins DocumentRoot et Directory pour qu'ils pointent sur votre dossier source.
```
<VirtualHost 127.0.0.31:80>
  <ifModule mod_rewrite.c>
    RewriteEngine On
  </ifModule>
  ServerName www.jdp.local
  DocumentRoot /media/HDD/plommy/sources/initial-media/jdp/
  <Directory /media/HDD/plommy/sources/initial-media/jdp/>
    AllowOverride all
    Options -MultiViews
    Options +FollowSymlinks
    Require all granted
  </Directory>
</virtualHost>
```
- Enfin, n'oubliez pas de mettre à jour le fichier *___common/config.global.php__* pour ajouter votre configuration si vous êtes un nouveau développeur ou si vous disposez d'une nouvelle configuration serveur ou si vous n'avez jamais travaillé sur le dossier (JDP, SKIN...).
Une fois ceci effectué et Apache redémarré, vous devriez pouvoir accéder aux différentes formations en tapant www.jdp.local/chemin_formation/index.php

## Initialisation d'une formation
Afin de débuter le développement d'une formation, veuillez utiliser la commande **`gulp formation`**, qui vous guidera dans la configuration de cette dernière et la duplication des éléments du starter kit.


## Mise à jour des sources
Lors d'une mise à jour ou du développement, **il ne faut pas modifier directement les fichiers .css et les fichiers .js à la racine des répertoire css et js.** Ces derniers sont en effet générés via Sass et Gulp et il faut donc utiliser ce dernier dans cet optique.

Une fois à la racine de votre formation, utiliser la commande **`gulp -m=nom_de_votre_module watch`**. Cette dernière vous permettra de modifier les fichiers sources (css/sass et js/src) et **"compilera les sources en direct" lorsque vous codez**.
ATTENTION, pour l'instant, **les fichiers ajoutés/supprimés en cours de processus ne sont pas pris en compte** si la commande watch n'a pas été relancée.

**Pour retrouver le nom de module d'une formation, visionner le fichier modules.json situé à la racine du repository ou bien le fichier config.php ($module_name) de la formation.**. Vous pouvez également saisir le chemin relatif à la place du nom de module (variable $module_fullname de config.php).


# Framework -- Introduction
Les formations à développer sont en mode fullscreen, c'est à dire qu'elles doivent occuper tout l'espace disponible de l'écran pour afficher son contenu. Dans ce but, nous utilisons un container principal positionné en fixed aux 4 coins de l'écran et dans ce dernier, nous retrouvons une liste d'écrans "empilés" les uns sur les autres. La navigation entre les écrans est gérée via Javascript alors que les animations sont elles gérées en full CSS (mais déclenchées par Javascript via un changement de class).

Les formations sont crées par le studio graphique **en 16:9**. Mais comme vous le savez sans doute, toutes les configurations utilisateur ne sont pas en résolution 16:9. Dans ce cadre, les formations ne sont affichées que lorsque l'affichage est en mode paysage, c'est à dire que la largeur est plus grande que la hauteur. Un overlay permet d'informer l'utilisateur qu'il doit tourner son device s'il est en mode portrait.

Afin d'assurer le responsive, il faut bannir les unités fixes telle que le px et **utiliser les unités relatives % ou vw/vh** pour sizer/positionner les blocs/images, sachant que __vw est plus "fiable" que vh__ sur les smartphones (prise en compte ou non de la navbar en fonction du navigateur...). Pour les tailles de polices, **l'unité rem est utilisée (qui est basé sur 1vw) ** car elle permet une adaptation simple des tailles en fonction de la zone disponible pour la formation. Les textes et leur contenant se base sur la même unité, cela permet de gagner ENORMEMENT de temps sur le debug responsive.

Au niveau de la compatibilité des développements, il faut passer correctement sur **IE11 (au minimum) et l'Iphone 5** pour les configurations mobiles. **Essayer d'éviter AU MAXIMUM les développements/hacks spécifiques à certains navigateurs (IE, Ipad, IOS...)**, cela ne fait que ajouter de la complexité inutile au debug.

Utiliser le mixin SASS responsive, qui contient tout ce qu'il faut pour cibler les différentes configurations. **Le fichier resolutions.ods**, situé à la racine du starter kit, devrait vous éclairer. **Il existe "deux versions"** pour les images de chaque formation, basées sur la largeur disponible :
- HD : tablettes/desktop ( > 800px)
- SD : smartphone ( <= 800px)
La différence entre ces deux versions est surtout au niveau des images, qui sont 40% plus petites sur la version SD et permet de gagner du poids pour le chargement de la page.
**IMPORTANT : une fois la formation "desktop" développé (ou avant si vous le souhaitez), utilisez la fonction `gulp -m=module images`** qui permet de reduire automatiquement toutes les images du répertoire hd de 40% et de les placer dans le répertoire sd.

Les formations doivent être développées en **mode desktop 16:9** d'abord puis **être adaptées** pour "passer" sur les résolutions suivantes :
- 568×320 : iPhone 5/S/C Landscape
- 667×375 : Iphone 6, 6S, 7
- 1024×768 : iPad Landscape
- la résolution de votre chef de projet principal. (Thomas=>1349x638, Lucie=>1440x816, Amandine=>1920x932, Floriane=>1920x950)

Si l'affichage de votre formation est correct sur ces résolutions, les retours pour le debug seront limités. Vous pouvez cependant ajouter à votre process de debug les résolutions suivantes :
- 640×360 : Nexus 6, Samsung J9
- 736×414 : Iphone 6+, 6S+, 7+
- 1280×702 : MacBook Air Thomas

# Framework -- PHP -- Configuration concours
Une formation est généralement accompagnée d'un concours permettant aux participants de gagner des lots s'ils répondent correctement aux quiz. Cela induit la présence d'écrans/textes en rapport à ce concours, qui doivent disparaitrent une fois ce dernier fermé. Le fichier __libs/_checkdate.php__ permet la configuration des dates du concours (variable $begin/$end). Le concours est considéré comme clos une fois la date $end dépassée.
Afin de gérer les éléments liés au concours (textes/écrans), vous disposez de 2 classes CSS :
  - .concours-closed (ou .ccc), qui permet de faire apparaître l'élément concerné une fois le concours clos.
  - .concours-open (ou .cco), qui permet de faire disparaitre l'élément concerné une fois le concours clos.
  - .concours-open-opacity (ou .ccoo), qui est identique à la précédente sauf que l'élémet est uniquement invisible (opacity 0) au lieu de disparaître (display:none). Peut-être utile afin de ne pas casser certains écrans.
  Ces classes sont apposables directement sur les screens ou les éléments basique. La navigation inter-écrans se recalcule automatiquement en fonction de cela (si un écran doit disparaitre par exemple)


# Framework -- SASS/CSS
**De nombreuses helpers SASS ont été développés** afin d'accélerer le développement et unifier la façon de coder. Avant de commencer le développement, **regarder et "digérer"** bien le fichier __css/sass/libs/\_mixins.scss__ qui les contient tous, ainsi que le fichier __css/sass/libs/\_config.scss__ qui contient des class helpers ainsi que le css des blocs de structure et d'animation. Ces fichiers sont normalement assez documentés pour être compréhensible mais sachez que les fonctions les plus "utiles" sont :
- position : positionne un élément avec les quatres coordonnées (top, right, bottom, left)
- img-ratio : définit un bloc ayant le ratio d'une image donnée et mettre cette dernière en fond
- img-width : définit un bloc ayant la largeur d'une image donnée
- bg : définir une image de background avec options
- responsive : permet de faire les adaptations nécessaire en fonction de la résolution disponible
- opacity : permet une transition pour l'opacité d'un élément
- fsr : permet de définir une taille de police en rem et une autre pour les versions smartphone.

Deux variables (__css/sass/libs/\_variables.scss__) sont très importantes car elles sont utilisées dans les calculs de ratio et definnissent le mixin responsive(scene) : **$scene_width et $scene_height**. A adapter au design fournis, ils représente la taille initiale de la formation (celle-ci reste la même pour 95% des formations c'est à dire 1920x1080).

**Rester un maximum dans le flux pour les blocs de structure** quand cela est possible. Les configurations peuvent être tellement différentes qu'il est risqué de positionner un bloc en absolute car il y a un risque de chevauchement avec d'autres blocs et cela vous demandera derrière plus de travail de debug/d'adaptation responsive.  **Tous les fichiers Sass que vous ajoutez doivent être placés dans le répertoire __css/sass/modules/__** et inclus via le main.scss pour être pris en compte. (Ne pas oublier de redémarrez la commande gulp watch)


# Framework -- JS
Les fichiers javascript présents dans src sont concaténés dans un seul fichier via Gulp. Sont inclus Modernizr, Jquery et JqueryUi. Sont également inclus 3 plugins dans le fichier __js/src/plugins.js__. C'est ici que vous devez ajouter vos bibliothèques js externes dont vous avez besoin pour votre développement.

La logique javascript des formations est dans le fichier __js/src/im-init.js__. Ce dernier génère une variable objet nommé im, qui initialise la formation et contient les différentes fonctions (navigation, tracking...). Les options de configuration sont au début de ce fichier et sont documentées. Les fonctions **nextScreen et tracking** seront celles que vous utiliserez le plus au cours de votre développement. Quelques évènements im (ils sont tous précédé de im:) sont générés lors des scripts (cf im-init.js), utiliser les pour placer votre logique au bon moment (im:animateScreen au moment de l'animation de l'écran par exemple...) **Eviter de modifier ce fichier hormis pour les options de configuration et votre logique que vous placerez en fin de fichier, dans `$(document).ready`.**

La logique pour les quiz est elle située dans le fichier __js/src/im-quiz.js__, avec toujours la configuration en début de fichier. Ce dernier permet d'initialiser cinq types de question grâce à un attribut data-quiz sur l'écran :
- click : QCM classique avec de multiples propositions
- drag-drop : jeu de drag and drop
- select-props : texte à trou à completer avec des listes de mots dans une selectbox
- complete-text : complétion manuel de mots via la saisie clavier
- choice : QCM mais sans bonne réponse, uniquement un choix entre les propositions
Le tracking s'effectue tout seul à la fin des quiz ainsi que la mise à jour du score et les message d'erreur/réussite des différentes propositions.

Pour que l'utilisateur puisse envoyer un commentaire (souvent à la fin de la formation), vous disposez de la fonction sendComment dans le fichier im-init.js. N'oubliez pas de configurer la variable im.trackings.comment_url pour que cette dernière puisse fonctionner.

Vous disposez également d'une fonctionnalité timer, à configurer via la variable im.timer et à gérer via les fonctions im.startTimer et im.pauseTimer.

Si vous souhaitez avoir du javascript pour une page en particulier, vous pouvez créer un fichier page.js (remplacer page par le nom de fichier de votre page) dans __js/src/__, il sera inclus automatiquement pour la page concernée.

# Framework -- HTML
Afin de pouvoir réutiliser le framework JS/CSS, il faut respecter au maximum le markup HTML présent dans exemple.php. (TODO!!). Voici quelques bout de code basiques

### Structure de base d'une page -- Conserver le commentaire de numéro d'écran pour aider au debug (?s=2 dans l'url pour afficher directement le 2e ecran)
```
<section id="scene" class="formation">
    <!-- Ecran n°0 -->
    <article class="screen">...</article>
    <!-- Ecran n°1 -->
    <article class="screen">...</article>
    <!-- Ecran n°2 -->
    <article class="screen">...</article>
</section>
```

### Navigation inter-écrans : **class .lien-js**
Vous pouvez utiliser cette classe sur n'importe quelle balise, meme <a> : le lien natif sera alors ignoré.
```
<!-- Lien pour passer l"écran suivant -->
<span class="lien-js"></span>
<!-- Lien pour passer à l'écran numéro 7 -->
<a class="lien-js" data-screen="7"></a>
<!-- Lien pour passer au 3e ecran après le courant -->
<div class="lien-js" data-screen="+3"></div>
<!-- Lien pour passer au 2e ecran avant le courant -->
<img class="lien-js" data-screen="-2" />
<!-- Lien pour retourner au menu principal, défini par la variable im.screen.menu_index -->
<img class="lien-js" data-screen="menu" />
```

### Tracking d'activité : **attribut data-tracking**
```
<!-- Tracking de l'activité 2 lors de l'affichage de l'écran -->
<article class="screen" data-tracking="2"></article>
<!-- Tracking de l'activité 3 lors du click sur l'élément -->
<span data-tracking="3"></span>
```

### Ecran avec une vidéo : **attribut data-video**
Le javascript génèrera seul la balise vidéo necessaire. Mettre le nom de la video sans extension.
Les vidéos qui sont sur le premier écran ne peuvent pas se lancer automatiquement sur certains devices, elles nécessitent un click utilisateur. Il faut donc gérer l'affichage d'un "poster" incitant à cliquer pour lancer la vidéo. Cette fonctionnalitée est géré dans __sass/libs/_config.scss__, balise .no-videoautoplay.
```
<article class="screen" data-video="<?=media_url('videonamesansextension')?>"></article>
```

### Ouverture/fermeture popin : **attribut data-popin**
La popin doit être dans le même écran que l'élément permettant l'ouverture de cette dernière
```
<article class="screen">
    <!-- Ouverture de la popin -->
    <span data-popin="popinid"></span>
    <div id="popinid">
        <span data-popin="popinid"></span>
    </div>
</article>
```

### Quiz -- Markup principal
Attribut data-quiz pour déterminer le type de quiz, utilisation des classes q-label, q-num, q-help et q-feedback pour styliser les élements communs à toutes les questions plus facilement. Pour le bon fonctionnement du tracking du quiz, il faut également ajouter deux attributs : data-q (obligatoire), qui correspont à l'index de la question et data-quiz-id, qui correspond à l'identifiant du quiz (facultatif si un seul quiz à tracker). Ce dernier attribut doit être présent sur l'écran de résultat quiz-result (si besoin).
```
<!-- Question 1 du quiz 1-->
<article class="screen" data-quiz="click ou drag-drop ou..." data-q="1" data-quiz-id="1">
    <p class="q-num">Numéro de la question 1/10</p>
    <p class="q-label">Label principal de la question</p>
    <p class="q-help">Instruction de la question, qui disparait sous smartphone pour gagner de la place</p>
    <ul class="q-feedback">
        <li>Feedback n°0 qui apparait lors du click sur la reponse ayant data-fb="0"</li>
        <li>Feedback n°1 qui apparait lors du click sur la reponse ayant data-fb="1"</li>
        <li class="final">Feedback final qui s'affiche à la fin de la question</li>
    </ul>
</article>
```

### Quiz -- Question classique avec multiple propositions
Attribut data-quiz à click et .reponses avec les propositions ayant un attribut data-status (ok ou ko). Possibilité d'avoir plusieurs blocs reponses pour la même question, la validation de la question ne sera effective que lorsque tous les blocs auront été validés.
```
<article class="screen" data-quiz="click" data-q="3">
    <ul class="reponses">
        <li data-status="ok" data-fb="3">Bonne réponse et affichage du feedback n°3</li>
        <li data-status="ko" data-fb="1">Mauvaise réponse et affichage du feedback n°1</li>
        <li data-status="ok">Bonne réponse sans affichage de feedback</li>
    </ul>
</article>
```
Deux options sont disponibles pour ce type de quiz :
- single : un seul choix possible => met fin à la question après le premier choix, même s'il est faux.
- sequence : une suite de "sous-questions" à afficher les une après les autres. Le delay d'apparition de la sous-question suivante est géré par l'attribut prop-delay
```
<article class="screen" data-quiz="click sequence" data-q="2" data-quiz-id="2">
    <div>
        <ul class="reponses sequence current">
            <li data-status="ok">...</li>
            <li data-status="ok">...</li>
            <li data-status="ko">...</li>
        </ul>
        <ul class="reponses sequence">
            <li data-status="ko">...</li>
            <li data-status="ko">...</li>
            <li data-status="ok">...</li>
        </ul>
        <ul class="reponses sequence">
            <li data-status="ko">...</li>
            <li data-status="ok">...</li>
            <li data-status="ok">...</li>
        </ul>
        ...
</article>
```

### Quiz -- Drag and drop
Attribut data-quiz à drag-drop, un conteneur .drags (optionnel), un container .drops (optionnel), des éléments avec l'attribut data-drag (pouvant contenir de multiples valeurs, séparés par une virgule SANS ESPACES) et des élements drop avec l'attribut data-accept-drag="" (une seule valeur).
```
<article class="screen" data-quiz="drag-drop" data-q="8">
    <ul>
        <li data-drag="1">Element accepté par le drop ayant le data-accept-drag="1"</li>
        <li data-drag="-1">Element incorrect pour tous les drop</li>
        <li data-drag="2">Element accepté par le drop ayant le data-accept-drag="2"</li>
        <li data-drag="1,2">Element accepté par le drop ayant le data-accept-drag="1" ou data-accept-drag="2" </li>
    </ul>
    <img src="..." data-accept-drag="1" /> <!-- Accepte les drag 1 -->
    <img src="..." data-accept-drag="2" /> <!-- Accepte les drag 2 -->
</article>
```
Deux options sont disponibles pour ce type de quiz :
- sequence : affiche une suite d'éléments drag et/ou drop, les uns après les autres
- l'attribut data-prop-delay, permettant de définir la durée de transition entre 2 séquences (3s par défaut)
```
<!-- Sequence de drags -->
<article class="screen" data-quiz="drag-drop sequence" data-prop-delay="1500" data-q="1">
    <ul>
        <li class="sequence current" data-drag="1"></li>
        <li class="sequence" data-drag="1"></li>
        <li class="sequence" data-drag="2"></li>
    </ul>
    <img src="..." data-accept-drag="1" /> <!-- Accepte les drag 1 -->
    <img src="..." data-accept-drag="2" /> <!-- Accepte les drag 2 -->
</article>
<!-- Sequence de drops -->
<article class="screen" data-quiz="drag-drop sequence" data-q="1">
    <ul>
        <li data-drag="1"></li>
        <li data-drag="1"></li>
        <li data-drag="2"></li>
    </ul>
    <img src="..." class="sequence current" data-accept-drag="1" /> <!-- Accepte les drag 1 -->
    <img src="..." class="sequence" data-accept-drag="2" /> <!-- Accepte les drag 2 -->
</article>
<!-- Sequence de drags & drops -->
<article class="screen" data-quiz="drag-drop sequence" data-q="1">
    <div class="sequence current">
        <ul>
            <li data-drag="1"></li>
            <li data-drag="1"></li>
            <li data-drag="2"></li>
        </ul>
        <img src="..." data-accept-drag="2" /> <!-- Accepte les drag 2 -->
    </div>
    <div class="sequence">
        <ul>
            <li data-drag="3"></li>
            <li data-drag="1"></li>
            <li data-drag="-1"></li>
        </ul>
        <img src="..." data-accept-drag="1" /> <!-- Accepte les drag 1 -->
    </div>
</article>
```

### Quiz -- Complétion texte par selection
```
<article class="screen" data-quiz="select-props" data-q="2">
    <div class="select-prop">
        <div class="select-word n1">
            <span class="selected-word">...</span>
            <ul class="select">
                <li class="choose">...</li>
                <li data-status="ok">Bonne proposition</li>
                <li data-status="ko">Mauvaise proposition</li>
                <li data-status="ko">Mauvaise proposition</li>
            </ul>
        </div>
    </div>
</article>
```

### Quiz -- Complétion mot par saisie clavier
TODO

### Quiz -- Ecran de résultat
```
<article class="screen quiz-result" data-quiz-id="2">
    <p><span class="current-score">0</span>/10</p> <!-- Le score se met automatiquement à jour -->
    <p class="winner">Ce texte ne s'affichera que si l'utilisateur a réussi le quiz</p>
    <p class="loser">Ce texte s'affichera si l'utilisateur n'a pas réussi le quiz</p>
</article>
```

### Animations éléments
Utiliser **l'attribut class ou data-class** sur les éléments à animer, ce qui permettra au javascript de générer les bons attributs (data-delay, data-duration...) et les bonnes classes (anim, desanim...) en surchargeant l'attribut class pour l'animation. Vous pouvez donc utiliser vos propres classes css directement dans l'attribut class. La liste des animations disponibles est disponible dans le fichier __css/sass/libs/_config.scss__ en fin de fichier.

Quelques exemples :
- Glissement par la gauche d'une durée de 1000ms, 500ms après le début de l'affichage de l'écran et disparition (opacity) 1500ms après la fin de l'animation : `<img src="..." class="slide-left 500 *1000 -1500" />`
- Apparition progressive (opacity) sans mouvement à l'animation de l'écran : `<p class="0"></p>`
- Disparition 4000ms après le début de l'affichage de l'écran: `<p class="monp" data-class="-4000"></p>`

### Enchainement automatique d'ecrans (utile pour les introductions)
```
<!-- Ecran qui passe au suivant (appel de im.nextScreen) 5000ms après son affichage -->
<article class="screen desanim" data-delay="5000"></article>
<!-- Ecran qui sera affiché après le précédent -->
<article class="screen"></article>
```
Vous pouvez également aussi utiliser un empilement des sous-écrans (.sc) avec des z-index croissant (z1,z2,z3...)
```
<article class="screen">
    <div class="sc z1">Sous écran 1 qui "disparaitra" au bout de 1000ms car le sous-écran 2 sera par-dessus lui.</div>
    <div class="sc z2 1000">Sous écran 2 qui apparaitra après 1000ms</div>
    <div class="sc z3 5000">Sous écran 3 qui apparaitra après 5000ms</div>
    ...
</article>
```

### Header classique
__Fichier parts/_header.php__ . N'hésitez pas à supprimer du markup les éléments inutiles à votre formation.
Vous pouvez gérer **différentes versions du header** en ajoutant un attribut data-header aux screen, qui rajoute cette valeur en tant que class au header. Adaptez votre css en fonction de cette class.
Les progressbar (autre que pics) ont 3 modes de fonctionnements : tracking activités/quiz, automatique (en fonction du nombre d'écran) ou par palier (via un data-progress sur un .screen). Cette fonctionnalité ce gère via la variable im.progress.mode.

```
<header class="formation-header slide-top 0">
    <!-- Icone burger menu -->
    <span class="formation-burger"></span>
    <!-- passage fullscreen / retour affichage normal - Ne s'affiche pas si fonctionnalité pas disponible (IOS) -->
    <span class="formation-switch"></span>
    <!-- Titre de la page, géré par les data-title des .screen -->
    <span class="formation-title"></span>
    <!-- Timer -->
    <div class="formation-timer"><p><span id="timer-m">00</span>:<span id="timer-s">00</span></p></div>
    <!-- Bouton de fermeture de la formation -->
    <a href="/fr/accueil" class="formation-close"></a>
    <!-- Progressbar sous forme d'icone, basé sur le tracking des activités (trackid) et quiz (trackqid) -->
    <ul class="formation-progressbar pics">
        <li data-trackid="1"></li>
        <li data-trackid="2"></li>
        <li data-trackid="3"></li>
        <li data-trackid="4"></li>
        <li data-trackqid="1"></li>
    </ul>
    <!-- Progressbar du bas de page, en fonction de l'avancement dans la formation -->
    <ul class="formation-progressbar classic slide-bottom 0"><li class="percent"></li></ul>
    <!-- Variante "règle" de la progressbar du bas de page -->
    <ul class="formation-progressbar regle slide-bottom 0"></ul>
</header>
```

### Burger menu classique
Contenu du burger-menu. Fichier __parts/_burger-menu.php__
Les lien js se désactivent automatiquement quand nous ne sommes pas sur la page principale de la formation (d'où les <a></a>). Cette dernière est définie par la variable im.main_page. Pour que les liens natif fonctionne, il faut ajouter une classe direct-nav sur les écrans concernés.
```
<nav class="formation-burger-menu flex">
    <span class="close"></span>
    <ul>
        <li><a href="index.php?page=formation&s=0">Accueil</a></li>
        <!-- Utilisation de data-trackid pour savoir quelle activité correspont à ce lien, pour le feedback tracking -->
        <li data-trackid="1"><a href="index.php?page=formation&s=1">Activité 1</a></li>
        <li data-trackid="2"><a href="index.php?page=formation&s=2">Activité 2</a></li>
        <!-- Utilisation de inactive quiz pour désactiver par défaut le lien du quiz -->
        <li class="inactive quiz"><a href="index.php?page=quiz">Le quiz</a></li>
    </ul>
</nav>
```

### Helpers CSS
Quelques helpers CSS qui peuvent vous être utile en chemin...
- Espacement vertical : **.mb**. Cela permet d'avoir des espacements verticaux "responsive" et communs à la formation. Essayez au maximum de n'espacer verticalement que par le bas des éléments (plus simple pour le debug)
- Pulsation et Clignotement : **.pulse** et **.blink**
- Sous-contenu prenant toute la place disponible du parent : **.sc**, permet d'avoir un block en absolute 0 0 0 0.
- Alignement vertical : **.flex**, qui utilise flex. Ne pas oublier d'appliquer des margin-top:auto au premier élément et margin-bottom:auto au dernier élément du bloc flex.
- Suppression saut de ligne sur smartphone : **.nobr**, ne pas oublier de laisser un espace avant la balise pour que le texte ne soit pas collé sous smartphone.
- bloquer saut de ligne : **.nw** ou bien utilisation de **`&nbps;`** pour représenter l'espace insécable.

### Helpers PHP
Quelques helpers PHP (__libs/config.php__) :
- ir : Création d'une image responsive sd/hd (avec srcset si besoin) si les deux versions sont présentes, image classique sinon avec l'url fournie. **ATTENTION, casse sensitive, aussi bien sur les dossier que le nom des images**
- media_url : génère l'url pour les vidéos/PDF.

### Variable url de debug
Quelques variables à ajouter à l'url pour permettre un debug plus aisé.
- *index.php?s=X* où X est l'index de l'écran à afficher
- *index.php?date=2017-01-20* qui permet de simuler la formation à une date précise (ici le 20 Janvier 2017)
- *index.php?date=2017-01-20* qui permet de simuler la formation une fois le concours clos
- *index.php?day=3* qui permet de simuler la formation au 3e jour après son ouverture. Fichier __libs/\_checkdate.php__
- *index.php?db=1* qui permet d'avoir les logs dans les consoles et des informations de debug au survol en bas de l'écran (ainsi qu'une "simulation" des différentes resolutions à debug)