import { useState } from "react";
import { Algorithm } from "../../../algorithm/algorithm";
import { timeout } from "../../../helpers/timeout";
import { GameState } from "../../../hooks/useGame";

export function usePlayerAndComputerMoves(gameState: GameState, handleGameOver: (data: { computerMatches: number, playerMatches: number }) => void) {
  const [playerMatches, setPlayerMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [playerTakenMatches, setPlayerTakenMatches] = useState<number | null>(null);
  const [computerTakenMatches, setComputerTakenMatches] = useState<number | null>(null);

  const computerAlgorithm = new Algorithm(gameState.maxPerMove);

  const remainingMatches = gameState.total - (playerMatches + computerMatches);

  const playerMove = async (numberOfMatches: number) => {
    const updatedMatches = remainingMatches - numberOfMatches;
    setPlayerTakenMatches(-numberOfMatches);

    await timeout(500);
    setPlayerTakenMatches(null);

    setPlayerMatches((prev) => {
      const newTotal = prev + numberOfMatches;
      if (updatedMatches === 0) handleGameOver({ computerMatches, playerMatches: newTotal });
      return newTotal;
    });
  };

  const computerMove = async () => {
    const takenNumber = computerAlgorithm.computerMove(remainingMatches);
    const updatedMatches = remainingMatches - takenNumber;

    setComputerTakenMatches(-takenNumber);
    await timeout(800);
    setComputerTakenMatches(null);

    setComputerMatches((prev) => {
      const newTotal = prev + takenNumber;
      if (updatedMatches === 0) handleGameOver({ computerMatches: newTotal, playerMatches });
      return newTotal;
    });
  };

  return {
    playerMatches,
    computerMatches,
    playerMove,
    computerMove,
    playerTakenMatches,
    computerTakenMatches,
    remainingMatches,
  };
}
