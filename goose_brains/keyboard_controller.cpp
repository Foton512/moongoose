#include "defaults.h"
#include "keyboard_controller.h"

TKeyboardController::TKeyboardController()
    : KeysState(EKey::NKeys, false)
{ }

void SetKeyState(const EKey, const bool pressed) {
    std::lock_guard<StateMutex> guard;
    KeysState[EKey] = pressed;
}

TMotionState TKeyboardController::GetMotionState() const {
    std::lock_guard<StateMutex> guard;

    if (KeysState[EKey::RotateCW] ^ KeysState[EKey::RotateCCW]) {
        if (KeysState[EKey::RotateCW]) {
            return TMotionState{EDirectionType::RotateCW, ETurnType::None};
        } else if (KeysState[EKey::RotateCCW]) {
            return TMotionState{EDirectionType::RotateCCW, ETurnType::None};
        }
    }

    TMotionState motionState;
    if (KeysState[EKey::Forward] ^ KeysState[EKey::Backward]) {
        if (KeysState[EKey::Forward]) {
            motionState.Direction = EDirectionType::Forward;
        } else if (KeysState[EKey::RotateCCW]) {
            motionState.Direction = EDirectionType::Backward;
        }
    } else {
        motionState.Direction = EDirectionType::Backward;
    }
    if (KeysState[EKey::Left] ^ KeysState[EKey::Right]) {
        if (KeysState[EKey::Left]) {
            motionState.Turn = ETurnType::Left;
        } else if (KeysState[EKey::RotateCCW]) {
            motionState.Turn = ETurnType::Right;
        }
    } else {
        motionState.Turn = ETurnType::None;
    }
    return motionState;
}
