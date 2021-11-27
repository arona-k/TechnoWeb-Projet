import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

import renderItemSet from './ItemSet';
import React from 'react';
import RiotAPI from '../tools/RiotAPI';

import summonerSpells from '../jsons/summonerspells.json';
import Accordion from 'react-bootstrap/Accordion';
import SummonerDamageChart from './SummonerDamageChart';

//URLS
const CHAMP_SQUARE_ASSET_URL = "http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion";
const SUMM_SPELL_ASSET_URL = "http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell";

export default class HistoryRow extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            fetched: false,
            game: props.game,
            match_id: props.match_id,
            puuid: props.puuid,
            match: [],
        }
    }

    componentDidMount()
    {
        if (this.state.game === "lol")
            this.fetchMatch();
        else
            this.fetchMatchTFT();
    }

    fetchMatch()
    {
        let api = new RiotAPI();
        api.fetchMatch(this.state.match_id)
        .then((response) => {
            this.setState({
                match: response.data.info,
                fetched: true
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    fetchMatchTFT()
    {
        let api = new RiotAPI();
        api.fetchMatchTFT(this.state.match_id)
        .then((response) => {
            this.setState({
                match: response.data.info,
                fetched: true
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getSummonerSpell( summonerSpellID )
    {
        const data = summonerSpells.data;
        let keys = Object.keys(data);
        let spellIndex = 0;
        for(let i=0; i < keys.length; i++)
        {
            if (data[keys[i]].key == summonerSpellID)
            {
                spellIndex = i;
                break;
            }
        }
        return `${keys[spellIndex]}.png`;

    }


    getParticipantId()
    {
        let participantId = null;
        const participants = this.state.match.participants
        for (let i = 0; i < participants.length; i++)
        {
            if ( participants[i].puuid === this.state.puuid )
            {
                participantId = i;
                break;
            }
        }

        return participantId;
    }

    getItems(participant)
    {
        let items = [];
        for(let i = 0; i < 6; i++)
        {
            items.push(participant[`item${i}`]);
        }

        return items;
    }

    calculateKP(participants, win)
    {
        let totalKills = 0;
        for(let i = 0; i < participants.length; i++ )
        {
            if ( participants[i]["win"] === win) 
            {
                totalKills += participants[i]["kills"];
            }
        }

        return totalKills;
    }

    renderLOLRow()
    {
        const match = this.state.match;
        const participantId = this.getParticipantId();
        const participant = match.participants[ participantId ];
        const items = this.getItems(participant);

        const historyContainer = participant["win"]?"historyContainer victory":"historyContainer defeat";

        const champIcon = `${CHAMP_SQUARE_ASSET_URL}/${participant["championName"]}.png`;
        const summonerSpell1 = `${SUMM_SPELL_ASSET_URL}/${this.getSummonerSpell(participant["summoner1Id"])}`;
        const summonerSpell2 = `${SUMM_SPELL_ASSET_URL}/${this.getSummonerSpell(participant["summoner2Id"])}`;
        const KDA = `${participant["kills"]}/${participant["deaths"]}/${participant["assists"]}`;
        const minionsKilled = participant["totalMinionsKilled"];

        const KPraw = ((participant["kills"] + participant["assists"])/this.calculateKP(match.participants, participant["win"]))*100;
        const KP = `${Number(KPraw).toFixed(0)}`;
        
        console.log(participant);


        return(
            <div className={historyContainer}>
            <Accordion.Header>
                <Row>
                    <Col xs={2}>
                        <Row>
                            <Image className="historyChampIcon" src={champIcon}/> 
                        </Row>
                        <Container className="d-flex p-2" >
                            <Image className="historySummonerSpell" src={summonerSpell1}/>
                            <Image className="historySummonerSpell mx-1" src={summonerSpell2}/>
                        </Container>
                    </Col>

                    <Col>
                        <Container className="d-flex flex-column">
                            <h3>{KDA}</h3>
                            <h5>{minionsKilled} CS - {KP}%kp</h5>
                        </Container>
                    </Col>

                    <Col>
                        {renderItemSet(items)}
                    </Col>
                </Row>
            </Accordion.Header>
            <Accordion.Body>
                <SummonerDamageChart
                    total={participant["totalDamageDealt"]}
                    tC={participant["totalDamageDealtToChampions"]}
                    taken={participant["totalDamageTaken"]}

                    pTotal={participant["physicalDamageDealt"]}
                    ptC={participant["physicalDamageDealtToChampions"]}
                    pTaken={participant["physicalDamageTaken"]}

                    mTotal={participant["magicDamageDealt"]}
                    mtC={participant["magicDamageDealtToChampions"]}
                    mTaken={participant["magicDamageTaken"]}

                    tTotal={participant["trueDamageDealt"]}
                    ttC={participant["trueDamageDealtToChampions"]}
                    tTaken={participant["trueDamageTaken"]}
                />
            </Accordion.Body>
            </div>
        );
    }

    renderTFTRow()
    {
        const match = this.state.match;
        const participantId = this.getParticipantId();
        const participant = match.participants[ participantId ];
        let historyContainer = "historyContainer ";
        if ( participant.placement > 4)
        {
            historyContainer += "defeat";
        }
        else if ( participant.placement > 1)
        {
            historyContainer += "victory";
        }
        else
        {
            historyContainer += "TFTvictory"
        }

        return(
            <div className={historyContainer}>
                <Row>
                    <Col xs={2}>
                        <Row>
                            <h1>{participant.placement}</h1>
                        </Row>
                        <Container className="d-flex p-2" >
                            
                        </Container>
                    </Col>

                    <Col>
                        <Container className="d-flex flex-column">
                            
                        </Container>
                    </Col>

                    <Col>
                       
                    </Col>
                </Row>
            </div>
        );
    }
    render()
    {   
        
        if ( !this.state.fetched )
            return null;

        if ( this.state.game === "lol" )
            return this.renderLOLRow();
        
        return this.renderTFTRow();
        
    }
}
        