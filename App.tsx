import React, { useCallback, useReducer, useState } from "react";
import { Store } from "./logic";
import {useAsyncCallback} from "react-async-hook";
import {useEvt} from "evt/hooks";

export const App: React.FunctionComponent<{
  store: Store;
}> = (props)=>{

  const {store} = props;
  const [, forceUpdate] = useReducer(x=>x+1, 0);
  const asyncPlay = useAsyncCallback(store.play);
  

  return(
    <div>
      <Dice isLoading={asyncPlay.loading} store={store}/>
      <input type="button" value="roll dice" onClick={useCallback(()=> asyncPlay.execute(),[store])}/>
      <Player playerId={0} store={store}/>
      <Player playerId={1} store={store}/>
    </div>
    
  )
}


const Dice: React.FunctionComponent<{
  store: Pick<Store,
    "dice" |
    "evtGamePlayed"
  >;
  isLoading: boolean;
}> = (props)=>{
  
  const {store, isLoading} = props;
  const [, forceUpdate] = useReducer(x=>x+1, 0);

  useEvt(ctx =>{
    store.evtGamePlayed.attach(ctx, ()=> forceUpdate());
  },[store])
  
  return(
    <div className="dice">
      {
        isLoading ? "..." : store.dice
      }
    </div>

  )

}

const Player: React.FunctionComponent<{
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
      data => setGlobalScore(data.globalScore)
    );

  },[store])
  return(
    
    <div className={`player ${store.playerPlaying.playerId === playerId ? "playing" : ""}`}>
      <h2>Player {playerId}</h2>
      <h1>Global Score : {globalScore}</h1>
      <h3>Current Score : {temporaryScore}</h3>
    </div>

  
  )
}