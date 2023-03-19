/**
 * 生成随机字符
 * @param {number} length 长度
 * @param {boolean} use_upper 使用大写字母
 * @returns {string}
 */
import { camelCase, isObject, map, set, upperFirst } from "lodash-es";

export const strRandom = (length: number = 16, use_upper: boolean = false) => {
    let chars = 'abcdefhjmnpqrstuvwxyz123456789';
    if (use_upper) {
        chars += 'ABCDEFGHJKLMNPQRSTUVWYXZ';
    }
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;
}

/**
 * 字串之前
 * @param str
 * @param needle
 */
export const strBefore = (str: string, needle: string) => {
    return str.substring(0, str.indexOf(needle));
}


/**
 * 字串之后
 * @param str
 * @param needle
 */
export const strAfter = (str: string, needle: string) => {
    return str.substring(str.indexOf(needle) + needle.length);
}


/**
 * alias encode
 * @param data
 */
export const base64Encode = (data: any) => {
    return window.btoa(data);
}

/**
 * alias decode
 * @param data
 */
export const base64Decode = (data: string) => {
    return window.atob(data);
}

/**
 * 解码查询
 * @param data
 */
export const queryEncode: any = (data: object) => {
    let encode = {};
    map(data, (val, key) => {
        let valEncode;
        if (isObject(val)) {
            valEncode = '--wb--' + base64Encode(JSON.stringify(val));
        } else {
            valEncode = val;
        }
        set(encode, key, valEncode)
    });
    return encode;
}

/**
 * 恢复到查询对象
 * @param data
 */
export const queryDecode: any = (data: object) => {
    let decode = {};
    map(data, (val, key) => {
        let valDecode: any = val;
        if (String(val).indexOf('--wb--') === 0) {
            valDecode = JSON.parse(base64Decode(String(val).substring(6)));
        }
        set(decode, key, valDecode)
    });
    return decode
}


/**
 * 格式化
 * @param args
 */
export const sprintf = (...args: string[] | any[]) => {
    let replace = Array.prototype.slice.call(args, 1);
    let format = args[0];
    return format.replace(/{(\d+)}/g, (match: string, number: number) => {
        return typeof replace[number] != 'undefined'
            ? replace[number]
            : match
            ;
    });
}


/**
 * 首字母大写的KEY
 * @param str
 */
export const upperCamelCase = (str: string) => {
    return upperFirst(camelCase(str))
}


/**
 * 去掉标签
 * @param str
 */
export const stripTags = (str: string) => {
    return str.replace(/(<([^>]+)>)/gi, "");
}


/**
 * 去除空白，包括换行和空格
 * @param {string} str 字符
 */
export const trimAll = (str: string) => {
    //去掉所有的换行符
    str = str.replace(/\r\n/g, '');
    str = str.replace(/\n/g, '');
    //去掉所有的空格（中文空格、英文空格都会被替换）
    str = str.replace(/\s/g, '');
    //输出转换后的字符串
    return str;
}


export const removerBlank = (str: string) => {
    return trimAll(str)
}