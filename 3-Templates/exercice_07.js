/*********************************************************
*********UTILISATION DES TEMPLATES - PREMIERS PAS*********
*********************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
L'utilisation de template permet de simplifier l'écriture des pages en HTML et de gérer facilement l'affichage des données contenues dans une variable.

Le template le plus utilisé avec express.js est Pug. Vous trouverez l'ensemble des possibilités de ce moteur de template dans la documentation : https://pugjs.org/ (Menu "Langage Reference" dans la barre de côté).
Même si la connaissance de l'écriture en Pug est nécessaire, un convertisseur de HTML vers Pug vous donnera une première idée de la syntaxe : https://html-to-pug.com/.

Pour utilisez Pug, vous devez , tout d'abord, installer le module correspondant (npm install pug).
*/


/*********************************
*************Exercice*************
*********************************/
/*
Affichons une page à l'aide du moteur de template Pug.

------ 1 ------
Vous définissez un dossier pour les fichiers statiques.

------ 2 ------
Vous spécifiez que vous utilisez le module Pug : app.set('view engine', 'pug').
Pour utiliser le dossier des fichiers statiques pour les fichiers Pug, vous devez utilisez la méthode suivante : app.set('views','<nom de dossier>');

------ 3 ------
Pour appeler le fichier Pug, vous utilisez la méthode res.render('<nom du fichier')
*/
