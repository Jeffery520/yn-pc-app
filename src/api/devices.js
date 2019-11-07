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
 * 根据设备did查询设备提醒列表
 * @param did:int
 * @returns {fn}
 */
export function getDevicesReminder(params) {
	return get(`/api/device/reminder/${params.did}`, params);
}
/**
 * 根据id提交设备提醒列表
 * @param did:int
 * @returns {fn}
 */
export function subDevicesReminder(params) {
	return post(`/api/device/reminder`, params);
}

/**
 * 根据id删除设备提醒列表
 * @param did:int
 * @returns {fn}
 */
export function delDevicesReminder(params) {
	return post(`/api/device/reminder/del`, params);
}

/**
 * 根据设备did查询佩戴者信息
 * @param did:int
 * @returns {fn}
 */
export function getDevicesUserInfo(params) {
	return get(`/api/device/wearer/${params.did}`, params);
}
/**
 * 更新佩戴者信息
 * @param did:int
 * @returns {fn}
 */
export function subDevicesUserInfo(params) {
	return put(`/api/device/wearer`, params);
}

/**
 * 根据设备did查询心率
 * @param {Object}
 * @returns {fn}
 */
export function deviceHeartRate(params) {
	return get(`/api/device/${params.did}/hr`, params);
}
/**
 * 根据SyncParam查询心率图表数据
 * @param {Object}:{
					dataType	integer($int32)
					//数据类型 体温 - 1,血压 - 2,血糖 - 3,心率 - 4,定位 - 5,睡眠 – 6,计步 - 7,体重 - 8,血氧 - 9
					did	integer($int32)
					//设备did
					end	integer($int64)
					//结束时间戳-到秒
					start	integer($int64)
					//开始时间戳-到秒
					viewType	integer($int32)
					//视图模式 day-1, week-2, month-3, year-4
			}
 * @returns {fn}
 */

export function deviceHeartRateOfChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 4;
	return post(`/api/device/hr`, params);
}

// 根据设备did查询心率-分页{did,page:1~~,size}
export function deviceHeartRatePage(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/hr`, params);
}

// 根据SyncParam查询血压数据
export function deviceBloodPressChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 1;
	return post(`/api/device/bp`, params);
}

// 根据设备did查询血压-分页{did,page:1~~,size}
export function deviceBloodPress(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/bp`, params);
}

// 根据SyncParam查询血糖数据
export function deviceBloodGlucoseChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 2;
	return post(`/api/device/bs`, params);
}
// 根据设备did查询血糖-分页
export function deviceBloodGlucose(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/bs`, params);
}

// 根据SyncParam查询定位数据
export function devicePosOfChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 5;
	return post(`/api/device/pos`, params);
}
