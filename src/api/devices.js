import { post, get, put } from '@/api/request';

/**
 * 获取所有的设备列表
 * @param page:Number,size:Number,search:String
 * @returns {fn}
 */
export function getDevicesList(params) {
	params.size = 10;
	return get('/api/device', params);
}

/**
 * 获取设备Authorised Personnel(授权者)
 * @param page:Number,size:Number,search:String
 * @returns {fn}
 */
export function getDevicesDinders(params) {
	return get(`/api/device/${params.did}/binders`, params);
}
/**
 * 根据设备did查询设备设置
 * @param did:int
 * @returns {fn}
 */
export function getDevicesSettings(params) {
	return get(`/api/device/Setting/${params.did}`, params);
}
/**
 * 更新设备的设置
 * @param {Object}
 * @returns {fn}
 */
export function submitSettings(params) {
	return put(`/api/device/Setting`, params);
}

/**
 * 根据设备did查询心率
 * @param {Object}
 * @returns {fn}
 */
export function deviceHeartRate(params) {
	return get(`/api/device/${params.did}/hr`, params);
}
