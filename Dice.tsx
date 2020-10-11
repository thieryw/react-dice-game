import React, { useReducer } from "react";
import { Store } from "./logic";

import {useEvt} from "evt/hooks";


export const Dice: React.FunctionComponent<{
  store: Pick<Store,
    "dice" |
    "evtGamePlayed"
  >;
  
}> = (props)=>{
  
  const {store} = props;
  const [, forceUpdate] = useReducer(x=>x+1, 0);

  useEvt(ctx =>{
    store.evtGamePlayed.attach(ctx, ()=> forceUpdate());
  },[store])
  
  return(
    <div className="dice">
      {
        store.dice
      }
    </div>

  )

}