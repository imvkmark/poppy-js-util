import { describe, expect, it } from "vitest";
import { isDesktopClient, isMobileClient, isTouchDevice, isWechat, matchUa, sysDevice, sysOs, sysUserAgent, sysVersion, viewport } from "../src/index";


describe('客户端', function () {
    it('客户端 OS : ' + sysOs(), function () {
        expect(sysOs()).to.be.a('string');
    });

    const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 CustomUa/2.3.6/ios/Y'
    it('自定义Ua :' + matchUa(ua, 'CustomUa'), function () {
        const uaK = '... Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 CustomUa'
        const uaKv = '... Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 CustomUa/2.3.6'
        const uaKvc = '... Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 CustomUa/2.3.6/ios'
        const uaFull = '... Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 CustomUa/2.3.6/ios/Y'
        expect(matchUa(uaK, 'CustomUa')).eq('CustomUa')
        expect(matchUa(uaKv, 'CustomUa')).eq('CustomUa/2.3.6')
        expect(matchUa(uaKvc, 'CustomUa')).eq('CustomUa/2.3.6/ios')
        expect(matchUa(uaFull, 'CustomUa')).eq('CustomUa/2.3.6/ios/Y')
    });
    it('客户端 OS Version : ' + sysVersion(), function () {
        expect(sysVersion()).to.be.a('string');
    });
    it('客户端 Device 信息 : ' + sysDevice(), function () {
        expect(sysDevice()).to.be.a('string');
    });
    it('客户端 Agent 信息 : ' + sysUserAgent(), function () {
        expect(sysUserAgent()).to.be.a('string');
    });
    it('客户端 Agent 是否是微信浏览器 : ' + (isWechat() ? 'Y' : 'N'), function () {
        expect(isWechat()).to.be.a('boolean');
    });
    it('客户端 Agent 是否是桌面端 : ' + (isDesktopClient() ? 'Y' : 'N'), function () {
        expect(isDesktopClient()).to.be.a('boolean');
    });
    it('客户端 Agent 是否是手机端 : ' + (isMobileClient() ? 'Y' : 'N'), function () {
        expect(isMobileClient()).to.be.a('boolean');
    });
    it('客户端 Agent 是否是触屏设备 : ' + (isTouchDevice() ? 'Y' : 'N'), function () {
        expect(isTouchDevice()).to.be.a('boolean');
    });
    it('客户端ViewPort : height:' + viewport().height + ', width:' + viewport().width, function () {
        expect(viewport()).to.be.a('object');
    });
});