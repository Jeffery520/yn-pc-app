import Cookies from 'js-cookie';
import { getLanguage, getCdn } from '@/lang/index';

const state = {
	sidebar: {
		opened: Cookies.get('sidebarStatus')
			? !!+Cookies.get('sidebarStatus')
			: true,
		withoutAnimation: false
	},
	device: 'desktop',
	language: getLanguage(),
	cdnLocation: getCdn() // 地图cnd镜像  1.中国  2.其他
};

const mutations = {
	TOGGLE_SIDEBAR: (state) => {
		state.sidebar.opened = !state.sidebar.opened;
		state.sidebar.withoutAnimation = false;
		if (state.sidebar.opened) {
			Cookies.set('sidebarStatus', 1);
		} else {
			Cookies.set('sidebarStatus', 0);
		}
	},
	CLOSE_SIDEBAR: (state, withoutAnimation) => {
		Cookies.set('sidebarStatus', 0);
		state.sidebar.opened = false;
		state.sidebar.withoutAnimation = withoutAnimation;
	},
	TOGGLE_DEVICE: (state, device) => {
		state.device = device;
	},
	SET_LANGUAGE: (state, language) => {
		state.language = language;
		Cookies.set('language', language);
	},
	SET_CDN_LOACTION: (state, cdn) => {
		state.cdnLocation = cdn;
		Cookies.set('CDN_LOACTION', cdn, { expires: 5 });
		console.log(Cookies.get('CDN_LOACTION'));
	}
};

const actions = {
	toggleSideBar({ commit }) {
		commit('TOGGLE_SIDEBAR');
	},
	closeSideBar({ commit }, { withoutAnimation }) {
		commit('CLOSE_SIDEBAR', withoutAnimation);
	},
	toggleDevice({ commit }, device) {
		commit('TOGGLE_DEVICE', device);
	},
	setLanguage({ commit }, language) {
		commit('SET_LANGUAGE', language);
	},
	setCdnLocation({ commit }, cdn) {
		console.log(cdn);
		commit('SET_CDN_LOACTION', cdn);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
