import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type GameOverMenuType = {
  winner: 'computer' | 'player';
  isOpen: boolean;
  handleRestart: () => void;
  handleBackToMenu: () => void;
}

export default function GameOverMenu({ winner, isOpen , handleRestart, handleBackToMenu }: GameOverMenuType) {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="pause-menu-dialog-title"
      aria-describedby="pause-menu-dialog-description"
    >
      <DialogTitle id="pause-menu-dialog-title">
        {"Game over | Match Game"}
      </DialogTitle>
      <DialogContent>
        <Alert icon={false} severity={winner === "player" ? "success" : "error"}>
          {winner === "player" ? "🧑You win! Congratulations!🙂" : "🖥️ Computer win. Try again!🙁"}
        </Alert>
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
