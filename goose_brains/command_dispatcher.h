#pragma once

#include "command.h"
#include "motion_controller.h"

class TCommandDispatcher {
public:
    explicit TCommandDispatcher(TMotionController& motionController)
        : MotionController(motionController)
    { }

    void Dispatch(const TCommand& command);

private:
    TMotionController& MotionController;
};
