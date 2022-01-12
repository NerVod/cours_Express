var express = require('express');
var app = express();

app.use("/public", express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('Bonjour');
});

app.get('/image', function(req, res) {
  res.send('<img src="public/apache.png">');
});

app.listen(808,function(){
  console.log('Ecoute sur le port 808');
});
