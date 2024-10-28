import { useState } from 'react';

type FirstMove = 'computer' | 'player';
export type GameState = { 
  total: number; 
  maxPerMove: number; 
  firstMove: FirstMove; 
};

export function useGame() {
  const [gameState, setGameState] = useState<GameState>({
    total: 25,
    maxPerMove: 3,
    firstMove: 'player',
  });

  const setNumberOfMatches = (total: number, maxPerMove: number) => {
    setGameState((prevState) => ({ ...prevState, total, maxPerMove }));
  };

  const setFirstMove = (firstMove: FirstMove) => {
    setGameState((prevState) => ({ ...prevState, firstMove }));
  };

  return { gameState, setNumberOfMatches, setFirstMove };
}
