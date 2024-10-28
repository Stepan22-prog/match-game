import { useState } from "react";

type CustomSettingsState = {
  value: number;
  error: boolean;
};

type GameState = {
  total: number;
  maxPerMove: number;
};

export function useCustomSettings(
  initialGameState: GameState, 
  setGameState: (total: number, maxPerMove: number) => void
) {
  const [total, setTotal] = useState<CustomSettingsState>({
    value: initialGameState.total,
    error: false,
  });

  const [maxPerMove, setMaxPerMove] = useState<CustomSettingsState>({
    value: initialGameState.maxPerMove,
    error: false,
  });

  const handleTotalInputChange = (value: string) => {
    const numValue = +value;
    if (!numValue) {
      setTotal({ value: initialGameState.total, error: true });
    } else {
      setTotal({ value: numValue * 2 + 1, error: false });
    }
  };

  const handleMaxPerMoveInputChange = (value: string) => {
    const numValue = +value;
    if (!numValue || numValue > total.value / 2) {
      setMaxPerMove({ value: initialGameState.maxPerMove, error: true });
    } else {
      setMaxPerMove({ value: numValue, error: false });
    }
  };

  const resetToDefault = () => {
    setTotal({ value: 25, error: false });
    setMaxPerMove({ value: 3, error: false });
    setGameState(25, 3);
  };

  const handleSave = () => {
    setGameState(total.value, maxPerMove.value);
  };

  return {
    total,
    maxPerMove,
    handleTotalInputChange,
    handleMaxPerMoveInputChange,
    resetToDefault,
    handleSave,
  };
}
