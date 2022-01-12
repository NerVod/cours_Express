import express, { Router } from 'express'; // const express = require('express);
import path, { dirname } from 'path';
import http from 'http';
import { fileURLToPath } from 'url'; // const { fileURLToPath } = require('url');
import expressSession from 'express-session';
import sessionFileStore from 'session-file-store';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/********************** UTILISATION DE express-session AVEC express (DEBUT) **********************/

const ExpressSessionFileStore = sessionFileStore(expressSession);
const fileStore = new ExpressSessionFileStore({
  path: './sessions',
  ttl: 3600,
  retries: 10,
  secret: 'Mon super secret!'
});

app.use(expressSession({
  store: fileStore,
  secret: 'mon secret de session',
  resave: false,
  saveUninitialized: false,
}));

app.get('/test-session', (req, res) => {
  // On peut logger l'objet req.session pour voir ce qu'il contient, c'est toujours amusant d'avoir plus de connaissances =)...
  // console.log('req.session', req.session);
  req.session.message = `Oui bon bah c'est bon, changez de page, maintenant !`;
  console.log('sessionId: ', req.sessionID);

  if (!req.session.counter) {
    req.session.counter = 1;
  } else {
    req.session.counter++;
  };

  if (req.session.counter > 20) {
    req.session.counter = 0;
    res.send(req.session.message);
  }

  res.send(`Vous avez visité cette page ${req.session.counter} fois.`);
});


/********************** UTILISATION DE express-session AVEC express (FIN) **********************/


/********************** CONNEXION A UNE BDD MONGODB AVEC express (DEBUT) **********************/


// On stocke dans une variable l'url de notre base de données...
const url = 'mongodb://localhost:27017';

// On stocke dans une variable le nom de la base de données à laquelle on souhaite se connecter...
const dbName = 'mon-site';

// On stocke dans une variable le nom de la base de données à laquelle on souhaite se connecter...
const collName = 'users';

// On obtient un client MongoDB en utilisant le constructeur MongoClient auquel on passe l'url vers nos bases de données MongoDB...
const mongoClient = new MongoClient(url);

// On définit une route pour pouvoir accéder aux informations qu'on aura reçues de notre serveur MongoDB...
app.get('/mongo', (req, res) => {
  // On peut maintenant se connecter à notre base de données en utilisant la méthode 'connect()' du mongoClient que nous venons d'obtenir...
  mongoClient.connect(function(err, client) {
    if (err) {
      console.log(err);
    } else {
      // On stocke une référence à notre base de données dans une variable 'db' (il vous appartient de choisir le nom de la variable, bien entendu)...
      const db = client.db(dbName);
      const collection = db.collection(collName);
  
      // On va lancer une recherche de données dans notre collection via la méthode .find() de la collection...
      // collection.find({}).toArray((err, data) => {
      //   // On gère le cas d'erreur, à savoir si la récupération des infos est impossible pour une raison ou une autre...
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     // Et si on arrive bien à récupérer des informations, on va simplement, pour le moment, envoyer les données dans notre navigateur au moyen de la méthode .send()...
      //     res.send(data);
      //   };
      //   // ON OUBLIE PAS DE TOUJOURS BIEN FERMER LA CONNEXION A LA BASE DE DONNEES UNE FOIS LES OPERATIONS EFFECTUEES...
      //   client.close();
      // })

      // Un autre exemple avec la méthode findOne() et en renvoyant dynamiquement des données dans le navigateur...
      collection.findOne({'name': 'John'}, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          // On stocke dans des variables les différentes informations extraites de l'objet 'result' qui représente la donnée récupérée depuis la base de données...
          const name = result.name;
          const age = result.age;
          const address = result.address;

          // Ensuite on envoie notre réponse dynamique...
          res.send(`Bonjour ${name} ! Vous avez aujourd'hui ${age} an(s) et habitez la ville de ${address.city}`);
        };
        // Et enfin on termine la connexion avec la base de données en invoquant la méthode close() de l'objet client...
        client.close();
      })
    };
  });
});


/*********************** CONNEXION A UNE BDD MONGODB AVEC express (FIN) ***********************/


// On définit les différents middlewares que l'on souhaite utiliser pour charger nos fichiers statiques...
app.use('/html', express.static(path.join(__dirname, 'public/html')));
app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use('/css', express.static(path.join(__dirname, 'public/styles')));


/********************** UTILISATION D'UN ROUTEUR AVEC express.Router() (DEBUT) **********************/


const routerAdmin = Router();

// Ici, on utilise la méthode .param pour faire de sorte que dès qu'une route possède un paramètre 'name', soit la propriété 'user' de l'objet de requête est créée et sa valeur associée à un objet possédant une propriété 'name' ayant pour valeur celle passée en paramètre dans la route, soit la valeur de req.user.name est mise à jour si la propriété existe déjà...
routerAdmin.param('name', (req, res, next, name) => {
  // Ici je log un objet que je crée à partir des informations contenues dans la requête...
  // const reqObject = {
  //   params: req.params,
  //   body: req.body,
  //   method: req.method,
  //   originalUrl: req.originalUrl,
  //   queryString: req.query,
  //   path: req.path,
  //   secure: req.secure,
  //   protocol: req.protocol
  // };

  if (!req.user) {
    req.user = {
      name: name
    };
  } else {
    req.user.name = name;
  };

  next();
});

// La propriété 'locals' de l'objet 'app' contient un objet ayant de base
// une seule propriété, 'settings', auquel on peut ajouter autant de propriétés
// que l'on souhaite afin de les utiliser au sein de notre application...
// console.log('app.locals : ', app.locals); // Aucune autre propriété que 'settings'.

// On crée une propriété 'message' dans l'objet 'app.locals'...
app.locals.message = 'Mon super message';

// Que l'on retrouve par la suite dans notre application :
// console.log('app.locals : ', app.locals); // On a maintenant bien notre propriété 'message' !

// Définition des middlewares de mon routerAdmin...
routerAdmin.use('/connect/:name', (req, res, next) => {
  console.log('Dans le routeur sur une requête sur la route /connect/:name');
  next();
});

routerAdmin.use('/connect', (req, res, next) => {
  console.log('Dans le routeur sur une requête sur la route /connect');
  console.log('req.user: ', req.user);
  next();
});

// Définition des routes de mon routerAdmin...
routerAdmin.get('/connect/:name', (req, res) => {
  console.log(req.user.name === req.params.name ? 'Oui, pareil' : 'Non, pas pareil');
  res.send(`Bienvenue sur le site, Admin ${req.user.name} !`);
});

routerAdmin.get('/connect', (req, res) => {
  res.send('Bienvenue sur la route /connect de mon super routeur basique !');
});

routerAdmin.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'administration !');
});

// Définition du middleware qui va permettre de 'rentrer' dans le routerAdmin...
app.use('/admin', routerAdmin);


/********************** UTILISATION D'UN ROUTEUR AVEC express.Router() (FIN) **********************/


// Utilisation de middlewares avec la méthode .use() du module Express...

app.use('/hello/:name', (req, res, next) => {
  console.log('Middleware de la route /hello/:name appelé.');
  if (undefined !== req.params.name) {
    console.log('req.params: ', req.params);
    console.log('req.query: ', req.query);
    res.send(`Bonjour ${req.params.name}`);
  } else {
    next();
  }
});

// On peut extraire le code de la callback fournie en argument d'un middleware si, par exemple, on souhaite la réutiliser plusieurs fois...
function sayHello(req, res, next) {
  res.send('Hello Wooooooorld!');
  next();
};

app.use('/hello1', sayHello);
app.use('/hello2', sayHello);
app.use('/hello3', sayHello);

app.use('/coucou', (req, res, next) => {
  console.log('Middleware de la route /coucou appelé.');
  next();
});

// Ce middleware ci-dessous sera TOUJOURS invoqué...
app.use('*', (req, res, next) => {
  console.log('Middleware toujours appelé.');
  // res.send('Erreur! Vous essayez d\accéder à une route incorrecte !');
  next();
});

/************************ GESTION DES DONNEES ENVOYEES PAR UN FORMULAIRE (DEBUT) ************************/

// Première méthode pour gérer les requêtes sur la route /form pour une requête HTTP avec les méthodes GET et POST...
app.get('/formulaire', (req, res) => {
  console.log('req.query: ', req.query);
  res.send(`Bonjour ${req.query['votre-prenom']} ${req.query['votre-nom']}, bienvenue sur le site !`);
});

app.post('/formulaire', (req, res) => {
  console.log('req.body: ', req.body);
  res.send(`Bonjour ${req.body['votre-prenom']} ${req.body['votre-nom']}, bienvenue sur le site !`);
});

// Deuxième méthode : on définit une route pour /form et on enchaîne avec les différentes méthodes et leur callback respective...
// On peut définir une route, puis gérer les différentes méthodes HTTP au lieu de définir une route pour CHAQUE appel HTTP. Cela permet d'éviter la redondance...
app.route('/route-form')
  .get((req, res) => {
    console.log('req.query: ', req.query);
    res.send(`Bonjour ${req.query['votre-prenom']} ${req.query['votre-nom']}, bienvenue sur le site !`);
  })
  .post((req, res) => {
    console.log('req.body: ', req.body);
    res.send(`Bonjour ${req.body['votre-prenom']} ${req.body['votre-nom']}, bienvenue sur le site !`);
  })

// Troisième méthode : on utiliser app.all pour gérer les requêtes HTTP sur la route /form peu importe la méthode utilisée... ATTENTION ! Cette méthode gèrera également des requêtes HTTP avec des méthodes autres que GET et POST !
app.all('/all-form', (req, res) => {
  if (req.method.toUpperCase() === 'POST') {
    console.log('req.body: ', req.body);
    res.send(`Bonjour ${req.body['votre-prenom']} ${req.body['votre-nom']}, bienvenue sur le site !`);
  } else {
    console.log('req.query: ', req.query);
    res.send(`Bonjour ${req.query['votre-prenom']} ${req.query['votre-nom']}, bienvenue sur le site !`);
  };
});

/************************** GESTION DES DONNEES ENVOYEES PAR UN FORMULAIRE (FIN) **************************/

// La callback de cette route ne sera invoquée que lors
// d'une requête http sur la route /coucou...
// Si l'on passe plusieurs callbacks à une même route,
// les callbacks agissent comme des pseudo middlewares et peuvent
// donc invoquer la méthode next() permettant de passer au middleware suivant...
app.get('/coucou/:name',
  (req, res, next) => {
    console.log('Coucou appelée la quatrième fois.');
    if (req.params.name.toUpperCase() === 'TOTO') {
      res.redirect('/toto/titi');
    } else {
      next();
    }
  },
  (req, res) => {
    console.log('req.params dans la route GET /coucou/:name: ', req.params);
    res.send('Route coucou appelée depuis la première route ! Bienvenue sur le site, ' + req.params.name);
  }
);

app.get('/toto/titi', (req, res) => {
  res.send(`Tu crois que j'sais pas qu'c'est toi, Toto ?!`);
});

app.get('/accueil', (req, res, next) => {
  // Comme les console.log suivants le démontrent, les objets req et res sont bien
  // de type http.IncomingMessage et http.ServerResponse, comme c'est le cas dans
  // node.js...
  console.log('req est de type http.IncomingMessage: ', req instanceof http.IncomingMessage);
  console.log('res est de type http.ServerResponse ? ', res instanceof http.ServerResponse);

  res.sendFile('index.html', {
    root: path.join(__dirname, 'public', 'html'),
  }, (err) => {
    if (err) {
      next(err);
    } else {
      // console.log('res.headers sent ?', res.headersSent);
      console.log('Fichier envoyé avec succès !');
    }
  });
});


/************************** EXEMPLE PUG EN TANT QUE VIEW ENGINE (DEBUT) **************************/

app.set('view engine', 'pug');

app.use('/pages', (req, res) => {
  const pageToDisplay = req.url.replace('/', '');
  let optionsObj = {};

  if (pageToDisplay === 'template.pug') {
    optionsObj = {
      name: 'Alex',
      age: 33,
      city: 'Vitry-sur-Seine',
      zipCode: 94400
    }
  }
  res.render(pageToDisplay, optionsObj);
});

app.get('/', (req, res) => {
  const today = new Date();
  res.render('pageExtends', {
    prenom: 'Alex',
    nom: 'Masson',
    date: today.toLocaleDateString('fr-FR'),
    titreH1: 'Ceci est mon site !',
    docTitle: 'TIIIIIITRE'
  });
});


app.get('/pug', (req, res) => {

  const today = new Date();

  res.render('pageExtends', {
    prenom: 'Alex',
    nom: 'Masson',
    date: today.toLocaleDateString('fr-FR'),
    titreH1: 'Ceci est mon site !',
    docTitle: 'TIIIIIITRE'
  });
});

app.get('/pug2', (req, res) => {
    res.render('newPage', {
        prenom: 'Alex',
        nom: 'Masson',
    docTitle: 'TIIIIIITRE',
    pets: [ 'cat', 'dog', 'lamasticot', 'Benjamin', 'Alex']
  });
});


/*************************** EXEMPLE PUG EN TANT QUE VIEW ENGINE (FIN) ***************************/



/**************************** GESTION DES ERREURS DE ROUTAGE (DEBUT) ****************************/

// On crée une route, placée APRES TOUTES LES ROUTES STANDARDS de notre application, et on la fait écouter sur n'importe quelle route... (Attention ! ne rien donner comme argument pour le paramètre 'path' (le premier argument de la méthode get()) ne fonctionne pas !)...
app.get('*', (req, res, next) => {
  // On envoie l'erreur nouvellement créée dans le middleware suivant, qui sera donc le middleware de gestion des erreurs, en passant l'erreur en argument de la fonction next()...

  // On peut par exemple créer un objet de type Error...
  const errorObject = new Error();

  // Et lui ajouter les propriétés que l'on souhaite. La propriété 'message' est pré-existante, donc écrire errorObject.message ne crée pas la propriété mais lui assigne une nouvelle valeur...
  errorObject.message = 'Problème de routage';
  // errorObject.redirection = true;

  // On peut choisir de définir de la façon suivante le code du status de la réponse HTTP...
  res.status(404);

  // On termine cette route en passant au middleware suivant l'objet d'erreur que l'on a créé plus haut...
  next(errorObject);
});

// On crée un middleware de gestion des erreurs (comprendre : les objets d'erreur de type 'Error')
app.use((err, req, res, next) => {
  // L'erreur est attrapée (catch) pas le middleware de gestion des erreurs, et ensuite on peut choisir ce que l'on veut faire...
  // console.log('message de notre erreur de routage : ', err.message);
  // console.log('statut de notre erreur de routage : ', err.redirection);
  console.log('err is of type Error ? ', err instanceof Error);
  // console.log('res ?', res);
  res.status(404).render('error.pug');
  
  if (!err.redirection) {
    res.status(404).render('error.pug');
  } else {
    res.redirect('/');
  };
});


/****************************** GESTION DES ERREURS DE ROUTAGE (FIN) ******************************/


// La méthode listen de l'objet app de type Express renvoie un objet
// de type http.Server...
const server = app.listen(8080, '127.0.0.1', () => {
  // console.log('server.address(): ', server.address());
  console.log(`Le serveur est démarré à l'adresse ${server.address().address}:${server.address().port}`);
});