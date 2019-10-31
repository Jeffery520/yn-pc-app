import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/token';
import qs from 'qs';
import { getLanguage } from '@/lang/index';

// 创建axios实例
const service = axios.create({
	// baseURL: "", // api的base_url
	timeout: 6000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
	(config) => {
		if (config.method == 'post') {
			config.params = {};
		}
		if (config.method != 'put') {
			config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		}

		// 让每个请求携带token
		config.headers['Authorization'] =
			getToken() || `Basic eWludW86eWludW9zZWNyZXQ=`;
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

// respone拦截器
service.interceptors.response.use(
	(response) => {
		const res = response.data;
		if (response.status === 200) {
			if (!res) {
				Message({
					showClose: true,
					message:
						getLanguage() == 'en'
							? `Request failed with no data`
							: `请求失败，没有数据`,
					type: 'error',
					duration: 6000
				});
			}
			return res;
		} else if (response.status === 401) {
			Message({
				showClose: true,
				message:
					getLanguage() == 'en'
						? `The token has expired please logIn again`
						: `token已过期,请重新登录`,
				type: 'error',
				duration: 6000
			});
			return Promise.reject(new Error(res.message || 'Error'));
		} else {
			return Promise.reject(new Error(res.message || 'Error'));
		}
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
		Message({
			showClose: true,
			message:
				`${error.message}` || getLanguage() == 'en'
					? `Request failed with unknown error`
					: `请求失败，出现未知错误`,
			type: 'error',
			duration: 6000
		});
		// return { data: { token: 123456 } };
		return Promise.reject(error);
	}
);

export function get(url, params = {}) {
	return service({
		url: url,
		method: 'get', // default
		params: params
	});
}
export function post(url, data = {}) {
	return service({
		url: url,
		method: 'post', // default
		data: qs.stringify(data)
	});
}
export function put(url, data = {}) {
	return service({
		url: url,
		method: 'put', // default
		data: data
	});
}
