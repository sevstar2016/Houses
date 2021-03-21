// blinking LED \\

var Gpio = require('onoff').Gpio
var LED = new Gpio(4, 'out')

function blinkLED(pin = 4) {
    LED = new Gpio(pin, 'out')
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

module.exports.blinkLED = blinkLED