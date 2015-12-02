#pragma once

#include "motion_state.h"

#include <mutex>

enum class EKey {
      Forward
    , Backward
    , Left
    , Right
    , RotateCW
    , RotateCCW
    , NKeys
};

struct TKeyboardController {
public:
    TKeyboardController();

    void SetKeyState(const EKey, const bool pressed);
    TMotionState GetMotionState() const;
private:
    yvector<char> KeysState;
    std::mutex StateMutex;
};
