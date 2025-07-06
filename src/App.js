import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { checkGuess } from './utils/checkGuess';
import './App.css';

const WORDS_API = 'https://raw.githubusercontent.com/getify/dwordly-game/refs/heads/main/five-letter-words.json';

const App = () => {
  const [solution, setSolution]         = useState('');
  const [guesses, setGuesses]           = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver]         = useState(false);
  const [hasWon, setHasWon]             = useState(false);

  const fetchNewWord = async () => {
    const response    = await fetch(WORDS_API);
    const words       = await response.json();
    const randomWord  = words[Math.floor(Math.random() * words.length)];
    setSolution(randomWord);
  };

  useEffect(() => {
    fetchNewWord();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || !solution) return;

      const key = e.key.toUpperCase();

      if (key === 'ENTER' && currentGuess.length === 5) {
        const guessResult = checkGuess(currentGuess, solution);
        const newGuesses = [...guesses, guessResult];
        setGuesses(newGuesses);

        if (currentGuess === solution) {
          setGameOver(true);
          setHasWon(true);
        } else if (newGuesses.length === 6) {
          setGameOver(true);
        }

        setCurrentGuess('');
      } 

      else if (key === 'BACKSPACE') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } 
      
      else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, guesses, gameOver, solution]);

  const handleRestart = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setHasWon(false);
    fetchNewWord();
  };

  return (
    <div className="app-container">
      <div className="game-wrapper">
        <GameBoard guesses={guesses} currentGuess={currentGuess} />
        {gameOver && (
          <>
            <div className="game-result">
              {hasWon ? '🎉 Kazandın!' : `❌ Cevap: ${solution}`}
            </div>
            <button onClick={handleRestart} className="restart-button">
              Yeniden Başlat
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
