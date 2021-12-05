const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = require('http').Server(app);

const mongoDBModule = require('./mongo/crud-mongo');

const bodyParser = require('body-parser');
let multer = require('multer');
let multerData = multer();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

	next();
});

server.listen(port);
console.log("Serveur lancé sur le port : " + port);

mongoDBModule.populateCollectionWithMockDataIfEmpty()
    .then((response) => console.log(response));


// Récupération des summoners
app.get('/api/summoners', (req, res) => {

	mongoDBModule.findSummoners()
		.then(data => {
			res.send(JSON.stringify(data));
		});
});

// Récupération d'un seul summoner par son id
app.get('/api/summoner/:id', (req, res) => {
	let id = req.params.id;

	mongoDBModule.findSummonerById(id)
		.then(data => {
			res.send(JSON.stringify(data));
		});
});

// Creation d'un summoner par envoi d'un formulaire
app.post('/api/summoner', multerData.fields([]), (req, res) => {

	mongoDBModule.createSummoner(req.body)
		.then(data => {
			res.send(JSON.stringify(data));
		});
});

// Modification d'un summoner
app.put('/api/update/summoner/:id', multerData.fields([]), (req, res) => {
	let id = req.params.id;

	mongoDBModule.updateSummoner(id, req.body)
		.then(data => {
			res.send(JSON.stringify(data));
		});
});

// Suppression d'un summoner
app.delete('/api/delete/summoner/:id', (req, res) => {
	let id = req.params.id;

	mongoDBModule.deleteSummoner(id)
		.then(data => {
			res.send(JSON.stringify(data));
		});
})

