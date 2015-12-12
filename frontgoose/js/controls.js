$(function() {
    var socket = new ReconnectingWebSocket("ws://192.168.1.234:9012", null, {debug: false, reconnectInterval: 1000});

    var keyboardState = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        rotateCW: false,
        rotateCCW: false,
        updateCommand: function() {
            var motionState = {
                direction: null,
                turn: null,
                speed: 1,
                turnSpeed: 0.8
            };

            if (this.rotateCW ^ this.rotateCCW) {
                if (this.rotateCW) {
                    motionState.direction = "rotateCW";
                } else {
                    motionState.direction = "rotateCCW";
                }
            } else if (this.forward ^ this.backward) {
                if (this.forward) {
                    motionState.direction = "forward";
                } else {
                    motionState.direction = "backward";
                }
            }

            if (this.left ^ this.right) {
                if (this.left) {
                    motionState.turn = "left";
                } else {
                    motionState.turn = "right";
                }
            }

            var command = {
                type: "setMotionState",
                data: motionState
            };
            socket.send(JSON.stringify(command));
        }
    };

    function processKeyboardEvent(keyCode, isDown) {
        switch (keyCode) {
            case 38:
            case 87: // a
                keyboardState.forward = isDown;
                break;
            case 40:
            case 83: // s
                keyboardState.backward = isDown;
                break;
            case 37:
            case 65: // w
                keyboardState.left = isDown;
                break;
            case 39:
            case 68: // d
                keyboardState.right = isDown;
                break;
            case 81: // q
                keyboardState.rotateCW = isDown;
                break;
            case 69: // e
                keyboardState.rotateCCW = isDown;
                break;
        }
        keyboardState.updateCommand();
    }

    document.onkeydown = function(event) {
        processKeyboardEvent(event.keyCode, true)
    };

    document.onkeyup = function(event) {
        processKeyboardEvent(event.keyCode, false)
    }
    $("#upButton").on({
        'touchstart' : function() {
            keyboardState.forward = true;
            keyboardState.updateCommand();
        },
        'touchend' : function() {
            keyboardState.forward = false;
            keyboardState.updateCommand();
        }
    });
    $("#downButton").on({
        'touchstart' : function() {
            keyboardState.backward = true;
            keyboardState.updateCommand();
        },
        'touchend' : function() {
            keyboardState.backward = false;
            keyboardState.updateCommand();
        }
    });
    $("#leftButton").on({
        'touchstart' : function() {
            keyboardState.left = true;
            keyboardState.updateCommand();
        },
        'touchend' : function() {
            keyboardState.left = false;
            keyboardState.updateCommand();
        }
    });
    $("#rightButton").on({
        'touchstart' : function() {
            keyboardState.right = true;
            keyboardState.updateCommand();
        },
        'touchend' : function() {
            keyboardState.right = false;
            keyboardState.updateCommand();
        }
    });
    $("#rotateCCWButton").on({
        'touchstart' : function() {
            keyboardState.rotateCCW = true;
            keyboardState.updateCommand();
        },
        'touchend' : function() {
            keyboardState.rotateCCW = false;
            keyboardState.updateCommand();
        }
    });
    $("#rotateCWButton").on({
        'touchstart' : function() {
            keyboardState.rotateCW = true;
            keyboardState.updateCommand();
        },
        'touchend' : function() {
            keyboardState.rotateCW = false;
            keyboardState.updateCommand();
        }
    });
});
