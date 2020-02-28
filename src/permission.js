import router from './router';
import store from './store';
import NProgress from 'nprogress'; //进度条
import 'nprogress/nprogress.css'; // 进度条样式
import { getToken } from '@/utils/token'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // 进度条配置

const whiteList = ['/login']; // 重定向白名单

router.beforeEach(async (to, from, next) => {
	// 开始进度条
	NProgress.start();
	// 设置页面标题
	document.title = getPageTitle(to.meta.title);
	// 确定用户是否已登录
	const hasToken = getToken();
	if (hasToken) {
		if (to.path === '/login') {
			// 如果已登录，请重定向到主页
			next({ path: '/' });
			NProgress.done();
		} else {
			// 确定用户是否已通过getInfo获得其权限角色
			const hasRoles = store.getters.roles && store.getters.roles.length > 0;
			if (hasRoles) {
				// 设置replace:true，因此导航将不会留下历史记录
				setTimeout(() => {
					if (to.name == 'Layout') {
						next({ ...store.getters.mainRoute, replace: true });
					} else {
						next();
					}
				}, 50);
			} else {
				try {
					// 获取用户信息
					// 注意：角色必须是对象数组！如： ['admin'] or ,['developer','editor']
					let roles = await store.dispatch('user/getInfo');
					// 根据角色生成可访问的路由
					const accessRoutes = await store.dispatch(
						'permission/generateRoutes',
						roles
					);
					// 动态添加可访问的路由
					router.addRoutes(accessRoutes);
					// hack方法，以确保addRoutes是完整的

					// 设置replace:true，因此导航将不会留下历史记录
					if (to.name == 'Layout') {
						next({ ...store.getters.mainRoute, replace: true });
					} else {
						next({ ...to, replace: true });
					}
				} catch (error) {
					// 删除token并进入登录页面重新登录
					await store.dispatch('user/logout');
					NProgress.done();
				}
			}
		}
	} else {
		/* 没有token*/
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单中，直接进入
			next();
		} else {
			// 其他无权访问的页面将重定向到登录页面。
			next(`/login?redirect=${to.path}`);
			NProgress.done();
		}
	}
});

router.afterEach(() => {
	// 关闭进度条
	NProgress.done();
});
