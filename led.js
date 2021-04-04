// blinking LED \\

var Gpio = require('onoff').Gpio
const LED = new Gpio(4, 'out')

function blinkLED() {
    if (LED.readSync() === 0) { 
      LED.writeSync(1)
    } else {
      LED.writeSync(0)
    }
}


function endBlink() { 
    LED.writeSync(0)
    LED.unexport()
}

module.exports.led = {blinkLED};