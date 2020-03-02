const debounce = require('lodash/debounce');
import Cookies from 'js-cookie';
import { AES, enc } from 'crypto-js';
import store from '@/store';

export const loadingOptions = {
	lock: true,
	text: 'Loading',
	spinner: 'el-icon-loading',
	background: 'rgba(0, 0, 0, 0.7)'
};

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
export function _debounce(
	fn,
	wait = 500,
	options = { leading: true, trailing: false }
) {
	return debounce(fn, wait, options);
}

// 数组对象排序算法
export function sortBy(str) {
	return function(obj1, obj2) {
		var val1 = obj1[str];
		var val2 = obj2[str];
		if (val1 < val2) {
			return -1;
		} else if (val1 > val2) {
			return 1;
		} else {
			return 0;
		}
	};
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
export function storageUserAccount(day = '') {
	return {
		account: 'USER_ACCOUNT',
		accountKey: 'USER_ACCOUNT_KEY',
		setUserAccount: function(username, password) {
			// 加密处理
			let secretKey = genRandomStr(); // 密钥
			let plaintext = `${username}${secretKey}${password}`; // 需要加密的文件
			let cipherText = AES.encrypt(plaintext, secretKey).toString(); // 进行加密处理
			Cookies.set(this.account, cipherText, { expires: day }); // 存储用户账号
			Cookies.set(this.accountKey, secretKey, { expires: day }); // 存储加密key
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

export function formatDate(
	timestamp,
	language = store.getters.language || 'en'
) {
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
			month: MM + 1,
			day: DD,
			hour: HH,
			minute: mm < 10 ? '0' + mm : mm,
			ampm: HH < 12 ? '上午' : '下午'
		};
	}
	return {
		year: YY,
		month: ENM[MM],
		day: DD,
		hour: HH,
		minute: mm < 10 ? '0' + mm : mm,
		ampm: HH < 12 ? 'AM' : 'PM'
	};
}

/*
 * 时间格式化转字符串
 * @param {string||number} timestamp 标准时间格式
 * {string} language en||zh
 * return {object} YY MM DD HH mm
 * */

export function formatDateToStr(
	timestamp,
	language = store.getters.language || 'en',
	type = 'YYMMDDHHmm',
	html = false
) {
	const date = formatDate(timestamp, language);
	if (language == 'zh') {
		if (type == 'MMDDHHmm') {
			if (html) {
				return `${date.month}月${date.day}日,<span style="display: inline-block" > ${date.ampm} ${date.hour}:${date.minute}</span>`;
			} else {
				return `${date.month}月${date.day}日, ${date.ampm} ${date.hour}:${date.minute}`;
			}
		} else if (type == 'MMDD') {
			return `${date.month}月${date.day}日`;
		} else {
			if (html) {
				return `${date.year}年${date.month}月${date.day}日,<span style="display: inline-block" > ${date.ampm} ${date.hour}:${date.minute}</span>`;
			} else {
				return `${date.year}年${date.month}月${date.day}日, ${date.ampm} ${date.hour}:${date.minute}`;
			}
		}
	} else {
		let hour =
			date.hour == 0 ? 12 : date.hour > 12 ? date.hour - 12 : date.hour;
		if (type == 'MMDDHHmm') {
			if (html) {
				return `${date.month} ${date.day},<span style="display: inline-block" > ${hour}:${date.minute} ${date.ampm}</span> `;
			} else {
				return `${date.month} ${date.day}, ${hour}:${date.minute} ${date.ampm}`;
			}
		} else if (type == 'MMDD') {
			return `${date.month} ${date.day}`;
		} else {
			if (html) {
				return `${date.month} ${date.day}, ${date.year}<span style="display: inline-block" > ${hour}:${date.minute} ${date.ampm}</span>`;
			} else {
				return `${date.month} ${date.day}, ${date.year} ${hour}:${date.minute} ${date.ampm}`;
			}
		}
	}
}

/*
 * 根据两个月份同一天的差值获取上个月的天数
 * @param
 * { Number} year, month
 * return {Number}
 * */
export function getMonthDays(year, month) {
	var stratDate = new Date(year, month - 1, 1),
		endData = new Date(year, month, 1);
	var days = (endData - stratDate) / (1000 * 60 * 60 * 24);
	return days;
}
/*
 * 获取本月的天数
 * @param
 * { Number} 时间戳
 * return {Number}
 * */
export function getCuMonthDays(timestamp) {
	let year = new Date(timestamp).getFullYear();
	let month = new Date(timestamp).getMonth() + 1;
	return new Date(year, month, 0).getDate();
}

/*
 * 数组去重
 * @param
 * data:Array
 * refer:Array 参照属性，数组
 * return Array
 * */
export function uniqueObjArr(data, refer) {
	return Object.values(
		data.reduce((data, item) => {
			let key = '';
			if (refer) {
				for (var i = 0; i < refer.length; i++) {
					key += item[refer[i]];
				}
			} else {
				key = item;
			}
			if (!data[key]) {
				data[key] = item;
			}
			return data;
		}, {})
	);
}

/*
 * 比较两个坐标之间的距离
 * @param
 * point1:Object
 * point2:Object
 * refer:Array 参照属性，数组
 * return Array
 * */
export function calculationDistance(point1, point2, refer) {
	const x1 = point1[refer[0]];
	const y1 = point1[refer[1]];
	const x2 = point2[refer[0]];
	const y2 = point2[refer[1]];
	const xy = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	return xy;
}

/*
 * 临界点抽稀通过循环删除临近值数据
 * @param
 * arr：Array
 * dMax:Number 临界值
 * return Array
 * */

export function compressArr(arr, dMax) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length; j++) {
			if (
				calculationDistance(arr[i], arr[j], ['latitude', 'longitude']) < dMax
			) {
				arr.splice(i, 1);
			}
		}
	}
	return arr;
}

export function formatPhone(ipPhone = '') {
	if (ipPhone) {
		let arr = ipPhone.split('_');
		let ip = arr[0] ? arr[0] : '';
		let pone = arr[1] ? arr[1] : '';
		if (ip == '+86' && pone) {
			pone = pone.replace(/(?=(\d{4})+$)/g, ' ');
		}
		if (ip == '+1' && pone) {
			pone = pone.replace(/(?=(\d{4})+$)/g, ' ');
		}

		if (ip == '' && ip.length > 5) {
			ip = ip.replace(/(?=(\d{4})+$)/g, ' ');
		}

		return ip + ' ' + pone;
	}
	return '';
}
