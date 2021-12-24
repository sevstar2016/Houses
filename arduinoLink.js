const SerialPort = require('serialport')
const ReadLine = require('@serialport/parser-readline')




class Arduino {
    constructor(portCon = '', delimeter = '\n', boundRate = 9600) {
        try{
            this.portCon = portCon;
            this.delimeter = delimeter
            this.boundRate = boundRate

            this.port = new SerialPort(portCon, { boundRate })
            this.parser = this.port.pipe(new ReadLine({ delimeter }))
            this.port.on("open", () => {
                console.log('serial port open')
            })
            this.value = "";
        }catch (e){
            console.log('qq')
        }
    }

    getPort() {
        return this.port
    }
    
    getParser() {
        return this.parser
    }

    sendToPin(pin = '') {
        this.port.write('pin:' + pin + '%')
    }

    getPinValue(pin = ''){
        this.port.write('gpin:'+pin+'%')
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

    sendMessageFromAdress(adress = '', message = '') {
        this.port.write('adress:' + adress + '$' + message + '%')
        console.log("send")
    }

    retValue(){
        return value;
    }

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
    Arduino
}