import Vue from "vue";
import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import elementImport from "@/utils/elementImport";
import VueI18n from "vue-i18n";
import setLang from "@/utils/setLang";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: setLang() || "en-US",
  messages: {
    "zh-CN": require("@/lang/zh.json"),
    "en-US": require("@/lang/en.json")
  }
});

Vue.config.productionTip = false;
Vue.use(elementImport);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
