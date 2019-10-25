import { post, get } from '@/api/request';

export function getDevicesList(params) {
	return get('/api/device', params);
}
