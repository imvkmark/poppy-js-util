/**
 * 获取当前视窗的大小
 * To get the correct viewport width
 * based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
 * @returns {{width: *, height: *}}
 */
export const viewport = function() {
    let e = window,
        a = 'inner';
    if (!( 'innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }

    return {
        width : e[a + 'Width'],
        height : e[a + 'Height']
    };
};


/**
 * 全屏
 * @param ele
 */
export const fullScreen = function(ele) {
    let element;
    if (typeof ele == 'undefined') {
        element = document.documentElement;
    } else {
        element = document.getElementById(ele);
    }
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};


/**
 * 退出全屏
 */
export const exitFullScreen = function() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};