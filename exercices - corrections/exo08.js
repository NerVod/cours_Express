var express = require('express');
var app = express();

//définit le dossier de base pour les fichiers statiques (css, images, js, …)
app.use("/static", express.static(__dirname + '/static'));

//permet d'utiliser Pug
app.set('view engine', 'pug');

//redéfinir le dossier recevant les fichiers .pug (par défaut : views)
app.set('views','static');

//chemin de base de mon application :
app.get('/',function (req,res) {
  //permet le rendu du fichier index.pug qui donne un html envoyé ensuite au client
  res.render('index2', {title: 'Titre de la page', message : 'Du texte dans la page'});
});

app.listen(808,function(){
  console.log('Ecoute sur le port 808');
});
