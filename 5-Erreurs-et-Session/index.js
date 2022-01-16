import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import expressSession from 'express-session';
import sessionFileStore from 'session-file-store';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FileStore = sessionFileStore(expressSession);
const store = new FileStore({
    path: '/admin',
    ttl: 3600,
    retries:10,
    secret:'cadenas'
})

app.use(expressSession({
    store: store,
    secret: 'cadenas',
    resave: false,
    saveUninitialized:false,
}));

app.get('/admin/:requete', (req, res) => {
    console.log('req.session : ', req.session);
    console.log(`req.params : `, req.params)
    console.log(`req.query : `, req.query)

    req.session.message = `Plus de 20 tentatives : trop de connexions à la session`

    if(!req.session.counter) {
        req.session.counter = 1;
    } else {
        req.session.counter ++;
    };

    if(req.session.counter > 20) {
        req.session.counter = 0;
        res.send(req.session.message);
    }

    res.send(`Vous avez visité la page ${req.session.counter} fois !`)

})



app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/img", express.static(path.join(__dirname, "public/images")));
app.use('/', express.static(path.join(__dirname, "views/extends")));
app.use(express.urlencoded({extended: true}));





app.set("view engine", "pug");

app.get('/admin/:requete', (req, res) => {
    res.render('main.pug');
})
app.get('/contact', (req, res) => {
    res.render('contact.pug');
})
app.get('/blog', (req, res) => {
    res.render('blog.pug');
})
app.get('/form', (req, res) => {
    res.render('form.pug');
})
app.get('/traitForm', (req, res) => {
    res.render('traitForm.pug');
})
app.get('*', (req, res) => {
    res.status(404).render('404.pug');
})


app.post("/form", (req, res) => {
    console.log("req.body : ", req.body);
    res.render("traitForm.pug", {
      prenom: `${req.body["votre-prenom"]}`,
      nom: `${req.body["votre-nom"]}`,
    }); 
});

app.listen(8080),
console.log('Le serveur écoute sur le port 8080 pour la série erreurs et sessions');