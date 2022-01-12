import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/html", express.static(path.join(__dirname, "public.html")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/img", express.static(path.join(__dirname, "public/images")));
app.use(
  "/lamaLegendaire",
  express.static(path.join(__dirname, "public/images/lamasticot.jpeg"))
);

// req.url.replace("/img", path.join(__dirname, "public/images"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index.pug", {
    titre: "Page principale",
    titreh1: "Titre de la page principale",
  });
});

app.get("/blog", (req, res) => {
  res.render("blog.pug");
});

app.get("/contact", (req, res) => {
  res.render("contact.pug");
});
app.get("/extend", (req, res) => {
  res.render("extend.pug");
});

app.listen(8080, console.log("Le serveur écoute sur le port 8080"));
