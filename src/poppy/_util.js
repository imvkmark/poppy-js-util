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