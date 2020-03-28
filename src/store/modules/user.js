import { login, getInfo, refreshLogin } from '@/api/user';
import {
	getToken,
	setRefreshToken,
	setToken,
	removeToken,
	setRefreshTime
} from '@/utils/token';
import { storageUserAccount } from '@/utils/validate';
import { resetRouter } from '@/router';
import { getLanguage } from '@/lang/index';
import router from '@/router';

const state = {
	token: getToken(),
	userInfo: {},
	roles: [],
	chatInfo: {},
	chatShow: false,
	hasUnreadMsg: 0,
	latLng: {
		lat: 40.703223217760105,
		lng: -74.01470912473707
	}
};

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token;
	},
	SET_USER_INFO: (state, userInfo) => {
		state.userInfo = userInfo;
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles;
	},
	SET_LATLNG: (state, latLng) => {
		state.latLng = latLng;
	},
	SET_CHAT_INFO: (state, chatInfo) => {
		state.chatInfo = chatInfo;
	},
	SET_CHAT_SHOW: (state, chatShow) => {
		state.chatShow = chatShow;
	},
	SET_CHAT_UNREAD: (state, hasUnreadMsg) => {
		state.hasUnreadMsg = hasUnreadMsg < 0 ? 0 : hasUnreadMsg;
	}
};

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password, renenberLogin } = userInfo;
		if (renenberLogin) {
			// 保存用户名和密码，默认为30天
			storageUserAccount(7).setUserAccount(username, password);
		} else {
			// 保存用户名和密码，临时时间
			storageUserAccount(1).setUserAccount(username, password);
		}
		return new Promise((resolve, reject) => {
			login({ username: username.trim(), password: password })
				.then((response) => {
					if (response.access_token) {
						const token = `${response.token_type} ${response.access_token} `;
						const refreshToken = `${response.token_type} ${response.refresh_token} `;
						// let expiresTime = new Date(
						// 	new Date().getTime() + response.expires_in * 1000
						// );
						setRefreshTime('');
						commit('SET_TOKEN', token);
						// 如果设置了记住用户状态，将token进行cookies存储设置过期时间为临时
						setToken(token, 1);
						// 保存刷新token至cookies 2天
						setRefreshToken(refreshToken, 1);
						resolve(response);
					} else {
						reject(response);
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	// get user info
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token)
				.then((response) => {
					if (!response) {
						Message({
							showClose: true,
							duration: 6000,
							dangerouslyUseHTMLString: true,
							message: `<div style="font-size: 14px;font-weight: 600;margin-bottom: 5px">${
								getLanguage() == 'en'
									? 'getInfo: Verification failed, please Login again.'
									: 'getInfo：登录验证失败，请重新登录。'
							} </div>`,
							type: 'error'
						});
						return;
					}
					if (!response.resource || response.resource.length <= 0) {
						Message({
							showClose: true,
							duration: 6000,
							dangerouslyUseHTMLString: true,
							message: `<div style="font-size: 14px;font-weight: 600;margin-bottom: 5px">${
								getLanguage() == 'en'
									? 'getInfo: You do not have operation rights, please contact the administrator to assign permissions!'
									: 'getInfo: 您还没有操作权限，请联系管理员分配权限！'
							} </div>`,
							type: 'error'
						});
					}

					let userInfo = response;
					userInfo.resource = userInfo.resource.map((item) => {
						return item.fId;
					});
					commit('SET_ROLES', userInfo.resource);
					commit('SET_USER_INFO', userInfo);
					resolve(userInfo.resource);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	setLatlng({ commit }, latlng) {
		commit('SET_LATLNG', latlng);
	},
	// user logout
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			commit('SET_TOKEN', '');
			commit('SET_ROLES', []);
			commit('SET_USER_INFO', {});
			removeToken();
			resetRouter();
			setRefreshTime('');
			router.push('/');
			resolve();
		});
	},

	setChatInfo({ commit }, chatInfo) {
		commit('SET_CHAT_INFO', chatInfo);
	},
	setChatShow({ commit }, chatShow) {
		commit('SET_CHAT_SHOW', chatShow);
	},
	setUnreadMsg({ commit }, hasUnreadMsg) {
		commit('SET_CHAT_UNREAD', hasUnreadMsg);
	},

	//refresh token
	refreshLogin({ commit }, currentRoute) {
		// 查询缓存账号
		const { username, password } = storageUserAccount().getUserAccount();
		// 设置刷新次数
		setRefreshTime(1);
		return new Promise((resolve, reject) => {
			refreshLogin({ username: username.trim(), password: password })
				.then((response) => {
					if (response.access_token) {
						const token = `${response.token_type} ${response.access_token} `;
						const refreshToken = `${response.token_type} ${response.refresh_token} `;
						// let expiresTime = new Date(
						// 	new Date().getTime() + response.expires_in * 1000
						// );
						commit('SET_TOKEN', token);
						setRefreshTime('');
						// 如果设置了记住用户状态，将token进行cookies存储设置过期时间为临时
						setToken(token, 1);
						// 保存刷新token至cookies 2天
						setRefreshToken(refreshToken, 2);
						console.log(currentRoute);
						// 刷新登录成功
						router.push(currentRoute);

						resolve(response);
					} else {
						reject(response);
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
