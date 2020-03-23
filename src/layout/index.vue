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
				<p style="color: #999999;padding:20px 0;font-size: 12px;">
					© 2019,&nbsp;Copyright OneCare,&nbsp;Inc All rights
					reserved.&nbsp;&nbsp;&nbsp;&nbsp;Version:{{ process.VUE_APP_VERSION }}
				</p>
			</el-main>
		</el-container>
		<div class="chat-button-bottom">
			<el-badge
				:value="
					$store.getters.hasUnreadMsg > 99 ? '99+' : $store.getters.hasUnreadMsg
				"
				class="chat-button-bottom-iocn"
				:hidden="!$store.getters.hasUnreadMsg"
				@click.native="
					$store.dispatch('user/setChatShow', !$store.getters.chatShow)
				"
			>
				<svg-icon
					style="color: #fff;text-align: center;cursor: pointer;font-size:36px;"
					icon-class="weixin-icon"
				></svg-icon>
			</el-badge>

			<Chat ref="chatModel" :userInfo="$store.getters.chatInfo"></Chat>
		</div>
	</el-container>
</template>

<script>
import { AppMain, Navbar, Sidebar } from '@/layout/components';
const Chat = () => import('@/components/Chat');
import ResizeMixin from './mixin/ResizeHandler';
import { _debounce } from '@/utils/validate';

export default {
	name: 'layout',
	components: {
		AppMain,
		Navbar,
		Sidebar,
		Chat
	},
	data() {
		return { clientHeight: 800, process: process.env };
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
		console.log(process.env);
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
.chat-button-bottom {
	.chat-button-bottom-iocn {
		width: 54px;
		height: 54px;
		background: #0b8bd2;
		position: fixed;
		right: 50px;
		bottom: 40px;
		z-index: 9999999;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 10px;
		border-radius: 200px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.6);
		&:hover {
			transform: scale(1.2);
			background: #097fd2;
		}
		&:active {
			opacity: 0.6;
		}
	}
}
</style>
