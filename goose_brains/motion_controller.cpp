#include "motion_controller.h"

TMotionState::TMotionState(const rapidjson::Value& jsonObj) {
    const auto& direction = jsonObj["direction"];
    if (direction.IsNull()) {
        Direction = EDirectionType::None;
    } else if (direction == "forward") {
        Direction = EDirectionType::Forward;
    } else if (direction == "backward") {
        Direction = EDirectionType::Backward;
    } else if (direction == "rotate_cw") {
        Direction = EDirectionType::RotateCW;
    } else if (direction == "rotate_ccw") {
        Direction = EDirectionType::RotateCCW;
    }

    const auto& turn = jsonObj["turn"];
    if (turn.IsNull()) {
        Turn = ETurnType::None;
    } else if (turn == "left") {
        Turn = ETurnType::Left;
    } else if (turn == "right") {
        Turn = ETurnType::Right;
    }

    Speed = jsonObj["speed"].GetDouble();
    TurnSpeed = jsonObj["turn_speed"].GetDouble();
}

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
