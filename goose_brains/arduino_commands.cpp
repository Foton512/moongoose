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
    //OutputStream = make_shared<ofstream>(DeviceAddr);
    //if (!*OutputStream)
    //    cout << "Can't open " << DeviceAddr << ". Maybe you should execute sudo usermod -G dialout -a <username>" << endl;
    OutputStreamDescriptor = open(DeviceAddr.c_str(), O_RDWR);
}

TArduinoCommands::~TArduinoCommands() {
    //OutputStream->close();
}

void TArduinoCommands::SetMotorSpeedAndDirection(const bool isLeft, const double speed, const bool forward) {
    unsigned char c;
    unsigned char r;

    c = isLeft ? 0 : 1;
    write(OutputStreamDescriptor, &c, 1);

    read(OutputStreamDescriptor, &r, 1);
    cout << int(r) << endl;

    c = speed * 255;
    write(OutputStreamDescriptor, &c, 1);

    read(OutputStreamDescriptor, &r, 1);
    cout << int(r) << endl;

    c = forward ? 0 : 1;
    write(OutputStreamDescriptor, &c, 1);

    read(OutputStreamDescriptor, &r, 1);
    cout << int(r) << endl;
}
