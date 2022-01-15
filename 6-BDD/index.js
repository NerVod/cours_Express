import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'mon-site';

const collName = 'users';

// const client = MongoClient.connect();

app.set("view engine", "pug");

app.get('/mongo', (req, res) => {

    client.connect((err, client) => {
        if(err) {
            console.log(err)
        } else {
            const db = client.db(dbName);
            const collection = db.collection(collName);

            console.log('db : ', db.namespace[0]),
            console.log('collection : ', collection.namespace[1]),


            // collection.findOne({}, (err, result) => {
            //     if(err) {
            //         res.send(err);
            //     } else {
            //         const name = result.name;
            //         const age = result.age;
            //         const address = result.address;

            //         res.send (`Bonjour ${name} ! Vous avez ${age} ans et vous habitez la ville de ${address.City}`);
            //         console.log(res)

            //         client.close();
            //     };
            // })
            collection.find({}).toArray( (err, result) => {
                if(err) {
                    res.send(err);
                } else {
                    const donnees = result
                    console.log(donnees)
                    const user1 = donnees[0];
                    const user2 = donnees[1];
                    const user3 = donnees[2];
                    
                    res.render('index.pug', {
                        db: `${db}`,
                        collection: `${collection}`,
                        user1: `${user1}`,
                        user2: `${user2}`,
                        user3: `${user3}`
                    });
                    
                    client.close();
                };
                
            })
            
            

        }
    })
});


const server = app.listen(8080, 
    console.log('le serveur écoute sur le port 8080 pour l\'exo mongoDb')
    );