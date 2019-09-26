import Vue from "vue";
import Router from "vue-router";
const Alerts = resolve => require(["./views/Alerts.vue"], resolve);
const Devices = resolve => require(["./views/Devices.vue"], resolve);

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "alerts",
      component: Alerts,
      alias: "/alerts"
    },
    {
      path: "/devices",
      name: "devices",
      component: Devices
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/404")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
