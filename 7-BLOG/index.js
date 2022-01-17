"use strict";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FileStore = sessionFileStore(expressSession);

const Store = new FileStore({
  path: "./session",
  ttl: 3600,
  retries: 10,
  secret: "secret du fileStore",
});

app.use(
  expressSession({
    store: Store,
    secret: "secret de session",
    resave: false,
    saveUninitialized: false,
  })
);

const url =
  "mongodb+srv://Benjamin:fpQH9Skw4tRlYoyB@cluster0.aykvr.mongodb.net/test?authSource=admin&replicaSet=atlas-baj87g-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
// const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "blog";
const collUtilisateurs = "utilisateurs";
const collArticle = "articles";
const collCommentaires = "commentaires";
let user;
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/img", express.static(path.join(__dirname, "public/images")));
app.use("/", express.static(path.join(__dirname, "views")));
app.use(express.urlencoded({ exteded: true }));

// définition de l'affichage des pages html par les fichiers PUG
app.set("view engine", "pug");

// gestion des routes du site
app.get("/accueil", (req, res) => {
  
  console.log("req.session dans app.get route accueil : ", req.session);
  console.log("user dans app.get route accueil ", user);
  // if (
  //   req.session["name"] == user["identifiant"] &&
  //   req.session["password"] == user["password"]) {

  //   res.render("blog.pug");

  // } else {
  //   console.log("problème verif req.session et user ");
  //   res.render("admin.pug");
  // }
  if(req.sessionID) {
    res.render("blog.pug");

  }
});
app.get("/admin", (req, res) => {
  res.render("admin.pug");
});
app.get("*", (req, res) => {
  res.status(404).render("404.pug");
});

// récupération des identifiants de connexion du client
app.post("/admin", (req, res) => {
  console.log("req.body : ", req.body);

  client.connect((err, client) => {
    if (err) {
      console.log("Erreur d'accès à la base de données");
    } else {
      console.log("connecté à MongoDB par le app.use");

      const db = client.db(dbName);
      const utilisateur = db.collection(collUtilisateurs);

      utilisateur.findOne(
        { utilisateur: req.session["name"] },
        function (err, result) {
          if (err) {
            console.log("erreur de findOne :", err);
            res.render("admin.pug");
          } else {
            req.session[req.sessionID] = {
              name: req.body["votre-prenom"],
              password: req.body["votre-password"],
            };
            console.log("result : ", result);
            user = result;
          }
          // client.close()
        }
      );
      utilisateur.updateOne(
        {
          utilisateur: req.body["votre-prenom"],
        },
        {
          $set: { tokenSession: req.sessionID },
        },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("Update réussie ! ", result);
          }
          client.close();
        }
      );
    }
  });
});

//   console.log(utilisateur)

// utilisateur.find({}).toArray((err, data) => {
//   if (err) {
//     console.log(
//       "erreur dans app.use pour trouver la collection : utilisateur",
//       err
//     );
//   } else {
//     const users = data;
//     const userName = users[0]["identifiant"];
//     console.log("identifiant : ", userName);
//     const userPassword = users[0]["password"];
//     console.log("password : ", userPassword);
//     console.log("la bdd utilisateurs trouvée :", users);
//     console.log("req.session : ", req.session);

//     // test équivalence session vs bdd
//     function VerifDroitAcces() {
//       for (let i = 0; i < users.length; i++) {
//         if (
//           users[i]["identifiant"] == userName &&
//           users[i]["password"] == userPassword
//         ) {
//           console.log("authentification réussie avec la BDD ");
// req.session[userName] = {
//   name: userName,
//   password: userPassword,
// };
//           res.render('blog.pug');
//         } else {
//           console.log(
//             "log userName identifiant comparé :",
//             users[i]["identifiant"]
//           );
//           console.log("userName saisi dans formulaire : ", userName);
//           console.log(
//             "log userPassword identifiant comparé :",
//             users[i]["password"]
//           );
//           console.log(
//             "userPassword saisi dans formulaire : ",
//             userPassword
//           );
//           console.log("Mot de passe erroné , veuillez saisir à nouveau");

//           i++;
//         }
//       }
//     }
//     VerifDroitAcces();
//   }
//   client.close();
// });

// }

// let user = req.body["votre-prenom"];
// let password = req.body["votre-password"];
// console.log("nom utilisateur :", user, " password :", password);

// res.render("identifiants.pug", {
//   user: `${req.body["votre-prenom"]}`,
//   password: `${req.body["votre-password"]}`,
// });
// });

const server = app.listen(
  8080,
  console.log("Le serveur écoute sur le port 8080 pour le BLOG")
);
