import { trim } from 'lodash-es';

/**
 * 字串转 json
 * @param {string|object} resp
 * @returns {*}
 */
export const toJsonObject = (resp: string | object) => {
    let objResp;
    if (typeof resp === 'object') {
        objResp = resp;
    } else {
        if (trim(resp) === '') {
            objResp = {};
        } else {
            objResp = JSON.parse(resp);
        }
    }
    return objResp;
}


/**
 *
 * @param resp
 * @deprecated 1.0
 * @see toJsonObject
 */
export const toJson = (resp: string | object) => {
    return toJsonObject(resp);
}