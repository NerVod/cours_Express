import express from 'express';
import { MongoClient } from 'mongodb'

const app = express();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'mon-site';

const collName = 'users';

// const client = MongoClient.connect();


app.get('/mongo', (req, res) => {

    client((err, client) => {
        if(err) {
            console.log(err)
        } else {
            const db = client.db(dbName);
            const collection = db.collection(collName);

            collection.findOne({}, (err, result) => {
                if(err) {
                    res.send(err);
                } else {
                    const name = result.name;
                    const age = result.age;
                    const address = result.address;

                    res.send (`Bonjour ${name} ! Vous avez ${age} ans et vous habitez la ville de ${address.city}`);

                    client.close();
                };
            })

        }
    })
});


const server = app.listen(8080, 
    console.log('le serveur écoute sur le port 8080 pour l\'exo mongoDb')
    );