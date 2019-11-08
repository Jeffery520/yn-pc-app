// 数组对象去重
export function unique(a, b = []) {
	let arr = a.concat(b);
	let result = [];
	let obj = {};

	for (let i of arr) {
		if (!obj[i]) {
			result.push(i);
			obj[i] = 1;
		}
	}
	return result;
}
