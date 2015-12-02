#include "goose_brains.h"

#include <unistd.h>

#include <iostream>
#include <exception>
#include <sstream>
#include <string>

using namespace std;
using namespace cv;

TGooseBrains::TGooseBrains(const ui32 cameraIndex, const string& mjpgStreamerFileName,
                         const ui32 streamWidth, const ui32 streamHeight,
                         const ui32 delay)
    : MJPGStreamerFileName(mjpgStreamerFileName)
    , Camera(cameraIndex)
    , StreamWidth(streamWidth)
    , StreamHeight(streamHeight)
    , Delay(delay)
    , ArduinoCommands()
{
    if (!Camera.isOpened()) {
        stringstream stream;
        stream << "Can't open /dev/video" << cameraIndex;
        throw runtime_error(stream.str());
    }
}

TGooseBrains::~TGooseBrains() {
    StopMoving();
    Camera.release();
}

void TGooseBrains::MainLoop() {
    for (ui32 iter = 0; ; ++iter) {
        Mat frame;
        Camera >> frame;

        Mat resizedFrame;
        resize(frame, resizedFrame, Size(StreamWidth, StreamHeight));

        imwrite(MJPGStreamerFileName, resizedFrame);

        usleep(Delay);
    }
}

void TGooseBrains::ProcessExternalEvent(const std::string& event) {
    if (event == "forward") {
        KeyboardController.SetKeyState(EKey::Forward, const bool pressed);
    } else if (event == "backward") {
        MoveStraight(false);
    } else if (event == "left") {
        Rotate(true);
    } else if (event == "right") {
        Rotate(false);
    } else if (event == "stop") {
        StopMoving();
    }
}
