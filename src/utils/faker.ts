/**
 * Url 地址
 * @param width
 * @param height
 */
export const fakerImgUrl: (width: number, height: number) => string = (width: number = 20, height: number = 20): string => {
    return `https://start.wulicode.com/img/${width}x${height}`;
};
