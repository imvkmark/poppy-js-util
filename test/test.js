import { browser } from '../src';
import { buildUrl } from '../src/poppy/_http';

var expect = require('expect.js');

// js 测试源文件
var {isUrl, name} = require('../src/index.js');


describe('单元测试', function() {
    this.timeout(1000);

    describe('功能1', function() {
        it('相等', function() {
            expect(name).to.equal('base');
        });
    });

    describe('功能2', function() {
        it('不相等', function() {
            expect(name).not.to.equal(1);
        });
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
    });
});
