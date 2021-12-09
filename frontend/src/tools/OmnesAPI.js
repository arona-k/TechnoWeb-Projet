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

    postSummoner(summoner){
        const URL = `${API_URL}/`;
        return axios
        .post(URL, summoner);
    }

    deleteSummoner(id){
        const URL = `${API_URL}/${id}`;
        return axios
        .delete(URL);
    }

}