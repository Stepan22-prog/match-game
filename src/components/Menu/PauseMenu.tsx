import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

type PauseMenuType = {
  isOpen: boolean;
  handleClose: () => void;
  handleRestart: () => void;
  handleBackToMenu: () => void;
}

export default function PauseMenu({ isOpen, handleClose, handleRestart, handleBackToMenu } : PauseMenuType) {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="pause-menu-dialog-title"
      aria-describedby="pause-menu-dialog-description"
    >
      <DialogTitle id="pause-menu-dialog-title">
        {"Pause | Match Game"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="pause-menu-dialog-description">
        From the pile of 25 matches, each player takes either 1, 2 or 3 matches on each turn. The game is over once all matches are taken. Whoever has the even amount of matches wins.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button onClick={handleClose}>Continue</Button>
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
