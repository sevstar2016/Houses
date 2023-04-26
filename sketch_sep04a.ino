#include <Servo.h>

Servo servo[9];

String str = "";

void setup() {
  Serial.begin(9600); 

  for(int i = 2; i < 13; i++){
    pinMode(i, OUTPUT);
  }
  
  Serial.println("start");
}

void loop() {
  if (Serial.available() > 0) { 
    char c = Serial.read();
    str += c;
    if (str[str.length() - 1] == '%') {
      if (str.substring(0, str.indexOf(":")) == "adress") {
        int dec = (str.substring(str.indexOf('$') + 1, str.indexOf('%'))).toInt();
        int adr = str.substring(7, str.indexOf("$")).toInt();
        servo[adr].write(dec);
        Serial.println("OK!");
        Serial.println(str);
        str = "";
      }
      else if(str.substring(0, str.indexOf(":")) == "pin"){
        digitalWrite(str.substring(4, str.indexOf('%')).toInt(), !digitalRead(str.substring(4, str.indexOf('%')).toInt()));
      }
      else if(str.substring(0, str.indexOf(":")) == "gpin"){
        Serial.println(digitalRead(str.substring(5, str.indexOf('%')).toInt()));
      }
    }
  }
}
