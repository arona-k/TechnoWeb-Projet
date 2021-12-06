import React from 'react';

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";


import Home from "./routes/Home";
import Summoner from "./routes/Summoner";
import Leaderboard from "./routes/Leaderboard";
import AddSummoner from "./routes/AddSummoner"

import './index.css';



/*
Handles project's routes
*/
const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
          <Route path="/" element = {<App />}>
              <Route path="home" element = {<Home />} />
              <Route path="leaderboard" element = {<Leaderboard />}/>
              <Route path="ajouter" element = {<AddSummoner />}>
                  <Route path=":summonerName" element = {<AddSummoner />} />
              </Route>
              <Route path="summoner" element = {<Summoner />}>
                <Route path=":summonerName" element={<Summoner />} />
              </Route>
          </Route>
        </Routes>
    </BrowserRouter>,
    rootElement
  );

