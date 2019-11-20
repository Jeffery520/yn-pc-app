import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
const Layout = (resolve) => require(['@/layout'], resolve);

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
    noCache: true                //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  如果设置为true，则tag将附加在tags-view中
    breadcrumb: false            如果设置为false，则子菜单将隐藏在面包屑中(默认为true)
    activeMenu: '/example/list'  如果设置了路径，侧边栏将突出显示设置的路径
  }
 */

/**
 * 表示不需要动态访问的路由，例如登录页面，404，常规页面等
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
	{
		path: '/login',
		component: (resolve) => require(['@/views/login'], resolve),
		hidden: true
	},
	{
		path: '/404',
		component: (resolve) => require(['@/views/error-page/404'], resolve),
		hidden: true
	}
];

/**
 * 表示需要动态判断权限并通过进行动态添加的页面addRouters
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
	{
		path: '',
		component: Layout,
		redirect: '/alerts',
		alias: ['/'],
		meta: {
			title: 'alerts',
			icon: 'alerts',
			role: ['admin']
		},
		children: [
			{
				path: 'alerts',
				name: 'Alerts',
				component: (resolve) => require(['@/views/alerts/index'], resolve),
				meta: {
					title: 'alerts',
					role: ['admin'],
					breadcrumb: false
				}
			}
		]
	},
	{
		path: '/devices',
		component: Layout,
		meta: {
			title: 'devices',
			icon: 'devices',
			role: ['admin']
		},
		children: [
			{
				path: '',
				name: 'Devices',
				component: (resolve) => require(['@/views/devices/index'], resolve),
				meta: {
					title: 'devices',
					breadcrumb: false,
					role: ['admin']
				}
			},
			{
				path: 'device_data/:id',
				name: 'DeviceData',
				hidden: true,
				component: (resolve) => require(['@/views/devices/graph'], resolve),
				meta: {
					title: 'statistices',
					activeMenu: '/devices',
					role: ['admin']
				}
			}
		]
	},
	{
		path: '/appusers',
		component: Layout,
		meta: {
			title: 'appUsers',
			icon: 'appUsers',
			role: ['admin']
		},
		children: [
			{
				path: '',
				name: 'AppUsers',
				component: (resolve) => require(['@/views/appUsers/index'], resolve),
				meta: {
					title: 'appUsers',
					breadcrumb: false,
					role: ['admin']
				}
			}
		]
	},
	{
		path: '/accounts',
		component: Layout,
		meta: {
			title: 'accounts',
			icon: 'accounts',
			role: ['admin']
		},
		children: [
			{
				path: '',
				name: 'Accounts',
				component: (resolve) => require(['@/views/accounts/index'], resolve),
				meta: {
					title: 'accounts',
					breadcrumb: false,
					role: ['admin']
				}
			}
		]
	},
	{
		path: '/statistices',
		component: Layout,
		meta: {
			title: 'statistices',
			icon: 'statistices',
			role: ['admin']
		},
		children: [
			{
				path: '',
				name: 'Statistices',
				component: (resolve) => require(['@/views/statistices/index'], resolve),
				meta: {
					title: 'statistices',
					breadcrumb: false,
					role: ['admin']
				}
			}
		]
	},
	{
		path: '/messages',
		component: Layout,
		meta: {
			title: 'messages',
			icon: 'messages',
			role: ['admin']
		},
		children: [
			{
				path: '',
				name: 'Messages',
				component: (resolve) => require(['@/views/messages/index'], resolve),
				meta: {
					title: 'messages',
					breadcrumb: false,
					role: ['admin']
				}
			}
		]
	},
	{
		path: '/services',
		component: Layout,
		meta: {
			title: 'services',
			icon: 'services',
			role: ['admin']
		},
		children: [
			{
				path: '',
				name: 'Services',
				component: (resolve) => require(['@/views/services/index'], resolve),
				meta: {
					title: 'services',
					breadcrumb: false,
					role: ['admin']
				}
			}
		]
	},
	{
		path: '/billing',
		component: Layout,
		meta: {
			title: 'billing',
			icon: 'billing',
			role: ['admin']
		},
		children: [
			{
				path: '',
				name: 'Billing',
				component: (resolve) => require(['@/views/billing/index'], resolve),
				meta: {
					title: 'billing',
					breadcrumb: false,
					role: ['admin']
				}
			}
		]
	},
	{
		path: '/about',
		component: Layout,
		redirect: '/about/about1',
		meta: {
			title: 'about',
			icon: 'about',
			role: ['admin']
		},
		children: [
			{
				path: 'about1',
				name: 'About',
				component: (resolve) => require(['@/views/about/index'], resolve),
				meta: {
					title: 'about1',
					role: ['admin']
				}
			},
			{
				path: 'about2',
				name: 'About2',
				component: (resolve) => require(['@/views/about/index2'], resolve),
				meta: {
					title: 'about2',
					role: ['admin']
				}
			}
		]
	},
	{ path: '*', redirect: '/404', hidden: true }
];

//实例化vue的时候只挂载constantRouter
const createRouter = () =>
	new Router({
		mode: 'history',
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
