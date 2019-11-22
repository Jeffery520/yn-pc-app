import Cookies from 'js-cookie';
import store from '@/store';
const TokenKey = 'Admin-Token';
const RefreshTokenKey = 'Admin-Refresh-Token';
const RefreshTime = 'Admin-Refresh-Time';

export function getRefreshToken() {
	return Cookies.get(RefreshTokenKey);
}

export function setRefreshToken(token, day) {
	if (day) {
		Cookies.set(RefreshTokenKey, token, { expires: day });
	} else {
		Cookies.set(RefreshTokenKey, token);
	}
}

export function getRefreshTime() {
	return Cookies.get(RefreshTime);
}

export function setRefreshTime(v) {
	Cookies.set(RefreshTime, v);
}

export function getToken() {
	if (store && store.getters.token) {
		return store.getters.token;
	}
	return Cookies.get(TokenKey);
}

export function setToken(token, day) {
	if (day) {
		Cookies.set(TokenKey, token, { expires: day });
	} else {
		Cookies.set(TokenKey, token);
	}
}

export function removeToken() {
	Cookies.remove(TokenKey);
	Cookies.remove(RefreshTokenKey);
	Cookies.remove(RefreshTime);
}
