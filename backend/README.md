# OMNES Legends - Backend

**Arona KA - Julien FROIS - Emilie CHEN**

Module MongoDB et Express API pour supporter le site OMNES Legends

## Installation

Installer MongoDB Community (et MongoDB Compass pour monitor la base de donnée)
Installer tous les modules

> `npm install`

Lancer le serveurCRUD

> `node .\ServeurCrud.js`

## Documentation
L'API permet plusieurs de récupérer, ajouter, supprimer et modifier des utilisateurs de la base de donnée.

URL par défaut de l'API:
>`localhost:8080`

Format du summoner:
> exampleSummoner = {  
&nbsp;&nbsp; summonerName: `string`  
&nbsp;&nbsp; level: `string`  
&nbsp;&nbsp; rank: `string`  
&nbsp;&nbsp; school: `string`  
}

### End Points
GET `/api/summoners/`, la liste de tout les summoners inscrits
GET `/api/summoner/:id`, un summoner via son id
POST `/api/summoner/`, ajoute un summoner à la DB
PUT `/api/update/summoner/:id`, modifie un summoner de la DB
DEL `/api/update/summoner/:id`, supprime un summoner de la DB

