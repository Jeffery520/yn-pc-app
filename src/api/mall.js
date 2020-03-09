import { post, get } from '@/api/request';

/**
 * 365紧急救援订单列表
 * @param page:Number,size:Number,search:String,status:3,4
 * @returns {fn}
 */
export function getMallList(params) {
	params.size = 10;
	return get('/api/mall/order', params);
}
