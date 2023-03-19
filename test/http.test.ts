// js 测试源文件
import { domain, httpBuildQuery, isUrl, parseQueryString, queryString, urlExtension } from '../src/index';
import { describe, expect, it } from 'vitest'
import { get } from "lodash-es";


describe('Http', function () {

    it('Parse QueryString', function () {
        let qs = parseQueryString('name=a');
        expect(get(qs, 'name')).to.equal('a');
    });


    it('QueryString', function () {
        expect(queryString('name', 'name=some')).to.equal('some');
    });


    it('Url', function () {
        expect(isUrl('http://www.baidu.com')).to.equal(true);
        expect(isUrl('http://www.baidu.com?a=1')).to.equal(true);
        expect(isUrl('http://www.baidu.com?a=1#abc')).to.equal(true);
        expect(isUrl('http://')).to.equal(false);
        expect(isUrl('http://my.info')).to.equal(true);
    });

    it('BuildUrl', function () {
        expect(httpBuildQuery('http://www.baidu.com', { a: 1 })).to.equal('http://www.baidu.com?a=1');
        expect(httpBuildQuery()).to.equal('');
    });

    it('Domain', function () {
        expect(domain('http://www.baidu.com:8000')).to.equal('www.baidu.com');
        expect(domain('https://www.baidu.com')).to.equal('www.baidu.com');
        expect(domain('')).to.equal('');
    });

    it('Url Extension', function () {
        expect(urlExtension('https://www.baidu.com:8000/name.jpeg')).to.equal('jpeg');
    });
});
