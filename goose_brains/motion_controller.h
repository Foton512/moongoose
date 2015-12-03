#pragma once

#include "arduino_commands.h"

enum class EDirectionType {
      Forward
    , Backward
    , RotateCW
    , RotateCCW
    , None
};

enum class ETurnType {
      Left
    , Right
    , None
};

struct TMotionState {
    EDirectionType Direction = EDirectionType::None;
    ETurnType Turn = ETurnType::None;
    double Speed = 1;
    double TurnSpeed = 0.8;

    bool operator ==(const TMotionState& rhs) const {
        return Direction == rhs.Direction &&
               Turn == rhs.Turn &&
               Speed == rhs.Speed &&
               TurnSpeed == rhs.TurnSpeed;
    }
};

class TMotionController {
public:
    explicit TMotionController(TArduinoCommands& arduinoCommands)
        : ArduinoCommands(arduinoCommands)
    { }
    void SetMotionState(const TMotionState& motionState);
    void SendMotionStateToArduino();
private:
    TMotionState MotionState;
    TArduinoCommands& ArduinoCommands;
};
