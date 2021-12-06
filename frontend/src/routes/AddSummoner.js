import React from 'react';
import { useParams } from "react-router-dom";

import AddSummonerHandler from "../components/AddSummonerHandler";

export default function AddSummoner(){

  let params = useParams();
  return <AddSummonerHandler summonerName={params.summonerName} />;
}