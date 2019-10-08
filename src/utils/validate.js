import { debounce } from "lodash/function";
/**
 * 检查是否是外部资源
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
//  * @param {string} str
//  * @returns {Boolean}
//  */
// export function validUsername(str) {
//   const valid_map = ["admin", "editor"];
//   return valid_map.indexOf(str.trim()) >= 0;
// }
