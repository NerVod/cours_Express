import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "image")));
app.use(express.static(path.join(__dirname, "imageBis")));
app.use(express.static(path.join(__dirname, "ressource")))

app.get("/", (req, res) => {
  res.send(`<img src="chat.png" alt="un chat"/>`);
});

app.get("/image", (req, res) => {
  res.send(`<img src="dromadaire.jpg" alt="un dromadaire" />`);
});

app.get("/fin", (req, res) => {
  res.send(`The End is NEAR !!!`);
});

app.get("/lama", (req, res) => {
    res.sendFile('index.html', 
        {
            root : './ressource'
        }
    )
});

app.get("pageAccueil", (req,res) => {
    res.sendFile('index.html',
        {
            root:'./ressource'
        }
    )
});
app.get("Blog", (req,res) => {
    res.sendFile('blog.html',
        {
            root:'./ressource'
        }
    )
});
app.get("contact", (req,res) => {
    res.sendFile('contact.html',
        {
            root:'./ressource'
        }
    )
});



app.listen(8080, console.log("le serveur écoute sur le port 8080"));
