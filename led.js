// blinking LED \\

var Gpio = require('onoff').Gpio

function blinkLED(pin) {
    const LED = new Gpio(pin, 'out')
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