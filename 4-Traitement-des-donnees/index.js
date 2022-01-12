import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/img", express.static(path.join(__dirname, "public/images")));
app.use("/pug", express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");

app.get("/pug", (req, res) => {
  let pageDemandee = req.params;
  console.log("page demandée ", pageDemandee);
  let pageAffichee = "";

  if (accueil === pageDemandee) {
    pageAffichee = "main.pug";
  } else if (blog === pageDemandee) {
    pageAffichee = "blog.pug";
  } else if (contact === pageDemandee) {
    pageAffichee = "contact.pug";
  } else {
    pageAffichee = "404.pug";
  }

  res.render(pageAffichee);
});

app.listen(
  8080,
  console.log("Le serveur écoute sur le port 8080 dans la série d'exo 4")
);
