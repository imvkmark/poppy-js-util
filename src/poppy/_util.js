/**
 * 判定是否是邮箱
 * @param str
 * @returns {boolean}
 */
export const isEmail = function(str) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
};


/**
 * 判定是否为手机号码
 * @param str
 * @returns {boolean|Array|{index: number, input: string}}
 */
export const isMobile = function(str) {
    let phone_number = str.replace(/\(|\)|\s+|-/g, '');
    return phone_number.length > 10 && phone_number.match(/^1[3-9][0-9]\d{4,8}$/);
};

/**
 * 生成随机字符
 * @param {number|string} length 长度
 * @param {boolean} use_case 是否
 * @returns {string}
 */
export const random = function(length = 16, use_case = false) {
    if (typeof length == 'undefined' || parseInt(length) === 0) {
        length = 16;
    }
    let chars = 'abcdefhjmnpqrstuvwxyz123456789';
    if (use_case) {
        chars += 'ABCDEFGHJKLMNPQRSTUVWYXZ';
    }
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
};


/**
 * 是否是触摸设备
 * check for device touch support
 * @returns {boolean}
 */
export const isTouchDevice = function() {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch (e) {
        return false;
    }
};


/**
 * 获取唯一ID
 * @param prefix
 * @returns {string}
 */
export const uniqueId = function(prefix) {
    let _pre = ( typeof prefix == 'undefined' ) ? '' : prefix;
    return _pre + Math.floor(Math.random() * ( new Date() ).getTime());
};