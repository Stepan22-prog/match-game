import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type GameOverMenuType = {
  winner: 'computer' | 'player' | 'draw';
  isOpen: boolean;
  handleRestart: () => void;
  handleBackToMenu: () => void;
}

export default function GameOverMenu({ winner, isOpen , handleRestart, handleBackToMenu }: GameOverMenuType) {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="game-over-menu-dialog-title"
    >
      <DialogTitle id="game-over-menu-dialog-title">
        {"Game over | The Match Game"}
      </DialogTitle>
      <DialogContent>
        {winner === "draw" &&
          <Alert icon={false} severity="info">🤝 Draw!</Alert>
        }
        {winner === "computer" &&
          <Alert icon={false} severity="error">🖥️ Computer win. Try again!🙁</Alert>
        }
        {winner === "player" &&
          <Alert icon={false} severity="success">🧑You win! Congratulations!🙂</Alert>
        }
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleRestart}>
          Restart
        </Button>
        <Button onClick={handleBackToMenu}>
          Main menu
        </Button>
      </DialogActions>
    </Dialog>
  )
}
