import { Box, Button, TextField } from "@mui/material";
import MatchButton from "../Buttons/MatchButton";
import { useState } from "react";

type MatchPickerType = {
  maxPerMove: number;
  disabled: boolean;
  remainingMatches: number;
  handlePlayerMove: (numberOfMatches: number) => void;
}

export default function MatchPicker({ maxPerMove, disabled, remainingMatches, handlePlayerMove }: MatchPickerType) {
  const [inputState, setInputState] = useState({ value: '', error: false });

  function handleInputChange(value: string) {
    if (+value && +value <= Math.min(maxPerMove, remainingMatches)) {
      setInputState({ value, error: false });
      return;
    }
    setInputState({ value, error: true });
  }

  function handleTake() {
    handlePlayerMove(+inputState.value);
    setInputState(prevValue => ({ ...prevValue, value: '' }));
  }

  return (
    <>
      {maxPerMove <= 6 && 
        <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: '1fr 1fr 1fr' }}>
          {[...Array(maxPerMove).keys()].map((numberOfMatches) => (
            <MatchButton
              key={numberOfMatches}
              disabled={disabled || remainingMatches < numberOfMatches + 1}
              onClick={handlePlayerMove}
              numberOfMatches={numberOfMatches + 1}
            />
          ))}
        </Box>
      }
      {maxPerMove > 6 &&
        <>
          <TextField
            error={inputState.error}
            label="m"
            variant="outlined"
            size="small"
            value={inputState.value}
            sx={{ width: '80px', mr: 1 }}
            helperText={`Max: ${Math.min(maxPerMove, remainingMatches)}`}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value)}
          />
          <Button disabled={disabled || inputState.error} variant="contained" onClick={handleTake}>
            Take
          </Button>
        </>
      }
    </>
  )
}
