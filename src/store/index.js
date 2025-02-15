/*
// 加入cdn删除import
// import Vue from 'vue';
* */

import Vuex from 'vuex';
import getters from './getters';

/*
// 加入cdn删除import
// Vue.use(Vuex);
* */

const modulesFiles = require.context('./modules', true, /\.js$/);

// 你不需要import app from './modules/app'
// 它将自动加载所有模块文件
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;
	return modules;
}, {});

const store = new Vuex.Store({
	modules,
	getters
});

export default store;
