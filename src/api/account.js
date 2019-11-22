import { get, post, put, DELETE } from '@/api/request';

/**
 * 查询Account列表信息
 * @param page:Number,size:Number,search:String
 * @returns {fn}
 */
export function getAccountList(params) {
	params.size = 10;
	return get('/api/user/list', params);
}

/**
 * 添加组织机构
 * @param
 * @returns {fn}
 */
export function addOrg(params) {
	return post('/api/user/org', params);
}

/**
 * 修改组织机构
 * @param id:Number
 * @returns {fn}
 */
export function resetOrg(params) {
	return put(`/api/user/org/${params.id}`, params);
}
/**
 * 添加账号
 * @param
 * @returns {fn}
 */
export function addAccount(params) {
	return post(`/api/user`, params);
}
/**
 * 删除账号
 * @param  adminId:Number
 * @returns {fn}
 */
export function deleteAccount(params) {
	return DELETE(`/api/user/${params.adminId}`, params);
}
/**
 * 重置账号密码
 * @param  adminId:Number  reqPasswordReset
 * @returns {fn}
 */
export function pwdReset(params) {
	return post(`/api/user/${params.adminId}/pwdReset`, params);
}
/**
 * 删除组织机构
 * @param  orgId :Number
 * @returns {fn}
 */
export function deleteOrg(params) {
	return DELETE(`/api/user/org/${params.orgId}`, params);
}

/**
 * 查询某组织机构父级拥有的设备
 * @param page:Number,size:Number,search:String orgId::Number
 * @returns {fn}
 */
export function getOrgDevList(params) {
	params.size = 10;
	return get(`/api/user/org/${params.orgId}/devList`, params);
}
/**
 * 给某组织机构分配设备
 * @param reqDids :[], orgId::Number
 * @returns {fn}
 */
export function devAssignOrg(params) {
	return post(`/api/user/org/${params.orgId}/devAssign`, params);
}
