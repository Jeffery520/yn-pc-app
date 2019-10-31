<template>
	<div class="nav">
		<div v-if="isDesktop" class="logo">
			<img alt="YiNuo logo" src="@/assets/images/logo.png" />
		</div>
		<span v-if="isDesktop" class="split-line"></span>
		<div v-if="isDesktop" class="nav-center">
			{{ date }}
		</div>
		<span v-if="isDesktop" class="split-line"></span>
		<router-link to="/messages" tag="div" class="nav-message">
			<i class="el-icon-message"></i> <span>18</span>
		</router-link>
		<span class="split-line"></span>
		<router-link to="/alerts" tag="div" class="nav-message">
			<i class="el-icon-bell"></i>
			<span>1</span>
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
import LanSelect from '@/components/LangSelect/index';
import ScreenFull from '@/components/ScreenFull/index';
import UserInfo from '@/components/UserInfo/UserInfo';
export default {
	name: 'Header',
	components: {
		LanSelect,
		ScreenFull,
		UserInfo
	},
	data() {
		return {
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
		}, 60000);
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
				return `${YY}年${MM}月${DD}日 ${HH}:${mm} `;
			}
			return `${HH <= 12 ? 'AM' : 'PM'}${HH}:${mm} ${ENM[MM]} ${DD}, ${YY}`;
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
		width: 268px;
		height: 100%;
		box-sizing: border-box;
		@include flex-c-c;
		align-items: flex-end;
		img {
			width: 208px;
			height: 57px;
			display: block;
		}
	}
	.nav-center {
		height: 100%;
		flex-grow: 1;
		text-align: right;
		padding-right: 40px;

		line-height: 1.2;
		@include flex-e-c;
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
