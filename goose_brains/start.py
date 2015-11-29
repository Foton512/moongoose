#!/usr/bin/env python

import serial
from time import sleep

s = serial.Serial("/dev/ttyACM0", 9600)
s.write(chr(0) + chr(100) + chr(0))
s.write(chr(1) + chr(100) + chr(0))
#sleep(1)
#s.write(chr(0) + chr(0) + chr(0))
#s.write(chr(1) + chr(0) + chr(0))
