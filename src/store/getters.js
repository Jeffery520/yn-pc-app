const getters = {
	device: (state) => state.app.device,
	language: (state) => state.app.language,
	cdnLocation: (state) => state.app.cdnLocation,
	sidebar: (state) => state.app.sidebar,
	token: (state) => state.user.token,
	userInfo: (state) => state.user.userInfo,
	roles: (state) => state.user.roles,
	permission_routes: (state) => state.permission.routes
};
export default getters;
