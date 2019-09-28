import Vue from "vue";
import Router from "vue-router";
const Login = resolve => require(["./views/Login.vue"], resolve);
const Layout = resolve => require(["./views/Layout.vue"], resolve);
const Alerts = resolve => require(["./views/Alerts.vue"], resolve);
const Devices = resolve => require(["./views/Devices.vue"], resolve);
const AppUser = resolve => require(["./views/AppUser.vue"], resolve);
const Accounts = resolve => require(["./views/Accounts.vue"], resolve);

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
      path: "/",
      name: "layout",
      component: Layout,
      redirect: "/alerts",
      alias: [""],
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
        },
        {
          path: "appUser",
          name: "appUser",
          component: AppUser
        },
        {
          path: "accounts",
          name: "accounts",
          component: Accounts
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
