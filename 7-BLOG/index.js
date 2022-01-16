import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const url = 'mongodb+srv://Benjamin:fpQH9Skw4tRlYoyB@cluster0.aykvr.mongodb.net/test?authSource=admin&replicaSet=atlas-baj87g-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const url ='mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'blog';
const collArticle = 'articles';
const collUtilisateurs = 'utilisateurs';
const collCommentaires = 'commentaires';

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use('/', express.static(path.join(__dirname, 'views')));

app.set("view engine", "pug");

app.get('/accueil', (req, res) => {
    res.render('blog.pug')
})
app.get('/admin', (req, res) => {
    res.render('admin.pug')
})
app.get('/*', (req, res) => {
    res.status(404).render('404.pug')
})

app.get('/', (req, res) => {

    // client.connect((err, client) => {
    //     if(err){
    //         console.log('Erreur d\'accès à la base de données')
    //     } else {
    //         console.log("connécté à MongoDB")
    //         // const articles = client.db(articles);
    //         client.close()

    //     }
    // })

});



const server = app.listen(8080, 
    console.log('Le serveur écoute sur le port 8080 pour le BLOG')
    )
    