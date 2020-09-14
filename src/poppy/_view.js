/**
 * 获取当前视窗的大小
 * To get the correct viewport width
 * based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
 * @returns {{width: *, height: *}}
 */
let _viewport = function() {
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

export const viewport = _viewport();