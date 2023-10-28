import { describe, expect, it } from "vitest";
import {
    isDesktopClient,
    isMobileClient,
    isTouchDevice,
    isWechat,
    sysDevice,
    sysOs,
    sysUserAgent,
    sysVersion,
    uaCustomMatch,
    uaSplit,
    viewport
} from "../src/index";
import { get } from "lodash-es";


describe('客户端', function () {
    it('客户端 OS : ' + sysOs(), function () {
        expect(sysOs()).to.be.a('string');
    });

    const ua = '... Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 CustomUa/2.3.6/ios/Y'
    it('自定义Ua :' + uaCustomMatch(ua, 'CustomUa'), function () {
        const uaK = '... Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 CustomUa'
        const uaKv = '... Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 CustomUa/2.3.6'
        const uaKvc = '... Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 CustomUa/2.3.6/ios'
        const uaFull = '... Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 CustomUa/2.3.6/ios/Y'

        expect(uaCustomMatch(uaK, 'CustomUa')).eq('CustomUa')
        expect(uaCustomMatch(uaKv, 'CustomUa')).eq('CustomUa/2.3.6')
        expect(uaCustomMatch(uaKvc, 'CustomUa')).eq('CustomUa/2.3.6/ios')
        expect(uaCustomMatch(uaFull, 'CustomUa')).eq('CustomUa/2.3.6/ios/Y')
        expect(uaCustomMatch(uaFull, 'customua')).eq('CustomUa/2.3.6/ios/Y')


        // 对比不区分大小写
        const uaIFull = '... Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69 customua/2.3.6/ios/Y'
        expect(uaCustomMatch(uaIFull, 'CustomUa')).eq('customua/2.3.6/ios/Y')

        // 获取中间部分, 不一定在最末尾
        expect(uaCustomMatch(uaIFull, 'edg')).eq('Edg/118.0.2088.69')
    });
    it('自定义Ua 拆解 :' + uaCustomMatch(ua, 'CustomUa'), function () {
        // only
        let uaSp = uaSplit('CustomUa');
        expect(get(uaSp, 'channel', '')).eq('')
        expect(get(uaSp, 'name', '')).eq('CustomUa')
        expect(get(uaSp, 'isApprove', '')).eq('N')
        expect(get(uaSp, 'version', '')).eq('')

        // 2 values
        uaSp = uaSplit('CustomUa/1.0.0');
        expect(get(uaSp, 'channel', '')).eq('')
        expect(get(uaSp, 'name', '')).eq('CustomUa')
        expect(get(uaSp, 'isApprove', '')).eq('N')
        expect(get(uaSp, 'version', '')).eq('1.0.0')

        // 3 values
        uaSp = uaSplit('CustomUa/1.0.0/custom');
        expect(get(uaSp, 'channel', '')).eq('custom')
        expect(get(uaSp, 'name', '')).eq('CustomUa')
        expect(get(uaSp, 'isApprove', '')).eq('N')
        expect(get(uaSp, 'version', '')).eq('1.0.0')

        // full values
        uaSp = uaSplit('CustomUa/1.0.0/custom/N');
        expect(get(uaSp, 'channel', '')).eq('custom')
        expect(get(uaSp, 'name', '')).eq('CustomUa')
        expect(get(uaSp, 'isApprove', '')).eq('N')
        expect(get(uaSp, 'version', '')).eq('1.0.0')

        uaSp = uaSplit('CustomUa/1.0.0/custom/Comp');
        expect(get(uaSp, 'channel', '')).eq('custom')
        expect(get(uaSp, 'name', '')).eq('CustomUa')
        expect(get(uaSp, 'isApprove', '')).eq('N')
        expect(get(uaSp, 'version', '')).eq('1.0.0')


        // 渠道为空
        uaSp = uaSplit('CustomUa/1.0.0//Comp');
        expect(get(uaSp, 'channel', '')).eq('')
        expect(get(uaSp, 'name', '')).eq('CustomUa')
        expect(get(uaSp, 'isApprove', '')).eq('N')
        expect(get(uaSp, 'version', '')).eq('1.0.0')

        // 渠道版本为空
        uaSp = uaSplit('CustomUa///Comp');
        expect(get(uaSp, 'channel', '')).eq('')
        expect(get(uaSp, 'name', '')).eq('CustomUa')
        expect(get(uaSp, 'isApprove', '')).eq('N')
        expect(get(uaSp, 'version', '')).eq('')
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