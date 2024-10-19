import { Box, Button, Paper, Typography } from "@mui/material";
import Select from "../Select";
import { useState } from "react";

export default function Menu() {
  const [gameMode, setGameMode] = useState("Computer");

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
        Rules
      </Typography>
      <Typography 
        variant="body1" 
        textAlign="left"
        mb={2}
      >
        From the pile of 25 matches, each player takes either 1, 2 or 3 matches on each turn. The game is over once all matches are taken. Whoever has the even amount of matches wins.
      </Typography>
      <Select 
        label="Who goes first?" 
        value={gameMode} 
        setValue={setGameMode} 
        items={["Computer", "You"]} 
      />
      <Button 
        variant="contained" 
        fullWidth
        sx={{ mt: 1 }}
      >Play</Button>
    </Box>
  )
}
