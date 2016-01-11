var foundationOffCanvasEdgeSwipe = function() {
    var ocWrap    = $('.off-canvas-wrap');
    var menuRight = $('.right-off-canvas-menu');
    var menuLeft  = $('.left-off-canvas-menu');
    // Menu items start at top of page
    var scrollUpOnOpen = true;
 
    if (scrollUpOnOpen) {
        var prevScrollTop;
 
        $(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
            $(this).data('prevScrollTop', $(window).scrollTop());
            $('html, body').animate({ scrollTop: 0}, 350, 'swing');
        });
 
        $(document).on('close.fndtn.offcanvas', '[data-offcanvas]', function () {
            if ($(this).data('prevScrollTop')) {
                $('html, body').animate({ scrollTop: $(this).data('prevScrollTop')}, 350, 'swing');
            }
        });
    }
 
    var pageXstart;
    var pageXend;
    var windowWidth;
    var edgeThreshold;
    var minSwipeDistance;
 
    ocWrap.on('touchstart touchend', function(e) {
        if (!e.originalEvent || Foundation.utils.is_medium_up()) {
            pageXstart = null;
            return;
        }
 
        windowWidth = $(window).width();
        // Distance X that is considered part of screen edge
        edgeThreshold = windowWidth * 0.05;
        // Must swipe at least this far to trigger
        minSwipeDistance = windowWidth * 0.15;
 
        switch (e.type) {
            case 'touchstart' :
                // At most one finger touching
                if (e.originalEvent.targetTouches && e.originalEvent.targetTouches.length !== 1) {
                    pageXstart = null;
                    return;
                }
                pageXstart = e.originalEvent.changedTouches[0].pageX;
                break;
            case 'touchend' :
                pageXend = e.originalEvent.changedTouches[0].pageX;
 
                var swipeDistance = Math.abs(pageXend - pageXstart);
 
                if (swipeDistance < minSwipeDistance) {
                    return;
                }
 
                if (menuLeft.length) {
                    touchEnd('left');
                }
 
                if (menuRight.length) {
                    touchEnd('right');
                }
 
                break;
        }
    });
 
    var touchEnd = function(menuSide) {
        var oppositeSide = menuSide === 'left' ? 'right' : 'left';
        var menu = menuSide === 'left' ? menuLeft : menuRight;
        var menuIsOpened = (ocWrap.hasClass('offcanvas-overlap') && menu.css('transform') === 'none') ||
            ocWrap.hasClass('move-' + oppositeSide) || ocWrap.hasClass('offcanvas-overlap-' + oppositeSide);
        var swipeDirection = pageXend < pageXstart ? 'left' : 'right';
        var startedAtEdge = menuSide === 'left' ?
            pageXstart <= edgeThreshold : // Left edge
            pageXstart >= windowWidth - edgeThreshold;  // Right edge
        var opening = startedAtEdge && swipeDirection === oppositeSide;
        var closing = menuIsOpened && swipeDirection === menuSide;
 
        // Same action for opening and closing with this method
        if (opening || closing) {
            $('.' + menuSide + '-off-canvas-toggle').trigger('click');
        }
    };
};
 
jQuery(function($) {
    foundationOffCanvasEdgeSwipe();
});
