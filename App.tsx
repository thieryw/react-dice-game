import React, { useCallback } from "react";
import { Store } from "./logic";
import {useAsyncCallback} from "react-async-hook";
import {Dice} from "./Dice";
import {Player} from "./Player";

export const App: React.FunctionComponent<{
  store: Store;
}> = (props)=>{

  const {store} = props;
  const asyncPlay = useAsyncCallback(store.play);
  const asyncHold = useAsyncCallback(store.hold);

  return(
    <div className="wrapper">
      <h1 className="main-heading">Dice Game</h1>
      <input 
        className="roll" 
        type="button" 
        value={asyncPlay.loading ? "Loading..." : "Roll Dice"}
        disabled={asyncPlay.loading}
        onClick={useCallback(()=> asyncPlay.execute(),[store])}
      />
      <Dice store={store}/>
      <Player playerId={0} store={store}/>
      <Player playerId={1} store={store}/>
      <input 
        className="hold"
        type="button" 
        disabled={asyncHold.loading}
        value={asyncHold.loading ? "Loading..." : "Hold"} 
        onClick={useCallback(()=> asyncHold.execute(),[store])}
      />
    </div>
    
  )
}




