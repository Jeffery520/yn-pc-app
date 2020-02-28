import { asyncRoutes, constantRoutes } from '@/router';
import store from '../index';
/**
 * 使用 meta.role 确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some((role) => route.meta.roles.includes(role));
	} else {
		return true;
	}
}

/**
 * 通过递归用户权限过滤异步路由表
 * 递归路由过滤
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
	const res = [];
	routes.forEach((route) => {
		const tmp = { ...route };
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles);
			}
			res.push(tmp);
		}
	});
	return res;
}
// 全局路由
const state = {
	routes: constantRoutes, // 有访问权限的路由
	addRoutes: [], // 全部可访问路由（基础路由+有访问权限的路由）
	mainRoute: {}
};

const mutations = {
	SET_ROUTES: (state, routes) => {
		state.addRoutes = routes;
		state.routes = constantRoutes.concat(routes);
	},
	SET_MAIN_ROUTE: (state, route) => {
		state.mainRoute = route;
	}
};

const actions = {
	// 生成路由
	generateRoutes({ commit }, roles) {
		return new Promise((resolve) => {
			let accessedRoutes;
			accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
			// 设置可访问路由
			commit('SET_ROUTES', accessedRoutes);
			// 设置路由主页
			let mainRoute = {};
			let permission_routes = accessedRoutes;
			for (var i = 0; i < permission_routes.length; i++) {
				if (
					!permission_routes[i].hidden &&
					permission_routes[i].name != 'Layout'
				) {
					mainRoute = permission_routes[i];
					break;
				}
			}
			console.log('SET_MAIN_ROUTE', mainRoute);
			commit('SET_MAIN_ROUTE', mainRoute);
			resolve(accessedRoutes);
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
