import { Alert, Box, Typography } from "@mui/material";
import matchIcon from '../../assets/free-icon-match.png'
import { useState } from "react";
import { timeout } from "../../helpers/timeout";
import { playerFirst } from "../../algorithm/algorihm";
import TakenNumber from "../TakenNumber";
import MatchButton from "../Buttons/MatchButton";

export default function Main() {
  const [turn, setTurn] = useState('player');
  const [matches, setMatches] = useState(25);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [playerTakenMatches, setPlayerTakenMatches] = useState<number | null>(null);
  const [computerMatches, setComputerMatches] = useState(0);
  const [computerTakenMatches, setComputerTakenMatches] = useState<number | null>(null);

  function isGameOver(matches: number): boolean {
    if (matches === 0) {
      console.log('game over');
      return true;
    }
    return false;
  }

  async function computerMove(numberOfMatches: number) {
    const takenNumber = playerFirst(numberOfMatches);
    const updatedNumberOfMatches = numberOfMatches - takenNumber 
    setMatches(updatedNumberOfMatches);
    setComputerTakenMatches(-takenNumber);
    await timeout(300);
    setComputerTakenMatches(null);
    setComputerMatches((prevNumber) => prevNumber + takenNumber);
    if (isGameOver(updatedNumberOfMatches)) {
      return;
    }
    setTurn('player');
  }
  
  async function playerMove(numberOfMatches: number) {
    const updatedNumberOfMatches = matches - numberOfMatches
    setMatches(updatedNumberOfMatches);
    setPlayerTakenMatches(-numberOfMatches);
    await timeout(300);
    setPlayerTakenMatches(null);
    setPlayerMatches((prevNumber) => prevNumber + numberOfMatches);
    setTurn('computer');
    if (isGameOver(updatedNumberOfMatches)) {
      return;
    }
    computerMove(updatedNumberOfMatches);
  }

  return (
    <Box sx={{ 
      height: '80vh', 
      display: "flex",
      flexDirection: "column", 
      justifyContent: "space-between"
    }}>
      <Box>
        <Alert icon={false} severity={turn === "player" ? "success" : "error"}>
          {turn === "player" ? "🧑 Your turn" : "🖥️ Computer turn"}
        </Alert>
        <Typography>Computer matches: {computerMatches}</Typography>
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
        <Typography>Your matches: {playerMatches}</Typography>
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
  )
}
