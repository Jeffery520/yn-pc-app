import Vue from "vue";
import store from "@/store";
import Cookies from "js-cookie";
import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "@/App.vue";
import router from "@/router/index";
import i18n from "./lang"; // internationalization
import "@/assets/icons/index"; // svg-icon注册
import "./permission"; // permission control

Vue.config.productionTip = false;
Vue.config.debug = process.env.NODE_ENV !== "production";

// 全局混入vue方法
Vue.mixin({
  methods: {
    // routePush(name, query, params) {
    //   this.$router.push({ name, query, params });
    // },
    // loadingComplete() {
    //   this.$nextTick(() => {
    //     store.state.loadComplete = true;
    //   });
    // }
  }
});

// 设置ElementUI大小和语言包
Vue.use(ElementUI, {
  size: Cookies.get("size") || "medium",
  i18n: (key, value) => i18n.t(key, value)
});

Vue.use(ElementUI);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
