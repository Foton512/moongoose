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
