const expect = require('expect.js');

// js 测试源文件
const {browser, isUrl, buildUrl, domain, toFloat} = require('../src/index.js');
const {isAndroid, isIOS, isDesktop} = require('../src/index.js');


describe('单元测试', function() {
    this.timeout(1000);

    describe('浏览器', function() {
        it('浏览器Agent : ' + window.navigator.userAgent, function() {
            expect(window.navigator.userAgent).to.be.a('string');
        });
        it('浏览器不是 微信 浏览器', function() {
            expect(browser.isWechat).to.equal(false);
        });
        it('浏览器不是 Chrome 浏览器', function() {
            expect(browser.chrome).to.equal(false);
        });
        it('浏览器不是 Opera 浏览器', function() {
            expect(browser.opera).to.equal(false);
        });
        it('浏览器不是 IE 浏览器', function() {
            expect(browser.msie).to.equal(false);
        });
        it('浏览器不是 Edge 浏览器', function() {
            expect(browser.edge).to.equal(false);
        });
        it('浏览器不是 mozilla 浏览器', function() {
            expect(browser.mozilla).to.equal(false);
        });
        it('浏览器版本号是 ' + browser.version, function() {
            expect(browser.version).to.be.a('string');
        });
        it('浏览器是桌面客户端', function() {
            expect(browser.version).to.be.a('string');
        });
    });

    describe('Math', function() {
        it('toFloat', function() {
            expect(toFloat('haha', 0)).to.equal(0.00);
            expect(toFloat('0.235', 2)).to.equal(0.23);
        });
    });

    describe('Util 工具', function() {
        it('系统是 Android', function() {
            expect(isAndroid()).to.equal(true);
        });
        it('系统是 iOS', function() {
            expect(isIOS()).to.equal(true);
        });
        it('浏览器是手机客户端', function() {
            expect(isDesktop()).to.equal(false);
        });
    });

    describe('Http', function() {

        it('Url', function() {
            expect(isUrl('http://www.baidu.com')).to.equal(true);
            expect(isUrl('http://www.baidu.com?a=1')).to.equal(true);
            expect(isUrl('http://www.baidu.com?a=1#abc')).to.equal(true);
            expect(isUrl('http://www')).to.equal(false);
            expect(isUrl('http://my.info')).to.equal(true);
        });

        it('BuildUrl', function() {
            expect(buildUrl('http://www.baidu.com', {a : 1})).to.equal('http://www.baidu.com?a=1');
            expect(buildUrl()).to.equal('');
        });

        it('Domain', function() {
            expect(domain('http://www.baidu.com')).to.equal('www.baidu.com');
        });
    });
});
