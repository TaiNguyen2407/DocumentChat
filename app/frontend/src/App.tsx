import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Document Chat Application
      </header>
      <body>
        <br />
        <label htmlFor="input">Name: </label>
        <input type="text" onClick={(e) => {
          console.log(e.target)
        }} />
      </body>
    </div>
  );
}

export default App;
