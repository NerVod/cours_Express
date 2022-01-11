
app.use(express.urlencoded({extended: true}));

app.get('/form', (req, res) => {
  console.log('req.query: ', req.query);
  res.send(`Bonjour ${req.query['votre-prenom']} ${req.query['votre-nom']}, bienvenue sur le site !`);
});

app.post('/form', (req, res) => {
  console.log('req.body: ', req.body);
  res.send(`Bonjour ${req.body['votre-prenom']} ${req.body['votre-nom']}, bienvenue sur le site !`);
  
  // Le code ci-dessous ne fonctionne pas car la méthode est POST et il n'y a donc pas de query string peuplé par la requête...
  // console.log('req.query: ', req.query);
  // res.send(`Bonjour ${req.query['votre-prenom']} ${req.query['votre-nom']}, bienvenue sur le site !`);
});

// OU ALORS ON PEUT UTILISER app.all...

app.all('/form', (req, res) => {
  if (req.method.toUpperCase() === 'POST') {
    console.log('req.body: ', req.body);
    res.send(`Bonjour ${req.body['votre-prenom']} ${req.body['votre-nom']}, bienvenue sur le site !`);
  } else {
    console.log('req.query: ', req.query);
    res.send(`Bonjour ${req.query['votre-prenom']} ${req.query['votre-nom']}, bienvenue sur le site !`);
  };
});