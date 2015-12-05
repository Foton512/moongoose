#include "command_dispatcher.h"
#include "rapidjson/document.h"

void TCommandDispatcher::Dispatch(const rapidjson::Document& command) {
    const auto& type = command["type"];

    if (type == "setMotionState") {
        MotionController.SetMotionState(TMotionState(command["data"]));
    }
}
