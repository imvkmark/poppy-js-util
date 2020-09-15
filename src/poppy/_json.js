import { trim } from 'lodash-es';

/**
 * 字串转 json
 * @param {string|object} resp
 * @returns {*}
 */
export const toJson = function(resp) {
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
};