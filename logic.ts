import {NonPostableEvt, ToPostableEvt, Evt} from "evt";

type Dice = 1 | 2 | 3 | 4 | 5 | 6;

namespace Dice {
  export function rollDice(): Dice{
    return Math.floor(Math.random() * 6) + 1 as Dice;
  };
};


type Player = {
  globalScore: number;
  temporaryScore: number;
  playerId: number;
}


export type Store = {
  dice: Dice;
  playerPlaying: Player;
  play: ()=> Promise<void>;
  hold: ()=> Promise<void>;
  newGame: ()=> Promise<void>;

  evtGamePlayed: NonPostableEvt<Store["playerPlaying"]>;
  evtHeld: NonPostableEvt<Store["playerPlaying"]>;
  evtGameRestarted: NonPostableEvt<Store>;
}


export async function getStore(): Promise<Store>{

  const simulateNetworkDelay = (delay: number)=>{
    return new Promise<void>(resolve => setTimeout(resolve, delay));
  }

  const player1: Player = {
    "globalScore": 0,
    "temporaryScore": 0,
    "playerId": 0,
  }
  const player2: Player = {
    "globalScore": 0,
    "temporaryScore": 0,
    "playerId": 1,
  }

  const store: ToPostableEvt<Store> = {
    "dice": 1,
    "playerPlaying": player1,
    "play": async ()=>{

      await simulateNetworkDelay(300);
      store.dice = Dice.rollDice();

      if(store.dice === 1){
        store.playerPlaying.temporaryScore = 0;
        store.playerPlaying = store.playerPlaying === player1 ? player2 : player1;
        store.evtGamePlayed.post(store.playerPlaying);
        return;
      }

      store.playerPlaying.temporaryScore += store.dice;

      store.evtGamePlayed.post(store.playerPlaying);
    },
    "hold": async ()=>{
      await simulateNetworkDelay(300);

      store.playerPlaying.globalScore += store.playerPlaying.temporaryScore = 0;
      store.playerPlaying = store.playerPlaying === player1 ? player2 : player1;

      store.evtHeld.post(store.playerPlaying);


    },

    "newGame": async ()=>{
      await simulateNetworkDelay(1500);

      for(const player of [player1, player2]){
        player.globalScore = 0;
        player.temporaryScore = 0;
      };

      store.playerPlaying = player1;
      store.dice = 1;

      store.evtGameRestarted.post(store);
    },


    "evtGamePlayed": new Evt(),
    "evtGameRestarted": new Evt(),
    "evtHeld": new Evt()
  };

  await simulateNetworkDelay(2000);
  
  return store;



}





