import React, { useState } from "react";
import { Store } from "./logic";
import {useEvt} from "evt/hooks";


export const Player: React.FunctionComponent<{
  store: Pick<Store,
    "evtGamePlayed" |
    "evtHeld" |
    "playerPlaying"
  >
  playerId: number;
}> = (props)=>{
  
  const {store, playerId} = props;
  const [temporaryScore, setTemporaryScore] = useState(0);
  const [globalScore, setGlobalScore] = useState(0);
  
  useEvt(ctx=>{
    store.evtGamePlayed.attach(
      data => data.playerId === playerId,
      ctx,
      data => setTemporaryScore(data.temporaryScore)
    );

    store.evtHeld.attach(
      data => data.playerId === playerId,
      ctx,
      data => {
        setGlobalScore(data.globalScore);
        setTemporaryScore(0);
      }
    );
  },[store])
  
  
  return(
    
    <div className={`player ${store.playerPlaying.playerId === playerId ? "playing" : ""}`}>
      <h1>Player {playerId + 1}</h1>
      <h2>Global Score : {globalScore}</h2>
      <h3>Current Score : {temporaryScore}</h3>
    </div>

  
  )
}