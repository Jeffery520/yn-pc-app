import { post, get, put } from '@/api/request';

/**
 * 全部消息状态列表
 * @param page:Number,size:Number,search:String
 * @returns {fn}
 */
export function getMsgList(params) {
	params.size = 10;
	return get(`/api/msgStatus`, params);
}
/**
 * 根据设备did查询该设备所有消息状态
 * @param page:Number,size:Number,search:String,did:Number
 * @returns {fn}
 */
export function getDevicesMsgList(params) {
	params.size = 10;
	return get(`/api/msgStatus/${params.did}/list`, params);
}
