# Poppy Util

## Usage

### Install

```shell
$ pnpm install poppy-util
```

使用

```
// es
import { isMobile } from 'poppy-util';
```

```
// browser
<script src="node_modules/poppy-util/dist/poppy-util.iife.js"></script>
```

### Publish

```
nrm use npm && pnpm publish --no-git-checks --access=public && nrm use taobao
```

Poppy Framework Js Util Packages

文档 : [中文文档](https://imvkmark.github.io/popjs-util/index.html)

## TODO

[] types.ts
[] testing in browser
[] auto generate document

[popjs-util](https://github.com/imvkmark/popjs-util)

## Versions

### 0.1.0

- 将 emitter 移除
- 移除 less / 使用 tailwind css

### 0.0.x

- ua
- axios
- emit