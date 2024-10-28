import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useCustomSettings } from "./hooks/useCustomSettings";

type CustomMenuType = {
  setGameState: (total: number, maxPerMove: number) => void;
  backToMainMenu: () => void;
  gameState: { total: number; maxPerMove: number };
};

export default function CustomMenu({
  setGameState,
  backToMainMenu,
  gameState,
}: CustomMenuType) {
  const {
    total,
    maxPerMove,
    handleTotalInputChange,
    handleMaxPerMoveInputChange,
    resetToDefault,
    handleSave,
  } = useCustomSettings(gameState, setGameState);

  return (
    <Box padding={3} border="1px solid black" component={Paper} elevation={3} maxWidth="500px">
      <Typography variant="h5" component="h1" mb={1}>
        The Match Game
      </Typography>
      <Typography variant="h6" textAlign="left" mb={1}>
        Custom settings
      </Typography>
      <Typography variant="body1" textAlign="left" mb={1}>
        You can adjust the parameters n and m, where 2n + 1 is the total number
        of matches, and m is the maximum number of matches that can be taken.
      </Typography>
      <Typography textAlign="left" fontWeight="bold">Total: {total.value}</Typography>
      <Typography textAlign="left" mb={1} fontWeight="bold">
        Max per move: {maxPerMove.value}
      </Typography>
      <Box display="flex">
        <TextField
          error={total.error}
          label="n"
          variant="outlined"
          size="small"
          sx={{ width: "60px", mr: 1 }}
          onChange={(event) => handleTotalInputChange(event.target.value)}
        />
        <TextField
          error={maxPerMove.error}
          label="m"
          variant="outlined"
          size="small"
          sx={{ width: "60px" }}
          onChange={(event) => handleMaxPerMoveInputChange(event.target.value)}
        />
      </Box>
      <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleSave}>
        Save
      </Button>
      <Button variant="contained" color="warning" fullWidth sx={{ mt: 1 }} onClick={resetToDefault}>
        Reset to default
      </Button>
      <Button fullWidth sx={{ mt: 1 }} onClick={backToMainMenu}>
        Back to main menu
      </Button>
    </Box>
  );
}
