import axios from 'axios';

const API_KEY = "RGAPI-67df3fb1-f27c-4aa1-ad3f-6b232faa9875";

const API_URL = "https://euw1.api.riotgames.com";
const API_MATCH_URL = "https://europe.api.riotgames.com";

/* ENDPOINTS */
const API_SUMMONER = "lol/summoner/v4/summoners";
const API_TFT_SUMMONER = "tft/summoner/v1/summoners";

const API_MATCH = "lol/match/v5/matches"
const API_TFT_MATCH = "tft/match/v1/matches"

const API_LEAGUE = "lol/league/v4/entries";
const API_TFT_LEAGUE = "tft/league/v1/entries";

const API_MASTERY = "lol/champion-mastery/v4/champion-masteries/by-summoner";

//Empty for now.. CORS disabled manually
const config = {
    headers:{
            }
  };

/** Riot API Handler
Contains differents method to call endpoints
*/
export default class RiotAPI {


    /**Fetch Summoner By Name, from the LOL API
     * @param  {string} name, the name of the summoner
     */
    fetchSummonerByName(name){
        const URL = `${API_URL}/${API_SUMMONER}/by-name/${name}?api_key=${API_KEY}`;
        return axios
        .get(URL, config);
    }

    /**Fetch Summoner By Name, from the TFT API
     * @param  {string} name, the name of the summoner
     */
    fetchTFTSummonerByName(name){
        const URL = `${API_URL}/${API_TFT_SUMMONER}/by-name/${name}?api_key=${API_KEY}`;
        return axios
        .get(URL, config);
    }

    /**Fetch LOL Matches History (an array that contains all the matches id associated to the puuid)
     * @param  {string} puuid, player universally unique identifier
     */
    fetchMatchesHistory(puuid){
        const URL = `${API_MATCH_URL}/${API_MATCH}/by-puuid/${puuid}/ids?start=0&count=8&api_key=${API_KEY}`;
        return axios
        .get(URL, config);

    }
    
    /**Fetch TFT Matches History (an array that contains all the matches id associated to the puuid)
     * @param  {string} puuid, player universally unique identifier
     */
    fetchMatchesTFTHistory(puuid){
        const URL = `${API_MATCH_URL}/${API_TFT_MATCH}/by-puuid/${puuid}/ids?start=0&count=8&api_key=${API_KEY}`;
        return axios
        .get(URL, config)

    }
    /**Fetch LOL league data associated to the param
     * @param  {string} encryptedSummonerId, the summoner encrypted summoner Id
     */
    fetchLeague(encryptedSummonerId){
        const URL = `${API_URL}/${API_LEAGUE}/by-summoner/${encryptedSummonerId}?api_key=${API_KEY}`;
        return axios
        .get(URL, config)

    }

    /**Fetch TFT league data associated to the param
     * @param  {string} encryptedSummonerId, the summoner encrypted summoner Id
     */
    fetchLeagueTFT(encryptedSummonerId){

        const URL = `${API_URL}/${API_TFT_LEAGUE}/by-summoner/${encryptedSummonerId}?api_key=${API_KEY}`;
        return axios
        .get(URL, config)

    }
 
    /**Fetch LOL match details associated to the param
     * @param  {} matchId, the match id
     */
    fetchMatch(matchId){
        const URL = `${API_MATCH_URL}/${API_MATCH}/${matchId}?api_key=${API_KEY}`;
        return axios
        .get(URL, config)
    }

    /**Fetch TFT match details associated to the param
     * @param  {} matchId, the match id
     */
    fetchMatchTFT(matchId){
        const URL = `${API_MATCH_URL}/${API_TFT_MATCH}/${matchId}?api_key=${API_KEY}`;
        return axios
        .get(URL, config)
    }

    fetchMastery(encryptedSummonerId){
        const URL = `${API_URL}/${API_MASTERY}/${encryptedSummonerId}?api_key=${API_KEY}`;
        return axios
        .get(URL, config)
    }
}