import { each, get, isArray, set } from "lodash-es";
import { strBefore } from "./string";

/**
 * 对象转换成url地址
 * @param url
 * @param  {object} params
 * @returns string
 * @deprecated 1.0
 * @see httpBuildQuery
 */
export const buildUrl = (url: string = '', params = {}) => {
    let str = '';
    for (let key in params) {
        str += key + '=' + get(params, key, '');
    }
    if (String(url) !== '') {
        return url.indexOf('?') >= 0 ? url + '&' + str : url + '?' + str;
    } else {
        return str;
    }
}


/**
 * 获取域名信息
 * @param url
 * @returns {string}
 */
export const domain = (url: string): string => {
    try {
        return (new URL(url)).hostname;
    } catch (e) {
        return ''
    }
}


/**
 * 根据参数名获取对应的url参数
 * @param {string} name 要取的值key
 * @param {string} from 指定的地址
 * @returns {string|null}
 */
export const queryString = (name: string, from: string = '') => {
    let search = from ? from : window.location.search;
    let searchObj = (new URLSearchParams(search));
    return searchObj.get(name);
}


/**
 * 解析url
 * @param {string} url 当前网址url
 */
export const parseQueryString = (url: string) => {
    let obj = {},
        kv,
        key,
        value;
    let paraString = url.substring(url.indexOf('?') + 1, url.length).split('&');
    for (let i in paraString) {
        kv = paraString[i].split('=');
        key = kv[0];
        value = kv[1];
        set(obj, key, value)
    }
    return obj;
}


/**
 * 组合请求Url
 * @param url
 * @param params
 */
export const httpBuildQuery = (url: string = '', params: any = {}) => {
    let urlComp = ''
    if (url && url.indexOf('?') === -1) {
        urlComp = `${url}?`;
    }
    let usp = new URLSearchParams();
    each(params,  (val, idx) => {
        if (isArray(val)) {
            each(val,  (_val) => {
                usp.append(idx + '[]', _val)
            })
        } else {
            usp.append(idx, val)
        }
    })
    let queryStr = usp.toString();
    return `${urlComp}${queryStr}`;
}


export const urlExtension = (url: string) => {
    let ext = url.substring(url.lastIndexOf('.') + 1);
    if (ext.indexOf('?') > -1) {
        return strBefore(ext, '?')
    }
    return ext;
}