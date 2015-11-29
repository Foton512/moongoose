#include "arduino_commands.h"

#include <fcntl.h>
#include <unistd.h>

#include <cstdlib>
#include <iostream>

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

void TArduinoCommands::SetMotorSpeedAndDirection(const bool isLeft, const double speed, const bool forward) {
    SendByte(isLeft ? LeftMotorCommand : RightMotorCommand);
    SendByte(speed * 255);
    SendByte(forward ? 0 : 1);
}

void TArduinoCommands::SetBothMotorsSpeedAndDirection(const double speed, const bool forward) {
    for (ui32 i = 0; i < 2; ++i) {
        SetMotorSpeedAndDirection(i, speed, forward);
    }
}

ui32 TArduinoCommands::GetDistance() {
    SendByte(DistanceCommand);
    unsigned char highByte = RecieveByte();
    unsigned char lowByte = RecieveByte();
    return highByte * 256 + lowByte;
}
