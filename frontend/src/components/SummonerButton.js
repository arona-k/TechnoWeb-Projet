import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router';

export default function SummonerButton(props)
{
    let navigate = useNavigate();
    return (
        <Container className="d-flex justify-content-center" style={{marginTop: "1em",}}>        
            <Button variant="secondary" onClick={() => navigate(`/Ajouter/${props.summonerName}`)}>Ajouter au Leaderboard</Button>
        </Container>
    );
}