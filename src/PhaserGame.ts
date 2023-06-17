import Phaser from 'phaser'
import SlotScene from './scenes/SlotScene'


const config: Phaser.Types.Core.GameConfig = {

  type: Phaser.AUTO,
  parent: 'gameContainer',


  scale: {
    width: 630,
    height: 400,


  },
  transparent: true,
  scene: [SlotScene],
}

export default function createPhaserGame() {
  return new Phaser.Game(config);
}