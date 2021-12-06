import axios from 'axios';

const API_URL = "http://localhost:8080";

/* ENDPOINTS */
const API_SUMMONER = "api/summoners";
const API_PUT_SUMMONER = "api/summoner";
const API_DEL_SUMMONER = "api/delete/summoner";

/** OMNES API Handler
Contains differents method to call endpoints
*/
export default class OmnesAPI {


    /**Fetch Summoner By Name, from the LOL API
     * @param  {string} name, the name of the summoner
     */
    fetchSummoners(){
        const URL = `${API_URL}/${API_SUMMONER}/`;
        return axios
        .get(URL);
    }

    postSummoner(summoner){
        const URL = `${API_URL}/${API_PUT_SUMMONER}/`;
        return axios
        .post(URL, summoner);
    }

    deleteSummoner(id){
        const URL = `${API_URL}/${API_DEL_SUMMONER}/${id}`;
        return axios
        .delete(URL);
    }

}