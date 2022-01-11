/*************************************************************
*****UTILISATION DES TEMPLATES - UTILISATION DE VARIABLES*****
*************************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
Pug permet de traiter le contenu d'une variable.
Dans la méthode res.render, on fournit un second argument sous la forme d'un objet. Chaque propriété de cet objet peut être utilisée dans le template de la façon suivante :
    fichier JavaScript :
      res.render(<nom du fichier>, {valeur1: 'un texte', valeur2 : 'un autre texte'})
    template Pug :
      p= valeur1

    Ceci donnera <p>un texte</p> dans le document HTML tr&nsmis au client.
*/


/*********************************
*************Exercice*************
*********************************/
/*
------ 1 ------
Reprenez les documents de l'exercice précédent.

------ 2 ------
Transmettez le nom de la page et le titre du h1 dans l'objet passé en second argument de la méthode res.render et affichez les dans votre document HTML envoyé au client.
*/
