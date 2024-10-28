import { Box, Typography, Button, Alert } from "@mui/material";
import matchIcon from '../../assets/free-icon-match.png';
import PauseMenu from "../Menu/PauseMenu";
import GameOverMenu from "../Menu/GameOverMenu";
import MatchPicker from "../MatchPicker";
import TakenNumber from "../TakenNumber";
import { useTurns } from "./hooks/useTurn";
import { usePlayerAndComputerMoves } from "./hooks/usePlayerAndComputerMoves";
import { useGameMenus } from "./hooks/useGameMenus";
import { GameState } from "../../hooks/useGame";

type MainType = {
  backToMainMenu: () => void;
  gameState: GameState;
};

export default function Main({ backToMainMenu, gameState }: MainType) {
  const { turn, switchTurn } = useTurns(gameState);
  const {
    playerMatches,
    computerMatches,
    playerMove,
    computerMove,
    playerTakenMatches,
    computerTakenMatches,
    remainingMatches,
  } = usePlayerAndComputerMoves(gameState, handleGameOver);

  const {
    isPauseMenuOpen,
    openPauseMenu,
    closePauseMenu,
    isGameOverMenuOpen,
    openGameOverMenu,
    closeGameOverMenu,
  } = useGameMenus();

  function handleGameOver({ computerMatches, playerMatches }: { computerMatches: number; playerMatches: number }) {
    const isDraw = computerMatches % 2 === playerMatches % 2;
    openGameOverMenu(isDraw ? 'draw' : computerMatches % 2 === 0 ? 'computer' : 'player');
  }

  function restart(closeMenu: () => void) {
    switchTurn();
    closeMenu();
  }

  if (gameState.firstMove === "computer" && remainingMatches === gameState.total) {
    computerMove();
  }

  return (
    <>
      <Box
        sx={{
          height: '85vh',
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box textAlign="center">
          <Button onClick={openPauseMenu}>
            <Typography variant="h4">⏸️</Typography>
          </Button>
          <Alert icon={false} severity={turn === "player" ? "success" : "error"}>
            {turn === "player" ? "🧑 Your turn" : "🖥️ Computer turn"}
          </Alert>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Computer matches: {computerMatches}
          </Typography>
        </Box>
        <TakenNumber number={computerTakenMatches} type="computer" />
        <Box display="flex" alignItems="center">
          <img src={matchIcon} alt="Match" width={100} height={100} />
          <Typography variant="h3" fontWeight={700}>{remainingMatches}</Typography>
        </Box>
        <TakenNumber number={playerTakenMatches} type="player" />
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Your matches: {playerMatches}
          </Typography>
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
      {!!isGameOverMenuOpen && (
        <GameOverMenu
          isOpen={!!isGameOverMenuOpen}
          winner={isGameOverMenuOpen.winner}
          handleRestart={() => restart(closeGameOverMenu)}
          handleBackToMenu={backToMainMenu}
        />
      )}
    </>
  );
}
