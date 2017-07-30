import { Board, Accelerometer, Led, Button } from 'johnny-five';
import * as Particle from 'particle-io';
import { Subscription, Observable } from 'rxjs';

const board = new Board({
  io: new Particle({
    token: '2e06e7ecd7d237adfb93a0d8725e678cef15bed1',
    deviceId: '20001e001947333438373338'
  })
})

interface IPeripherics {
  id: number;
  color?: string;
  code: string;
}


const Buttons: IPeripherics[] = [
  { id: 1, code: 'A2', color: 'red' },
  { id: 2, code: 'A1', color: 'green' },
  { id: 3, code: 'A0', color: 'blue' }
]

const Leds: IPeripherics[] = [
  { id: 1, code: 'D7', color: 'red' },
  { id: 2, code: 'D5', color: 'green' },
  { id: 3, code: 'D5', color: 'blue' }
]


function initializeLeds(): any[] {
  let leds = [];
  Leds.forEach(l => {
    leds.push(new Led(l.code))
  });
  return leds;
}

function Strobe(leds) {
  leds.forEach((l, index) => {
    l.strobe(500 + (index * 20));
  });
}

function AllOff(leds){
  leds.forEach((l, index) => {
    l.off();
  });
}

board.on("ready", () => {
  console.log('ready for commands...');

  let okLeds = initializeLeds();
  
  Strobe(okLeds);


  // Buttons.forEach(button => {
  //   let b = new Button(button);
  //   initialized.push(b);
  //   b.on("up", () =>  {
  //     console.log(String(button) + " up");
  //     led.off();
  //   });
  //   b.on("down", () => {
  //     console.log(String(button) + " down");
  //     led.on();
  //   });
  // })



});


// import * as particle from 'particle-io';

// let board = new particle({
//     token: 'e288d678a77e6c6157e1f80bf0e1d6c81b29cc8c',
//     deviceId: '20001e001947333438373338',
// });

// console.dir(board);

// board.on("ready", function() {
//   console.log("Device Ready..");
//   this.pinMode("D7", this.MODES.OUTPUT);
 
//   var byte = 0;
 
//   // This will "blink" the on board led 
//   setInterval(function() {
//     this.digitalWrite("D7", (byte ^= 1));
//   }.bind(this), 500);
// });


// import * as five from 'johnny-five';
// var board = new five.Board();
 
// board.on("ready", function() {
//   // Create an Led on pin 13 
//   var led = new five.Led(13);
//   // Blink every half second 
//   led.blink(500);
// });