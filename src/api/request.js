import axios from 'axios';
import router from '@/router';
import { Message } from 'element-ui';
import store from '@/store';

import {
	getToken,
	// getRefreshToken,
	getRefreshTime
	// removeToken
} from '@/utils/token';
import { storageUserAccount } from '@/utils/validate';

// 创建axios实例
const service = axios.create({
	// baseURL: "", // api的base_url
	timeout: 60000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
	(config) => {
		if (config.method == 'post') {
			config.params = {};
		}
		// 	config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		// 让每个请求携带token
		if (!config.headers || (config.headers && !config.headers.Authorization)) {
			config.headers['Authorization'] = getToken();
		}
		return config;
	},
	(error) => {
		return Promise.reject(new Error(error.message || 'Error'));
	}
);

// respone拦截器
service.interceptors.response.use(
	(response) => {
		const data = response.data || null;
		return data;
	},
	(error) => {
		if (
			(error.response && error.response.status == 401) ||
			error.message.indexOf('401') > -1
		) {
			// 如果当前路由不是login，并且用户有用户名密码，还没有刷新过token
			// 那么去请求新 token
			if (router.currentRoute.name !== 'login') {
				// if (
				//   !getRefreshTime() &&
				//   storageUserAccount().getUserAccount() &&
				//   getRefreshToken()
				// ) {
				console.log(getRefreshTime());
				console.log(storageUserAccount().getUserAccount());
				if (!getRefreshTime() && storageUserAccount().getUserAccount()) {
					return doRequest(error);
				} else {
					Message.error(error.message);
					store.dispatch('user/logout');
				}
			} else {
				Message.error(error.message);
			}
		} else {
			Message({
				showClose: true,
				message: `${error.message}`,
				type: 'error'
			});
			return Promise.reject(new Error(error.message || 'Error'));
		}
		// return { data: { token: 123456 } };
	}
);

// 刷新token重新发起请求
async function doRequest(error) {
	try {
		const data = await store.dispatch('user/refreshLogin');
		const token = `${data.token_type} ${data.access_token} `;
		let config = error.config;
		config.headers['Authorization'] = token;
		const res = await axios.request(config);
		return res;
	} catch (error) {
		// 删除token并进入登录页面重新登录
		await store.dispatch('user/logout');
	}
}

export function get(url, params = {}, headers) {
	return service({
		url: url,
		method: 'get',
		params: params,
		headers
	});
}
export function post(url, data = {}, headers) {
	return service({
		url: url,
		method: 'post',
		data: data,
		headers
	});
}
export function put(url, data = {}, headers) {
	return service({
		url: url,
		method: 'put',
		data: data,
		headers
	});
}
export function DELETE(url, params = {}, headers) {
	return service({
		url: url,
		method: 'delete',
		params: params,
		headers
	});
}
