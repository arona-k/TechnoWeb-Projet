import React from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import SummonerPie from './SummonerPie';

const ASSET_EMBLEM = "../assets/emblems/Emblem";
export default class SummonerHistory extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            leaguePoints: props.leaguePoints,
            losses: props.losses,
            queueType: props.queueType,
            rank: props.rank,
            tier: props.tier,
            wins: props.wins,
        };
    }

    render()
    {
        const league = this.state;
        const EMBLEM_PATH = `${ASSET_EMBLEM}_${league.tier}.png`;
        return(        
            <Row>
                <Col style={{borderRight: 'solid #2b2b2b 0.1em'}}>
                   <Row className="justify-content-center"> <Image className="leagueImg" src={EMBLEM_PATH} /> </Row>
                    <Row style={{textAlign: 'center'}}><h5>{league.tier} {league.rank}</h5></Row>
                    <Row style={{textAlign: 'center'}}><p>{league.leaguePoints} lp</p></Row>
                </Col>
                <Col className="d-flex justify-content-center">
                    <SummonerPie wins={league.wins} losses={league.losses}/>
                </Col>
           </Row>
        );
    }

}
