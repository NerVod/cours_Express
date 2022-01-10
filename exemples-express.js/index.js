import express, { Router } from 'express'; // const express = require('express);
import path, { dirname } from 'path';
import http from 'http';
import { fileURLToPath } from 'url'; // const { fileURLToPath } = require('url');

const app = express();
const router = Router();
const routerAdmin = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Utilisation du router express...

router.get('/foo', (req, res) => {
  res.send('Bienvenue sur la route /foo de mon super routeur basique !');
});

app.use('/monRouteur', router);

// router.param('name', (req, res, next, name) => {
//   const reqObject = {
//     params: req.params,
//     body: req.body,
//     method: req.method,
//     originalUrl: req.originalUrl,
//     queryString: req.query,
//     path: req.path,
//     secure: req.secure,
//     protocol: req.protocol
//   };

//   console.log('REQUEST OBJECT: ', reqObject);

//   next();
// });

// router.use('/foo', (req, res, next) => {
//   console.log('Dans le routeur sur une requête sur la route /foo');
//   res.send('Bienvenue sur mon routeur à la route /foo !')
//   // next();
// });

// // router.route('/toto')
// //   .post((req, res, next) => {
// //     console.log('requête post sur la route /toto');
// //   });

// router.get('/toto/:name', (req, res, next) => {
//   console.log('requête GET sur la route /toto du router');
//   res.send(`Bonjour utilisateur ${req.params.name}`);
// });

// routerAdmin.use('/dashboard', (req, res, next) => {
//   console.log('Dans le routerAdmin sur une requête sur la route /dashboard');
//   res.send('Bienvenue sur le DASHBOARD de l\'ADMIN !');
// });

// app.use('/routeVersMonRouteur', router);
// app.use('/admin', routerAdmin);

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

function sayHello(req, res, next) {
  console.log('Message dans la fonction sayHello');
  next();
};

app.use('/hello', sayHello);

app.use('/coucou', (req, res, next) => {
  console.log('Middleware de la route /coucou appelé.');
  next();
});

// Ce middleware ci-dessous sera TOUJOURS invoqué...
app.use((req, res, next) => {
  console.log('Middleware toujours appelé.');
  // res.send('Erreur! Vous essayez d\accéder à une route incorrecte !');
  next();
});


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

// On peut définir une route, puis gérer les différentes méthodes HTTP
// au lieu de définir une route pour CHAQUE appel HTTP. Cela permet
// d'éviter la redondance...
// app.route('/coucou')
//   .get((req, res) => {
//     res.send('Requête get effectuée sur la route /coucou');
//   })
//   .post((req, res) => {
//     res.send('Requête post effectuée sur la route /coucou');
//   })
//   .put((req, res) => {
//     res.send('Requête put effectuée sur la route /coucou');
//   })
//   .delete((req, res) => {
//     res.send('Requête delete effectuée sur la route /coucou');
//   })
//   .all((req, res) => {
//     res.send('Requête effectuée sur la route /coucou');
//   })

app.get('/toto/titi', (req, res) => {
  res.send(`Tu crois que j'sais pas qu'c'est toi, Toto ?!`);
});

app.get('/', (req, res) => {
  // Comme les console.log suivants le démontrent, les objets req et res sont bien
  // de type http.IncomingMessage et http.ServerResponse, comme c'est le cas dans
  // node.js...
  console.log('req est de type http.IncomingMessage: ', req instanceof http.IncomingMessage);
  console.log('res est de type http.ServerResponse ? ', res instanceof http.ServerResponse);
  res.sendFile('index.html');
});

// La méthode listen de l'objet app de type Express renvoie un objet
// de type http.Server...
const server = app.listen(8080, '127.0.0.1', () => {
  // console.log('server.address(): ', server.address());
  console.log(`Le serveur est démarré à l'adresse ${server.address().address}:${server.address().port}`);
});