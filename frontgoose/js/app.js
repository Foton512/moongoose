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

function getPosition(offset, containerSize, fraction, elementSize) {
    return (offset + containerSize * fraction - elementSize / 2.).toString() + "px";
}

function positionElements() {
    var menuHeight = $("#topBar").height();
    var height = $(window).height() - menuHeight;
    var width = $(window).width();

    var streamImage = document.getElementById("streamImage");
    streamImage.style.maxWidth = width.toString() + "px";
    streamImage.style.maxHeight = (height).toString() + "px";

    var verticalButtonHeight = height / 3.;
    var verticalButtonWidth = width / 8.;
    var horizontalButtonHeight = height / 4.;
    var horizontalButtonWidth = width / 6.;

    var upButton = document.getElementById("upButton");
    var verticalButtonsLeft = getPosition(0, width, 7. / 8, verticalButtonWidth);
    upButton.style.left = verticalButtonsLeft;
    upButton.style.top = getPosition(menuHeight, height, 1. / 4, verticalButtonHeight);
    upButton.style.height = verticalButtonHeight.toString() + "px";
    upButton.style.width = verticalButtonWidth.toString() + "px";

    var downButton = document.getElementById("downButton");
    downButton.style.left = verticalButtonsLeft;
    downButton.style.top = getPosition(menuHeight, height, 3. / 4, verticalButtonHeight);
    downButton.style.height = verticalButtonHeight.toString() + "px";
    downButton.style.width = verticalButtonWidth.toString() + "px";

    var leftButton = document.getElementById("leftButton");
    var bottomHorizontalButtonsTop = getPosition(menuHeight, height, 3. / 4, horizontalButtonHeight);
    leftButton.style.left = getPosition(0, width, 1. / 8, horizontalButtonWidth);
    leftButton.style.top = bottomHorizontalButtonsTop;
    leftButton.style.height = horizontalButtonHeight.toString() + "px";
    leftButton.style.width = horizontalButtonWidth.toString() + "px";

    var rightButton = document.getElementById("rightButton");
    rightButton.style.left = getPosition(0, width, 3. / 8, horizontalButtonWidth);
    rightButton.style.top = bottomHorizontalButtonsTop;
    rightButton.style.height = horizontalButtonHeight.toString() + "px";
    rightButton.style.width = horizontalButtonWidth.toString() + "px";

    var rotateCCWButton = document.getElementById("rotateCCWButton");
    var topHorizontalButtonsTop = getPosition(menuHeight, height, 1. / 4, horizontalButtonHeight);
    rotateCCWButton.style.left = getPosition(0, width, 1. / 8, horizontalButtonWidth);
    rotateCCWButton.style.top = topHorizontalButtonsTop;
    rotateCCWButton.style.height = horizontalButtonHeight.toString() + "px";
    rotateCCWButton.style.width = horizontalButtonWidth.toString() + "px";

    var rotateCWButton = document.getElementById("rotateCWButton");
    rotateCWButton.style.left = getPosition(0, width, 3. / 8, horizontalButtonWidth);
    rotateCWButton.style.top = topHorizontalButtonsTop;
    rotateCWButton.style.height = horizontalButtonHeight.toString() + "px";
    rotateCWButton.style.width = horizontalButtonWidth.toString() + "px";
}

document.body.ontouchmove = function() {
    event.preventDefault();
};

$(function() {
    positionElements();
});

$(window).resize(function() {
    positionElements();
});

$(document).foundation({
    offcanvas : {
        open_method: "overlap",
        close_on_click: true
    }
});

// MIT License:
//
// Copyright (c) 2010-2012, Joe Walnes
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * This behaves like a WebSocket in every way, except if it fails to connect,
 * or it gets disconnected, it will repeatedly poll until it successfully connects
 * again.
 *
 * It is API compatible, so when you have:
 *   ws = new WebSocket('ws://....');
 * you can replace with:
 *   ws = new ReconnectingWebSocket('ws://....');
 *
 * The event stream will typically look like:
 *  onconnecting
 *  onopen
 *  onmessage
 *  onmessage
 *  onclose // lost connection
 *  onconnecting
 *  onopen  // sometime later...
 *  onmessage
 *  onmessage
 *  etc...
 *
 * It is API compatible with the standard WebSocket API, apart from the following members:
 *
 * - `bufferedAmount`
 * - `extensions`
 * - `binaryType`
 *
 * Latest version: https://github.com/joewalnes/reconnecting-websocket/
 * - Joe Walnes
 *
 * Syntax
 * ======
 * var socket = new ReconnectingWebSocket(url, protocols, options);
 *
 * Parameters
 * ==========
 * url - The url you are connecting to.
 * protocols - Optional string or array of protocols.
 * options - See below
 *
 * Options
 * =======
 * Options can either be passed upon instantiation or set after instantiation:
 *
 * var socket = new ReconnectingWebSocket(url, null, { debug: true, reconnectInterval: 4000 });
 *
 * or
 *
 * var socket = new ReconnectingWebSocket(url);
 * socket.debug = true;
 * socket.reconnectInterval = 4000;
 *
 * debug
 * - Whether this instance should log debug messages. Accepts true or false. Default: false.
 *
 * automaticOpen
 * - Whether or not the websocket should attempt to connect immediately upon instantiation. The socket can be manually opened or closed at any time using ws.open() and ws.close().
 *
 * reconnectInterval
 * - The number of milliseconds to delay before attempting to reconnect. Accepts integer. Default: 1000.
 *
 * maxReconnectInterval
 * - The maximum number of milliseconds to delay a reconnection attempt. Accepts integer. Default: 30000.
 *
 * reconnectDecay
 * - The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. Accepts integer or float. Default: 1.5.
 *
 * timeoutInterval
 * - The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. Accepts integer. Default: 2000.
 *
 */
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports){
        module.exports = factory();
    } else {
        global.ReconnectingWebSocket = factory();
    }
})(this, function () {

    if (!('WebSocket' in window)) {
        return;
    }

    function ReconnectingWebSocket(url, protocols, options) {

        // Default settings
        var settings = {

            /** Whether this instance should log debug messages. */
            debug: false,

            /** Whether or not the websocket should attempt to connect immediately upon instantiation. */
            automaticOpen: true,

            /** The number of milliseconds to delay before attempting to reconnect. */
            reconnectInterval: 1000,
            /** The maximum number of milliseconds to delay a reconnection attempt. */
            maxReconnectInterval: 30000,
            /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
            reconnectDecay: 1.5,

            /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
            timeoutInterval: 2000,

            /** The maximum number of reconnection attempts to make. Unlimited if null. */
            maxReconnectAttempts: null,

            /** The binary type, possible values 'blob' or 'arraybuffer', default 'blob'. */
            binaryType: 'blob'
        }
        if (!options) { options = {}; }

        // Overwrite and define settings with options if they exist.
        for (var key in settings) {
            if (typeof options[key] !== 'undefined') {
                this[key] = options[key];
            } else {
                this[key] = settings[key];
            }
        }

        // These should be treated as read-only properties

        /** The URL as resolved by the constructor. This is always an absolute URL. Read only. */
        this.url = url;

        /** The number of attempted reconnects since starting, or the last successful connection. Read only. */
        this.reconnectAttempts = 0;

        /**
         * The current state of the connection.
         * Can be one of: WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING, WebSocket.CLOSED
         * Read only.
         */
        this.readyState = WebSocket.CONNECTING;

        /**
         * A string indicating the name of the sub-protocol the server selected; this will be one of
         * the strings specified in the protocols parameter when creating the WebSocket object.
         * Read only.
         */
        this.protocol = null;

        // Private state variables

        var self = this;
        var ws;
        var forcedClose = false;
        var timedOut = false;
        var eventTarget = document.createElement('div');

        // Wire up "on*" properties as event handlers

        eventTarget.addEventListener('open',       function(event) { self.onopen(event); });
        eventTarget.addEventListener('close',      function(event) { self.onclose(event); });
        eventTarget.addEventListener('connecting', function(event) { self.onconnecting(event); });
        eventTarget.addEventListener('message',    function(event) { self.onmessage(event); });
        eventTarget.addEventListener('error',      function(event) { self.onerror(event); });

        // Expose the API required by EventTarget

        this.addEventListener = eventTarget.addEventListener.bind(eventTarget);
        this.removeEventListener = eventTarget.removeEventListener.bind(eventTarget);
        this.dispatchEvent = eventTarget.dispatchEvent.bind(eventTarget);

        /**
         * This function generates an event that is compatible with standard
         * compliant browsers and IE9 - IE11
         *
         * This will prevent the error:
         * Object doesn't support this action
         *
         * http://stackoverflow.com/questions/19345392/why-arent-my-parameters-getting-passed-through-to-a-dispatched-event/19345563#19345563
         * @param s String The name that the event should use
         * @param args Object an optional object that the event will use
         */
        function generateEvent(s, args) {
        	var evt = document.createEvent("CustomEvent");
        	evt.initCustomEvent(s, false, false, args);
        	return evt;
        };

        this.open = function (reconnectAttempt) {
            ws = new WebSocket(self.url, protocols || []);
            ws.binaryType = this.binaryType;

            if (reconnectAttempt) {
                if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) {
                    return;
                }
            } else {
                eventTarget.dispatchEvent(generateEvent('connecting'));
                this.reconnectAttempts = 0;
            }

            if (self.debug || ReconnectingWebSocket.debugAll) {
                console.debug('ReconnectingWebSocket', 'attempt-connect', self.url);
            }

            var localWs = ws;
            var timeout = setTimeout(function() {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'connection-timeout', self.url);
                }
                timedOut = true;
                localWs.close();
                timedOut = false;
            }, self.timeoutInterval);

            ws.onopen = function(event) {
                clearTimeout(timeout);
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onopen', self.url);
                }
                self.protocol = ws.protocol;
                self.readyState = WebSocket.OPEN;
                self.reconnectAttempts = 0;
                var e = generateEvent('open');
                e.isReconnect = reconnectAttempt;
                reconnectAttempt = false;
                eventTarget.dispatchEvent(e);
            };

            ws.onclose = function(event) {
                clearTimeout(timeout);
                ws = null;
                if (forcedClose) {
                    self.readyState = WebSocket.CLOSED;
                    eventTarget.dispatchEvent(generateEvent('close'));
                } else {
                    self.readyState = WebSocket.CONNECTING;
                    var e = generateEvent('connecting');
                    e.code = event.code;
                    e.reason = event.reason;
                    e.wasClean = event.wasClean;
                    eventTarget.dispatchEvent(e);
                    if (!reconnectAttempt && !timedOut) {
                        if (self.debug || ReconnectingWebSocket.debugAll) {
                            console.debug('ReconnectingWebSocket', 'onclose', self.url);
                        }
                        eventTarget.dispatchEvent(generateEvent('close'));
                    }

                    var timeout = self.reconnectInterval * Math.pow(self.reconnectDecay, self.reconnectAttempts);
                    setTimeout(function() {
                        self.reconnectAttempts++;
                        self.open(true);
                    }, timeout > self.maxReconnectInterval ? self.maxReconnectInterval : timeout);
                }
            };
            ws.onmessage = function(event) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onmessage', self.url, event.data);
                }
                var e = generateEvent('message');
                e.data = event.data;
                eventTarget.dispatchEvent(e);
            };
            ws.onerror = function(event) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'onerror', self.url, event);
                }
                eventTarget.dispatchEvent(generateEvent('error'));
            };
        }

        // Whether or not to create a websocket upon instantiation
        if (this.automaticOpen == true) {
            this.open(false);
        }

        /**
         * Transmits data to the server over the WebSocket connection.
         *
         * @param data a text string, ArrayBuffer or Blob to send to the server.
         */
        this.send = function(data) {
            if (ws) {
                if (self.debug || ReconnectingWebSocket.debugAll) {
                    console.debug('ReconnectingWebSocket', 'send', self.url, data);
                }
                return ws.send(data);
            } else {
                throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
            }
        };

        /**
         * Closes the WebSocket connection or connection attempt, if any.
         * If the connection is already CLOSED, this method does nothing.
         */
        this.close = function(code, reason) {
            // Default CLOSE_NORMAL code
            if (typeof code == 'undefined') {
                code = 1000;
            }
            forcedClose = true;
            if (ws) {
                ws.close(code, reason);
            }
        };

        /**
         * Additional public API method to refresh the connection if still open (close, re-open).
         * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
         */
        this.refresh = function() {
            if (ws) {
                ws.close();
            }
        };
    }

    /**
     * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
     * this indicates that the connection is ready to send and receive data.
     */
    ReconnectingWebSocket.prototype.onopen = function(event) {};
    /** An event listener to be called when the WebSocket connection's readyState changes to CLOSED. */
    ReconnectingWebSocket.prototype.onclose = function(event) {};
    /** An event listener to be called when a connection begins being attempted. */
    ReconnectingWebSocket.prototype.onconnecting = function(event) {};
    /** An event listener to be called when a message is received from the server. */
    ReconnectingWebSocket.prototype.onmessage = function(event) {};
    /** An event listener to be called when an error occurs. */
    ReconnectingWebSocket.prototype.onerror = function(event) {};

    /**
     * Whether all instances of ReconnectingWebSocket should log debug messages.
     * Setting this to true is the equivalent of setting all instances of ReconnectingWebSocket.debug to true.
     */
    ReconnectingWebSocket.debugAll = false;

    ReconnectingWebSocket.CONNECTING = WebSocket.CONNECTING;
    ReconnectingWebSocket.OPEN = WebSocket.OPEN;
    ReconnectingWebSocket.CLOSING = WebSocket.CLOSING;
    ReconnectingWebSocket.CLOSED = WebSocket.CLOSED;

    return ReconnectingWebSocket;
});

var imageNumber = 0; // Serial number of current image
var finished = new Array(); // References to image objects which have finished downloading

function createImageLayer() {
    var image = new Image();
    image.style.position = "absolute";
    var streamImage = document.getElementById("streamImage");
    image.width = streamImage.width;
    image.height = streamImage.height;
    image.style.zIndex = -1;
    image.onload = imageOnload;
    image.src = "http://192.168.1.234:8080/?action=snapshot&n=" + (++imageNumber);
    var stream = document.getElementById("stream");
    stream.insertBefore(image, stream.firstChild);
}

// Two layers are always present (except at the very beginning), to avoid flicker
function imageOnload() {
    this.style.zIndex = imageNumber; // Image finished, bring to front!
    while (1 < finished.length) {
        var del = finished.shift(); // Delete old image(s) from document
        del.parentNode.removeChild(del);
    }
    finished.push(this);
    createImageLayer();
}

$(function() {
    createImageLayer();
})
