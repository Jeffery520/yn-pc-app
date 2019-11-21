import { post, get } from '@/api/request';
import qs from 'qs';

export function login(data) {
	return post('/api/authentication/form', qs.stringify(data));
}

export function getInfo() {
	return get('/api/user/me');
}

export function logout() {
	return post('/api/user/logout');
}
