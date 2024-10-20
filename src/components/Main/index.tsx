import { Alert, Box, Typography, Button } from "@mui/material";
import matchIcon from '../../assets/free-icon-match.png'
import { useState } from "react";
import { timeout } from "../../helpers/timeout";
import { computerFirst, playerFirst } from "../../algorithm/algorihm";
import TakenNumber from "../TakenNumber";
import MatchButton from "../Buttons/MatchButton";
import PauseMenu from "../Menu/PauseMenu";
import GameOverMenu from "../Menu/GameOverMenu";

type MainType ={
  backToMainMenu: () => void;
  firstMove: string;
}

export default function Main({ backToMainMenu, firstMove } : MainType) {
  const [turn, setTurn] = useState(firstMove);
  const [matches, setMatches] = useState(25);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [playerTakenMatches, setPlayerTakenMatches] = useState<number | null>(null);
  const [computerMatches, setComputerMatches] = useState(0);
  const [computerTakenMatches, setComputerTakenMatches] = useState<number | null>(null);
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState(false);
  const [isGameOverMenuOpen, setIsGameOverMenuOpen] = useState<null | {winner: 'computer' | 'player'  | 'draw'}>(null);

  function isGameOver(matches: number, computerMatches: number): boolean {
    if (matches === 0) {
      if (computerMatches % 2 === 0 && playerMatches % 2 === 0) {
        setIsGameOverMenuOpen({ winner: 'draw' });
        return true;
      }
      if (computerMatches % 2 !== 0 && playerMatches % 2 !== 0) {
        setIsGameOverMenuOpen({ winner: 'draw' });
        return true;
      }
      setIsGameOverMenuOpen({ 
        winner: (computerMatches % 2 === 0) ? 'computer' : 'player' 
      });
      return true;
    }
    return false;
  }

  async function computerMove(numberOfMatches: number) {
    const takenNumber = firstMove === 'player' ? playerFirst(numberOfMatches, computerMatches) : computerFirst(numberOfMatches);
    const updatedNumberOfMatches = numberOfMatches - takenNumber 
    setMatches(updatedNumberOfMatches);
    setComputerTakenMatches(-takenNumber);
    await timeout(800);
    setComputerTakenMatches(null);
    setComputerMatches((prevNumber) => prevNumber + takenNumber);
    if (isGameOver(updatedNumberOfMatches, computerMatches + takenNumber)) {
      return;
    }
    setTurn('player');
  }

  if (firstMove === "computer" && matches === 25) {
    computerMove(matches);
  }
  
  async function playerMove(numberOfMatches: number) {
    const updatedNumberOfMatches = matches - numberOfMatches
    setMatches(updatedNumberOfMatches);
    setPlayerTakenMatches(-numberOfMatches);
    setTurn('computer');
    await timeout(500);
    setPlayerTakenMatches(null);
    setPlayerMatches((prevNumber) => prevNumber + numberOfMatches);
    if (isGameOver(updatedNumberOfMatches, computerMatches)) {
      return;
    }
    computerMove(updatedNumberOfMatches);
  }

  const closePauseMenu = () => setIsPauseMenuOpen(false);
  const openPauseMenu = () => setIsPauseMenuOpen(true);
  const closeGameOverMenu = () => setIsGameOverMenuOpen(null);
  function restart(closeMenu: () => void) {
    setTurn('player');
    setMatches(25);
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
        <Box>
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
          <Typography variant="h3" fontWeight={700}>{matches}</Typography>
        </Box>
        <TakenNumber number={playerTakenMatches} type="player" />
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Your matches: {playerMatches}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <MatchButton
              disabled={turn === "computer"}
              onClick={playerMove}
              numberOfMatches={1}
            />
            <MatchButton
              disabled={turn === "computer" || matches < 2}
              onClick={playerMove}
              numberOfMatches={2}
            />
            <MatchButton
              disabled={turn === "computer" || matches < 3}
              onClick={playerMove}
              numberOfMatches={3}
            />
          </Box>
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
        winner={isGameOverMenuOpen?.winner}
        handleRestart={() => restart(closeGameOverMenu)}
        handleBackToMenu={backToMainMenu}
      />}
    </>
  )
}
