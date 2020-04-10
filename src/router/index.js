import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push;
// Uncaught (in promise) 报错处理,重写push方法,https://blog.csdn.net/TUTsmile/article/details/100542835
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

/* Layout */
// import Layout from '@/layout';
const Layout = () => import('@/layout');
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
		name: 'login',
		component: () => import('@/views/login'),
		hidden: true
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	{
		path: '',
		alias: ['/'],
		name: 'Layout',
		component: Layout
	}
];

/**
 * 表示需要动态判断权限并通过进行动态添加的页面addRouters
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes = [
	{
		path: '/rick_alert',
		component: Layout,
		redirect: '/rick_alert',
		meta: {
			title: 'alerts9331',
			icon: 'yujing',
			roles: process.env.VUE_APP_PROJECT_NAME == 'LING_YI' ? [2] : []
		},
		children: [
			{
				path: '/rick_alert',
				name: 'Alerts',
				component: () => import('@/views/alerts_lingyi/index'),
				meta: {
					title: 'alerts9331',
					roles: [2],
					breadcrumb: false
				}
			},
			{
				path: '/devices/rick_alert/:id',
				name: 'DeviceDataAlerts',
				hidden: true,
				component: () => import('@/views/alerts_lingyi/index'),
				meta: {
					title: 'alerts9331',
					activeMenu: '/rick_alert',
					roles: [3, 2]
				}
			},
			{
				path: '/rick_alert/search/:search',
				name: 'AlertsSearch',
				hidden: true,
				component: () => import('@/views/alerts_lingyi/index'),
				meta: {
					title: 'alerts9331',
					breadcrumb: false,
					activeMenu: '/rick_alert',
					roles: [2]
				}
			}
		]
	},
	{
		path: '/alerts',
		component: Layout,
		redirect: '/alerts',
		meta: {
			title: 'alerts',
			icon: 'alerts',
			roles: [2]
		},
		children: [
			{
				path: '/alerts',
				name: 'Alerts',
				component: () => import('@/views/alerts/index'),
				meta: {
					title: 'alerts',
					roles: [2],
					breadcrumb: false
				}
			},
			{
				path: '/devices/alerts/:id',
				name: 'DeviceDataAlerts',
				hidden: true,
				component: () => import('@/views/alerts/index'),
				meta: {
					title: 'alerts',
					activeMenu: '/alerts',
					roles: [3, 2]
				}
			},
			{
				path: '/alerts/search/:search',
				name: 'AlertsSearch',
				hidden: true,
				component: () => import('@/views/alerts/index'),
				meta: {
					title: 'Alerts',
					breadcrumb: false,
					activeMenu: '/alerts',
					roles: [2]
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
			roles: [3]
		},
		children: [
			{
				path: '/devices',
				name: 'Devices',
				component: () => import('@/views/devices/index'),
				meta: {
					title: 'devices',
					breadcrumb: false,
					activeMenu: '/devices',
					roles: [3]
				}
			},
			{
				path: '/devices/sleep_monitor',
				name: 'SleepMonitor',
				component: () => import('@/views/devices/sleepMonitor'),
				meta: {
					title: 'sleepMonitor',
					breadcrumb: true,
					activeMenu: '/devices/sleep_monitor',
					roles: process.env.VUE_APP_PROJECT_NAME == 'LING_YI' ? [3] : []
				},
				children: [
					{
						path: '/devices/sleep_monitor/sleep_data/:id',
						name: 'SleepChart',
						component: () => import('@/views/devices/sleepChart'),
						hidden: true,
						meta: {
							title: 'statistices',
							breadcrumb: true,
							activeMenu: '/devices/sleep_monitor',
							roles: [3]
						}
					}
				]
			},
			{
				path: '/devices/search/:search',
				name: 'DevicesSearch',
				hidden: true,
				component: () => import('@/views/devices/index'),
				meta: {
					title: 'devices',
					breadcrumb: false,
					activeMenu: '/devices',
					roles: [3]
				}
			},
			{
				path: 'device_data/:id',
				name: 'DeviceData',
				hidden: true,
				component: () => import('@/views/devices/graph'),
				meta: {
					title: 'statistices',
					activeMenu: '/devices',
					roles: [13]
				}
			}
		]
	},
	{
		path: '/caregiver',
		component: Layout,
		meta: {
			title: 'caregiver',
			icon: 'appUsers',
			roles: [4]
		},
		children: [
			{
				path: '/caregiver',
				name: 'Caregiver',
				hidden: true,
				component: () => import('@/views/appUsers/index'),
				meta: {
					title: 'caregiver',
					breadcrumb: false,
					activeMenu: '/caregiver',
					roles: [4]
				}
			},
			{
				path: '/caregiver/search/:search',
				name: 'CaregiverSearch',
				hidden: true,
				component: () => import('@/views/appUsers/index'),
				meta: {
					title: 'Caregiver',
					activeMenu: '/caregiver',
					breadcrumb: false,
					roles: [4]
				}
			}
		]
	},
	{
		path: '/organization',
		component: Layout,
		meta: {
			title: 'organization',
			icon: 'accounts',
			roles: [5]
		},
		children: [
			{
				path: '/organization',
				name: 'subOrg',
				component: () => import('@/views/accounts/index'),
				meta: {
					title: 'subOrg',
					activeMenu: '/organization',
					roles: [5, 16, 17, 18]
				}
			},
			{
				path: '/organization/search/:search',
				name: 'SubOrgSearch',
				hidden: true,
				component: () => import('@/views/accounts/index'),
				meta: {
					title: 'subOrg',
					breadcrumb: false,
					activeMenu: '/organization',
					roles: [5, 16, 17, 18]
				}
			},
			{
				path: '/organization/accounts',
				name: 'Accounts',
				component: () => import('@/views/accounts/adminAccount'),
				meta: {
					title: 'administrator',
					roles: [19, 22]
				}
			},
			{
				path: '/organization/roles',
				name: 'Roles',
				component: () => import('@/views/accounts/roles'),
				meta: {
					title: 'roles',
					roles: [24, 25]
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
			roles: [6]
		},
		children: [
			{
				path: '/messages',
				name: 'Messages',
				component: () => import('@/views/messages/index'),
				meta: {
					title: 'messages',
					breadcrumb: false,
					roles: [6]
				}
			},
			{
				path: '/devices/message/:id',
				name: 'DeviceMessage',
				hidden: true,
				component: () => import('@/views/messages/index'),
				meta: {
					title: 'messages',
					activeMenu: '/messages',
					roles: [3, 6]
				}
			},
			{
				path: '/messages/search/:search',
				name: 'MessagesSearch',
				hidden: true,
				component: () => import('@/views/messages/index'),
				meta: {
					title: 'messages',
					activeMenu: '/messages',
					breadcrumb: false,
					roles: [6]
				}
			},
			{
				path: '/devices/message/:id/:search',
				name: 'DeviceMessageSearch',
				hidden: true,
				component: () => import('@/views/messages/index'),
				meta: {
					title: 'messages',
					activeMenu: '/messages',
					roles: [3, 6]
				}
			}
		]
	},
	// {
	// 	path: '/statistices',
	// 	component: Layout,
	// 	meta: {
	// 		title: 'statistices',
	// 		icon: 'statistices',
	// 		roles: ['admin']
	// 	},
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'Statistices',
	// 			component: () => import('@/views/statistices/index'),
	// 			meta: {
	// 				title: 'statistices',
	// 				breadcrumb: false,
	// 				roles: ['admin']
	// 			}
	// 		}
	// 	]
	// },
	{
		path: '/services',
		component: Layout,
		meta: {
			title: 'services',
			icon: 'services',
			roles: []
			// roles: process.env.VUE_APP_PROJECT_NAME == 'LING_YI'
			//   ? [1]
			//   : []
		},
		children: [
			{
				path: '',
				name: 'Services',
				component: () => import('@/views/services/index'),
				meta: {
					title: 'services',
					breadcrumb: false,
					roles: [1],
					activeMenu: '/services'
				}
			},
			{
				path: 'emergency_rescue',
				name: 'EmergencyRescue',
				hidden: true,
				component: () => import('@/views/services/sos'),
				meta: {
					title: 'emergencyRescue',
					breadcrumb: true,
					roles: [1],
					activeMenu: '/services'
				}
			}
		]
	},
	// {
	// 	path: '/billing',
	// 	component: Layout,
	// 	meta: {
	// 		title: 'billing',
	// 		icon: 'billing',
	// 		roles: ['admin']
	// 	},
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'Billing',
	// 			component: () => import('@/views/billing/index'),
	// 			meta: {
	// 				title: 'billing',
	// 				breadcrumb: false,
	// 				roles: ['admin']
	// 			}
	// 		}
	// 	]
	// },
	{
		path: '/about',
		component: Layout,
		meta: {
			title: 'about',
			icon: 'about',
			roles: [7]
		},
		children: [
			// {
			// 	path: 'companyInfo',
			// 	name: 'CompanyInfo',
			// 	component: () => import('@/views/about/index'),
			// 	meta: { title: 'aboutUs' }
			// },
			{
				path: '/about',
				name: 'About',
				component: () => import('@/views/about/index'),
				meta: {
					breadcrumb: false,
					title: 'about',
					roles: [7]
				}
			},
			{
				path: '/about/termsService',
				name: 'TermsService',
				hidden: true,
				component: () => import('@/views/about/termsService'),
				meta: {
					title: 'termsService',
					roles: [7],
					activeMenu: '/about'
				}
			},
			{
				path: '/about/termsSale',
				name: 'TermsSale',
				hidden: true,
				component: () => import('@/views/about/termsSale'),
				meta: {
					title: 'termsSale',
					roles: [7],
					activeMenu: '/about'
				}
			}
		]
	},
	{
		path: '/adminSystem',
		component: Layout,
		meta: {
			title: 'adminSystem',
			icon: 'adminSystem',
			roles: ['admin_su']
		},
		children: [
			{
				path: 'file',
				name: 'file',
				component: () => import('@/views/adminSystem/file'),
				meta: { title: 'file', roles: ['admin'] }
			},
			{
				path: 'preRelease',
				name: 'preRelease',
				component: () => import('@/views/adminSystem/preReleaseList'),
				meta: { title: 'preRelease', roles: ['admin'] }
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
