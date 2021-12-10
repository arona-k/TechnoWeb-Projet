import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import RiotAPI  from '../tools/RiotAPI';
import OmnesAPI from '../tools/OmnesAPI';
import SummonerLeague from './SummonerLeague';
import SummonerMastery from './SummonerMastery';
import SummonerButton from './SummonerButton';
import champion_list from '../jsons/champion.json';

const PROFILE_ICON_URL = 'http://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon';
const SPLASH_ART_URL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash';
const CHAMP_SQUARE_ASSET_URL = "http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion";
/*
This component is used to render a brief of the summoner, for each game:
TFT and LOL
*/
export default class SummonerBrief extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            game: props.game,
            fetchedLEAGUE: false,
            fetchedTFT: false,
            fetchedMASTERY: false,
            account: props.account,
            isInLeaderboard: false,
            league:     [],
            mastery:    [],
        }
    }

   componentDidMount(){
    if( this.state.game === "lol"){
        this.setLeagueLOL();
        this.setMastery();
        this.isInLeaderboard(this.state.account['name']);
    }
    else
        this.setLeagueTFT();
   }

    setLeagueLOL(){

        let api = new RiotAPI();
        api.fetchLeague(this.state.account.id)
        .then((response) => {
            this.setState({
                fetchedLEAGUE: true,
                league: response.data
            });

        })
        .catch((error) => {
            console.log(error);
        });

    }

    setLeagueTFT(){

        let api = new RiotAPI();
        api.fetchLeagueTFT(this.state.account.id)
        .then((response) => {
            this.setState({
                fetchedTFT: true,
                league: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        });
        
    }

    setMastery(){

        let api = new RiotAPI();
        api.fetchMastery(this.state.account.id)
        .then((response) => {
            this.setState({
                fetchedMASTERY: true,
                mastery: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        });
        
    }

    isInLeaderboard(name){
        let api = new OmnesAPI();
        api.fetchSummoner(name)
        .then((response) => {
            if( response.data.summoner === null){
                this.setState({
                    isInLeaderboard: false,
                });
            }
            else{
            this.setState({
                isInLeaderboard: true,
                });
            }
        })
        .catch((error) => {
            this.setState({
                isInLeaderboard: false,
            });
            console.log(error);
        });
    }

    parseMasteryData()
    {
        const mastery = this.state.mastery;

        if (mastery.length !== 0)
        {
            const champion = mastery[0];
            const indexToFind = mastery[0]["championId"];

            const champion_data = champion_list.data;
            const champion_keys = Object.keys(champion_list.data);
            let key = 0;
           for( let i = 0; i < champion_keys.length; i++)
            {
                if ( champion_data[champion_keys[i]].key == indexToFind)
                {
                    key = champion_keys[i];
                    break;
                }
            }

            const champion_found = champion_data[key];
            let masteryData = {
                name: champion_found.name,
                imgFull: champion_found.image.full,
                masteryLevel: champion.championLevel,
                championPoints: champion.championPoints,
            }
            return masteryData; 
        }
        return null;
    }

    

    render(){

        //Si on n'a pas fetch la league lol et la league mastery on return null
        if( this.state.game === "lol")
        {
            if ( (!this.state.fetchedLEAGUE || !this.state.fetchedMASTERY ) )
            return null;
        }
        else
        {
            if ( !this.state.fetchedTFT )
                return null;
        }

        const summonerName = this.state.account["name"];
        const profileIcon = `${PROFILE_ICON_URL}/${this.state.account["profileIconId"]}.png`
        const leagues = this.state.league;
        let leagueTab = [];
        let leagueNames = [];

   
        
        //We display differents names according to the queueType
        let unranked = (leagues.length === 0)?<Tab eventKey={`league0`} key={`league0`} title={"UNRANKED"} > </Tab>:null;
                       
        for(let i = 0; i < leagues.length; i++)
        {
            let league = leagues[i];
            if( league.queueType === "RANKED_TFT_PAIRS"){
                continue;
            }     
            if (league.queueType === "RANKED_TFT_TURBO"){
                leagueNames.push("HYPER ROLL");
            }
            else if ( league.queueType === "RANKED_FLEX_SR" ){
                leagueNames.push("FLEX");
            }
            else if (league.queueType === "RANKED_TFT"){
                leagueNames.push("RANKED TFT");
            }
            else if (league.queueType === "RANKED_SOLO_5x5"){
                leagueNames.push("SOLO/DUO");
            }

            leagueTab.push( <SummonerLeague league={league}/> ); 
        }   

        const masteryData = this.parseMasteryData()
        let sumHeaderStyle = null;
        let masteryComponent = null;
        let btn = null;
        let masteryWidget = null;
        let containerStyle = "MLContainer restricted";


        if (masteryData !== null)
        {
            /*
                Pour qu'un nom de champion soit correct, il faut que tout les caractères soit minuscule sauf le premier,
                Qu'il n'y ait que des caractères alphanumérique
                Par exemple: Vel'Koz => Velkoz
            */
            const champName = masteryData.name;
            let champImgPath = champName.replace(/[^a-z0-9]/gmi, " ").replace(/\s+/g, "");
            //Gestion des exeptions:
            switch (champImgPath){
                case "VelKoz": champImgPath = "Velkoz"; break;
                case "KaiSa" : champImgPath = "KaiSa"; break;
                default:;
            }
            const imgUrl = `${SPLASH_ART_URL}/${champImgPath}_0.jpg`
            sumHeaderStyle = {
                backgroundImage: `url(${imgUrl})`,
                backgroundPosition: 'center',
            }
            let values = {
                mLevel : masteryData.masteryLevel,
                mIcon : `${CHAMP_SQUARE_ASSET_URL}/${champImgPath}.png`,
                mPoints : masteryData.championPoints.toLocaleString(),
            }
            

            masteryComponent = <SummonerMastery champName ={champName} mIcon={values.mIcon} mLevel={values.mLevel} mPoints={values.mPoints} />;

            const btnStyle = (this.state.isInLeaderboard)?"disabled":null;
            btn = (unranked != null)?null:<SummonerButton style={btnStyle} path={`/Ajouter/${summonerName}`} txt="Ajouter au Leaderboard"/>;
            containerStyle = "MLContainer";

            masteryWidget =<Col>
                            {masteryComponent}
                            {btn}
                            </Col>;
            
        }

        return(
            <div className="summonerBrief">
            <Container className="sumBriefContainer" style={sumHeaderStyle}>
                <Row>
                    <Col xs={2}><Image className="sumBriefImg" src={profileIcon} roundedCircle/></Col>
                    <Col className="mt-5 sumHeaderText">
                        <h1>{ summonerName }</h1>
                        <h3> Level {this.state.account["summonerLevel"]}</h3>
                        <hr></hr>
                    </Col>
                </Row>
            </Container>
            <Container className={containerStyle}>
                <Row className="align-items-center">
                    {masteryWidget}
                    <Col><Container className="sumBriefContainer">
                        <Tabs defaultActiveKey="league0" id="uncontrolled-tab-example" className="mb-3 tabLink" variant="pills">
                            {leagueTab.map((leagueData, index) => 
                                <Tab eventKey={`league${index}`} key={`league${index}`} title={leagueNames[index]} >
                                    {leagueData}
                                </Tab>
                            )}
                            {unranked}
                        </Tabs> 
                    </Container></Col>
                    
                </Row>
            </Container>
            </div>
        );
    }
}
