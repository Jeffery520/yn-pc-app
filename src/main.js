import Vue from "vue";
import store from "@/store";
import Cookies from "js-cookie";
import "normalize.css/normalize.css"; // css重置
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // element-ui css
import "@/style/index.scss"; // 全局样式

import App from "@/App.vue";
import router from "@/router/index";
import i18n from "./lang"; // internationalization
import "@/assets/icons/index"; // svg-icon注册
import "./permission"; // 路由权限控制

Vue.config.productionTip = false;
Vue.config.debug = process.env.NODE_ENV !== "production";
Vue.config.devtools = process.env.NODE_ENV === "dev";

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
