/**********************************************************
********************TRAITER LES ERREURS********************
**********************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
Il est important de prendre en compte les cas où l'utilisateur ne saisit aucune adresse valide. Quand cela arrive, il faut générer un en-tête avec le code 404 suivi d'une page particulière.
Le principe de base consiste à créer une route spécifique après toutes les autres. Celle-ci n'est donc atteinte que si toutes les autres ont échouées.
En plus d'envoyer un document html au client ; il faut prévoir, préalablement, l'envoi d'un en-tête d'erreur pour signifier au navigateur qu'aucun contenu n'a été trouvé.
Votre route ressemblera à celle-ci :
app.use(function (req, res) {
  res.status(404).render('error404');
})
*/


/*********************************
*************Exercice*************
*********************************/
/*
Ajoutez la gestion de la page 404 à l'exercice 11. Prévoyez d'afficher une page particulière si la requête envoyée ne correspond à aucune route gérée par le site.
*/
