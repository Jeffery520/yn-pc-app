<template>
	<section class="app-main">
		<BreadCrumb></BreadCrumb>
		<transition name="fade-transform" mode="out-in">
			<keep-alive include="Devices,Alerts,DeviceData" :max="5">
				<router-view :key="key" />
			</keep-alive>
		</transition>
	</section>
</template>

<script>
const BreadCrumb = () => import('@/components/BreadCrumb/index.vue');

export default {
	name: 'AppMain',
	components: { BreadCrumb },
	computed: {
		key() {
			return this.$route.path; // 每次都进行刷新页面
		}
	}
};
</script>

<style lang="scss" scoped>
.app-main {
	/* 50= navbar  50  */
	min-height: calc(100vh - 70px);
	width: 100%;
	position: relative;
	overflow: hidden;
	padding: 30px;
}
</style>
