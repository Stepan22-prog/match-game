import { Alert, Box, Typography, Button } from "@mui/material";
import matchIcon from '../../assets/free-icon-match.png'
import { useState } from "react";
import { timeout } from "../../helpers/timeout";
import { Algorithm } from "../../algorithm/algorithm";
import TakenNumber from "../TakenNumber";
import PauseMenu from "../Menu/PauseMenu";
import GameOverMenu from "../Menu/GameOverMenu";
import MatchPicker from "../MatchPicker";

type MainType ={
  backToMainMenu: () => void;
  firstMove: 'player' | 'computer';
  gameState: { total: number, maxPerMove: number };
}

export default function Main({ backToMainMenu, firstMove, gameState } : MainType) {
  const [turn, setTurn] = useState<'player' | 'computer'>(firstMove);
  const [remainingMatches, setRemainingMatches] = useState<number>(gameState.total);
  const [playerMatches, setPlayerMatches] = useState<number>(0);
  const [playerTakenMatches, setPlayerTakenMatches] = useState<number | null>(null);
  const [computerMatches, setComputerMatches] = useState(0);
  const [computerTakenMatches, setComputerTakenMatches] = useState<number | null>(null);
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState<boolean>(false);
  const [isGameOverMenuOpen, setIsGameOverMenuOpen] = useState<null | {winner: 'computer' | 'player' | 'draw'}>(null);
  const computerAlgorithm = new Algorithm(gameState.maxPerMove);

  function handleGameOver({ computerMatches, playerMatches }: {computerMatches: number, playerMatches: number}) {
    const isBothPlayersHaveEven = computerMatches % 2 === 0 && playerMatches % 2 === 0;
      const isBothPlayersHaveOdd = computerMatches % 2 !== 0 && playerMatches % 2 !== 0;
      if (isBothPlayersHaveEven || isBothPlayersHaveOdd) {
        setIsGameOverMenuOpen({ winner: 'draw' });
        return;
      }
      setIsGameOverMenuOpen({ 
        winner: (computerMatches % 2 === 0) ? 'computer' : 'player' 
      });
  }
  
  function isGameOver(remainingMatches: number) {
    return remainingMatches === 0; 
  }

  async function computerMove(numberOfMatches: number) {
    const takenNumber = computerAlgorithm.computerMove(numberOfMatches);
    const updatedNumberOfMatches = numberOfMatches - takenNumber 
    setRemainingMatches(updatedNumberOfMatches);
    setComputerTakenMatches(-takenNumber);
    await timeout(800);
    setComputerTakenMatches(null);
    setComputerMatches((prevNumber) => {
      const newNumber = prevNumber + takenNumber
      if (isGameOver(updatedNumberOfMatches)) {
        handleGameOver({ computerMatches: newNumber, playerMatches });
      }
      return newNumber;
    });
    if (!isGameOver(updatedNumberOfMatches)) {
      setTurn('player');
    }
  }

  if (firstMove === "computer" && remainingMatches === gameState.total) {
    computerMove(remainingMatches);
  }
  
  async function playerMove(numberOfMatches: number) {
    const updatedNumberOfMatches = remainingMatches - numberOfMatches
    setRemainingMatches(updatedNumberOfMatches);
    setPlayerTakenMatches(-numberOfMatches);
    setTurn('computer');
    await timeout(500);
    setPlayerTakenMatches(null);
    setPlayerMatches((prevNumber) => {
      const newNumber = prevNumber + numberOfMatches
      if (isGameOver(updatedNumberOfMatches)) {
        handleGameOver({ computerMatches, playerMatches: newNumber });
      }
      return newNumber;
    });
    if (!isGameOver(updatedNumberOfMatches)) {
      computerMove(updatedNumberOfMatches);
    }
  }

  const closePauseMenu = () => setIsPauseMenuOpen(false);
  const openPauseMenu = () => setIsPauseMenuOpen(true);
  const closeGameOverMenu = () => setIsGameOverMenuOpen(null);
  function restart(closeMenu: () => void) {
    setTurn(firstMove);
    setRemainingMatches(gameState.total);
    setPlayerMatches(0);
    setComputerMatches(0);
    closeMenu();
  }

  return (
    <>
      <Box sx={{ 
        height: '85vh', 
        display: "flex",
        flexDirection: "column", 
        justifyContent: "space-between",
      }}>
        <Box textAlign="center">
          <Button onClick={openPauseMenu}>
            <Typography 
              variant="h4"
            >
              ⏸️
            </Typography>
          </Button>
          <Alert icon={false} severity={turn === "player" ? "success" : "error"}>
            {turn === "player" ? "🧑 Your turn" : "🖥️ Computer turn"}
          </Alert>
          <Typography variant="h6" sx={{ mt: 1 }}>Computer matches: {computerMatches}</Typography>
        </Box>
        <TakenNumber number={computerTakenMatches} type="computer" />
        <Box display="flex" alignItems="center">
          <img
            src={matchIcon}
            alt="Match"
            width={100}
            height={100}
          />
          <Typography variant="h3" fontWeight={700}>{remainingMatches}</Typography>
        </Box>
        <TakenNumber number={playerTakenMatches} type="player" />
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Your matches: {playerMatches}</Typography>
          <MatchPicker 
            maxPerMove={gameState.maxPerMove}
            disabled={turn === "computer"}
            remainingMatches={remainingMatches}
            handlePlayerMove={playerMove}
          />
        </Box>
      </Box>
      <PauseMenu 
        isOpen={isPauseMenuOpen} 
        handleClose={closePauseMenu} 
        handleRestart={() => restart(closePauseMenu)}
        handleBackToMenu={backToMainMenu}
      />
      {!!isGameOverMenuOpen && <GameOverMenu
        isOpen={!!isGameOverMenuOpen}
        winner={isGameOverMenuOpen.winner}
        handleRestart={() => restart(closeGameOverMenu)}
        handleBackToMenu={backToMainMenu}
      />}
    </>
  )
}
