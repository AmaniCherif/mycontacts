# Projet fil rouge – MyContacts

## Objectif

Développer une application web fullstack JavaScript (React + Node/Express + MongoDB) permettant à chaque utilisateur de gérer son carnet de contacts personnel.  

L’application est sécurisée par une authentification JWT et offre un CRUD complet sur les contacts.


## Fonctionnalités

### Authentification

- **Inscription** : POST `/auth/register`  
  - Paramètres : `name`, `email` (unique), `password`  
  - Mot de passe hashé avec **bcrypt**.
- **Connexion** : POST `/auth/login`  
  - Renvoie un **token JWT**.
- Middleware JWT : protège toutes les routes `/contacts`.

### Gestion des contacts

- **Modèle Contact** :
  - `firstName` (obligatoire)  
  - `lastName` (obligatoire)  
  - `phone` (obligatoire, 10–20 caractères recommandé)
- **CRUD complet** :
  - GET `/contacts` : récupère tous les contacts de l’utilisateur connecté.
  - POST `/contacts` : ajoute un contact.
  - PATCH `/contacts/:id` : met à jour partiellement un contact.
  - DELETE `/contacts/:id` : supprime un contact.
- **Bonus frontend** :  
  - Barre de recherche  
  - Design moderne avec **MUI**  
  - Inline edit des contacts

## Frontend (React)

### Pages

- **Login** : connexion via API backend, stockage JWT.
- **Register** : inscription, redirection vers login après succès.
- **Contacts** :  
  - Affichage des contacts en **cards responsives**  
  - Ajouter, modifier et supprimer des contacts  
  - Barre de recherche pour filtrer les contacts

### Librairies utilisées

- `react`, `react-router-dom`  
- `axios` pour les appels API  
- `@mui/material` pour le design moderne  

##  Sécurité

- **Hash des mots de passe** avec bcrypt côté backend.  
- **JWT obligatoire** pour toutes les routes `/contacts`.  
- CORS activé sur le backend pour le frontend.

## Qualité & Documentation

- Organisation backend en **architecture MVC**.  
- Documentation API possible via **Swagger**.  
- Tests unitaires sur `/auth` et `/contacts` recommandés.


## Installation

### Backend + frontend

```bash
cd backend
npm install
npm run dev

L’API est disponible sur http://localhost:5000/

cd frontend
npm install
npm start

Le frontend est disponible sur http://localhost:3000/


 #### Endpoints principaux

| Méthode | Endpoint       | Description                 |
| ------- | -------------- | --------------------------- |
| POST    | /auth/register | Inscription                 |
| POST    | /auth/login    | Connexion                   |
| GET     | /contacts      | Récupérer tous les contacts |
| POST    | /contacts      | Ajouter un contact          |
| PATCH   | /contacts/:id  | Modifier un contact         |
| DELETE  | /contacts/:id  | Supprimer un contact        |

##### Déploiement

Backend : Render.
Frontend : Netlify.

###### Tests

Tests unitaires pour /auth : vérifier inscription et login.

Tests unitaires pour /contacts : vérifier CRUD et sécurité JWT

