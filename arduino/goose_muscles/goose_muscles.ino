#include <Servo.h>

// Pins
static const int LeftMotorSpeedPin = 6;
static const int LeftMotorDirectionPin = 7;
static const int RightMotorSpeedPin = 5;
static const int RightMotorDirectionPin = 4;
static const int HorizontalServoPin = 9;

static const int DistancePin = 0;

// Commands
static const int LeftMotorCommand = 0;
static const int RightMotorCommand = 1;
static const int DistanceMeasureCommand = 2;
static const int HorizontalServoCommand = 3;

// Serial
static const int DelayTime = 1;

// Global variables
//Servo HorizontalServo; TODO: More energy for servo


void setup() {
    pinMode(LeftMotorSpeedPin, OUTPUT);
    pinMode(LeftMotorDirectionPin, OUTPUT);
    pinMode(RightMotorSpeedPin, OUTPUT);
    pinMode(RightMotorDirectionPin, OUTPUT);
    pinMode(DistancePin, INPUT);

    //HorizontalServo.attach(HorizontalServoPin);
}

void SetMotorSpeedAndDirection(const bool isLeft, const int speed, const bool direction) {
    const int speedPin = isLeft ? LeftMotorSpeedPin : RightMotorSpeedPin;
    const int directionPin = isLeft ? LeftMotorDirectionPin : RightMotorDirectionPin;

    if (direction) {
        digitalWrite(directionPin, HIGH);   
    } else {
        digitalWrite(directionPin, LOW);   
    }
    analogWrite(speedPin, speed);
}

int ReadByteSync() {
    while (!Serial.available())
        delay(DelayTime);
    return Serial.read();
}

void loop() {
    const int command = ReadByteSync();
    if (command == LeftMotorCommand || command == RightMotorCommand) {
        const int speed = ReadByteSync();
        const int direction = ReadByteSync();
        const bool isLeft = command == LeftMotorCommand;
        SetMotorSpeedAndDirection(isLeft, speed, direction);
    } else if (command == DistanceMeasureCommand) {
        const int distance = analogRead(DistancePin);
        const int high = distance / 256;
        const int low = distance % 256;
        Serial.write(high);
        Serial.write(low);
    } else if (command == HorizontalServoCommand) {
        const int angle = ReadByteSync();
        //HorizontalServo.write(angle);
    }
}
