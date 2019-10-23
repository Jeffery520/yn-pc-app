import router from "./router/index";
import store from "./store";
// import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/token"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // 顶部进度条配置
const whiteList = ["/login", "/auth-redirect"]; // 白名单不需要重定向

router.beforeEach(async (to, from, next) => {
  // 进度条开启
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

    // 用户角色
    const roles = ["admin"];

    // 根据角色生成可访问路由映射
    const accessRoutes = await store.dispatch(
      "permission/generateRoutes",
      roles
    );

    // 动态添加可访问路由
    router.addRoutes(accessRoutes);

    //修改方法，以确保addRoutes是完整的
    //设置replace: true，这样导航就不会留下历史记录
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
      // 白名单不需要token
      next();
      NProgress.done();
    } else {
      //其他没有访问权限的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
