var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var dataJson = require('../json/data.json')


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

exports.findSummonerByName = async (summonerName) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let myquery = { "summonerName": summonerName };

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
			msg: "erreur lors du find" + myqery
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
			summonerName: formData.summonerName,
			level: formData.level,
            rank: formData.rank,
            school: formData.school,
		};
		await db.collection("summoner").insertOne(toInsert);
		reponse = {
			succes: true,
			result: toInsert,
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
	let response;

	try {
		let myquery = { "_id": ObjectId(id) };
		let newvalues = {
			$set: {
				name: formData.summonerName,
                level: formData.level,
                rank: formData.rank,
                school: formData.school,
			}
		};
		let result = await db.collection("summoner").updateOne(myquery, newvalues);

		response = {
			succes: true,
			result: result,
			error: null,
			msg: "Modification réussie " + result,
			test: formData,
		};
	} catch (err) {
		response = {
			succes: false,
			error: err,
			msg: "Problème à la modification"
		};
	} finally {
		client.close();
		return response;
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

exports.populateCollectionWithMockDataIfEmpty = async () => {
    let client = await MongoClient.connect(url, { useNewUrlParser: true });
    let db = client.db(dbName);
    let response;
    try {
        let summonersCount = await db.collection('summoner').countDocuments();
        if (summonersCount == 0) {
            for (let i = 0; i < dataJson.length; i++) {
                await db.collection("summoner").insertOne(dataJson[i])
            }
            response = {
                success: true,
                msg: "Mock Data ajoutée dans la collection",
            }
        }
        response = {
            success: true,
            msg: "Summoners déjà présents dans la collection",
        }
    } catch (err) {
        response = {
            success: false,
            msg: "erreur lors de l'ajout"
        };
    } finally {
        client.close();
        return response;
    }
}