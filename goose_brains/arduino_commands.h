#pragma once

#include "defaults.h"

#include <string>
#include <memory>
#include <fstream>

class TArduinoCommands {
public:
    TArduinoCommands();
    ~TArduinoCommands();

    void SetMotorSpeedAndDirection(const bool isLeft, const double speed, const bool forward);
    void SetBothMotorsSpeedAndDirection(const double speed, const bool forward);
    ui32 GetDistance();
private:
    void SendByte(const unsigned char value) const;
    unsigned char RecieveByte() const;
private:
    static constexpr ui32 LeftMotorCommand = 0;
    static constexpr ui32 RightMotorCommand = 1;
    static constexpr ui32 DistanceCommand = 2;
private:
    std::string DeviceAddr;
    int StreamDescriptor;
};
