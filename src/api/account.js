import { get, post } from '@/api/request';

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
 * @param page:Number,size:Number,search:String
 * @returns {fn}
 */
export function addOrg(params) {
	return get('/api/user/org', params);
}
