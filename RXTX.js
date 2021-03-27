var serial
const port = '/dev/serial0'

function setup() {
    serial = new p5.SerialPort();
    // set callback functions for list and data events:
    serial.on('list', printList);
    serial.on('data', serialEvent);
    // open the serial port:
    serial.open(port);
  }

  function serialEvent() {
    // read a line of text in from the serial port:
    var data = serial.readLine();
    console.log(data);
  }
   
  function printList(portList) {
    for (var i = 0; i < portList.length; i++) {
      console.log(i + ' ' + portList[i]);
    }
  }