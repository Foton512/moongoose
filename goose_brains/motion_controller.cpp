#include "motion_controller.h"

void TMotionController::SetMotionState(const TMotionState& motionState) {
    if (motionState == MotionState) {
        return;
    }
    MotionState = motionState;
    SendMotionStateToArduino();
}

void TMotionController::SendMotionStateToArduino() {
    auto leftMotorSpeed = 0.;
    auto rightMotorSpeed = 0.;

    if (MotionState.Direction == EDirectionType::Forward) {
        leftMotorSpeed = rightMotorSpeed = MotionState.Speed;
    } else if (MotionState.Direction == EDirectionType::Backward) {
        leftMotorSpeed = rightMotorSpeed = -MotionState.Speed;
    } else if (MotionState.Direction == EDirectionType::RotateCW) {
        leftMotorSpeed = MotionState.Speed;
        rightMotorSpeed = -leftMotorSpeed;
    } else if (MotionState.Direction == EDirectionType::RotateCCW) {
        rightMotorSpeed = MotionState.Speed;
        leftMotorSpeed = -leftMotorSpeed;
    }

    if (MotionState.Turn != ETurnType::None &&
        (MotionState.Direction == EDirectionType::Forward || MotionState.Direction == EDirectionType::Backward))
    {
        const auto speedMultiplier = 1 - MotionState.TurnSpeed;
        if (MotionState.Turn == ETurnType::Left) {
            rightMotorSpeed *= speedMultiplier;
        } else if (MotionState.Turn == ETurnType::Right) {
            leftMotorSpeed *= speedMultiplier;
        }
    }

    ArduinoCommands.SetMotorsSpeed(leftMotorSpeed, rightMotorSpeed);
}
