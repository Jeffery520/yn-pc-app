<template>
	<div>
		<el-dropdown placement="bottom">
			<el-row class="user-info">
				<el-avatar
					icon="el-icon-user-solid"
					size="medium"
					:src="userInfo.fFaceUrl || ''"
				></el-avatar>
				<p v-if="isDesktop">{{ userInfo.username || 'Yi Nuo' }}</p>
				<i
					v-if="isDesktop"
					:class="isShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
				></i>
			</el-row>
			<el-dropdown-menu slot="dropdown" placement="bottom">
				<!--        <el-dropdown-item>{{ $t("user.settings") }}</el-dropdown-item>-->
				<el-dropdown-item>
					<span @click="logout">{{ $t('user.logout') }}</span>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
export default {
	name: 'userInfo',
	props: ['userInfo'],
	data() {
		return { isShow: false };
	},
	computed: {
		isDesktop() {
			return this.$store.getters.device == 'desktop';
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('user/logout');
		}
	}
};
</script>

<style lang="scss" scoped>
@import '~@/style/mixin.scss';
.el-dropdown {
	display: block !important;
}
.user-info {
	padding: 0 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: #fff;
	p {
		@include text-overflow;
		max-width: 90px;
		margin: 0 5px;
		font-size: 18px;
	}
	i {
		font-size: 20px;
	}
}
</style>
