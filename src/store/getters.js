const getters = {
	WindowWidth: (state) => state.app.WindowWidth,
	WindowHeight: (state) => state.app.WindowHeight,
	device: (state) => state.app.device,
	language: (state) => state.app.language,
	sidebar: (state) => state.app.sidebar,
	token: (state) => state.user.token,
	userInfo: (state) => state.user.userInfo,
	roles: (state) => state.user.roles,
	permission_routes: (state) => state.permission.routes,
	mainRoute: (state) => state.permission.mainRoute
};
export default getters;
