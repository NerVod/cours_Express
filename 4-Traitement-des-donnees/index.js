import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/img", express.static(path.join(__dirname, "public/images")));
app.use("/", express.static(path.join(__dirname, "views/extends")));

app.use(express.urlencoded({extended: true}));

app.set("view engine", "pug");
app.get('/recherche', (req, res) => {

 
  if('accueil' == req.query.a) {
    console.log(req.query.a)
    res.render('main.pug');
  } else if ('blog' == req.query.b) {
    console.log(req.query.b)
    res.render('blog.pug');
  } else if ('contact' == req.query.c) {
    console.log(req.query.c)
    res.render('contact.pug')
  } else {
    res.render('404.pug')
  }
})

let param1 = '';
let param2 = '';
  
app.get('/:info1', (req, res) => {

param1 = req.params.info1

console.log(param1);
if('accueil' == param1){
  res.render('main.pug')
} else if ( 'contact' == param1) {
  res.render('contact.pug')
} else if ( 'blog' == param1) {
  res.render('blog.pug')
} else if ( 'form' == param1) {
  res.render('form.pug')
} else {
  res.render('404.pug')
}
});

app.post("/form", (req, res) => {
  console.log("req.body : ", req.body);
  res.render("traitForm.pug", {
    prenom: `${req.body["votre-prenom"]}`,
    nom: `${req.body["votre-nom"]}`,
  });
});


  









app.listen(
  8080,
  console.log("Le serveur écoute sur le port 8080 dans la série d'exo 4")
);
