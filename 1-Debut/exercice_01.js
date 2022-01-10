/**********************************************************
**********************PREMIER SERVEUR**********************
**********************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
Express est un module de NodeJS. Il doit être, préalablement, installé dans le dossier où se situe l'application.
Pour ce faire, il est préférable de créer un fichier un fichier JSON avec la commande ci-dessous et de répondre aux questions posées.
> npm init
Ensuite, on procède à l'installation d'Express lui-même :
> npm install express --save
Une fois l'installation faite, vous pouvez créer votre premier serveur web avec Express
*/


/*********************************
*************Exercice*************
*********************************/
/*
Après l'installation d'Express, créez un fichier js.

------ 1 ------
Faire un require du module express. Vous stockerez la valeur de retour dans une variable express. Exécutez à la ligne suivante cette variable et stockez sa valeur de retour dans une variable app.

------ 2 ------
Appelez la méthode get sur l'objet stocké dans la variable app.
Cette méthode admet deux arguments :
  _ le chemin, ici la racine (/).
  _ une fonction de retour.
Cette fonction possède deux arguments en entrée : req et res.
Dans cette fonction, utilisez la méthode send sur l'objet res.

------ 3 ------
Terminez votre fichier JavaScript en appelant la méthode listen sur l'objet stocké dans la variable app.
Cette méthode possède deux arguments :
  _ le port d'écoute
  _ une fonction de retour.
Dans celle-ci, faite un console.log permettant d'afficher le port écouté.

------ 4 ------
Démarrez le serveur : node nombreDeVotreFichier.js
Accéder au serveur depuis votre navigateur.
*/
