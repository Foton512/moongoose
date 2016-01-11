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
