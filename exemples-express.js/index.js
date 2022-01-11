// import express, { Router } from 'express'; // const express = require('express);
// import path, { dirname } from 'path';
// import http from 'http';
// import { fileURLToPath } from 'url'; // const { fileURLToPath } = require('url');

// const app = express();
// const router = Router();
// const routerAdmin = Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(express.static(path.join(__dirname, 'public')));

// // Utilisation du router express...

// router.get('/foo', (req, res) => {
//   res.send('Bienvenue sur la route /foo de mon super routeur basique !');
// });

// app.use('/monRouteur', router);

// // router.param('name', (req, res, next, name) => {
// //   const reqObject = {
// //     params: req.params,
// //     body: req.body,
// //     method: req.method,
// //     originalUrl: req.originalUrl,
// //     queryString: req.query,
// //     path: req.path,
// //     secure: req.secure,
// //     protocol: req.protocol
// //   };

// //   console.log('REQUEST OBJECT: ', reqObject);

// //   next();
// // });

// // router.use('/foo', (req, res, next) => {
// //   console.log('Dans le routeur sur une requête sur la route /foo');
// //   res.send('Bienvenue sur mon routeur à la route /foo !')
// //   // next();
// // });

// // // router.route('/toto')
// // //   .post((req, res, next) => {
// // //     console.log('requête post sur la route /toto');
// // //   });

// // router.get('/toto/:name', (req, res, next) => {
// //   console.log('requête GET sur la route /toto du router');
// //   res.send(`Bonjour utilisateur ${req.params.name}`);
// // });

// // routerAdmin.use('/dashboard', (req, res, next) => {
// //   console.log('Dans le routerAdmin sur une requête sur la route /dashboard');
// //   res.send('Bienvenue sur le DASHBOARD de l\'ADMIN !');
// // });

// // app.use('/routeVersMonRouteur', router);
// // app.use('/admin', routerAdmin);

// // Utilisation de middlewares avec la méthode .use() du module Express...

// app.use('/hello/:name', (req, res, next) => {
//   console.log('Middleware de la route /hello/:name appelé.');
//   if (undefined !== req.params.name) {
//     console.log('req.params: ', req.params);
//     console.log('req.query: ', req.query);
//     res.send(`Bonjour ${req.params.name}`);
//   } else {
//     next();
//   }
// });

// function sayHello(req, res, next) {
//   console.log('Message dans la fonction sayHello');
//   next();
// };

// app.use('/hello', sayHello);

// app.use('/coucou', (req, res, next) => {
//   console.log('Middleware de la route /coucou appelé.');
//   next();
// });

// // Ce middleware ci-dessous sera TOUJOURS invoqué...
// app.use((req, res, next) => {
//   console.log('Middleware toujours appelé.');
//   // res.send('Erreur! Vous essayez d\accéder à une route incorrecte !');
//   next();
// });


// // La callback de cette route ne sera invoquée que lors
// // d'une requête http sur la route /coucou...
// // Si l'on passe plusieurs callbacks à une même route,
// // les callbacks agissent comme des pseudo middlewares et peuvent
// // donc invoquer la méthode next() permettant de passer au middleware suivant...
// app.get('/coucou/:name',
//   (req, res, next) => {
//     console.log('Coucou appelée la quatrième fois.');
//     if (req.params.name.toUpperCase() === 'TOTO') {
//       res.redirect('/toto/titi');
//     } else {
//       next();
//     }
//   },
//   (req, res) => {
//     console.log('req.params dans la route GET /coucou/:name: ', req.params);
//     res.send('Route coucou appelée depuis la première route ! Bienvenue sur le site, ' + req.params.name);
//   }
// );

// // On peut définir une route, puis gérer les différentes méthodes HTTP
// // au lieu de définir une route pour CHAQUE appel HTTP. Cela permet
// // d'éviter la redondance...
// // app.route('/coucou')
// //   .get((req, res) => {
// //     res.send('Requête get effectuée sur la route /coucou');
// //   })
// //   .post((req, res) => {
// //     res.send('Requête post effectuée sur la route /coucou');
// //   })
// //   .put((req, res) => {
// //     res.send('Requête put effectuée sur la route /coucou');
// //   })
// //   .delete((req, res) => {
// //     res.send('Requête delete effectuée sur la route /coucou');
// //   })
// //   .all((req, res) => {
// //     res.send('Requête effectuée sur la route /coucou');
// //   })

// app.get('/toto/titi', (req, res) => {
//   res.send(`Tu crois que j'sais pas qu'c'est toi, Toto ?!`);
// });

// app.get('/', (req, res) => {
//   // Comme les console.log suivants le démontrent, les objets req et res sont bien
//   // de type http.IncomingMessage et http.ServerResponse, comme c'est le cas dans
//   // node.js...
//   console.log('req est de type http.IncomingMessage: ', req instanceof http.IncomingMessage);
//   console.log('res est de type http.ServerResponse ? ', res instanceof http.ServerResponse);
//   res.sendFile('index.html');
// });

// // La méthode listen de l'objet app de type Express renvoie un objet
// // de type http.Server...
// const server = app.listen(8080, '127.0.0.1', () => {
//   // console.log('server.address(): ', server.address());
//   console.log(`Le serveur est démarré à l'adresse ${server.address().address}:${server.address().port}`);
// });




////////////////////////////////////////////////////////////////////
// revision jour 2
import express, { Router } from 'express'; // const express = require('express);
import path, { dirname } from 'path';
import http from 'http';
import { fileURLToPath } from 'url'; // const { fileURLToPath } = require('url');


const app = express();
app.use(express.urlencoded({extended: true}));

const router = Router();
const routerAdmin = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/html', express.static(path.join(__dirname, 'public/html')));
app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use('/css', express.static(path.join(__dirname, 'public/styles')));

// Utilisation du router express...

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
// });

// La propriété 'locals' de l'objet 'app' contient un objet ayant de base
// une seule propriété 'settings' auquel on peut ajouter autant de propriétés
// que l'on souhaite afin de les utiliser au sein de notre application...
// console.log('app.locals : ', app.locals);

// On crée une propriété 'message' dans l'objet 'app.locals'...
app.locals.message = 'Mon super message';

// Que l'on retrouve par la suite dans notre application :
// console.log('app.locals : ', app.locals);

routerAdmin.use('/connect/:name', (req, res, next) => {
  console.log('Dans le routeur sur une requête sur la route /connect/:name');
  console.log('req.user: ', req.user);
  req.user = {
    user1: req.params.name,
  };
  next();
});

routerAdmin.use('/connect', (req, res, next) => {
  console.log('Dans le routeur sur une requête sur la route /connect');
  console.log('req.user: ', req.user);
  next();
});

routerAdmin.get('/connect/:name', (req, res) => {
  console.log(req.user.user1 === req.params.name ? 'Oui, pareil' : 'Non, pas pareil');
  res.send(`Bienvenue sur le site, Admin ${req.user.user1} !`);
});

routerAdmin.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'administration !');
});

routerAdmin.get('/connect', (req, res) => {
  res.send('Bienvenue sur la route /connect de mon super routeur basique !');
});

app.use('/admin', routerAdmin);

// router.route('/toto')
//   .post((req, res, next) => {
//     console.log('requête post sur la route /toto');
//   });

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

// function sayHello(req, res, next) {
//   res.send('Hello Wooooooorld!');
//   next();
// };

// app.use('/hello', sayHello);

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

app.get('/test', (req, res) => {
  console.log('req.query: ', req.query);
  res.send('Coucou');
});

/************************ GESTION DES DONNEES ENVOYEES PAR UN FORMULAIRE (DEBUT) ************************/

// Première méthode pour gérer les requêtes sur la route /form pour une requête HTTP avec les méthodes GET et POST...
app.get('/form', (req, res) => {
  console.log('req.query: ', req.query);
  res.send(`Bonjour ${req.query['votre-prenom']} ${req.query['votre-nom']}, bienvenue sur le site !`);
});

app.post('/form', (req, res) => {
  console.log('req.body: ', req.body);
  res.send(`Bonjour ${req.body['votre-prenom']} ${req.body['votre-nom']}, bienvenue sur le site !`);
});

// Deuxième méthode : on définit une route pour /form et on enchaîne avec les différentes méthodes et leur callback respective...
app.route('/form')
  .get((req, res) => {
    console.log('req.query: ', req.query);
    res.send(`Bonjour ${req.query['votre-prenom']} ${req.query['votre-nom']}, bienvenue sur le site !`);
  })
  .post((req, res) => {
    console.log('req.body: ', req.body);
    res.send(`Bonjour ${req.body['votre-prenom']} ${req.body['votre-nom']}, bienvenue sur le site !`);
  })

// Troisième méthode : on utiliser app.all pour gérer les requêtes HTTP sur la route /form peu importe la méthode utilisée... ATTENTION ! Cette méthode gèrera également des requêtes HTTP avec des méthodes autres que GET et POST !
app.all('/form', (req, res) => {
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
  res.sendFile('index.html', {
    root: path.join(__dirname, 'public', 'html'),
  });
});


app.set('view engine', 'pug');

app.get('/pug', (req, res) => {
  const today = new Date();

  res.render('template', {
    prenom:'Benjamin',
    nom:'Jeannerot',
    date: today.toLocaleDateString('fr-FR'),
    titreH1: 'Ceci est mon site test express et Pug !',
    docTitle: 'TIIIIIITRE'
  });
})










// La méthode listen de l'objet app de type Express renvoie un objet
// de type http.Server...
const server = app.listen(8080, '127.0.0.1', () => {
  // console.log('server.address(): ', server.address());
  console.log(`Le serveur est démarré à l'adresse ${server.address().address}:${server.address().port}`);
});