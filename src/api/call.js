import { get } from '@/api/request';

/**
 * 查询所有App用户
 * @param page:Number,size:Number,search:String
 * @returns {fn}
 */
export function getTwiltoken(params = {}) {
	return get('https://cyan-cobra-1135.twil.io/capability-token', params);
	// return get('https://aqua-starling-8718.twil.io/capability-token', params);
}
