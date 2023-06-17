
import { ethers } from 'ethers';
import abi from './abi.json';

export async function connectToMetamask() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
    } catch (error) {}
  } else {}
}

const contractAddress = '0x8D1b9909Aa6F1AC152kcb2E1360c521D31248Dd';
const contractABI = abi;

export async function playSlotMachine(onOutcome: (outcome: string) => void) {

  await connectToMetamask();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  contract.on('Win', (player, payout) => {
    onOutcome('win');
  });

  contract.on('Lose', (player) => {
    onOutcome('lose');
  });
 
  await contract.play({ value: ethers.parseEther('0.001') });
}