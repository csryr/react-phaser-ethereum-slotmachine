import './App.css'
import SlotScene from './scenes/SlotScene'
import createPhaserGame from './PhaserGame';
import React, { Component } from 'react';


export default function App() {

  const phaserGameRef = React.useRef<Phaser.Game>();

  React.useEffect(() => {
    phaserGameRef.current = createPhaserGame();
  }, []);

  const handleClick = () => {
    const scene = phaserGameRef.current?.scene.keys.slotscene as SlotScene;
    scene.createEmitter();
  };

  return (

    <>

      <div className="center">

        <div className="App-button-container">
          <button className="App-button" onClick={handleClick}>
            Load Game
          </button>
        </div>
        <div className="gamesq">
          <div id="gameContainer"></div>
        </div>

      </div>
    </>

  );

}

