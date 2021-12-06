import React from 'react';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Outlet } from 'react-router';

import OmnesAPI from '../tools/OmnesAPI.js';

/*
WIP
This page will use our backend server and API to render 2 widgets
*/


export default class Leaderboard extends React.Component{
    
    constructor(props)
    {
        super(props);

        this.state = {
            fetched: false,
            adminMode: false,
            summoners: [],
        }
    }

    componentDidMount(){
        this.getAllSummoners();
    }

    getAllSummoners(){
        const api = new OmnesAPI();
        api.fetchSummoners()
        .then((response) => {
            this.setState({
                fetched: true,
                summoners: response.data.data,
            });
            console.log(this.state);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    deleteSummoner(id){
        const api = new OmnesAPI();
        api.deleteSummoner(id)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleDelete(e){
        console.log(e);
        //handles the api deletion
        this.deleteSummoner(e);

        //handle the state update
        let summoners = this.state.summoners;
        for(let i = 0; i < summoners.length; i++ ){
            if (e === summoners[i]["_id"]){
                summoners.splice(i, 1);
                break;
            }
        }
        this.setState({
            summoners: summoners,
        })

    }

    loading(){
        return(
            <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <Image className="homeImg"src="./assets/logo_big.png"/><br/>
                    <p className="lead">finest players</p>
        
                    <Row >
                       <h1 className="wip" >LOADING...</h1>
                    </Row>
        
                
                <Outlet />
            </div>
        );
    }
    
    render(){

        if (this.state.fetched == null)
            return this.loading();
        
        let summoners = this.state.summoners;
        let btnAdmin = null;

        if (!this.state.adminMode)
        {
            btnAdmin = {display: "none"};
        }

        

        return(
            <Container>
                <h1 style={{marginTop: "1em", color: "white",}}>Leaderboard</h1>
            <Table className="lbTable" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Level</th>
                        <th>Rank</th>
                        <th>École</th>
                    </tr>
                </thead>
                <tbody>
                {summoners.map( (s, index) => <tr>  
                                                    <th> {s["summonerName"]}</th>
                                                    <th> {s["level"]}</th>
                                                    <th> {s["rank"]}</th>
                                                    <th> {s["school"]}</th>
                                                    <th style={btnAdmin}><div className="d-flex justify-content-center"><Button onClick={() => this.handleDelete(s["_id"])} variant="danger">Supprimer</Button></div></th>
                                                </tr>)}
                </tbody>
            </Table>
            <Row className="justify-content-center">
                <Button className="homeSubmitBtn" type="submit" style={{maxWidth: "100px"}} onClick={ () => {
                        if (!this.state.adminMode)
                            this.setState({ adminMode: true});
                        else
                            this.setState({ adminMode: false});
                        }}>
                    ADMIN
                </Button>
            </Row>
            </Container>
        );
        
    }
}


