#include <Servo.h>

Servo servo[9];

String str = "";


//adress:0$90%

void setup() {
  Serial.begin(9600); 
  // put your setup code here, to run once:
  //servo[0].attach(5);
  //servo[0].write(0);

  for(int i = 2; i < 13; i++){
    pinMode(i, OUTPUT);
  }
  
  Serial.println("start");
}

void loop() {
  //delay(500);

  /*servo[0].write(0);
  delay(1500);
  servo[0].write(180);
  delay(1500);*/
  
  
  /*if (Serial.available() > 0) { 
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
    }
  }*/

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
    }
  }
}
