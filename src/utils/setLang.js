// 设置全局语言类型
const setLang = (vm, lang) => {
  const LOCALE_KEY = "languageKey";
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY) || "en-US";
  }
  // 设置语言类型本地缓存
  window.localStorage.setItem(LOCALE_KEY, lang);
  if (vm) {
    vm.$i18n.locale = lang;
  }
  return lang;
};
export default setLang;
