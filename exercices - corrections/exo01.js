var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Bonjour');
});

app.listen(808,function(){
  console.log('Ecoute sur le port 808');
});
