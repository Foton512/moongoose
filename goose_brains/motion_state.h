#pragma once

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
}

struct TMotionState {
    EDirectionType Direction = EDirectionType::None;
    ETurnType Turn = ETurnType::None;
};

struct TMotionParameters {
    double Speed = 1;
    double TurnSpeed = 1;
};
