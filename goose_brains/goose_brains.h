#pragma once

#include "defaults.h"
#include "arduino_commands.h"
#include "motion_state.h"
#include "keyboard_controller.h"

#include "opencv2/highgui/highgui.hpp"
#include "opencv2/opencv.hpp"

#include <string>

class TGooseBrains {
public:
    TGooseBrains(const ui32 cameraIndex, const std::string& mjpgStreamerFileName,
                const ui32 streamWidth, const ui32 streamHeight,
                const ui32 delay);
    ~TGooseBrains();

    void MainLoop();
    void ProcessExternalEvent(const std::string& event);
private:
    void MoveStraight(const bool forward);
    void Rotate(const bool left);
    void StopMoving();
private:
    std::string MJPGStreamerFileName;
    ui32 StreamWidth;
    ui32 StreamHeight;
    cv::VideoCapture Camera;
    ui32 Delay;
    TArduinoCommands ArduinoCommands;
    TMotionState MotionState;
    TKeyboardController KeyboardController;
};
