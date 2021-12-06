import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';


export default function SummonerMastery(props)
{
        return (
        <Container className="sumBriefContainer sumMastery">        
            <Row>
                <Col className = "d-flex justify-content-center">
                    <Image src={ props.mIcon } />
                </Col>
                <Col>
                    <Row><h1>{ props.champName }</h1></Row>
                    <Row><h5> Mastery level: { props.mLevel }</h5></Row>
                    <Row><p> { props.mPoints} mastery points</p></Row>
                </Col>
            </Row>
        </Container>
    );
}