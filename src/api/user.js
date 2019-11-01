import { post, get } from '@/api/request';
import qs from 'qs';

export function login(data) {
	return post('/api/authentication/form', qs.stringify(data));
}

export function getInfo() {
	return get('/api/user/me');
}

export function logout() {
	return post('/api/user/logout');
}
export function getCsdn() {
	return get(
		'/baidu/sugrec?prod=pc_his&from=pc_web&json=1&sid=1453_21127_29567_29221&hisdata=%5B%7B%22time%22%3A1571275696%2C%22kw%22%3A%22cli-plugin-pwa%E6%9C%89%E4%BB%80%E4%B9%88%E7%94%A8%22%7D%2C%7B%22time%22%3A1571275917%2C%22kw%22%3A%22pathrewrite%22%7D%2C%7B%22time%22%3A1571276578%2C%22kw%22%3A%22pathrewrite%E6%97%A0%E6%95%88%22%7D%2C%7B%22time%22%3A1571276868%2C%22kw%22%3A%22vue.config.js%E6%B2%A1%E6%9B%B4%E6%96%B0%22%7D%2C%7B%22time%22%3A1571277904%2C%22kw%22%3A%22historyapifallback%22%7D%2C%7B%22time%22%3A1571278548%2C%22kw%22%3A%22%E6%9F%A5%E7%9C%8Bwebpack%20%E7%89%88%E6%9C%AC%E5%8F%B7%22%7D%2C%7B%22time%22%3A1571278719%2C%22kw%22%3A%22proxy%E6%97%A0%E6%95%88%22%2C%22fq%22%3A2%7D%2C%7B%22time%22%3A1571278849%2C%22kw%22%3A%22%E9%87%8D%E8%A3%85webpack%22%7D%2C%7B%22time%22%3A1571279128%2C%22kw%22%3A%22webpack%22%7D%2C%7B%22time%22%3A1571279640%2C%22kw%22%3A%22proxy%22%7D%5D&req=2&bs=runtimeCompiler&csor=0&cb=jQuery110204860516147646077_1571280914004&_=1571280914005'
	);
}
