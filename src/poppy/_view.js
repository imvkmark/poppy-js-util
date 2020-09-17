/**
 * 获取当前视窗的大小
 * To get the correct viewport width
 * based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
 * @returns {{width: *, height: *}}
 */
export const viewport = function() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return {
            width : 0,
            height : 0
        };
    }
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
export function fullScreen(ele) {
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
}


/**
 * 退出全屏
 */
export function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/**
 * 获取浏览器窗口尺寸，兼容所有浏览器方法
 * @returns {number}
 */
export const windowHeight = () => {
    if (typeof document === 'undefined') {
        return 0;
    }
    return document.documentElement.clientHeight
        || window.innerHeight || document.body.clientHeight;
};