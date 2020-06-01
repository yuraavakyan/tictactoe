import React from 'react';
import './App.css';
import Board from '../src/Board/board-comp';


function App() {
  return (
    <div className="App">
      <Board squares={30} rows={30} />
    </div>
  );
}

export default App;
