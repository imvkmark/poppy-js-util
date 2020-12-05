/**
 * 对象转换成url地址
 * @param url
 * @param  {object} params
 * @returns {*}
 */
export function buildUrl(url, params = {}) {
    let str = '';
    for (let key in params) {
        str += key + '=' + params[key];
    }
    if (typeof url != 'undefined') {
        return url.indexOf('?') >= 0 ? url + '&' + str : url + '?' + str;
    } else {
        return str;
    }
}


/**
 * 检测给定的字串是否是 Url
 * @param str
 * @returns {boolean}
 */
export function isUrl(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater
    return pattern.test(str);
}


/**
 * 返回浏览器环境
 * @returns {{msie: (boolean|boolean), isIe10: boolean, opera: boolean, safari: boolean, mozilla: (boolean|boolean), isWechat: boolean, version: string, isIe9: boolean, isIe8: boolean}}
 */
export function browser() {
    let userAgent;
    if (typeof window !== 'undefined') {
        userAgent = window.navigator.userAgent.toLowerCase();
    } else {
        userAgent = '';
    }

    return {
        version : ( userAgent.match(/.+(?:rv|it|ra|ie)[/: ]([\d.]+)/) || [0, '0'] )[1],
        chrome : /chrome/.test(userAgent),
        opera : /opera/.test(userAgent),
        msie : /msie/.test(userAgent) && !/opera/.test(userAgent),
        mozilla : /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
        isIe8 : !!userAgent.match(/msie 8.0/),
        isIe9 : !!userAgent.match(/msie 9.0/),
        isIe10 : !!userAgent.match(/msie 10.0/),
        isWechat : !!userAgent.match(/micromessenger/)
    };
}


/**
 * 判定是否在 WebView 内
 * @returns {boolean|boolean}
 */
export function isInWebView() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) !== null) { // 微信浏览器判断
        return false;
    } else if (ua.match(/QQ/i) !== null) { // QQ浏览器判断
        return false;
    } else if (ua.match(/WeiBo/i) !== null) {
        return false;
    } else {
        if (ua.match(/Android/i) != null) {
            return ua.match(/browser/i) == null;
        } else if (ua.match(/iPhone/i) != null) {
            return ua.match(/safari/i) == null;
        } else {
            return ( ua.match(/macintosh/i) == null && ua.match(/windows/i) == null );
        }
    }
}

/**
 * 获取域名信息
 * @param url
 * @returns {string}
 */
export function domain(url) {
    let arrUrl = url.split('//');
    let start = arrUrl[1].indexOf('/');
    let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
    if (relUrl.indexOf('?') !== -1) {
        relUrl = relUrl.split('?')[0];
    }
    return relUrl;
}


/**
 * 根据参数名获取对应的url参数
 * @param {string} name 要取的值key
 * @returns {string|null}
 */
export function queryString(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


/**
 * 解析url，分析是否是分享订单，如果是展示弹窗
 * @param {string} url 当前网址url
 */
export function parseQueryString(url) {
    let obj = {},
        kv,
        key,
        value;
    let paraString = url.substring(url.indexOf('?') + 1, url.length).split('&');
    for (let i in paraString) {
        kv = paraString[i].split('=');
        key = kv[0];
        value = kv[1];
        obj[key] = value;
    }
    return obj;
}


/**
 * 解析 URl 地址
 * @param str
 * @param component
 * @returns {*}
 */
export function parseUrl(str, component) {
    let key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'],
        ini = ( this.php_js && this.php_js.ini ) || {},
        mode = ( ini['phpjs.parse_url.mode'] &&
            ini['phpjs.parse_url.mode'].local_value ) || 'php',
        parser = {
            php : /^(?:([^:/?#]+):)?(?:\/\/(?:(?:(?:([^:@]*):?([^:@]*))?@)?([^:/?#]*)(?::(\d*))?))?(?:((?:(?:[^?#/]*\/)*)(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            strict : /^(?:([^:/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:/?#]*)(?::(\d*))?))?((((?:[^?#/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose : /^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#/]*\.[^?#/.]+(?:[?#]|$)))*\/?)?([^?#/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
        };

    let m = parser[mode].exec(str),
        uri = {},
        i = 14;
    while (i--) {
        if (m[i]) {
            uri[key[i]] = m[i];
        }
    }

    if (component) {
        return uri[component.replace('PHP_URL_', '').toLowerCase()];
    }
    if (mode !== 'php') {
        let name = ( ini['phpjs.parse_url.queryKey'] &&
            ini['phpjs.parse_url.queryKey'].local_value ) || 'queryKey';
        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
        uri[name] = {};
        uri[key[12]].replace(parser, function($0, $1, $2) {
            if ($1) {
                uri[name][$1] = $2;
            }
        });
    }
    delete uri.source;
    return uri;
}