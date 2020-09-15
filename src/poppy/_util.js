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


/**
 * 字符是否是数字的判断
 * @param {string} param 字符参数
 * @returns {boolean}
 */
export const isNumber = (param) => {
    let regExp = /[^0-9]/;
    return !regExp.test(param);
};


/**
 * Debug Time
 * @returns {string}
 */
export const debugTime = (tip = '') => {
    let d = new Date();
    return '[' + ( tip ? tip + ':' : '' ) + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getMilliseconds() + '] ';
};


/**
 * 去除空白，包括换行和空格
 * @param {string} str 字符
 */
export const removerBlank = (str) => {
    //去掉所有的换行符
    str = str.replace(/\r\n/g, '');
    str = str.replace(/\n/g, '');
    //去掉所有的空格（中文空格、英文空格都会被替换）
    str = str.replace(/\s/g, '');
    //输出转换后的字符串
    return str;
};
