import { trim } from 'lodash';

/**
 * 字串转 json
 * @param {string|object} resp
 * @returns {*}
 */
let _toJson = function(resp) {
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

export const toJson = _toJson;