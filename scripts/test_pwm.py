#!/usr/bin/env python

import os

class PWM:
    def __init__( self, pin ):
        self.pin = pin

    def set( self, value ):
        cmd = 'echo "%d=%.2f" > /dev/pi-blaster' % (self.pin, value/100. )
        os.system(cmd)

led = PWM(25)
led.set(0.5)
