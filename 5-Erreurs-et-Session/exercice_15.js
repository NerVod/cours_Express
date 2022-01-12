/*******************************************************
**********************LES SESSIONS**********************
*******************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
La gestion des sessions fait partie des fondements d'un site web.
Pour gérer les sessions, nous utilisons le module express-session de la façon suivante :

var express = require('express')
var session = require('express-session');

var app = express()

app.use(session({
    secret:'123456789SECRET',
    saveUninitialized : false,
    resave: false
}));

app.get('/', function(req, res) {
  console.log("Cookies: ", req.cookies)
  console.log(req.session);
})
*/


/*********************************
*************Exercice*************
*********************************/
/*
Créez un fichier js avec Express qui affiche le contenu d'un template Pug.

------ 1 ------
Créez dans la variable de session un compteur en utilisant req.session.
------ 2 ------
Pour chaque connexion, incrémentez le compteur et affichez la valeur dans le navigateur.
*/
