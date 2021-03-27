const SerialPort = require('serialport')
const ReadLine = require('@serialport/parser-readline')

const port = new SerialPort('/dev/serial0', { baundRate:9600 })
const parser = port.pipe(new ReadLine({delimiter: '\n'}))

port.write('test', (err) => {
    if(err){
        return console.log('Error: ', err.message)
    }
    console.log('writen')
})

port.on("open", () => {
    console.log('serial port open')
})

parser.on('data', data => {
    if(data == "1"){
        console.log('tested')
    }
})