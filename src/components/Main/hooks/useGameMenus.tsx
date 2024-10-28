import { useState } from "react";

export function useGameMenus() {
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState(false);
  const [isGameOverMenuOpen, setIsGameOverMenuOpen] = useState<null | { winner: 'computer' | 'player' | 'draw' }>(null);

  const openPauseMenu = () => setIsPauseMenuOpen(true);
  const closePauseMenu = () => setIsPauseMenuOpen(false);

  const openGameOverMenu = (winner: 'computer' | 'player' | 'draw') => setIsGameOverMenuOpen({ winner });
  const closeGameOverMenu = () => setIsGameOverMenuOpen(null);

  return {
    isPauseMenuOpen,
    openPauseMenu,
    closePauseMenu,
    isGameOverMenuOpen,
    openGameOverMenu,
    closeGameOverMenu,
  };
}
