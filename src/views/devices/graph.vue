<template>
	<div class="statistices-bg">
		<div class="statistices-chart-inner">
			<div class="chart-bg">
				<heart-rate :Did="parseInt($route.params.id)"></heart-rate>
			</div>
			<div class="chart-bg">
				<steps :Did="parseInt($route.params.id)"></steps>
			</div>
			<div class="chart-bg">
				<sleep-time :Did="parseInt($route.params.id)"></sleep-time>
			</div>
			<!--    活跃度-->
			<div class="chart-bg">
				<blood-pressure :Did="parseInt($route.params.id)"></blood-pressure>
			</div>
			<!--    警报-->
			<div class="chart-bg">
				<blood-glucose :Did="parseInt($route.params.id)"></blood-glucose>
			</div>
			<!--    警报趋势-->
			<!--			<div class="chart-bg">-->
			<!--				<alert-trend :Did="Did"></alert-trend>-->
			<!--			</div>-->

			<!--    血氧 -->
			<div class="chart-bg">
				<blood-oxygen :Did="parseInt($route.params.id)"></blood-oxygen>
			</div>
			<div></div>
			<div></div>
		</div>
		<marks-map
			ref="marksMap"
			:formData="{ Did: parseInt($route.params.id) }"
			style="margin-top: 10px;"
		></marks-map>
	</div>
</template>
<script>
// import AlertTrend from '@/components/Chart/alertTrend.vue';
const marksMap = () => import('@/components/Maps/TrackingMode.vue');
const HeartRate = () => import('@/components/Chart/heartRate.vue');
const Steps = () => import('@/components/Chart/steps.vue');
const SleepTime = () => import('@/components/Chart/sleep.vue');
const BloodPressure = () => import('@/components/Chart/bloodPressure.vue');
const BloodGlucose = () => import('@/components/Chart/bloodGlucose.vue');
const BloodOxygen = () => import('@/components/Chart/bloodOxygen.vue');

export default {
	name: 'DeviceData',
	components: {
		marksMap,
		HeartRate,
		Steps,
		SleepTime,
		BloodPressure,
		BloodGlucose,
		// AlertTrend,
		BloodOxygen
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
	padding: 40px 30px 40px !important;
	@include table-bg;
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
