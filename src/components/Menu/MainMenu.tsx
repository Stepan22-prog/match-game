import { Box, Button, Paper, Typography } from "@mui/material";
import Select from "../Select";
import { useState } from "react";

type MainMenuType = {
  handleStartGame: (mode: 'computer' | 'player') => void;
  handleCustomMenuClick: () => void;
  gameState: { total: number, maxPerMove: number }
}

export default function MainMenu({ handleStartGame, handleCustomMenuClick, gameState }: MainMenuType) {
  const [firstMove, setFirstMove] = useState<'computer' | 'player'>("player");

  function handleStartClick() {
    handleStartGame(firstMove);
  }

  return (
    <Box
      padding={3}
      border="1px solid black"
      component={Paper}
      elevation={3}
      maxWidth="500px"
    >
      <Typography 
        variant="h5" 
        component="h1"
        mb={1}
      >
        The Match Game
      </Typography>
      <Typography 
        variant="h6" 
        textAlign="left"
        mb={1}
      >
        Rules
      </Typography>
      <Typography 
        variant="body1" 
        textAlign="left"
        mb={2}
      >
        From the pile of <b>{gameState.total}</b> matches, each player takes from 1 to <b>{gameState.maxPerMove}</b> matches on each turn. The game is over once all matches are taken. Whoever has the even amount of matches wins.
      </Typography>
      <Select 
        label="Who goes first?" 
        value={firstMove} 
        setValue={setFirstMove} 
        items={["player", "computer"]} 
      />
      <Button 
        variant="contained" 
        fullWidth
        sx={{ mt: 1 }}
        onClick={handleStartClick}
      >
        Play
      </Button>
      <Button 
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 1 }}
        onClick={handleCustomMenuClick}
      >
        Custom mode
      </Button>
    </Box>
  )
}
