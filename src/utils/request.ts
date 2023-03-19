import { get, isEmpty, isObject, set } from 'lodash-es';
import axios, { AxiosInstance } from "axios";
import { emitter } from "./mitt";
import { deviceId } from "./helper";
import { sysDevice, sysOs, sysVersion } from "./client";

/**
 * 拦截器 : https://axios-http.com/zh/docs/interceptors
 */
let url = '';
if (!url) {
    url = `${window.location.protocol}//${window.location.host}`
}

export const createInstance = () => {
    let controller: any;
    const instance: AxiosInstance = axios.create({
        baseURL: url,
        timeout: 10000 // 请求超时 10s
    });

    // 添加请求拦截器
    instance.interceptors.request.use(
        (config) => {
            let url = config.url;
            emitter.emit(REQUEST_LOADING, { url });

            controller = new AbortController();
            config.signal = controller.signal;
            return config;
        },
        (error) => {
            // 对请求错误做些什么
            return Promise.reject(error);
        }
    );

    /**
     *  错误代码 @ axios
     * ERR_BAD_OPTION_VALUE
     * ERR_BAD_OPTION
     * ECONNABORTED
     * ETIMEDOUT
     * ERR_NETWORK
     * ERR_FR_TOO_MANY_REDIRECTS
     * ERR_DEPRECATED
     * ERR_BAD_RESPONSE
     * ERR_BAD_REQUEST
     * ERR_CANCELED
     */
    instance.interceptors.response.use(
        (response) => {
            // 对响应数据进行请求处理, 打印 Log
            const { config, data } = response;
            let url = config.url;
            emitter.emit(REQUEST_LOADED, { url });

            // 正确的响应, 但是没有任何数据返回
            if (isEmpty(data)) {
                return Promise.reject({ status: 204, message: '服务正确响应, 但未返回任何数据' });
            }

            // 按照结构正确返回数据
            const { data: resp = {}, status, message } = data;
            console.info(url, status, message, resp, data);
            return response;
        },
        (error) => {
            let code = get(error, 'code');
            if (code === 'ERR_CANCELED') {
                console.warn('error' + code, 400, error);
                return Promise.reject({ status: 400, message: '请求被取消', code });
            }
            const { config } = error;
            let url = config.url;
            emitter.emit(REQUEST_LOADED, { url });

            // 错误的响应
            let response = get(error, 'response');
            let request = get(error, 'request');
            if (isObject(error) && get(error, 'message') === 'canceled') {
                return Promise.reject(error);
            }

            console.warn(url, config.data, { type: 'response', response }, { 'type': 'request', request }, { type: 'error', error });
            let msg;
            if (response) {
                // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                let { data, statusText, status } = response;

                // 无网络
                if (status === 0) {
                    // ERR_NETWORK
                    console.error('response:' + code, url, status, code, error.message);
                    return Promise.reject({ status: 520, message: '网络连接异常, 请检查跨域/网络异常/触发Get数据过大', code });
                }

                msg = data.message || statusText;
                let exception = { message: data.message || statusText, status, code }
                // 500 | 404 | 403 | 401
                exception.message = '错误码 = ' + status + (msg ? ', Message:' + msg : '') + '，请联系管理人员或者是客服人员！'
                // ERR_BAD_REQUEST | ERR_BAD_RESPONSE
                console.error('response:' + code, url, exception.status, exception.message);
                return Promise.reject(exception);
            } else if (request) {
                // 请求已经成功发起，但没有收到响应 = [请求超时]  || ECONNABORTED
                let status = 408;
                if (code === 'ECONNABORTED') {
                    if (get(config, 'data') instanceof FormData) {
                        msg = '上传超时，请检查网络或压缩图片上传';
                    } else {
                        msg = '请求超时，请检查网络再试';
                    }
                }
                let exception = {
                    message: msg,
                    status,
                    code
                }
                console.error('request' + code, url, status, msg);
                return Promise.reject(exception);
            } else {
                msg = error.message || '未知错误';
                let exception = {
                    message: msg,
                    status: 415,
                    code
                }
                console.error('other-error', url, 415, msg);
                return Promise.reject(exception);
            }
        }
    )

    return {
        instance,
        abort: () => {
            if (controller instanceof AbortController) {
                controller.abort();
            }
        }
    }
}


export const pyBasicHeader = () => {
    let headers = {};
    set(headers, 'x-id', deviceId());
    set(headers, 'x-sys-name', String(sysOs()));
    set(headers, 'x-sys-version', sysVersion());
    set(headers, 'x-sys-device', sysDevice());
    return headers;
};


//region 请求事件定义
export const REQUEST_LOADED = 'request:loaded'
export const REQUEST_LOADING = 'request:loading'
export const REQUEST_500 = 'request:500'
export const REQUEST_401 = 'request:401'
export const REQUEST_404 = 'request:404'
export const REQUEST_413 = 'request:413'
export const REQUEST_EXCEPTION = 'request:exception'
//endregion
