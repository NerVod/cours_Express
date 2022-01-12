var express = require('express');
var app = express();

app.use("/public", express.static(__dirname + '/public'));
app.use("/public2", express.static(__dirname + '/public2'));

app.get('/', function(req, res) {
  res.send('Bonjour');
});

app.get('/image', function(req, res) {
  res.send('<img src="public/apache.png">');
});

app.get('/image2', function(req, res) {
  res.send('<img src="public2/512x512bb-85.png">');
});

app.listen(808,function(){
  console.log('Ecoute sur le port 808');
});
