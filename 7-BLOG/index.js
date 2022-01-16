import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const url = 'mongodb+srv://Benjamin:fpQH9Skw4tRlYoyB@cluster0.aykvr.mongodb.net/test?authSource=admin&replicaSet=atlas-baj87g-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "blog";
const collArticle = "articles";
const collUtilisateurs = "utilisateurs";
const collCommentaires = "commentaires";

app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/img", express.static(path.join(__dirname, "public/images")));
app.use("/", express.static(path.join(__dirname, "views")));
app.use(express.urlencoded({ exteded: true }));

// définition de l'affichage des pages html par les fichiers PUG
app.set("view engine", "pug");

// gestion des routes du site
app.get("/accueil", (req, res) => {
  res.render("blog.pug");
});
app.get("/admin", (req, res) => {
  res.render("admin.pug");
});
app.get("*", (req, res) => {
  res.status(404).render("404.pug");
});

// vérification des identifians dans la bdd

// app.use("/", (req, res, next) => {
//     client.connect((err, client) => {
//         if (err) {
//           console.log("Erreur d'accès à la base de données");
//         } else {
//           console.log("connecté à MongoDB par le app.use");

//           const db = client.db(dbName)
//           const utilisateur = db.collection(collUtilisateurs);
//         //   console.log(utilisateur)

//           utilisateur.find({}).toArray((err, data) => {
//               if(err) {
//                   console.log('erreur dans app.use pour trouver la collection : utilisateur', err)
//               } else {
//                   const users = data;
//                   console.log('la badd utilisateurs trouvée :', users);

//               }
//           })


//           client.close();
//           next()
//         }
//       });
// });

// connexion à la base de données
app.get("/", (req, res) => {
  client.connect((err, client) => {
    if (err) {
      console.log("Erreur d'accès à la base de données");
    } else {
      console.log("connecté à MongoDB par le get");
      // const articles = client.db(articles);

      client.close();
    }
  });
});

// récupération des identifiants de connecxion du client
app.post("/admin", (req, res) => {
  console.log("req.body : ", req.body);

  client.connect((err, client) => {
    if (err) {
      console.log("Erreur d'accès à la base de données");
    } else {
      console.log("connecté à MongoDB par le app.use");

      const db = client.db(dbName)
      const utilisateur = db.collection(collUtilisateurs);
    //   console.log(utilisateur)

      utilisateur.find({}).toArray((err, data) => {
          if(err) {
              console.log('erreur dans app.use pour trouver la collection : utilisateur', err)
          } else {
              const users = data;
              console.log('la badd utilisateurs trouvée :', users);

          }
      })


      client.close();
      
    }
  });















  let user= req.body["votre-prenom"];
  let password = req.body["votre-password"];
  console.log('nom utilisateur :', user,' password :', password)

  res.render("identifiants.pug", {
    user: `${req.body["votre-prenom"]}`,
    password: `${req.body["votre-password"]}`,
  });
});

const server = app.listen(
  8080,
  console.log("Le serveur écoute sur le port 8080 pour le BLOG")
);
