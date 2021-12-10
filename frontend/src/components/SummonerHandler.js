import React from 'react';
import RiotAPI from '../tools/RiotAPI';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import SummonerBrief from '../components/SummonerBrief';
import SummonerHistory from '../components/SummonerHistory';

/*
    Component that handles differents components which needs to be rendered on the SummonerPage
*/
export default class SummonerHandler extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            error: false,
            fetchedTFT: false,
            fetchedLOL: false,
            name: props.summonerName,
            accountLOL: [],
            accountTFT: [],
        };        
    }

    componentDidMount(){
        this.fetchaccountLOL();
        this.fetchaccountTFT();   
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
        })
        .catch((error) => {
            this.setState({
                error: true,
                fetchedLOL: true,
            });
            console.log(error);
        });
    }

    fetchaccountTFT(){

        let api = new RiotAPI();
        api.fetchTFTSummonerByName(this.state.name)
        .then((response) => {
            this.setState({
                accountTFT: response.data,
                fetchedTFT: true
            });
        })
        .catch((error) => {
            this.setState({
                error: true,
                fetchedTFT: true,
            });
            console.log(error);
        });
    }



    render(){
        //If we didn't get the data from the api, we render nothing until we do
        if( !this.state.fetchedTFT || !this.state.fetchedLOL ) 
            return null;

        if ( this.state.error )
            return <p>error</p>

        return (
            <div className="summonerWrapper">
                <Tabs defaultActiveKey="League of Legends" className="mb-3">
                    <Tab eventKey="League of Legends" title="League of Legends">
                        <SummonerBrief account={this.state.accountLOL} game={"lol"} /> 
                        <SummonerHistory puuid={this.state.accountLOL.puuid} game={"lol"}/>
                    </Tab>
                    <Tab eventKey="Teamfight Tactics" title="Teamfight Tactics">
                        <SummonerBrief account={this.state.accountTFT} game={"TFT"}/> 
                        <SummonerHistory puuid={this.state.accountTFT.puuid} game={"TFT"}/>
                    </Tab>
               </Tabs>
            </div>
        );
    }
}