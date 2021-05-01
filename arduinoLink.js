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
        })
    }

    getPort() {
        return this.port
    }
    getParser() {
        return this.parser
    }
    sendToPin(pin = '') {
        this.port.write('pin:'+pin+'%')
    }
    sendMessageFromAdress(adress = '', message = ''){
        this.port.write('adress:'+adress + '$' + message + '%')
    }
}

module.exports = {
    arduino
}