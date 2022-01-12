/******************************************************
*************BLOG - SUPPRESSION D'ARTICLES*************
******************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
Nous allons créer un système de gestion des articles.
*/


/*********************************
*************Exercice*************
*********************************/
/*
------ 1 ------
Dans l'administration, ajoutez un lien vers une nouvelle page qui affichera la liste des articles.

------ 2 ------
Créez la page correspondante. Vous y afficherez la liste des articles avec deux liens pour chaque permettant de modifier ou de supprimer l'article. Nous verrons la modification dans l'exercice suivant. Dans chaque lien, vous passez en paramètre de l'url (en GET) l'id de l'article.

------ 3 ------
Quand l'utilisateur clique sur le lien de suppression d'article, vous vérifiez l'id qui est passée comme paramètre dans l'url. Si un article correspond à cette id, vous supprimer l'article correspondant.
Attention, vous ne pouvez pas directement utiliser l'id passée dans l'url pour votre requête en base. Vous devez faire le traitement suivant (idUrl est la chaine de caractère obtenue par le paramètre dans l'url et idRequete l'id utilisable pour la requête en base).
*/
const createObjectId = require('mongodb').ObjectID;
const idRequete = new createObjectId(idUrl);
console.log('idRequete: ', idRequete);
