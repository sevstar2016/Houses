const SerialPort = require('serialport')
const ReadLine = require('@serialport/parser-readline')

const port = new SerialPort('/dev/serial0', { baundRate:19200 })
const parser = port.pipe(new ReadLine({delimiter: '\n'}))

port.on("open", () => {
    console.log('serial port open')
})

parser.on('data', data => {
    console.log('got word from arduino:', data)
})

port.write("1");