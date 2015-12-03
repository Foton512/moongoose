#include "arduino_commands.h"

#include <fcntl.h>
#include <unistd.h>

#include <cstdlib>
#include <iostream>
#include <cmath>

using namespace std;

TArduinoCommands::TArduinoCommands()
    : DeviceAddr("/dev/ttyACM0") // TODO: can be ttyACM1. select existing device automatically
{
    system("stty -F /dev/ttyACM0 cs8 9600 ignbrk -brkint -icrnl -imaxbel -opost -onlcr -isig -icanon -iexten -echo -echoe -echok -echoctl -echoke noflsh -ixon -crtscts");
    StreamDescriptor = open(DeviceAddr.c_str(), O_RDWR);
    if (StreamDescriptor == -1)
        cout << "Can't open " << DeviceAddr << ". Maybe you should execute sudo usermod -G dialout -a <username>" << endl;
}

TArduinoCommands::~TArduinoCommands() {
    close(StreamDescriptor);
}

void TArduinoCommands::SendByte(const unsigned char value) const {
    write(StreamDescriptor, &value, 1);
}

unsigned char TArduinoCommands::RecieveByte() const {
    unsigned char result;
    read(StreamDescriptor, &result, 1);
    return result;
}

void TArduinoCommands::SetMotorsSpeed(const double leftSpeed, const double rightSpeed) {
    std::lock_guard<std::mutex> guard(ConnectionMutex);

    SetMotorSpeedAndDirection(true, abs(leftSpeed), leftSpeed > 0);
    SetMotorSpeedAndDirection(false, abs(rightSpeed), rightSpeed > 0);
}

void TArduinoCommands::SetMotorSpeedAndDirection(const bool isLeft, const double speed, const bool forward) {
    SendByte(isLeft ? LeftMotorCommand : RightMotorCommand);
    SendByte(speed * 255);
    SendByte(forward ? 0 : 1);
}

ui32 TArduinoCommands::GetDistance() {
    std::lock_guard<std::mutex> guard(ConnectionMutex);

    SendByte(DistanceCommand);
    unsigned char highByte = RecieveByte();
    unsigned char lowByte = RecieveByte();
    return highByte * 256 + lowByte;
}
