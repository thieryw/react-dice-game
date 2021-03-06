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
  const asyncNewGame = useAsyncCallback(store.newGame);
  



  return(
    <div className="wrapper">
      <h1 className="main-heading">Dice Game</h1>
      <input 
        className="roll" 
        type="button" 
        value={asyncPlay.loading ? "Loading..." : "Roll Dice"}
        disabled={asyncPlay.loading || store.isGameWon}
        onClick={useCallback(()=> asyncPlay.execute(),[store])}
      />
      <Dice store={store}/>
      <Player playerIndex={0} store={store}/>
      <Player playerIndex={1} store={store}/>
      <input 
        className="hold"
        type="button" 
        disabled={asyncHold.loading || store.playerPlaying.temporaryScore === 0}
        value={asyncHold.loading ? "Loading..." : "Hold"} 
        onClick={useCallback(()=> asyncHold.execute(),[store])}
      />
      <input
        className="new-game"
        type="button"
        disabled={asyncNewGame.loading}
        value={asyncNewGame.loading ? "Loading..." : "New Game"}
        onClick={useCallback(()=> asyncNewGame.execute(),[store])} 
      />
    </div>
    
  )
}




