import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'; // element-ui lang
import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);
// 创建messages对象，存储系统、element语言包
const messages = {
	en: {
		...enLocale,
		...elementEnLocale
	},
	zh: {
		...zhLocale,
		...elementZhLocale
	}
};

export function getLanguage() {
	const chooseLanguage = Cookies.get('language');
	if (chooseLanguage) return chooseLanguage;
	// 如果本地没有缓存language，调用浏览器当前访问的language
	const language = (
		navigator.language || navigator.browserLanguage
	).toLowerCase();
	// 枚举messages中的lang名并进行匹配，如果匹配成功则进行返回当前的lang名，默认返回'en'
	const locales = Object.keys(messages);
	for (const locale of locales) {
		if (language.indexOf(locale) > -1) {
			return locale;
		}
	}
	return 'en';
}

// 创建一个实例化i18n语言数据对象
const i18n = new VueI18n({
	// set locale
	// options: en | zh | es
	locale: getLanguage(),
	// set locale messages
	messages
});

export default i18n;
