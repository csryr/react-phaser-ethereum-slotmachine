import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connectToMetamask} from './EthersStuff';
import MetamaskButton from './MetamaskButton';

function Navbar() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    await connectToMetamask();
    setIsConnected(true);
  }

  return (
    <nav className="stroke">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="">Point Shop</Link>
        </li> 
        <div className="metamask-button-container">
          <MetamaskButton onClick={handleConnect} isConnected={isConnected} />    
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;