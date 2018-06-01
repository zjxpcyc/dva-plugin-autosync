# dva-plugin-autosync

A plugin for dva which can automatically synchronize state

## Description 说明
一个简易的 [dva](https://github.com/dvajs/dva) 插件。

作用只有一个，同步当前的 state 到 store 中，用以节省相同作用的 reducer 代码。

## Install 安装

```bash
npm install dva-plugin-autosync --save
```

## Useage 使用

```javascript
// 1、注册
import autoSync from 'dva-plugin-autosync';

// const app = dva();
app.use(autoSync());

// 2、一般组件内如下方式调用 
dispatch({ type: 'SYNC@some-namespace', { ...state } });

// 3、或者 effects 内如下调用
yield put({ type: 'SYNC@some-namespace', { ...state } });
```

其中: `SYNC` 是固定字串, 也是 action type, `some-namespace` 是你当前的 namespace 名称, 即使在 model 文件中, 也不能省略。
