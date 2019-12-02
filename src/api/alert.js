import { post, get } from '@/api/request';

/**
 * 获取警报列表
 * @param page:Number,size:Number,search:String
 * @returns {fn}
 */
export function getAlertList(params) {
	params.size = 10;
	return get('/api/alert', params);
}
/**
 * 根据设备did查询该设备所有警报
 * @param did:int
 * @returns {fn}
 */
export function getDeviceAlertList(params) {
	params.size = 10;
	return get(`/api/alert/${params.did}/list`, params);
}

/**
 * 根据设备did查询该设备某种类型警报
 * @param did:int
 * @returns {fn}
 */
export function getByTypeAlertList(params) {
	params.size = 10;
	return get(`/api/alert/${params.did}/list/${params.type}`, params);
}
