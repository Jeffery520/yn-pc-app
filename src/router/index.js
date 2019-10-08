import Vue from "vue";
import Router from "vue-router";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

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
    redirect: "/alerts",
    alias: ["/"],
    meta: {
      title: "alerts",
      icon: "alerts"
    },
    children: [
      {
        path: "alerts",
        name: "Alerts",
        component: () => import("@/views/alerts/index"),
        meta: {
          title: "alerts",
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: "/devices",
    component: Layout,
    meta: {
      title: "devices",
      icon: "devices"
    },
    children: [
      {
        path: "",
        name: "Devices",
        component: () => import("@/views/devices/index"),
        meta: {
          title: "devices",
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: "/appusers",
    component: Layout,
    meta: {
      title: "appUsers",
      icon: "appUsers"
    },
    children: [
      {
        path: "",
        name: "AppUsers",
        component: () => import("@/views/appUsers/index"),
        meta: {
          title: "appUsers",
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: "/accounts",
    component: Layout,
    meta: {
      title: "accounts",
      icon: "accounts"
    },
    children: [
      {
        path: "",
        name: "Accounts",
        component: () => import("@/views/accounts/index"),
        meta: {
          title: "accounts",
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: "/statistices",
    component: Layout,
    meta: {
      title: "statistices",
      icon: "statistices"
    },
    children: [
      {
        path: "",
        name: "Statistices",
        component: () => import("@/views/statistices/index"),
        meta: {
          title: "statistices",
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: "/messages",
    component: Layout,
    meta: {
      title: "messages",
      icon: "messages"
    },
    children: [
      {
        path: "",
        name: "Messages",
        component: () => import("@/views/messages/index"),
        meta: {
          title: "messages",
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: "/services",
    component: Layout,
    meta: {
      title: "services",
      icon: "services"
    },
    children: [
      {
        path: "",
        name: "Services",
        component: () => import("@/views/services/index"),
        meta: {
          title: "services",
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: "/billing",
    component: Layout,
    meta: {
      title: "billing",
      icon: "billing"
    },
    children: [
      {
        path: "",
        name: "Billing",
        component: () => import("@/views/billing/index"),
        meta: {
          title: "billing",
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: "/about",
    component: Layout,
    redirect: "/about/about1",
    meta: {
      title: "about",
      icon: "about"
    },
    children: [
      {
        path: "about1",
        name: "About",
        component: () => import("@/views/about/index"),
        meta: {
          title: "about1"
        }
      },
      {
        path: "about2",
        name: "About2",
        component: () => import("@/views/about/index2"),
        meta: {
          title: "about2"
        }
      }
    ]
  }
];

/**
 * 动态加载路由依据（权限）
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
