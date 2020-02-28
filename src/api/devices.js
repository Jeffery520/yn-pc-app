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
export function getDevicesBinders(params) {
	return get(`/api/device/${params.did}/binders`, params);
}

/**
 * 根据设备did查询Basic Info
 * @param did:int page:Number,size:Number
 * @returns {fn}
 */
export function getAlertBasicInfo(params) {
	params.size = 5;
	params.page = 0;
	return get(`/api/device/${params.did}/hd/basicInfo`, params);
}

/**
 * 警报处理
 * @param fAlertId	警告id
 * fAlertType	警告类型， 1-SOS; 2-围栏; 3-心率; 4-血压; 5-血糖; 6-体温; 15-低电
 * fContent	处理描述
 * fDid	设备did
 * fStatus	处理状态 1-open; 2-skip; 3-follow; 4-completed
 * fWay	处理方式
 * @returns {fn}
 */
export function alertStatusHandle(params) {
	return post(`/api/alert/handle`, params);
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
 * 批量更新设备的设置
 * @param {Object}
 * @returns {fn}
 */
export function submitSetMsg(params) {
	return put(`/api/device/setMsg`, params);
}

/**
 * 根据设备did查询设备提醒列表
 * @param did:int
 * @returns {fn}
 */
export function getDevicesReminder(params) {
	return get(`/api/device/Setting/reminder/${params.did}`, params);
}
/**
 * 根据id提交设备提醒列表
 * @param did:int
 * @returns {fn}
 */
export function subDevicesReminder(params) {
	return post(`/api/device/Setting/reminder`, params);
}

/**
 * 根据id删除设备提醒列表
 * @param did:int
 * @returns {fn}
 */
export function delDevicesReminder(params) {
	return post(`/api/device/Setting/reminder/del`, params);
}
/**
 * 根据设备did查询电子围栏和跟踪模式
 * @param did:int
 * @returns {fn}
 */
export function getDevicesTraceFence(params) {
	return get(`/api/device/${params.did}/traceFence`, params);
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
	return get(`/api/device/${params.did}/hd/hr`, params);
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
	return post(`/api/device/hd/hr`, params);
}

// 根据设备did查询心率-分页{did,page:1~~,size}
export function deviceHeartRatePage(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/hd/hr`, params);
}

// 根据SyncParam查询血压数据
export function deviceBloodPressChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 2;
	return post(`/api/device/hd/bp`, params);
}

// 根据设备did查询血压-分页{did,page:1~~,size}
export function deviceBloodPress(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/hd/bp`, params);
}

// 根据SyncParam查询血糖数据
export function deviceBloodGlucoseChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 3;
	return post(`/api/device/hd/bs`, params);
}
// 根据设备did查询血糖-分页
export function deviceBloodGlucose(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/hd/bs`, params);
}

// 根据SyncParam查询定位数据
export function devicePosOfChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 5;
	return post(`/api/device/hd/pos`, params);
}

// 查询定位数据-分页
export function devicePosOfList(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/hd/pos`, params);
}

// 根据SyncParam查询计步数据
export function devicePeOfChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 7;
	return post(`/api/device/hd/pe`, params);
}

// 查询定位计步-分页
export function devicePeOfList(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/hd/pe`, params);
}

// 根据SyncParam查询睡眠数据
export function deviceSlOfChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 6;
	return post(`/api/device/hd/sl`, params);
}

// 查询睡眠-分页
export function deviceSlOfList(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/hd/sl`, params);
}

// 根据SyncParam查询血氧数据
export function deviceBoOfChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 9;
	return post(`/api/device/hd/spo2`, params);
}
// 查询睡眠-分页
export function deviceBoOfList(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/hd/spo2`, params);
}

// 根据SyncParam查询体重数据
export function deviceWthOfChart(params) {
	params.did = parseInt(params.did);
	params.dataType = 8;
	return post(`/api/device/hd/wth`, params);
}
// 根据设备did查询体重-分页
export function deviceWthOfList(params) {
	params.did = parseInt(params.did);
	params.size = 10;
	return get(`/api/device/${params.did}/hd/wth`, params);
}
