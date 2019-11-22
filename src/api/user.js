import { post, get } from '@/api/request';
import { getRefreshToken } from '@/utils/token';

import qs from 'qs';

export function login(data) {
	return post('/api/authentication/form', qs.stringify(data), {
		Authorization: `Basic eWludW86eWludW9zZWNyZXQ=`
	});
}

export function getInfo() {
	return get('/api/user/me');
}

export function refreshLogin(data) {
	return post('/api/authentication/form', qs.stringify(data), {
		Authorization: getRefreshToken()
	});
}
