# Organisation du blog

## Structuration de la base de données

- Nom de la base : un-blog
- Collections :
  - utilisateurs
  - articles
  - commentaires

### Utilisateurs

- pseudo
- mdp (mot de passe)
- niveau
- prenom
- nom
- rue
- cp (code postal)
- ville
- téléphone

Niveau : capacité de l'utilisateur sur le site sous la forme d'un nombre (1:administrateur, 5: rédacteur, 10: simple visiteur)

###  articles

- titre
- contenu
- date
- auteur (identifiant utilisateur)

### commentaires

- texte
- date
- article (identifiant article)
- auteur (identifiant utilisateur)