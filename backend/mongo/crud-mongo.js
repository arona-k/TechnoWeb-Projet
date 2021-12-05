var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'leaderboard';

exports.findSummoners = async () => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let summoners;
		summoners = await db.collection('summoner')
			.find({})
			.toArray();

		reponse = {
			success: true,
			msg: "summoners recherchés avec succès",
			data: summoners,
		}
	} catch (err) {
		reponse = {
			success: false,
			error: err,
			msg: "erreur lors du find"
		};
	} finally {
		client.close();
		return reponse;
	}
}

exports.findSummonerById = async (id) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let myquery = { "_id": ObjectId(id) };

		let data = await db.collection("summoner").findOne(myquery);

		reponse = {
			succes: true,
			summoner: data,
			error: null,
			msg: "Details du summoner envoyé"
		};
	} catch (err) {
		reponse = {
			succes: false,
			summoner: null,
			error: err,
			msg: "erreur lors du find"
		};
	} finally {
		client.close();
		return reponse;
	}
}

exports.createSummoner = async (formData) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let toInsert = {
			name: formData.name,
			level: formData.lvl,
            rank: formData.rank,
            school: formData.school,
		};
		await db.collection("summoner").insertOne(toInsert);
		reponse = {
			succes: true,
			result: toInsert._id,
			msg: "Ajout réussi " + toInsert._id
		};
	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "erreur lors du insert"
		};
	} finally {
		client.close();
		return reponse;
	}
}

exports.updateSummoner = async (id, formData) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let myquery = { "_id": ObjectId(id) };
		let newvalues = {
			$set: {
				name: formData.name,
                level: formData.lvl,
                rank: formData.rank,
                school: formData.school,
			}
		};
		let result = await db.collection("summoner").updateOne(myquery, newvalues);

		reponse = {
			succes: true,
			result: result,
			error: null,
			msg: "Modification réussie " + result
		};
	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "Problème à la modification"
		};
	} finally {
		client.close();
		return reponse;
	}

}

exports.deleteSummoner = async function (id) {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let myquery = { "_id": ObjectId(id) };
		let result = await db.collection("summoner")
			.deleteOne(myquery);
		reponse = {
			succes: true,
			result: result,
			error: null,
			msg: "Suppression réussie " + result
		};

	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "Problème à la suppression"
		};
	} finally {
		client.close();
		return reponse;
	}
}