const gpio = require("pigpio").Gpio
const MICROSECDONDS_PER_CM = 1e6/34321  
let pins = []
class rasp {
    constructor() {
        try{
            this.value = "";
        }catch (e){
            console.log('qq')
        }
    }

    sendToPin(pin = '') {
        let p = new gpio(Number(pin), {mode:gpio.OUTPUT})
        p.digitalWrite(Number(pin))
    }

    getPinValue(pin = ''){
        let p = new gpio(Number(pin), {mode:gpio.INPUT})
        return p.digitalRead()
    }

    sendMessageFromAdress(adress = '', message = '') {
        let motor = new gpio(Number(adress), {mode: gpio.OUTPUT});
        
        motor.servoWrite(Number(message))
    }

    getSensorValue(pin = '', func) {
        let pp = new Promise((resolve, reject) => {
            let b = new gpio(Number(pin), {
                mode: gpio.INPUT,
                alert: true
            })
            
            let startTick = 0
            
            b.on('alert', (level, tick) => {
                if (level === 1) {
                    startTick = tick
                } else {
                    let endTick = tick
                    let diff = (endTick >> 0) - (startTick >> 0)
                    resolve(diff)
                }
            })
        })

        pp.then((value) => {
            func(value)
        })
    }
}

module.exports = {
    rasp
}