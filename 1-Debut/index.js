import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send(`Bienvenue sur la page d'exercices`);
})

app.get('/fin', (req, res) => {
    res.send(`The End is NEAR !!!`)
})




app.listen(8080,
    console.log ('le serveur écoute sur le port 8080')
    )