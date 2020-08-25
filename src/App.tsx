import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <Board rows={3} cols={3} numToWin={3} />
    </div>
  );
}

export default App;
