<template>
	<div class="error-bg">
		<svg-icon class-name="not-found-icon" icon-class="404"></svg-icon>
		<div>404 not found !</div>
		<el-button @click="goToHome" style="margin-top: 20px;">{{
			$store.getters.language == 'en' ? 'Back to Home' : '返回首页'
		}}</el-button>
	</div>
</template>

<script>
export default {
	name: '404',
	methods: {
		goToHome() {
			console.log('返回首页');
			this.$router.replace({ name: 'Layout' });
		}
	}
};
</script>

<style lang="scss" scoped>
@import '~@/style/mixin.scss';
.error-bg {
	@include flex-c-c-c;
	font-size: 24px;
	color: #999;
	.not-found-icon {
		font-size: 200px;
		margin: 200px 0 40px;
	}
}
</style>
