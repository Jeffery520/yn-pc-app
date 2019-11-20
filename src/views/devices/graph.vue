<template>
	<div class="statistices-bg">
		<div class="statistices-chart-inner">
			<div class="chart-bg">
				<heart-rate></heart-rate>
			</div>
			<div class="chart-bg">
				<steps></steps>
			</div>
			<div class="chart-bg">
				<sleep-time></sleep-time>
			</div>
			<!--    活跃度-->
			<div class="chart-bg">
				<blood-pressure></blood-pressure>
			</div>
			<!--    警报-->
			<div class="chart-bg">
				<blood-glucose></blood-glucose>
			</div>
			<!--    警报趋势-->
			<!--			<div class="chart-bg">-->
			<!--				<alert-trend></alert-trend>-->
			<!--			</div>-->

			<!--    血氧 -->
			<div class="chart-bg">
				<blood-oxygen></blood-oxygen>
			</div>
		</div>
		<marks-map
			:formData="{ did: $route.params.id }"
			style="margin-top: 10px;"
		></marks-map>
	</div>
</template>
<script>
// import AlertTrend from '@/components/Chart/alertTrend.vue';
const marksMap = (resolve) =>
	require(['@/components/Maps/TrackingMode.vue'], resolve);
const HeartRate = (resolve) =>
	require(['@/components/Chart/heartRate.vue'], resolve);
const Steps = (resolve) => require(['@/components/Chart/steps.vue'], resolve);
const SleepTime = (resolve) =>
	require(['@/components/Chart/sleep.vue'], resolve);
const BloodPressure = (resolve) =>
	require(['@/components/Chart/bloodPressure.vue'], resolve);
const BloodGlucose = (resolve) =>
	require(['@/components/Chart/bloodGlucose.vue'], resolve);
const BloodOxygen = (resolve) =>
	require(['@/components/Chart/bloodOxygen.vue'], resolve);

export default {
	name: 'DevicesGraph',
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
	methods: {}
};
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.statistices-bg {
	padding: 40px 30px 40px !important;
	@include table-bg;
	.statistices-chart-inner {
		@include flex-b-c;
		flex-wrap: wrap;
	}
}
</style>
