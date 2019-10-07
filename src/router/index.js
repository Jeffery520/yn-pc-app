import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */
// import alertRouter from "./modules/alertRouter";

/**
 * 注意:子菜单只在路由子菜单 children.length >= 1 时出现
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不设置，当项目有多个子路由时,
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect，则在面包屑中不会重定向
 * name:'router-name'             这个名称由<keep-alive>引用(必须设置!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色(可以设置多个角色)
    title: 'title'               侧边栏和面包屑中显示的名称(推荐设置)
    icon: 'svg-name'             显示在侧边栏中的图标
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
    affix: true                  如果设置为true，则tag将附加在tags-view中
    breadcrumb: false            如果设置为false，则子菜单将隐藏在面包屑中(默认为true)
    activeMenu: '/example/list'  如果设置了路径，侧边栏将突出显示设置的路径
  }
 */

/**
 * 固定路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "/alerts/menu1",
    meta: {
      title: "alerts",
      icon: "alerts",
      roles: ["admin"] // or you can only set roles in sub nav
    },
    children: [
      {
        path: "/alerts/menu1",
        component: () => import("@/views/alerts/menu1/index"),
        name: "alertsMenu1",
        meta: { title: "menu1" }
      },
      {
        path: "/alerts/menu2",
        component: () => import("@/views/alerts/menu2/index"),
        name: "alertsMenu2",
        meta: { title: "menu2", affix: true }
      }
    ]
  }
];

/**
 * 动态加载路由依据（权限）
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/devices",
    component: Layout,
    redirect: "/devices/page",
    alwaysShow: true, // will always show the root menu
    name: "Devices",
    meta: {
      title: "devices",
      icon: "devices",
      roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/devices/page"),
        name: "PageDevices",
        meta: {
          title: "pageDevices",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  // alertRouter,
  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    meta: {
      title: "errorPages",
      icon: "404"
    },
    children: [
      {
        path: "404",
        component: () => import("@/views/error-page/404"),
        name: "Page404",
        meta: { title: "page404", noCache: true }
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];

export default new Router({
  mode: "history", // require service support
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

// const router = createRouter();
//
// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter();
//   router.matcher = newRouter.matcher; // reset router
// }
//
// export default router;
