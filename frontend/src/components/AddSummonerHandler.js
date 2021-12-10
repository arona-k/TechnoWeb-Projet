import React from 'react';


import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';


import SummonerForm from './SummonerForm';

import RiotAPI from '../tools/RiotAPI';
import OmnesAPI from '../tools/OmnesAPI';



/*
    Component that handles differents components which needs to be rendered on the SummonerPage
*/
export default class SummonerHandler extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            error: false,
            posted: false,
            fetchedLOL: false,
            fetchedLEAGUE: false,
            invalidInput: false,
            name: props.summonerName,
            accountLOL: [],
            league: [],

        };  
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.fetchaccountLOL();
    }

    /*
    Fetch and account by its Summoner Name
    Update the state to render different components
    */

    fetchaccountLOL(){

        let api = new RiotAPI();
        api.fetchSummonerByName(this.state.name)
        .then((response) => {
            this.setState({
                accountLOL: response.data,
                fetchedLOL: true
            });

            this.fetchLeagueLOL();
        })
        .catch((error) => {
            this.setState({
                error: true,
                fetchedLOL: true,
            });
            console.log(error);
        });
    }

    fetchLeagueLOL(){

        let api = new RiotAPI();
        api.fetchLeague(this.state.accountLOL.id)
        .then((response) => {
            this.setState({
                league: response.data,
                fetchedLEAGUE: true,
            });
        })
        .catch((error) => {
            this.setState({
                error: true,
                fetchedLEAGUE: true,
            })
            console.log(error);
        });

    }

    getLeagueRank(){
        let league = this.state.league;
        let index = null;
        for( let i = 0; i < league.length; i++)
        {
            if (league[i].queueType === "RANKED_SOLO_5x5"){
                index = i;
                break;
            }
        }
        if ( index === null)
            return null;
        let toReturn = league[index].tier + ' ' + league[index].rank;
        return toReturn;

    }

    postSummoner(summoner)
    {
        const api = new OmnesAPI();
        api.postSummoner(summoner)
        .then((response) => {
            this.setState({
                posted: true,
            })
        })
        .catch((error) => {
            this.setState({
                error: true,
            })
            console.log(error);
        });
    }


    handleSubmit( event ){
        event.preventDefault();
        const value = event.target.elements.school.value;

        if (value !== "Choisir son école"){
            const summoner = {
                summonerName: this.state.name,
                level: this.state.accountLOL.summonerLevel,
                rank: this.getLeagueRank(),
                school: value,
            }
    
           this.postSummoner(summoner);
        }

        else{
            this.setState({
                invalidInput: true,
            });
        }

    }

    leaderboardForm()
    {
        let account = this.state.accountLOL;
        const rank = this.getLeagueRank();
        return (
            <SummonerForm handleSubmit={this.handleSubmit} name={account.name} summonerLevel={account.summonerLevel} rank={rank} invalidInput={this.state.invalidInput} btnText="Ajouter"/>
        );
    }

    render(){
        //If we didn't get the data from the api, we render nothing until we do
        if( !this.state.fetchedLEAGUE ) 
            return null;

        if ( this.state.error )
            return <p>error</p>

        if ( this.state.posted )
            return <Container><Alert style={{marginTop: "1em", borderRadius: "25px", textAlign: "center"}} variant="success">Invocateur Ajouté !</Alert></Container>
        return this.leaderboardForm();
    }
}