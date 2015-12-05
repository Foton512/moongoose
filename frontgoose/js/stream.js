var imageNr = 0; // Serial number of current image
var finished = new Array(); // References to img objects which have finished downloading
var paused = false;

function createImageLayer() {
    var img = new Image();
    img.style.position = "absolute";
    img.style.zIndex = -1;
    img.onload = imageOnload;
    img.onclick = imageOnclick;
    img.src = "http://192.168.1.234:8080/?action=snapshot&n=" + (++imageNr);
    var stream = document.getElementById("stream");
    stream.insertBefore(img, stream.firstChild);
}

// Two layers are always present (except at the very beginning), to avoid flicker
function imageOnload() {
    this.style.zIndex = imageNr; // Image finished, bring to front!
    while (1 < finished.length) {
        var del = finished.shift(); // Delete old image(s) from document
        del.parentNode.removeChild(del);
    }
    finished.push(this);
    if (!paused) createImageLayer();
}

function imageOnclick() { // Clicking on the image will pause the stream
    paused = !paused;
    if (!paused) createImageLayer();
}

$(function() {
    createImageLayer();
})
