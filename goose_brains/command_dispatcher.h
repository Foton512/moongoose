#pragma once

#include "motion_controller.h"
#include "rapidjson/document.h"

class TCommandDispatcher {
public:
    explicit TCommandDispatcher(TMotionController& motionController)
        : MotionController(motionController)
    { }

    void Dispatch(const rapidjson::Document& command);

private:
    TMotionController& MotionController;
};
