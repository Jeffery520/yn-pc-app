import { get } from '@/api/request';

/**
 * 查询所有App用户
 * @param page:Number,size:Number,search:String
 * @returns {fn}
 */
export function getAllAppUser(params) {
	params.size = 10;
	return get('/api/app', params);
}
