/*
|--------------------------------------------------------------------------
| 帮助函数
|--------------------------------------------------------------------------
|
*/

import { each, forEach, get, indexOf, round } from "lodash-es";
import { pyStorageDeviceIdKey } from "./conf";
import MD5 from "crypto-js/md5";

//region 尺寸MEDIA


const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 * 返回根据大小所匹配的 class name
 * @param size
 */
export const sizeClass = (size: string) => {
    return {
        xs: size === 'xs',
        sm: size === 'sm',
        md: size === 'md',
        lg: size === 'lg',
        xl: size === 'xl',
        xxl: size === 'xxl'
    }
}

/**
 * 百分比尺寸
 * @param size
 */
export const sizePercent = (size: string) => {
    switch (size) {
        case 'xs':
            return '100%';
        case 'sm':
            return '90%';
        case 'md':
            return '65%';
        case 'lg':
            return '43%';
        case 'xl':
            return '40%';
        case 'xxl':
            return '35%';
        default:
            return '30%';
    }
}


/**
 * 尺寸大于
 * @param a
 * @param b
 */
export const sizeGt = (a: string, b: string) => {
    let ia = indexOf(sizes, a);
    let ib = indexOf(sizes, b);
    return ia > ib;
}

/**
 * 尺寸小于
 * @param a
 * @param b
 */
export const sizeLt = (a: string, b: string) => {
    let ia = indexOf(sizes, a);
    let ib = indexOf(sizes, b);
    return ia < ib;
}

/**
 * 尺寸大于等于
 * @param a
 * @param b
 */
export const sizeGte = (a: string, b: string) => {
    let ia = indexOf(sizes, a);
    let ib = indexOf(sizes, b);
    return ia >= ib;
}
/**
 * 根据 size 计算宽度
 */
export const sizeWidth = (size: string, width: number) => {
    let ia = indexOf(sizes, size);
    const series = {
        0: 10 / 4,   // xs
        1: 8 / 4,   // sm
        2: 6 / 4,    // md
        3: 4 / 4,    // lg
        4: 3 / 4,    // xl
    }
    const calcWidth = round(get(series, ia, 1) * width);
    if (calcWidth <= 1) {
        return 1;
    } else if (1 < calcWidth && calcWidth <= 2) {
        return 2;
    } else if (2 < calcWidth && calcWidth <= 3) {
        return 3;
    } else if (3 < calcWidth && calcWidth <= 4) {
        return 4;
    } else if (4 < calcWidth && calcWidth <= 6) {
        return 6;
    } else if (6 < calcWidth && calcWidth <= 8) {
        return 8
    } else if (8 < calcWidth && calcWidth <= 12) {
        return 12
    } else {
        return 24
    }
}

/**
 * 尺寸小于等于
 * @param a
 * @param b
 */
export const sizeLte = (a: string, b: string) => {
    let ia = indexOf(sizes, a);
    let ib = indexOf(sizes, b);
    return ia <= ib;
}

//endregion

/*
|--------------------------------------------------------------------------
| 验证
|--------------------------------------------------------------------------
|
*/


//region Utils


/**
 * 返回 Debug 的时间
 */
export const debugTime = () => {
    const d = new Date();
    return '🕊 🕊 🕊 [' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getMilliseconds() + '] ';
}


/**
 * 获取唯一ID
 * @param prefix
 * @returns {string}
 */
export function uniqueId(prefix?: string) {
    let _pre = (typeof prefix == 'undefined') ? '' : prefix;
    return _pre + Math.floor(Math.random() * (new Date()).getTime());
}

//endregion


//region Browser
/**
 * 设置获取Store 的内容
 * @param {string|array} key
 * @param val
 * @returns
 */
export const localStore = (key: any, val?: any) => {
    /**
     * localStorage内存溢出时，则清空后继续保存
     * @param {string} key 缓存key
     * @param {string} data JSON.stringify后的数据
     */
    let _localStorageOverflow = (key: any, data: any) => {
        try {
            localStorage.setItem(key, data);
        } catch (e: any) { // 当缓存溢出，则清空后继续保存
            if (e.code === 'QUOTA_EXCEEDED_ERR_CODE') {
                localStorage.removeItem(key);
                localStorage.setItem(key, data);
            } else {
                console.error(e);
            }
        }
    };

    // 本地数据存储封装，没有过期时间限制，仅限于该页面的协议
    if (val === null) {
        if (typeof key === 'object') {
            each(key, function (ele, idx) {
                _localStorageOverflow(idx, ele); // 存储数据
            });
            return;
        } else {
            localStorage.removeItem(key);// 移除数据
            return;
        }
    }
    if (typeof val === 'undefined') {
        let data = localStorage.getItem(key);
        if (data) {
            try {
                data = JSON.parse(data);
                return data; // 获取数据
            } catch (err) {
                return data; // 获取数据
            }
        }
        return data; // 获取数据
    }
    if (typeof val === 'object') {
        _localStorageOverflow(key, JSON.stringify(val));
    } else {
        _localStorageOverflow(key, val);
    }
}


/**
 * 实现sessionStorage缓存的 存, 取, 删操作
 * @param key 对象, 批量设置
 * @param val 有值:设置; 无值: 获取; null, 删除;
 */
export const sessionStore = (key: any, val?: any) => {  // 本地数据存储封装，随页面回话结束而结束，仅限于该页面的协议
    if (val === null) {
        if (typeof key === 'object') {
            forEach(key, function (ele, idx) {
                sessionStorage.setItem(idx, ele);
            });
            return;
        } else {
            sessionStorage.removeItem(key);
            return;
        }
    }
    if (typeof val === 'undefined') {
        let data = sessionStorage.getItem(key);
        if (data) {
            try {
                data = JSON.parse(data);
                return data; // 获取数据
            } catch (err) {
                return sessionStorage.getItem(key); // 获取数据
            }
        }
        return data; // 获取数据
    }
    if (typeof val === 'object') {
        sessionStorage.setItem(key, JSON.stringify(val));
    } else {
        sessionStorage.setItem(key, val);
    }
}


/**
 * 返回设备ID, 如果本地存在则取本地
 */
export const deviceId = (): string => {
    const val = localStore(pyStorageDeviceIdKey)
    if (val) {
        return val;
    } else {
        let id = 'p-' + MD5(uniqueId('poppy-util')) + '-c'
        localStore(pyStorageDeviceIdKey, id);
        return id;
    }
}


//endregion
