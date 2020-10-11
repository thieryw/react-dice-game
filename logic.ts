type Dice = 1 | 2 | 3 | 4 | 5 | 6;

namespace Dice {
  export function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
  };
};


type Player = {
  globalScore: number;
  temporaryScore: number;
  playerName: String;

}


type Store = {
  
}


