#!/usr/bin/env python

import serial

s = serial.Serial("/dev/ttyACM0", 9600)
s.write(chr(0) + chr(0) + chr(0))
s.write(chr(1) + chr(0) + chr(0))
