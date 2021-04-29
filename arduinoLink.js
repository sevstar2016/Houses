const SerialPort = require('serialport')
const ReadLine = require('@serialport/parser-readline')




class arduino {
    constructor(portCon = '', delimeter = '\n', boundRate = 9600) {
        this.portCon = portCon;
        this.delimeter = delimeter
        this.boundRate = boundRate

        this.port = new SerialPort(portCon, { boundRate })
        this.parser = this.port.pipe(new ReadLine({ delimeter }))
        this.port.on("open", () => {
            console.log('serial port open')
            this.port.write('49\n')
            this.port.write('1\n')
        })
    }

    getPort() {
        return this.port
    }
    getParser() {
        return this.parser
    }
    sendToPin(pin = '') {
        let strConv = ''
        for(let i = 0; i < pin.length; i++){
            strConv = strConv + pin.charCodeAt(i)
        }
        this.port.write(strConv + '\n')
        this.port.write(pin + '\n')
    }
}

module.exports = {
    arduino
}