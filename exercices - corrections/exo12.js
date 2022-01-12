var express = require('express');
var app = express();


app.get('/test/:info1/:info2', function(req, res) {
  console.log(req.params);
  res.send('Bonjour');
});

app.get('/search', function(req, res) {
  console.log(req.query);
  res.send('Bonjour');
});


app.listen(808,function(){
  console.log('Ecoute sur le port 808');
});
