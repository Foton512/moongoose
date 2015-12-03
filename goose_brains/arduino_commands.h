#pragma once

#include "defaults.h"

#include <string>
#include <memory>
#include <fstream>
#include <mutex>

class TArduinoCommands {
public:
    TArduinoCommands();
    ~TArduinoCommands();

    ui32 GetDistance();
    void SetMotorsSpeed(const double leftSpeed, const double rightSpeed);
private:
    void SetMotorSpeedAndDirection(const bool isLeft, const double speed, const bool forward);
    void SendByte(const unsigned char value) const;
    unsigned char RecieveByte() const;
private:
    static constexpr ui32 LeftMotorCommand = 0;
    static constexpr ui32 RightMotorCommand = 1;
    static constexpr ui32 DistanceCommand = 2;
private:
    std::string DeviceAddr;
    int StreamDescriptor;
    std::mutex ConnectionMutex;
};
