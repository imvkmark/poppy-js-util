/**
 * 转换为浮点数
 * @param {string} str   字串
 * @param {number} scale 缩放的位数
 */
export function toFloat(str, scale = 2) {
    let fl = Number.parseFloat(str);
    if (isNaN(fl)){
        return '0.00';
    }
    return fl.toFixed(scale);
}