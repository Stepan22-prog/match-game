import { useState } from 'react';

export function useScreenState() {
  const [screenState, setScreenState] = useState<'mainMenu' | 'customMenu' | 'game'>('mainMenu');

  const goToMainMenu = () => setScreenState('mainMenu');
  const goToCustomMenu = () => setScreenState('customMenu');
  const goToGameScreen = () => setScreenState('game');

  return { screenState, goToMainMenu, goToCustomMenu, goToGameScreen };
}
