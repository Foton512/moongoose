function positionElements() {
    var menuHeight = $("#topBar").height();
    var height = $(window).height() - menuHeight;
    var width = $(window).width();

    var streamImage = document.getElementById("streamImage");
    streamImage.style.maxWidth = width.toString() + "px";
    streamImage.style.maxHeight = (height).toString() + "px";

    var upButton = document.getElementById("upButton");
    var upButtonWidth = upButton.offsetWidth;
    var upButtonHeight = upButton.offsetWidth;
    upButton.style.left = (width * 3. / 4 - upButtonWidth / 2.).toString() + "px";
    upButton.style.top = (menuHeight + height / 4. - upButtonHeight / 2.).toString() + "px";

    var downButton = document.getElementById("downButton");
    var downButtonWidth = upButton.offsetWidth;
    var downButtonHeight = upButton.offsetWidth;
    downButton.style.left = (width * 3. / 4 - downButtonWidth / 2.).toString() + "px";
    downButton.style.top = (height * 3 / 4. - downButtonHeight / 2.).toString() + "px";
}

document.body.ontouchmove = function() {
    event.preventDefault();
};
$(function() {
    positionElements();
});
