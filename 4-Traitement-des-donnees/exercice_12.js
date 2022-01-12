/***********************************************************
****************GÉRER LES VALEURS DANS L'URL****************
***********************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
Il existe plusieurs façons de traiter des informations fournies dans l'url.
Parmis celles-ci, il y a les propriétées params et query de l'objet req.

------ 1 ------
Si je saisis dans l'url http://www.monsite.com/infos/truc/machin
et que je traite du côté serveur, je peux récupérer les données de la façon suivante :
app.get('/infos/:un/:deux', function(req,res)){
  console.log(req.params.un); //affiche truc
  console.log(req.params.deux); //affiche machin
}

------ 2 ------
Si je saisis dans l'url http://www.monsite.com/question?r=chose&t=bidule
et que je traite du côté serveur, je peux récupérer les données de la façon suivante :
app.get('/question', function(req,res)){
  console.log(req.query.r); //affiche chose
  console.log(req.query.t); //affiche bidule
}
*/


/*********************************
*************Exercice*************
*********************************/
/*
------ 1 ------
Reprenez le site de l'exercice 10. Pour changer de page, vous passer la référence de celle-ci dans l'url en traitant avec req.params.

------ 2 ------
Reprenez le site de l'exercice 11. Pour changer de page, vous passer la référence de celle-ci dans l'url en traitant avec req.query.
*/
