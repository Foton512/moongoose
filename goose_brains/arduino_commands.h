#pragma once

#include <string>
#include <memory>
#include <fstream>

class TArduinoCommands {
public:
    TArduinoCommands();
    ~TArduinoCommands();

    void SetMotorSpeedAndDirection(const bool isLeft, const double speed, const bool forward);
private:
    std::string DeviceAddr;
    //std::shared_ptr<std::ofstream> OutputStream;
    int OutputStreamDescriptor;
};
