#!/usr/bin/env python

import RPi.GPIO as GPIO
import time
import subprocess
import os


def toggleNetworkSettings():
    firstInterfacesStr = open("/etc/network/interfaces").readline().rstrip()
    if "local_network" in firstInterfacesStr:
        currentMode = "local_network"
    else:
        currentMode = "access_point"

    if currentMode == "local_network":
        newMode = "access_point"
    else:
        newMode = "local_network"

    scriptsDir = os.path.dirname(os.path.abspath(__file__))
    print("Executing {}".format(" ".join([os.path.join(scriptsDir, "configure.sh"), os.path.join(scriptsDir, newMode)])))
    subprocess.call([os.path.join(scriptsDir, "configure.sh"), os.path.join(scriptsDir, newMode)])


def main():
    GPIO.setmode(GPIO.BCM)

    GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    while True:
        input_state = GPIO.input(18)
        if input_state == False:
            toggleNetworkSettings()
        time.sleep(1)

if __name__ == "__main__":
    main()
