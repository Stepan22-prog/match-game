import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

type CustomMenuType = {
  setGameState: (total: number, maxPerMove: number) => void;
  backToMainMenu: () => void;
}

export default function CustomMenu({ setGameState, backToMainMenu } : CustomMenuType) {
  const [maxPerMove, setMaxPerMove] = useState({ value: 3, error: false });
  const [total, setTotal] = useState({ value: 25, error: false });

  function handleMaxPerMoveInputType(value: string) {
    if (!+value || +value > (total.value / 2)) {
      setMaxPerMove({ value: 3, error: true });
      return;
    }
    setMaxPerMove({ value: +value, error: false });
  }

  function handleTotalInputType(value: string) {
    if (!+value) {
      setTotal({ value: 25, error: true });
      return;
    }
    setTotal({ value: (+value) * 2 + 1, error: false });
  }

  function resetToDefault() {
    setTotal({ value: 25, error: false });
    setMaxPerMove({ value: 3, error: false });
    setGameState(25, 3);
  }

  function handleSave() {
    setGameState(total.value, maxPerMove.value);
    backToMainMenu();
  }

  return (
    <Box
      padding={3}
      border="1px solid black"
      component={Paper}
      maxWidth="500px"
    >
      <Typography 
        variant="h5" 
        component="h1"
        mb={1}
      >
        Match Game
      </Typography>
      <Typography 
        variant="h6" 
        textAlign="left"
        mb={1}
      >
        Custom settings
      </Typography>
      <Typography 
        variant="body1" 
        textAlign="left"
        mb={1}
      >
        You can adjust the parameters n and m, where 2n + 1 is the total number of matches, and m is the maximum number of matches that can be taken.
      </Typography>
      <Typography textAlign="left" fontWeight="bold">Total: {total.value}</Typography>
      <Typography 
        textAlign="left" 
        mb={1} 
        fontWeight="bold"
      >
        Max per move: {maxPerMove.value}
      </Typography>
      <Box display="flex">
        <TextField
          error={total.error}
          label="n" 
          variant="outlined" 
          size="small" 
          sx={{ width: '60px', mr: 1}}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTotalInputType(event.target.value)}
        />
        <TextField
          error={maxPerMove.error}
          label="m" 
          variant="outlined" 
          size="small" 
          sx={{ width: '60px'}} 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleMaxPerMoveInputType(event.target.value)}
        />
      </Box>
      <Button 
        variant="contained" 
        fullWidth
        sx={{ mt: 1 }}
        onClick={handleSave}
      >Save</Button>
      <Button 
        variant="contained"
        color="warning"
        fullWidth
        sx={{ mt: 1 }}
        onClick={resetToDefault}
      >Reset to default</Button>
      <Button 
        fullWidth
        sx={{ mt: 1 }}
        onClick={backToMainMenu}
      >Back to main menu</Button>
    </Box>
  )
}
