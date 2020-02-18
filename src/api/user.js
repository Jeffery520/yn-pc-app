import { post, get } from '@/api/request';
import { getRefreshToken } from '@/utils/token';

import qs from 'qs';

export function login(data) {
	return post('/api/authentication/form', qs.stringify(data), {
		Authorization: `Basic eWludW86eWludW9zZWNyZXQ=`
	});
}

export function getInfo() {
	return get('/api/user/account/me');
}

export function refreshLogin(data) {
	return post('/api/authentication/form', qs.stringify(data), {
		Authorization: `Basic eWludW86eWludW9zZWNyZXQ=`
	});
}

// export function refreshLogin(data) {
//   return post('/api/authentication/form', qs.stringify(data), {
//     Authorization: getRefreshToken()
//   });
// }

// /user/role
// 获取角色列表
export function getUserRole() {
	return get('/api/user/role');
}
// /user/account/list
// 获取账户列表
export function getAccountList() {
	return get('/api/user/account/list');
}

// /user/org/{id}/roleList/
// 获取某机构角色列表
export function getOrgRoleList(params) {
	return get(`/api/user/org/${params.orgId}/roleList/`);
}
