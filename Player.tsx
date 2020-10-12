import React, { useState } from "react";
import { Store } from "./logic";
import {useEvt} from "evt/hooks";


export const Player: React.FunctionComponent<{
  store: Pick<Store,
    "evtGamePlayed" |
    "evtHeld" |
    "playerPlaying"
  >
  playerIndex: number;
}> = (props)=>{
  
  const {store, playerIndex} = props;
  const [temporaryScore, setTemporaryScore] = useState(0);
  const [globalScore, setGlobalScore] = useState(0);
  
  useEvt(ctx=>{
    store.evtGamePlayed.attach(
      data => data.playerIndex === playerIndex,
      ctx,
      data => setTemporaryScore(data.temporaryScore)
    );

    store.evtHeld.attach(
      data => data.playerIndex === playerIndex,
      ctx,
      data => {
        setTemporaryScore(0);
        setGlobalScore(data.globalScore);
      }

    );


  },[store])
  
  
  return(
    
    <div className={`player ${store.playerPlaying.playerIndex === playerIndex ? "playing" : ""}`}>
      <h1>Player {playerIndex + 1}</h1>
      <h2>Global Score : {globalScore}</h2>
      <h3>Current Score : {temporaryScore}</h3>
    </div>

  
  )
}