# [poppy-js-util](https://github.com/imvkmark/poppy-js-util)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/imvkmark/poppy-js-util/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/imvkmark/poppy-js-util.svg?branch=master)](https://travis-ci.org/imvkmark/poppy-js-util)
[![Coveralls](https://img.shields.io/coveralls/imvkmark/poppy-js-util.svg)](https://coveralls.io/github/imvkmark/poppy-js-util)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/@popjs/util)
[![NPM downloads](http://img.shields.io/npm/dm/poppy-js-util.svg?style=flat-square)](http://www.npmtrends.com/@popjs/util)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/imvkmark/poppy-js-util.svg)](http://isitmaintained.com/project/imvkmark/poppy-js-util "Percentage of issues still open")

Poppy Framework Js Util Packages

## :rocket: 使用者指南

通过npm下载安装代码

```bash
$ npm install --save @popjs/util
```

如果你是node环境

```js
var poppyjs = require('@popjs/util');
```

如果你是webpack等环境

```js
import {isMobile} from '@popjs/util';
```

如果你是requirejs环境

```js
requirejs(['node_modules/@popjs/util/dist/index.aio.js'], function (base) {
    // xxx
})
```

如果你是浏览器环境

```html
<script src="node_modules/@popjs/util/dist/index.aio.js"></script>
```

## :bookmark_tabs: 文档

### api模版
函数简单介绍

函数详细介绍

函数参数和返回值（要遵守下面的例子的规则）

- param {string} name1 name1描述
- param {number} [name2] name2描述 ([]代表可选参数)
- param {string|number} name3 name3描述 (| 代表多种类型)
- param { * } name3 name3描述 (*代表任意类型)
- param {boolean} obj.sex 复合参数定义
- return {string} 返回值描述

举个例子（要包含代码用例）

```js
// 代码
```

特殊说明，比如特殊情况下会报错等


## :kissing_heart: 贡献者指南
首次运行需要先安装依赖

```bash
$ npm install
```

一键打包生成生产代码

```bash
$ npm run build
```

运行单元测试:

```bash
$ npm test
```

> 注意：浏览器环境需要手动测试，位于`test/browser`

修改 package.json 中的版本号，修改 README.md 中的版本号，修改 CHANGELOG.md，然后发布新版

```bash
$ npm run release
```

将新版本发布到npm

```bash
$ npm publish
```

## 贡献者列表

[contributors](https://github.com/imvkmark/poppy-js-util/graphs/contributors)

## :gear: 更新日志

### 0.2.0 / 2019-3-1

- 新增功能C
- 新增功能D

### 0.1.0 / 2018-3-1

- 新增功能A
- 新增功能B


## :airplane: 计划列表
[TODO.md](./TODO.md)