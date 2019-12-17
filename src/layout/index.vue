<template>
	<el-container :class="classObj">
		<el-header height="70">
			<Navbar></Navbar>
		</el-header>
		<el-container :style="{ height: clientHeight }">
			<el-aside width="auto">
				<Sidebar class="sidebar-container" />
			</el-aside>
			<el-main>
				<app-main></app-main>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import { AppMain, Navbar, Sidebar } from '@/layout/components';
import ResizeMixin from './mixin/ResizeHandler';
export default {
	name: 'layout',
	components: {
		AppMain,
		Navbar,
		Sidebar
	},
	data() {
		return { clientHeight: 800 };
	},
	mixins: [ResizeMixin],
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar;
		},
		classObj() {
			return {
				hideSidebar: !this.sidebar.opened,
				openSidebar: this.sidebar.opened,
				withoutAnimation: this.sidebar.withoutAnimation
			};
		}
	},
	mounted() {
		console.log('map beforeMount');
		// 获取窗口宽高
		this.clientHeight = document.body.clientHeight - 70 + 'px';
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.el-header {
	text-align: center;
	line-height: 70px;
	padding: 0;
}

.el-aside {
	height: 100%;
}

.el-main {
	text-align: center;
	padding: 0;
	overflow-y: scroll;
}
</style>
