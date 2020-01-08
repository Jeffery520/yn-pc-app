import { get } from '@/api/request';

/**
 * 查询所有App用户
 * @param page:Number,size:Number,search:String
 * @returns {fn}
 */
export function getTwiltoken(params = {}) {
	return get('/twil/capability-token', params);
}
