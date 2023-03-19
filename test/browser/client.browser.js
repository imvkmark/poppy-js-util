const {
    isDesktopClient, sysOs,
    sysVersion,
    sysDevice,
    sysUserAgent,
    isMobileClient,
    isTouchDevice,
    viewport
} = require('../../src/index.js');
const { expect } = require('chai');
const describe = require('mocha/describe');
const it = require('mocha/it');
const { isWechat } = require("../../src/index.js");

describe('客户端', function () {
    it('客户端 OS : ' + sysOs(), function () {
        expect(sysOs()).to.be.a('string');
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
