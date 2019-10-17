import Vue from "vue";
import store from "@/store";
import Cookies from "js-cookie";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // element-ui css
import "@/style/index.scss"; // 全局样式

import App from "@/App.vue";
import router from "@/router/index";
import i18n from "./lang"; // internationalization
import "@/assets/icons/index"; // svg-icon注册
import "./permission"; // 路由权限控制
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc",
    libraries: "places" // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  }

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

Vue.config.productionTip = false;
Vue.config.debug = process.env.NODE_ENV !== "production";
Vue.config.devtools = process.env.NODE_ENV === "dev";

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
