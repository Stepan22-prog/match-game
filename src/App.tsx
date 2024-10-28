import Menu from './components/Menu/MainMenu';
import Main from './components/Main';
import CustomMenu from './components/Menu/CustomMenu';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useScreenState } from './hooks/useScreenState';
import { useGame } from './hooks/useGame';

function App() {
  const { screenState, goToMainMenu, goToCustomMenu, goToGameScreen } = useScreenState();
  const { gameState, setNumberOfMatches, setFirstMove } = useGame();

  const handleStartGame = (mode: 'computer' | 'player') => {
    setFirstMove(mode);
    goToGameScreen();
  };

  return (
    <>
      {screenState === 'customMenu' && (
        <CustomMenu
          setGameState={setNumberOfMatches}
          backToMainMenu={goToMainMenu}
          gameState={gameState}
        />
      )}
      {screenState === 'mainMenu' && (
        <Menu
          gameState={gameState}
          handleStartGame={handleStartGame}
          handleCustomMenuClick={goToCustomMenu}
        />
      )}
      {screenState === 'game' && (
        <Main
          gameState={gameState}
          backToMainMenu={goToMainMenu}
        />
      )}
    </>
  );
}

export default App;
