  /**********************************************************
**********************GÉRER LES POSTS**********************
**********************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
Lorsqu'une requête post est utilisée, les données envoyées ne sont pas présentes dans l'url. Le traitement de ces données dans les requêtes en post se fait d'une façon un peu différente des requêtes avec la méthode get.
Il faut utiliser le module body-parser. Après avoir fait un require de ce dernier, on utilise la fonction middleware :

app.use(express.urlencoded({ extended: true }));

Vous trouverez l'ensemble des options sur la page suivante : https://expressjs.com/en/4x/api.html#express.urlencoded

À partir de là, on peut utiliser dans la fonction de retour de la gestion du post (app.post) la propriété body de l'objet req qui contient autant de propriétés que de nombres d'éléments envoyés par la soumission du formulaire.

*/


/*********************************
*************Exercice*************
*********************************/
/*
------ 1 ------
Reprenez le code de l'exercice 10 ou de l'exercice 11.
------ 2 ------
Créez une nouvelle page correspondant à un nouveau template comprenant un formulaire avec deux champs (nom et prénom).
------ 3 ------
Traitez l'envoi du formulaire pour afficher dans une autre page le prénom et le nom saisis.
*/
