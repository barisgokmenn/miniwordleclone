import React from 'react';
import Row from './Row';
import './Gameboard.css';

const GameBoard = ({ guesses, currentGuess }) => {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    if (i < guesses.length) {
      rows.push(<Row key={i} guess={guesses[i]} />);
    } 
    else if (i === guesses.length) {
      const current = currentGuess
        .toUpperCase()
        .split('')
        .map((letter) => ({ letter, status: '' }));
      rows.push(<Row key={i} guess={current} />);
    } 
    else {
      rows.push(<Row key={i} guess={[]} />);
    }
  }

  return <div className="game-board">{rows}</div>;
};

export default GameBoard;
