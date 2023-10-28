import { get, includes } from "lodash-es";
import { UAParser } from "ua-parser-js";


/**
 * Ua 对象
 * @param userAgent
 */
const uaObject = (userAgent: string = '') => {
    return new UAParser(userAgent)
}

/**
 * 获取系统操作平台
 */
export const sysOs = (userAgent: string = ''): string => {
    return String(uaObject(userAgent).getOS().name);
}

/**
 * 返回系统版本号
 */
export const sysVersion = (userAgent: string = ''): string => {
    return String(uaObject(userAgent).getOS().version);
}

/**
 * 设备型号, 如果是浏览器需要传递浏览器的类型和版本号
 */
export const sysDevice = (userAgent: string = ''): string => {
    let ua = uaObject(userAgent);
    return (ua.getBrowser().name + '/' + ua.getBrowser().version)
}

/**
 * 设备 Agent 信息

 */
/**
 * 获取UA
 * @param userAgent 0.1.0 支持传入 UA
 * @since 0.0.1
 */
export const sysUserAgent = (userAgent: string = ''): string => {
    let strUa = userAgent;
    if (typeof window !== 'undefined') {
        strUa = window.navigator.userAgent;
    }
    return strUa
}

/**
 * 是否是微信浏览器
 * @since 0.1.0
 */
export const isWechat = (userAgent: string = ''): boolean => {
    let ua = uaObject(userAgent);
    return ua.getBrowser().name === 'WeChat'
};


/**
 * 是否是 Android 系统
 * @returns {boolean}
 */
export const isAndroid = (userAgent: string = ''): boolean => {
    let ua = uaObject(userAgent);
    let name = ua.getOS().name
    return includes(['HarmonyOS', 'Android'], name);
}


/**
 * 是否是 ios 系统
 * @returns {boolean}
 */
export const isIOS = (userAgent: string = ''): boolean => {
    let ua = uaObject(userAgent);
    return ua.getOS().name === 'iOS';
}

/**
 * 判定浏览器是否是桌面端
 * @returns {boolean}
 */
export const isDesktopClient = (userAgent: string = ''): boolean => {
    let ua = uaObject(userAgent);
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
    let ua = uaObject(userAgent);
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
 * 判定是否在 WebView 内(需要内置)
 * @returns {boolean}
 * @since 0.1.0
 */
export const isInWebView = (uaKey: string, userAgent: string = ''): boolean => {
    let ua = sysUserAgent(userAgent);
    return uaCustomMatch(ua, uaKey) !== '';
}


/**
 * 是否是触摸设备
 * check for device touch support
 * @returns {boolean}
 * @since 0.0.1
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
export const viewport = (): object => {
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


/**
 * 根据 ua 的关键词拆解出来 ua 字符串
 * @param userAgent
 * @param uaKey
 * @since 0.1.0
 */
export const uaCustomMatch = (userAgent: string, uaKey: string): string => {
    let reg = new RegExp(`.*\\s(?<name>${uaKey}.*?)(\\s|$)`, 'i');
    let name = '';
    let m;
    if ((m = reg.exec(userAgent)) !== null) {
        name = get(m, 'groups.name', '');
    }
    return name;
}


/**
 * 自定义 ua 的拆分
 * @param str
 * @since 0.1.0
 */
export const uaSplit = (str: string): object => {
    let arrStr = str.split('/');
    return {
        name: String(arrStr[0]),
        version: typeof arrStr[1] === 'undefined' ? '' : arrStr[1],
        channel: typeof arrStr[2] === 'undefined' ? '' : arrStr[2],
        isApprove: typeof arrStr[1] === 'undefined' ? 'N' : (arrStr[3] === 'Y' ? 'Y' : 'N'),
    }
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
