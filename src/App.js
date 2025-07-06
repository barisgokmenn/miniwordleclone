import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { checkGuess } from './utils/checkGuess';

const WORDS_API = 'https://raw.githubusercontent.com/getify/dwordly-game/refs/heads/main/five-letter-words.json';

const App = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(WORDS_API);
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
    };

    fetchWord();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || !solution) return;

      const key = e.key.toUpperCase();

      if (key === 'ENTER' && currentGuess.length === 5) {
        const result = checkGuess(currentGuess, solution);
        setGuesses((prev) => [...prev, result]);
        setCurrentGuess('');
        if (currentGuess === solution || guesses.length === 5) {
          setGameOver(true);
        }
      } else if (key === 'BACKSPACE') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, guesses, gameOver, solution]);
  console.log('sol',solution)

  return (
    <div >
      <GameBoard guesses={guesses} currentGuess={currentGuess} />
    </div>
  );
};

export default App;
