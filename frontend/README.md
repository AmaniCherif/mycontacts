<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
Version : 1.0.0

Stack : Node.js, Express, MongoDB Atlas, JWT, Swagger

- Description :

MyContacts est une API backend pour gérer des utilisateurs avec authentification.
Fonctionnalités principales :

-Inscription (/auth/register)

-Connexion (/auth/login)

-Accès à une route protégée (/protected) avec JWT

-Documentation Swagger accessible via /api-docs

-Cette API peut servir de base pour un projet de gestion de contacts ou comme exercice de backend complet avec Node.js et MongoDB.

- Installation :

Clone le projet :

git clone <ton-repo-url>

cd mycontacts/backend

Installer les dépendances :

npm install


- Créer un fichier .env à la racine du backend et ajouter :

PORT=5000

MONGO_URI=<ton-mongodb-atlas-connection-string>

JWT_SECRET=supersecretkey


- Remplace <ton-mongodb-atlas-connection-string> par l’URI de ton cluster MongoDB Atlas.

- Lancer le serveur

npm run dev

Le serveur tourne sur : http://localhost:5000

Swagger : http://localhost:5000/api-docs

Routes API

- Méthode	Route	Description

POST	/auth/register	Créer un nouvel utilisateur

POST	/auth/login	Se connecter et obtenir un token

GET	/protected	Accès à une route protégée (JWT)


Exemple JSON pour /auth/register et /auth/login

{
  "email": "user@example.com",
  "password": "password123"
}

Exemple de réponse JWT

{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": "650b9f3e9b2c7a0012345678",
    "email": "user@example.com"
  }
}

- Tester l’API avec curl :

Créer un utilisateur :

curl -X POST http://localhost:5000/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"user@example.com","password":"password123"}'


- Se connecter :

curl -X POST http://localhost:5000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"user@example.com","password":"password123"}'


- Accéder à la route protégée :

curl -X GET http://localhost:5000/protected \
-H "x-auth-token: <ton-token-JWT>"

- Technologies utilisées :

Node.js

Express

MongoDB Atlas

Mongoose

JWT pour l’authentification

Bcrypt pour le hash des mots de passe

Swagger pour la documentation de l’API
>>>>>>> 7928605608e7c3cf99c13e734ce8ef6da8a8b703
