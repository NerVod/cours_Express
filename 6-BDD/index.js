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


app.set("view engine", "pug");


app.get('/mongo', (req, res) => {

    client.connect((err, client) => {
        if(err){
            console.log('Erreur d\'accès à la base de données')
        } else {

            const db = client.db(dbName);
            console.log(db);
            const collection = db.collection(collName);
            console.log(collection) 
            

            collection.find({}).toArray((err, data) => {
                if(err) {
                    console.log('erreur pour trouver la collection : ' ,err)
                } else {
                    // res.send(data);

                    const user1= data[0];
                    console.log('user 1 :',user1["name"],user1["address"]["ZipCode"], user1["address"]["City"], user1["age"]);
                    const user2= data[1];
                    console.log('user 2 :',user2)
                    const user3= data[2];
                    console.log('user 3 :',user3)

                   res.render('index.pug', {
                            user1Name: user1["name"],
                            user1City: user1["address"]["City"],
                            user1ZipCode: user1["address"]["ZipCode"],
                            user1Age: user1["age"],
                            user2Name: user2["name"],
                            user2City: user2["address"]["City"],
                            user2ZipCode: user2["address"]["ZipCode"],
                            user2Age: user2["age"],
                            user3Name: user3["name"],
                            user3City: user3["address"]["City"],
                            user3ZipCode: user3["address"]["ZipCode"],
                            user3Age: user3["age"],
                            
                            db: db.namespace,
                            collection: collection.collectionName
                        })


                    client.close();
                }
            })


            // res.render('index.pug', {
            //     db: db.namespace,
            //     collection: collection.collectionName
            // })



        }
    })

});

   

const server = app.listen(8080, 
    console.log('le serveur écoute sur le port 8080 pour l\'exo mongoDb')
    );