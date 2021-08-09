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
        this.value = "";
    }

    getPort() {
        return this.port
    }
<<<<<<< HEAD
    
    getParser() {
        return this.parser
    }

    sendToPin(pin = '') {
        this.port.write('pin:' + pin + '%')
    }

=======
    getParser() {
        return this.parser
    }
    sendToPin(pin = '') {
        this.port.write('pin:' + pin + '%')
    }
>>>>>>> 5bcdd0f531293cab00172be9cf307a1598ba92d4
    sendMessageFromAdress(adress = '', message = '') {
        this.port.write('adress:' + adress + '$' + message + '%')
        console.log("send")
    }
<<<<<<< HEAD

    retValue(){
        return value;
    }

=======
    retValue(){
        return value;
    }
>>>>>>> 5bcdd0f531293cab00172be9cf307a1598ba92d4
    getSensorValue(pin = '', func) {
        this.port.write('get:'+pin+'%')
        let pp = new Promise((resolve, reject) => {
            this.parser.on('data', data => {
                if(data != ""){
                    resolve(data);
                }
            })
        })

        pp.then((value) => {
            func(value);
        })
    }
}

module.exports = {
    arduino
}