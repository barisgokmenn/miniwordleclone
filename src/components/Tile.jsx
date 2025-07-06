import React from 'react';
import './Tile.css';

const Tile = ({ letter, status }) => {
  return (
    <div className={`tile ${status ? status : ''}`}>
      {letter}
    </div>
  );
};

export default Tile;
