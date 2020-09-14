/**
 * 对象转换成url地址
 * @param url
 * @param  {object} params
 * @returns {*}
 */
export const buildUrl = function(url, params = {}) {
    let str = '';
    for (let key in params) {
        str += key + '=' + params[key];
    }
    if (typeof url != 'undefined') {
        return url.indexOf('?') >= 0 ? url + '&' + str : url + '?' + str;
    } else {
        return str;
    }
};


/**
 * 检测给定的字串是否是 Url
 * @param str
 * @returns {boolean}
 */
export const isUrl = function(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater
    return pattern.test(str);
};


/**
 * 返回浏览器环境
 * @returns {{msie: (boolean|boolean), isIe10: boolean, opera: boolean, safari: boolean, mozilla: (boolean|boolean), isWechat: boolean, version: string, isIe9: boolean, isIe8: boolean}}
 * @private
 */
export const browser = () => {
    let userAgent;
    if (typeof window !== 'undefined') {
        userAgent = window.navigator.userAgent.toLowerCase();
    } else {
        userAgent = '';
    }

    return {
        version : ( userAgent.match(/.+(?:rv|it|ra|ie)[/: ]([\d.]+)/) || [0, '0'] )[1],
        safari : /webkit/.test(userAgent),
        opera : /opera/.test(userAgent),
        msie : /msie/.test(userAgent) && !/opera/.test(userAgent),
        mozilla : /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
        isIe8 : !!userAgent.match(/msie 8.0/),
        isIe9 : !!userAgent.match(/msie 9.0/),
        isIe10 : !!userAgent.match(/msie 10.0/),
        isWechat : !!userAgent.match(/micromessenger/)
    };
};