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
	timeout: 20000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
	(config) => {
		if (config.method == 'post') {
			config.params = {};
		}
		// 	config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		// 让每个请求携带token
		if (!config.headers.Authorization) {
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
		console.log(!getRefreshTime(), storageUserAccount().getUserAccount());
		const res = response.data || null;
		// if (!res) {
		// 	Message({
		// 		showClose: true,
		// 		message:
		// 			store.getters.language == 'en'
		// 				? `Request failed with no data`
		// 				: `请求失败，没有数据`,
		// 		type: 'error'
		// 	});
		// }
		return res;
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
				console.log(!getRefreshTime(), storageUserAccount().getUserAccount());
				console.log(!getRefreshTime() && storageUserAccount().getUserAccount());
				if (!getRefreshTime() && storageUserAccount().getUserAccount()) {
					return doRequest(error);
				} else {
					Message.error(
						store.getters.language == 'en'
							? `The token has expired please logIn again`
							: `登录已过期,请重新登录`
					);
					store.dispatch('user/logout');
				}
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
	const data = await store.dispatch('user/refreshLogin');
	let { token_type: tokenType, access_token: accessToken } = data;
	let token = tokenType + accessToken;
	let config = error.response.config;
	config.headers.Authorization = token;
	const res = await axios.request(config);
	return res;
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
