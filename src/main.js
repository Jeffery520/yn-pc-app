import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api/install";

Vue.config.productionTip = false;

api.install(Vue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
