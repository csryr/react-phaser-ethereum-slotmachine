type MetamaskButtonProps = {
  onClick: () => void;
  isConnected: boolean;
};

function MetamaskButton({ onClick, isConnected }: MetamaskButtonProps) {
  const handleOnClick = () => {
    if (typeof window.ethereum !== 'undefined') {
      onClick();
    } else {
      alert('Please install MetaMask to use this feature: https://metamask.io/download/');
    }
  };

  return (
    <button onClick={handleOnClick} className={isConnected ? 'connected' : ''}>
      {isConnected ? 'Connected' : 'Connect to Metamask'} <img src="fox.png" alt="Fox" style={{ height: 24, verticalAlign: 'middle' }}/>
    </button>
  );
}

export default MetamaskButton;