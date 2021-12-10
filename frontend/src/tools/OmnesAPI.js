import axios from 'axios';

const API_URL = "http://localhost:8080/api/summoner";



/** OMNES API Handler
Contains differents method to call endpoints
*/
export default class OmnesAPI {


    /**Fetch Summoner By Name, from the LOL API
     * @param  {string} name, the name of the summoner
     */
    fetchSummoners(){
        const URL = `${API_URL}/summoners`;
        return axios
        .get(URL);
    }

    fetchSummoner(summonerName){
        const URL=`${API_URL}/by-name/${summonerName}`
        return axios
        .get(URL);
    }

    postSummoner(summoner){
        const URL = `${API_URL}/`;
        return axios
        .post(URL, summoner);
    }

    updateSummoner(id, s){
        const URL = `${API_URL}/update/by-id/${id}/`;
        return axios
        .put(URL, s);
    }

    deleteSummoner(id){
        const URL = `${API_URL}/delete/by-id/${id}`;
        return axios
        .delete(URL);
    }

}