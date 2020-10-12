import React, { useState } from "react";
import { Store } from "./logic";
import {useEvt} from "evt/hooks";


export const Player: React.FunctionComponent<{
  store: Pick<Store,
    "evtGamePlayed" |
    "evtHeld" |
    "playerPlaying" |
    "evtGameRestarted" |
    "isGameWon"
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

    store.evtGameRestarted.attach(ctx, () => {
      setTemporaryScore(0);
      setGlobalScore(0);
    });


  },[store])
  
  
  return(
    
    <div className={
        `player ${store.playerPlaying.playerIndex === playerIndex ? 
        (store.isGameWon ? "winner" : "playing") : ""}`
      }
    >
      <h1>
        {
          store.isGameWon && store.playerPlaying.playerIndex === playerIndex ? 
          "Winner !" : `Player ${playerIndex}`
        }
      </h1>
      <h2>Global Score : {globalScore}</h2>
      <h3>Current Score : {temporaryScore}</h3>
    </div>

  
  )
}