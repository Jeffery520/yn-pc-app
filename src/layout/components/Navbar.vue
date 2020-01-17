<template>
	<div class="nav">
		<div v-if="isDesktop" class="logo">
			<img alt="YiNuo logo" src="@/assets/images/logo_white.png" />
		</div>
		<span v-if="isDesktop" class="split-line"></span>
		<div v-if="isDesktop" class="nav-center">
			<i class="el-icon-time"></i>
			{{ date }}
		</div>
		<span v-if="isDesktop" class="split-line"></span>
		<router-link to="/messages" tag="div" class="nav-message">
			<i class="el-icon-message"></i>
			<!--			<span>99+</span>-->
		</router-link>
		<span class="split-line"></span>
		<router-link to="/alerts" tag="div" class="nav-message">
			<i class="el-icon-bell"></i>
			<!--			<span>12</span>-->
		</router-link>
		<span class="split-line"></span>
		<!--切换中英文-->
		<span class="header-toos">
			<LanSelect></LanSelect>
		</span>
		<span v-if="isDesktop" class="split-line"></span>
		<span v-if="isDesktop" class="header-toos">
			<!-- 全屏-->
			<ScreenFull></ScreenFull>
		</span>
		<span class="split-line"></span>
		<div class="nav-user-info">
			<UserInfo :userInfo="userInfo"></UserInfo>
		</div>
	</div>
</template>

<script>
const LanSelect = () => import('@/components/LangSelect/index');
const ScreenFull = () => import('@/components/ScreenFull/index');
const UserInfo = () => import('@/components/UserInfo/UserInfo');

export default {
	name: 'Header',
	components: {
		LanSelect,
		ScreenFull,
		UserInfo
	},
	data() {
		return {
			TIMER: null,
			userInfo: {},
			date: ''
		};
	},
	computed: {
		isDesktop() {
			return this.$store.getters.device == 'desktop';
		}
	},
	mounted() {
		this.userInfo = this.$store.getters.userInfo;
		this.date = this._getDate();
		clearInterval(this.TIMER);
		this.TIMER = setInterval(() => {
			this.date = this._getDate();
		}, 30000);
	},
	beforeDestroy() {
		clearInterval(this.TIMER);
	},
	methods: {
		_getDate() {
			const date = new Date();
			const ENM = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];
			const YY = date.getFullYear();
			const MM = date.getMonth();
			const DD = date.getDate();
			const HH = date.getHours();
			const mm = date.getMinutes();
			if (this.$store.getters.language == 'zh') {
				return `${YY}年${MM + 1}月${DD}日 ${HH}:${mm < 10 ? '0' + mm : mm}`;
			}
			return `${ENM[MM]} ${DD}, ${YY} ${
				HH == 0 ? 12 : HH > 12 ? HH - 12 : HH
			}:${mm < 10 ? '0' + mm : mm} ${HH <= 12 ? 'AM' : 'PM'}`;
		}
	}
};
</script>

<style scoped lang="scss">
@import '~@/style/mixin.scss';
.nav {
	width: 100%;
	height: 70px;
	overflow: hidden;
	background: $mainColor;
	box-sizing: border-box;
	color: #ffffff;
	font-size: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.logo {
		width: $sideBarWidth;
		height: 100%;
		box-sizing: border-box;
		@include flex-c-c;
		align-items: flex-end;
		img {
			width: 190px;
			display: block;
		}
	}
	.nav-center {
		height: 100%;
		flex-grow: 1;
		text-align: right;
		padding-right: 40px;
		line-height: 1.2;
		text-shadow: 0 3px 3px rgba(0, 0, 0, 0.4);
		@include flex-e-c;
		.el-icon-time {
			font-size: 22px;
			margin-right: 10px;
		}
	}
	.nav-message {
		height: 100%;
		width: 156px;
		@include flex-c-c;
		cursor: pointer;
		i {
			font-size: 32px;
		}
		span {
			height: 26px;
			padding: 0 7px;
			box-sizing: border-box;
			background: #fd9f01;
			border-radius: 200px;
			font-size: 18px;
			margin-left: 10px;
			@include flex-c-c;
		}
	}
	.nav-user-info {
		@include flex-c-c;
	}
	.header-toos {
		height: 100%;
		padding: 0 20px;
		@include flex-c-c;
	}
	.split-line {
		width: 2px;
		background-color: #5892db;
		height: 100%;
		flex-shrink: 0;
	}
}
</style>
