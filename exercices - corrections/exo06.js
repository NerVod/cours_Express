var express = require('express');
var app = express();

app.use("/public", express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('page.html',{root:'public'});
});

app.get('/page', function(req, res) {
  res.sendFile('page2.html',{root:'public'});
});


app.listen(808,function(){
  console.log('Ecoute sur le port 808');
});
