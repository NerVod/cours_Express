
let date = new Date();
let localDate = date.toLocaleDateString('fr-FR');

db.articles.insertMany([ 
    {
    titre: 'article 1 du blog',
    contenu: 'explicite le contenu du premier article',
    auteur: 'Geralt of Rivia',
    date: localDate,
    },
    {
    titre: 'article 2 du blog',
    contenu: 'explicite le contenu du deuxième article',
    auteur: 'Yennefer of Vengerberg',
    date: localDate,
    }
]);

db.utilisateurs.insertMany([
    {
        identifiant: 'Benjamin',
        password: 'allmighty',
        niveau: 1
    },
    {
        identifiant: 'C3PO',
        password: 'masterLuke',
        niveau: 2
    },
    {
        identifiant: 'Robert Robichet',
        password: 'Gardiendelapaix',
        niveau: 3
    }
]);

db.commentaires.insertMany([
    {
        contenu: 'Premier commentaire du patron de blog pour expliquer les règles',
        auteur: 'Benjamin',
        idArticle: 1
    },
    {
        contenu: 'Le contenu du premier commentaire client avec tout plein de détails sur ce qu\'il a à dire',
        auteur: 'Robert Robichet',
        idArticle: 2
    }
]);