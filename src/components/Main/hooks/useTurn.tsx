import { useState } from "react";
import { GameState } from "../../../hooks/useGame";

type Turn = 'player' | 'computer';

export function useTurns(gameState: GameState) {
  const [turn, setTurn] = useState<Turn>(gameState.firstMove);

  const switchTurn = () => setTurn((prev) => (prev === 'player' ? 'computer' : 'player'));

  return { turn, switchTurn };
}
