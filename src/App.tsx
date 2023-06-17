import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import createPhaserGame from './PhaserGame';
import GamePage from './GamePage';
import './App.css';
import Navbar from './Navbar';


export default function App() {
  const navigate = useNavigate();
  const phaserGameRef = React.useRef<Phaser.Game>();

  React.useEffect(() => {
    phaserGameRef.current = createPhaserGame();
  }, []);

  const handleImageClick = () => {
    if (window.ethereum.selectedAddress) {

      navigate('/game');
    } else {

      alert('Please connect to MetaMask');
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/game" element={<GamePage />} />
        <Route
          path="/"
          element={
            <>
              <div className="center">
                <img
                  src="slotf.png"
                  alt=""
                  className="hover-image"
                  width={300}
                  height={200}
                  onClick={handleImageClick}
                />
              </div>
            </>
          }
        />
      </Routes>
    </>
  );
}