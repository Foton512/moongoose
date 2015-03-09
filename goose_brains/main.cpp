#include "goose_brains.h"

int main(int argc, char** argv) {
    TGooseBrains gooseBrain(0, "/tmp/stream/pic.jpg", 640, 480, 30000);
    gooseBrain.MainLoop();

    return 0;
}
