import React from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class SummonerForm extends React.Component{
    constructor(props){
        super(props);  
    }

    render(){
        
        return(
        <Container style={{marginTop: "2em", maxWidth: "500px", color: "white"}}>
                <Form onSubmit={this.props.handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nom d'invocateur</Form.Label>
                                <Form.Control className="sumControl" type="text" placeholder={this.props.name} readOnly/>
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3" controlId="level">
                                <Form.Label>Level</Form.Label>
                                <Form.Control className="sumControl" type="text" placeholder={this.props.summonerLevel} readOnly/>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="rank">
                        <Form.Label>Rank</Form.Label>
                        <Form.Control type="text" className="sumControl" placeholder={this.props.rank} readOnly/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="school">
                        <Form.Label>École</Form.Label>
                        <Form.Select isInvalid={this.props.invalidInput} className="sumControl">
                            <option>Choisir son école</option>
                            <option value="ECE">ECE</option>
                            <option value="ESCE">ESCE</option>
                            <option value="HEIP">HEIP</option>
                            <option value="Sup de Pub">Sup de Pub</option>
                            <option value="EBS">EBS</option>
                        </Form.Select>
                    </Form.Group>

                    <Row className="justify-content-center">
                        <Button className="homeSubmitBtn" type="submit" style={{maxWidth: "100px"}}>
                            {this.props.btnText}
                        </Button>
                    </Row>
                </Form>
            </Container>);
    }
}