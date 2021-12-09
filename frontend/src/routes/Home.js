import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';


import { Outlet } from 'react-router';

import { useNavigate } from 'react-router-dom';



export default function Home() {
    let navigate = useNavigate();
    
    /**handle the submission from the Home form
     * Fetch the form's value and force navigation to the Summoner Page
     * @param  {} event
     */
    function handleSubmit( event ){
        event.preventDefault();
        console.log( event )
        const value = event.target.elements.summonerName.value;

        console.log(value);
        if( value !== "") 
         {
            navigate(`/Summoner/${value}`);
         }
    }
    
    return(
    <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <Image className="homeImg"src="./assets/logo_big.png"/><br/>
            <p className="lead">finest players</p>
            <Form className="homeForm" onSubmit={handleSubmit}> 
            <Row >
                <Col>
                <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                    Summoner Name
                </Form.Label>
                <Form.Control
                    className="mb-2 sumControl"
                    name="summonerName"
                    placeholder="Summoner Name..."
                />
                </Col>
                <Col xs={2}>
                <Button type="submit" className="homeSubmitBtn mb-2 px-4">
                    &gt;
                </Button>
                </Col>
            </Row>
        </Form>
        
        <Outlet />
    </div>
    );
}


