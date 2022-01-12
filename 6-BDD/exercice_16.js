/********************************************************
************UTILISATION D'UNE BASE DE DONNÉES************
********************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
Il existe de plusieurs modules pour interfacer NodeJS avec MongoDB. Nous utiliserons le pilote officiel(https://www.npmjs.com/package/mongodb).

Pour se connecter à la base de donnée, il faut réaliser deux actions :
- Utilisez le module (écrire en haut de fichier) :
var MongoClient = require('mongodb').MongoClient;

- Dans la route où nous souhaitons utiliser MongoDB, il faut utiliser la structure suivante (à compléter selon vos besoins) :
MongoClient.connect(URLDB, { useUnifiedTopology: true }, (err, client) => {
    if (err) return;
    const collection = client.db(nameDb).collection('MA-COLLECTION');
    //…
});

Bien sûr, vous remplacez URLDB par une véritable url (par exemple : mongodb://localhost:27017)
*/


/*********************************
*************Exercice*************
*********************************/
/*

Créez une base de donnée avec une collection en console.
------ 1 ------
Connectez votre fichier JavaScript à votre base de donnée.
------ 2 ------
Quand l'utilisateur accède à la racine du site, affichez le contenu de la collection en console.
------ 3 ------
Affichez ce contenu dans le navigateur à l'aide de PUG. 
*/
