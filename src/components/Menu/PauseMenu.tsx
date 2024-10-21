import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

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
        {"Pause | The Match Game"}
      </DialogTitle>
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
