<template>
	<div class="statistices-bg">
		<div class="statistices-chart-inner">
			<div class="chart-bg">
				<sleep-time :Did="parseInt($route.params.id)"></sleep-time>
			</div>
			<div class="chart-bg">
				<breathing-movement
					:Did="parseInt($route.params.id)"
				></breathing-movement>
			</div>
		</div>
	</div>
</template>
<script>
const SleepTime = () => import('@/components/Chart/SleepMonitorChat.vue');
const BreathingMovement = () =>
	import('@/components/Chart/BreathingMovement.vue');
export default {
	name: 'SleepChart',
	components: {
		SleepTime,
		BreathingMovement
	},
	data() {
		return {};
	},
	mounted() {},
	methods: {}
};
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.statistices-bg {
	padding: 10px !important;
	height: 90vh;
	//@include table-bg;
	.statistices-chart-inner {
		width: 105%;
		@include flex-b-c;
		justify-content: flex-start;
		flex-wrap: wrap;
		.chart-bg {
			margin-right: 20px;
		}
	}
}
</style>
