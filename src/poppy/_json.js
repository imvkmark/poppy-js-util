import { trim } from 'lodash-es';

/**
 * 字串转 json
 * @param {string|object} resp
 * @returns {*}
 */
export function toJson(resp) {
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