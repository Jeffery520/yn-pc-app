import { post, get, put } from '@/api/request';

/**
 * 根据设备did查询该设备所有消息状态
 * @param page:Number,size:Number,search:String,did:Number
 * @returns {fn}
 */
export function getDevicesMsgList(params) {
	params.size = 10;
	return get(`/api/msgStatus/${params.did}/list`, params);
}
