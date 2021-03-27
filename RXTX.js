const SerialPort = require('serialport')
const ReadLine = require('@serialport/parser-readline')

const port = new SerialPort('/dev/ttyAMA0', { baundRate:9600 })
const parser = port.pipe(new ReadLine({delimiter: '\n'}))

port.on("open", () => {
    console.log('serial port open')
})

parser.on('data', data => {
    console.log('got word from arduino: ', data)
})