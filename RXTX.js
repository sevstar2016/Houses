var serial; // instance of the serialport library
var portName = '/dev/serial0'; // fill in your serial port name here
 
var circleSize = 50;
 
function setup() {
  serial = new p5.SerialPort(document.location.hostname);
  // set callback functions for list and data events:
  serial.on('list', printList);
  serial.on('data', serialEvent);
  serial.open(portName);
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