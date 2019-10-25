import { debounce } from 'lodash/function';
import Cookies from 'js-cookie';
import { AES, enc } from 'crypto-js';

/**
 * 检查是否是外部网络资源
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 函数防抖
 * @param
 * func (Function): 要防抖动的函数。
 * [wait=0] (number): 需要延迟的毫秒数。
 * [options={}] (Object): 选项对象。
 * [options.leading=false] (boolean): 指定在延迟开始前调用。
 * [options.maxWait] (number): 设置 func 允许被延迟的最大值。
 * [options.trailing=true] (boolean): 指定在延迟结束后调用。
 * @returns {Boolean}
 */
export function _debounce(fn, wait = 500, options = {}) {
	options.leading = true;
	return debounce(...arguments);
}

// /**
//  * 表单检验用户名
//  * @param {string} str
//  * @returns {Boolean}
//  */
// export function validUsername(str) {
//   const valid_map = ["admin", "editor"];
//   return valid_map.indexOf(str.trim()) >= 0;
// }

/**
 * @returns str
 * 生成32位随机字符串
 */
export function genRandomStr() {
	let strSet = new Set();
	let str = '';
	for (let i = 65; i <= 90; i++) {
		strSet.add(String.fromCharCode(i));
	}
	for (let i = 48; i <= 57; i++) {
		strSet.add(String.fromCharCode(i));
	}

	for (let i = 97; i <= 122; i++) {
		strSet.add(String.fromCharCode(i));
	}

	const strArr = Array.from(strSet.entries()).map((e) => e[0]);

	for (let i = 0; i < 32; i++) {
		const charIndex = Math.floor(Math.random() * strArr.length);
		str += strArr[charIndex];
	}
	return str;
}

/**
 * @param {string} str
 * @returns {Boolean,Object}
 * 记住用户信息存储到本地
 */
export function storageUserAccount() {
	return {
		account: 'USER_ACCOUNT',
		accountKey: 'USER_ACCOUNT_KEY',
		setUserAccount: function(username, password) {
			// 加密处理
			let secretKey = genRandomStr(); // 密钥
			let plaintext = `${username}${secretKey}${password}`; // 需要加密的文件
			let cipherText = AES.encrypt(plaintext, secretKey).toString(); // 进行加密处理
			Cookies.set(this.account, cipherText, { expires: 30 }); // 存储用户账号
			Cookies.set(this.accountKey, secretKey, { expires: 30 }); // 存储加密key
		},
		getUserAccount: function() {
			const userAccout = Cookies.get(this.account); // 获取账户
			const secretKey = Cookies.get(this.accountKey); // 获取解密key
			if (!!userAccout && !!secretKey) {
				let decipher =
					AES.decrypt(userAccout, secretKey).toString(enc.Utf8) || '';
				if (decipher) {
					// 解密拆分得到用户名和密码
					let strArr = decipher.split(secretKey);
					let user = { username: strArr[0], password: strArr[1] };
					return user;
				}
				return false;
			}
			return false;
		}
	};
}
/*
 * 时间格式化
 * @param {string||number} timestamp 标准时间格式
 * {string} language en||zh
 * return {object} YY MM DD HH mm
 * */

export function formatDate(timestamp, language = 'en') {
	const date = new Date(timestamp);
	const ENM = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const YY = date.getFullYear();
	const MM = date.getMonth();
	const DD = date.getDate();
	const HH = date.getHours();
	const mm = date.getMinutes();

	if (language == 'zh') {
		return {
			year: YY,
			month: MM + 1 > 10 ? MM + 1 : '0' + MM + 1,
			day: DD,
			hour: HH,
			minute: mm
		};
	}
	return {
		year: YY,
		month: ENM[MM],
		day: DD,
		hour: HH,
		minute: mm,
		ampm: HH <= 12 ? 'AM' : 'PM'
	};
}
