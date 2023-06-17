import Phaser from 'phaser'
import { playSlotMachine } from '../EthersStuff';


export default class SlotScene extends Phaser.Scene {
  barGroup: any;
  graphics: any;
  stage: any;
  spinCount: any;
  ref: any;
  rnd: any;
  spinTimer: any;
  constructor() {
    super('slotscene')
  }
  preload() {
    this.load.image("bars", "strip5.png");
    this.load.image("ref", "ref.png");
  }

  create() {

  }

  createEmitter() {
    this.barGroup = this.add.group();
    this.graphics = this.add.graphics();
    this.cameras.main.setBackgroundColor('161a30');
    this.scale.refresh();

    for (var i = 0; i < 3; i++) {
      var bar = this.add.sprite(i * 200, 0, "bars");
      this.barGroup.add(bar);
    }

    this.barGroup.children.iterate(function (child: { x: number; y: number; }) {
      child.x += 114;
      child.y += 720;
    });

    var shape2 = this.make.graphics({});
    shape2.fillStyle(0xffffff);
    shape2.beginPath();
    shape2.fillRect(0, 20, 700, 200);

    var mask2 = shape2.createGeometryMask();
    this.barGroup.children.iterate(function (child: { setMask: (arg0: Phaser.Display.Masks.GeometryMask) => void; }) {
      child.setMask(mask2);
    });

    this.setBar(0, 3);
    this.setBar(1, 6);
    this.setBar(2, 2);

    this.ref = this.add.sprite(this.scale.width / 2, this.scale.height * .75, "ref");
    this.ref.setOrigin(0.5, 0.5);
    this.ref.inputEnabled = true;
    this.ref.setInteractive();
    this.ref.on('pointerdown', this.startSpin, this);

    var glowTween = this.tweens.add({
      targets: this.ref,
      ease: 'Sine.easeInOut',
      duration: 1000,
      repeat: -1,
      yoyo: true,
      scaleX: {
        getStart: () => 1,
        getEnd: () => 1.2
      },
      scaleY: {
        getStart: () => 1,
        getEnd: () => 1.2
      }
    });
  }
  startSpin() {
    console.log("startSpin");

    this.spinCount = 3;
    this.ref.visible = false;

    var s1 = Phaser.Math.Between(1, 6);
    var s2 = Phaser.Math.Between(1, 6);
    var s3 = Phaser.Math.Between(1, 6);

    playSlotMachine((outcome) => {
      let gameOutcome = outcome;
      if (gameOutcome === 'lose') {
        this.setStop(0, s1);
        this.setStop(1, s2);
        this.setStop(2, s3);
      } else {
        this.setStop(0, s1);
        this.setStop(1, s1);
        this.setStop(2, s1);
      }

      this.spinTimer = this.time.addEvent({
        delay: 1,
        callback: this.spin,
        callbackScope: this,
        loop: true
      });
    });
  }
  setStop(i: number, stopPoint: any) {
    var bar = this.barGroup.getChildren()[i];
    bar.stopPoint = stopPoint;
    bar.active = true;
    bar.spins = Phaser.Math.Between(3, 10);
  }
  setBar(i: number, pos: number) {
    var bar = this.barGroup.getChildren()[i];
    bar.y = 720 - (200 * (pos - 1));
  }
  spin() {
    this.barGroup.children.iterate(function (bar: { active: boolean; y: number; spins: number; }) {

      if (bar.active == true) {
        bar.y -= bar.spins * 2;
 
        if (bar.y < -480) {
          bar.y = 720;
          bar.spins--;

          if (bar.spins == 0) {
            bar.active = false;
            this.finalSpin(bar);
          }
        }
      }
    }.bind(this));
  }
  finalSpin(bar: { stopPoint: number; }) {
    var ty = 720 - (200 * (bar.stopPoint - 1));
    var finalTween = this.tweens.add({
      targets: bar,
      y: ty,
      duration: 2000,
      ease: 'Linear'
    });
    finalTween.on('complete', this.checkFinished, this);
  }
  checkFinished() {

    this.spinCount--;
    
    if (this.spinCount == 0) {
      this.time.removeEvent(this.spinTimer);
      this.ref.visible = true;
    }
  }
  update() { }
}