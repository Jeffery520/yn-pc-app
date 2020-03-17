<template>
	<div v-if="$route.params.id" class="statistices-bg">
		<div class="statistices-chart-inner">
			<div v-if="loadingPart >= 0" class="chart-bg">
				<heart-rate :Did="parseInt($route.params.id)"></heart-rate>
			</div>
			<div v-if="loadingPart >= 0" class="chart-bg">
				<steps :Did="parseInt($route.params.id)"></steps>
			</div>
			<div v-if="loadingPart >= 0" class="chart-bg">
				<sleep-time :Did="parseInt($route.params.id)"></sleep-time>
			</div>
			<!--    活跃度-->
			<div v-if="loadingPart >= 1" class="chart-bg">
				<blood-pressure :Did="parseInt($route.params.id)"></blood-pressure>
			</div>
			<!--    警报-->
			<div v-if="loadingPart >= 1" class="chart-bg">
				<blood-glucose :Did="parseInt($route.params.id)"></blood-glucose>
			</div>
			<!--    警报趋势-->
			<!--			<div class="chart-bg">-->
			<!--				<alert-trend :Did="Did"></alert-trend>-->
			<!--			</div>-->

			<!--    血氧 -->
			<div v-if="loadingPart >= 1" class="chart-bg">
				<blood-oxygen :Did="parseInt($route.params.id)"></blood-oxygen>
			</div>
			<!--  体重 -->
			<div v-if="loadingPart >= 1" class="chart-bg">
				<body-weight :Did="parseInt($route.params.id)"></body-weight>
			</div>
			<div></div>
			<div></div>
		</div>
		<marks-map
			v-if="loadingPart >= 2"
			ref="marksMap"
			:formData="{
				Did: parseInt($route.params.id)
			}"
			style="margin-top: 10px;"
		></marks-map>
	</div>
</template>
<script>
// import AlertTrend from '@/components/Chart/alertTrend.vue';
// import marksMap from '@/components/Maps/TrackingMode.vue';

import HeartRate from '@/components/Chart/heartRate.vue';
import Steps from '@/components/Chart/steps.vue';
import SleepTime from '@/components/Chart/sleep.vue';

// import BloodPressure from '@/components/Chart/bloodPressure.vue';
// import BloodGlucose from '@/components/Chart/bloodGlucose.vue';
// import BloodOxygen from '@/components/Chart/bloodOxygen.vue';
// import BodyWeight from '@/components/Chart/bodyWeight.vue';

const marksMap = () => import('@/components/Maps/TrackingMode.vue');
// const HeartRate = () => import('@/components/Chart/heartRate.vue');
// const Steps = () => import('@/components/Chart/steps.vue');
// const SleepTime = () => import('@/components/Chart/sleep.vue');
const BloodPressure = () => import('@/components/Chart/bloodPressure.vue');
const BloodGlucose = () => import('@/components/Chart/bloodGlucose.vue');
const BloodOxygen = () => import('@/components/Chart/bloodOxygen.vue');
const BodyWeight = () => import('@/components/Chart/bodyWeight.vue');

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
		BloodOxygen,
		BodyWeight
	},
	data() {
		return { loading: null, loadingPart: 0 };
	},
	created() {
		this.loadingPart = 0;
	},
	beforeMount() {
		this.loading = this.$loading({
			target: document.querySelector('.statistices-bg'),
			background: 'rgba(225, 225, 225, 0)'
		});
		setTimeout(() => {
			this.loadingPart = 1;
		}, 1000);
	},
	mounted() {
		setTimeout(() => {
			this.loadingPart = 2;
			this.$nextTick(() => {
				// 以服务的方式调用的 Loading 需要异步关闭
				this.loading.close();
			});
		}, 2000);
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
