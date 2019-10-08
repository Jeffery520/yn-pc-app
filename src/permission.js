import router from "./router/index";
import store from "./store";
// import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/token"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration
const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  if (to.matched.length === 0) {
    // 如果未匹配到路由
    // 如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    next("/404");
    NProgress.done();
  } else {
    // 如果匹配到正确跳转
    next();
    NProgress.done();
  }

  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

  // 判断用户是否已经登录
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // 未登录跳转到首页
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }

    // get user info
    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    const roles = ["admin"];

    // generate accessible routes map based on roles
    const accessRoutes = await store.dispatch(
      "permission/generateRoutes",
      roles
    );

    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // hack method to ensure that addRoutes is complete
    // set the replace: true, so the navigation will not leave a history record
    // next({ ...to, replace: true });

    // //   // 角色校验=====>待开发
    //   const hasRoles = store.getters.roles && store.getters.roles.length > 0;
    //   if (hasRoles) {
    //     next();
    //   } else {
    //     try {
    //       // get user info
    //       // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    //       const { roles } = await store.dispatch("user/getInfo");
    //
    //       // generate accessible routes map based on roles
    //       const accessRoutes = await store.dispatch(
    //         "permission/generateRoutes",
    //         roles
    //       );
    //
    //       // dynamically add accessible routes
    //       router.addRoutes(accessRoutes);
    //
    //       // hack method to ensure that addRoutes is complete
    //       // set the replace: true, so the navigation will not leave a history record
    //       next({ ...to, replace: true });
    //     } catch (error) {
    //       // remove token and go to login page to re-login
    //       await store.dispatch("user/resetToken");
    //       Message.error(error || "Has Error");
    //       next(`/login?redirect=${to.path}`);
    //       // NProgress.done();
    //     }
    //   }
    // }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log("has no token");
      next();
      NProgress.done();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
