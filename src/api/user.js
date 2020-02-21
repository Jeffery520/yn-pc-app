import { post, get, DELETE, put } from '@/api/request';
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
// /user/role
// 添加角色
export function addUserRole(params) {
	return post('/api/user/role', params);
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

// /user/role/{id}
// 删除角色
export function delUserRole(params) {
	return DELETE(`/api/user/role/${params.roleId}`);
}
// /user/role/{id}
// 修改角色
export function editRole(params) {
	return put(`/api/user/role/${params.fId}`, params);
}

// /user/role/{id}/resource
// 获取角色资源
export function getRoleResource(params) {
	return get(`/api/user/role/${params.roleId}/resource`, params);
}
// /user/role/{id}/resource
// 创建角色资源
export function setRoleResource(params) {
	return post(`/api/user/role/${params.roleId}/resource`, params);
}
// /user/org/{id}/resourceList
// 获取某机构资源列表
export function getOrgRoleResource(params) {
	return get(`/api/user/org/${params.orgId}/resourceList`, params);
}
