import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import SummonerForm from '../components/SummonerForm';

import OmnesAPI from '../tools/OmnesAPI';


/*
WIP
This page will use our backend server and API to render 2 widgets
*/


export default class Leaderboard extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            fetched: false,
            adminMode: false,
            modify: false,
            modified: false,
            summonerToModify: false,
            invalidInput: false,
            summoners: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    updateSummoner(id, s){
        const api = new OmnesAPI();
        api.updateSummoner(id, s)
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

    handleClose(){
        this.setState({
            modify: false,
            summonerToModify: null,
        });
    }

    handleModify(s){
       this.setState({
           modify: true,
           summonerToModify: s,
       })
    }

    handleSubmit( event ){
        event.preventDefault();
        const value = event.target.elements.school.value;
        let s = this.state.summonerToModify;
        console.log(s["_id"]);
        if (value !== "Choisir son école"){
            s["school"] = value;
            this.updateSummoner(s["_id"], s)
            this.handleClose();

            this.setState({
                modified: true,
            })
        }

        else{
            this.setState({
                invalidInput: true,
            });
        }

    }

    renderModal()
    {
        const summoner = this.state.summonerToModify;
        return (<Modal show={this.state.modify} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modification de {summoner["summonerName"]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SummonerForm
                    handleSubmit={this.handleSubmit} name={summoner.summonerName} 
                    summonerLevel={summoner.level} rank={summoner.rank} 
                    invalidInput={this.state.invalidInput} btnText="Modifier"/>
            </Modal.Body>
          </Modal>);
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

        if (!this.state.fetched)
            return this.loading();
        let summoners = this.state.summoners;
        let hideNonAdminItems = null;
        if (!this.state.adminMode)
        {
            hideNonAdminItems = {display: "none"};
        }

        let modal = null;
        if (this.state.modify)
           modal = this.renderModal();
        let alert = null;
        if (this.state.modified)
            alert = <Alert style={{marginTop: "1em", borderRadius: "25px", textAlign: "center"}} variant="success">Modification effectuée !</Alert>;
        
        return(
            <Container>
                {alert}
                <h1 style={{marginTop: "1em", color: "white",}}>Leaderboard</h1>
                {modal}
            <Table className="lbTable" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Level</th>
                        <th>Rank</th>
                        <th>École</th>
                        <th style={hideNonAdminItems}></th>
                    </tr>
                </thead>
                <tbody>
                {summoners.map( (s, index) => <tr key={`summoner_${index}`}>  
                                                    <th>  <Link to={`/Summoner/${s["summonerName"]}`} className="">{s["summonerName"]}</Link></th>
                                                    <th> {s["level"]}</th>
                                                    <th> {s["rank"]}</th>
                                                    <th> {s["school"]}</th>
                                                    <th style={hideNonAdminItems}>
                                                        <div className="d-flex justify-content-center">
                                                            <Button style={{marginRight: "0.8em"}} onClick={() => this.handleDelete(s["_id"])} variant="danger">Supprimer</Button>
                                                            <Button onClick={() => this.handleModify(s)} variant="light">Modifier</Button>

                                                        </div>
                                                    </th>
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


