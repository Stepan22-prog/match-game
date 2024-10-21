import { useState } from 'react';
import Menu from './components/Menu/MainMenu';
import Main from './components/Main';
import CustomMenu from './components/Menu/CustomMenu';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [screenState, setScreenState] = useState<'mainMenu' | 'customMenu' | 'game'>('mainMenu');
  const [firstMove, setFirstMove] = useState<'computer' | 'player'>('player');
  const [gameState, setGameState] = useState<{ total: number, maxPerMove: number }>({ total: 25, maxPerMove: 3 });

  function handleStartGame(mode: 'computer' | 'player') {
    setFirstMove(mode);
    setScreenState('game');
  }

  const backToMainMenu = () => setScreenState('mainMenu');
  const goToCustomMenu = () => setScreenState('customMenu');

  function updateGameState(total: number, maxPerMove: number) {
    setGameState({ total, maxPerMove });
  }

  return (
    <>
      {screenState === "customMenu" && <CustomMenu setGameState={updateGameState} backToMainMenu={backToMainMenu} />}
      {screenState === "mainMenu" && 
        <Menu 
          gameState={gameState} 
          handleStartGame={handleStartGame} 
          handleCustomMenuClick={goToCustomMenu}
        />
      }
      {screenState === "game" && 
        <Main 
          gameState={gameState} 
          backToMainMenu={backToMainMenu} 
          firstMove={firstMove}
        />
      }
    </>
  )
}

export default App
