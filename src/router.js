import Vue from "vue";
import Router from "vue-router";
const Layout = resolve => require(["./views/Layout.vue"], resolve);
const Alerts = resolve => require(["./views/Alerts.vue"], resolve);
const Devices = resolve => require(["./views/Devices.vue"], resolve);
const Login = resolve => require(["./views/Login.vue"], resolve);

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "",
      name: "layout",
      component: Layout,
      redirect: "/alerts",
      children: [
        {
          path: "alerts",
          name: "alerts",
          component: Alerts
        },
        {
          path: "devices",
          name: "devices",
          component: Devices
        }
      ]
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
