<template>
	<el-container :class="classObj">
		<el-header class="app-header-bg" height="70">
			<Navbar></Navbar>
		</el-header>
		<el-container class="app-contain-bg" :height="clientHeight">
			<el-aside class="app-aside-bg" width="auto">
				<Sidebar class="sidebar-container" />
			</el-aside>
			<el-main class="app-main-bg">
				<app-main></app-main>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import { AppMain, Navbar, Sidebar } from '@/layout/components';
import ResizeMixin from './mixin/ResizeHandler';
import { _debounce } from '@/utils/validate';

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
				'el-container-height': true,
				hideSidebar: !this.sidebar.opened,
				openSidebar: this.sidebar.opened,
				withoutAnimation: this.sidebar.withoutAnimation
			};
		}
	},
	mounted() {
		console.log('layout mounted');
		const that = this;
		// 获取窗口宽高
		this.clientHeight = document.body.clientHeight - 70;
		window.onresize = _debounce(function() {
			that.clientHeight = document.body.clientHeight - 70;
		});
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.app-header-bg {
	text-align: center;
	line-height: 70px;
	padding: 0;
}
.el-container-height {
	height: 100%;
}
.app-contain-bg {
	height: 100%;
	overflow: hidden;
}
.app-aside-bg {
	height: 100%;
	background-color: #242d3c;
}

.app-main-bg {
	height: 100%;
	text-align: center;
	padding: 0;
}
</style>
