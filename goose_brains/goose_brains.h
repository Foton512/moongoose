#pragma once

#include "defaults.h"
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
private:
    std::string MJPGStreamerFileName;
    ui32 StreamWidth;
    ui32 StreamHeight;
    cv::VideoCapture Camera;
    ui32 Delay;
};
