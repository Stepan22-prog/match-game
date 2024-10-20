import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import Menu from './components/Menu/MainMenu';
import Main from './components/Main';
import { useState } from 'react';

function App() {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true);
  const [firstMove, setFirstMove] = useState('player')

  function handleStartGame(mode: string) {
    setFirstMove(mode);
    setIsMainMenuOpen(false);
  }

  const backToMainMenu = () => setIsMainMenuOpen(true);

  return (
    <>
      {isMainMenuOpen ? <Menu handleStartGame={handleStartGame} /> : <Main backToMainMenu={backToMainMenu} firstMove={firstMove} />}
    </>
  )
}

export default App
