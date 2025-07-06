import React from 'react';
import Tile from './Tile';
import './Row.css';

const Row = ({ guess }) => {
  return (
    <div className="row">
      {[0,1,2,3,4].map(i => {
        const tile = guess[i] || { letter: '', status: '' };
        return <Tile key={i} letter={tile.letter} status={tile.status} />;
      })}
    </div>
  );
};

export default Row;
