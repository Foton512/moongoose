// source: http://docs.opencv.org/modules/highgui/doc/reading_and_writing_images_and_video.html
#include "opencv2/opencv.hpp"
#include "opencv2/highgui/highgui.hpp"

#include <iostream>
#include <string>
#include <sstream>

#include <time.h>
#include <limits.h>
#include <unistd.h>

using namespace cv;
using namespace std;

int main(int argc, char** argv) {
    int cameraIndex = 0;
    VideoCapture camera(cameraIndex);
    
    if (!camera.isOpened()) {
        cout << "ERROR: /dev/video" << cameraIndex << " fails to open!\n";
        return -1;
    }

    int width = 640;
    int height = 480;
    
    Mat frame;
    Mat resizedFrame;
    unsigned counter = 0;
    string imageFile = "/tmp/stream/pic.jpg";
    
    while(true) {
        ++counter;
        camera >> frame; // get a new frame from camera
        resize(frame, resizedFrame, Size(width, height));

        imwrite(imageFile, resizedFrame);

        usleep(30000);
        cout << counter << endl;
    }

    camera.release();

    return 0;
}
