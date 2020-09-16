import { domain } from '../src';

const expect = require('expect.js');

// js 测试源文件
const {isUrl, buildUrl, browser} = require('../src/index.js');

describe('单元测试', function() {
    this.timeout(1000);

    describe.skip('#viewport', function() {
    });

    describe('Http', function() {
        it('Browser', function() {
            expect(browser.isWechat).to.equal(false);
        });

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
