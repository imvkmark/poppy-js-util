import { get, includes } from "lodash-es";
import UAParser from "ua-parser-js";


const ua = (new UAParser());

/**
 * 获取系统操作平台
 */
export const sysOs = (): string => {
    return String(ua.getOS().name);
}

/**
 * 返回系统版本号
 */
export const sysVersion = (): string => {
    return String(ua.getOS().version);
}

/**
 * 设备型号, 如果是浏览器需要传递浏览器的类型和版本号
 */
export const sysDevice = (): string => {
    return (ua.getBrowser().name + '/' + ua.getBrowser().version)
}

/**
 * 设备 Agent 信息
 */
export const sysUserAgent = (): string => {
    return ua.getUA()
}

/**
 * 是否是微信浏览器
 */
export const isWechat = (): boolean => {
    return ua.getBrowser().name === 'WeChat';
};


/**
 * 是否是 Android 系统
 * @returns {boolean}
 */
export const isAndroid = (): boolean => {
    let name = ua.getOS().name
    return includes(['HarmonyOS', 'Android'], name);
}

/**
 * 是否是 ios 系统
 * @returns {boolean}
 */
export const isIOS = (): boolean => {
    return ua.getOS().name === 'iOS';
}

/**
 * 判定浏览器是否是桌面端
 * @returns {boolean}
 */
export const isDesktopClient = () => {
    return !includes(['iOS', 'iPadOS', 'Android', 'HarmonyOS'], ua.getOS().name)
}

/**
 * 是否是手机端
 */
export const isMobileClient = (): boolean => {
    return isIOS() && isAndroid()
}


/**
 * 考虑使用独特的类型判定来使用
 * @returns {{msie: boolean, opera: boolean, chrome: boolean, edge: boolean, mozilla: boolean, isWechat: boolean, version: string | number | string}}
 * @deprecated 1.0
 * @removed 2.0
 */
export const browser = () => {
    let userAgent;
    if (typeof window !== 'undefined') {
        userAgent = window.navigator.userAgent.toLowerCase();
    } else {
        userAgent = '';
    }

    return {
        version: ua.getBrowser().version,
        chrome: ua.getBrowser().name === 'Chrome',
        opera: ua.getBrowser().name === 'Opera',
        msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
        edge: ua.getBrowser().name === 'Edge',
        mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
        isWechat: isWechat(),
    };
}


/**
 * 判定是否在 WebView 内,此函数可能无效
 * @returns {boolean}
 * @deprecated 1.0
 * @removed 2.0
 */
export const isInWebView = (): boolean => {
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
            return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null);
        }
    }
}


/**
 * 是否是触摸设备
 * check for device touch support
 * @returns {boolean}
 */
export const isTouchDevice = (): boolean => {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch (e) {
        return false;
    }
}


/**
 * 获取当前视窗的大小
 * To get the correct viewport width
 * based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
 * @returns {{width: *, height: *}}
 */
export const viewport = () => {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        let e = document.documentElement || document.body
        return {
            width: e.clientWidth,
            height: e.clientHeight
        }
    }
};

export const matchUa = (ua: string, str: string) => {
    let reg = new RegExp(`.*\\s(?<name>${str}.*?)$`);
    let name = '';
    let m;
    if ((m = reg.exec(ua)) !== null) {
        name = get(m, 'groups.name', '');
    }
    return name;
}

/**
 * 全屏
 * @param ele
 * @param options
 */
export const fullScreen = (ele: string, options: {}) => {
    let element = document.getElementById(ele);
    if (!element) {
        element = document.documentElement;
    }

    return element.requestFullscreen(options)
}


/**
 * 退出全屏
 */
export const exitFullScreen = () => {
    return document.exitFullscreen();
}
