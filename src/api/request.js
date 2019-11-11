import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/token';

// 创建axios实例
const service = axios.create({
	// baseURL: "", // api的base_url
	timeout: 10000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
	(config) => {
		if (config.method == 'post') {
			config.params = {};
		}
		// 	config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

		// 让每个请求携带token
		config.headers['Authorization'] =
			getToken() || `Basic eWludW86eWludW9zZWNyZXQ=`;
		return config;
	},
	(error) => {
		console.log(error);
		// 请求被拦截时提示
		if (error.response.status == 401) {
			// 1.token已过期
			MessageBox.alert(
				store.getters.language == 'en'
					? `The token has expired please logIn again`
					: `登录已过期,请重新登录`,
				store.getters.language == 'en' ? `Prompt` : `提示`,
				{
					type: 'warning',
					callback: () => {
						store.dispatch('user/logout');
						return Promise.reject(new Error(error.message || 'Error'));
					}
				}
			);
		} else {
			Message({
				showClose: true,
				message: `${error.message}`,
				type: 'error',
				duration: 6000
			});
			return Promise.reject(new Error(error.message || 'Error'));
		}
	}
);

// respone拦截器
service.interceptors.response.use(
	(response) => {
		const res = response.data;
		if (!res) {
			Message({
				showClose: true,
				message:
					store.getters.language == 'en'
						? `Request failed with no data`
						: `请求失败，没有数据`,
				type: 'error',
				duration: 6000
			});
		}
		return res;
		//     if (res.code !== 20000) {
		//       Message({
		//         message: res.message,
		//         type: 'error',
		//         duration: 5 * 1000
		//       });
		//       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
		//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
		//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
		//           confirmButtonText: '重新登录',
		//           cancelButtonText: '取消',
		//           type: 'warning'
		//         }).then(() => {
		//           store.dispatch('FedLogOut').then(() => {
		//             location.reload();// 为了重新实例化vue-router对象 避免bug
		//           });
		//         })
		//       }
		//       return Promise.reject('error');
		//     } else {
		//       return response.data;
		//     }
	},
	(error) => {
		console.log(error);

		if (
			(error.response && error.response.status == 401) ||
			error.message.indexOf('401') > -1
		) {
			// 1.token已过期
			MessageBox.alert(
				store.getters.language == 'en'
					? `The token has expired please logIn again`
					: `登录已过期,请重新登录`,
				store.getters.language == 'en' ? `Prompt` : `提示`,
				{
					type: 'warning',
					callback: () => {
						store.dispatch('user/logout');
						return Promise.reject(new Error(error.message || 'Error'));
					}
				}
			);
		} else {
			Message({
				showClose: true,
				message: `${error.message}`,
				type: 'error',
				duration: 6000
			});
			return Promise.reject(new Error(error.message || 'Error'));
		}
		// return { data: { token: 123456 } };
	}
);

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
