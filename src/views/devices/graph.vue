<template>
	<div class="statistices-bg">
		<div class="statistices-chart-inner">
			<!--    年龄-->
			<div class="chart-bg">
				<heart-rate></heart-rate>
			</div>
			<!--    高血压-->
			<div class="chart-bg">
				<steps></steps>
			</div>
			<!--    糖尿病-->
			<div class="chart-bg">
				<div id="diabetes" style="width: 420px;height: 340px;"></div>
			</div>
			<!--    活跃度-->
			<div class="chart-bg">
				<div id="activity" style="width: 420px;height: 340px;"></div>
			</div>
			<!--    警报-->
			<div class="chart-bg">
				<div id="alerts" style="width: 420px;height: 340px;"></div>
			</div>
			<!--    警报趋势-->
			<div class="chart-bg">
				<div id="alertTrend" style="width: 420px;height: 340px;"></div>
			</div>
		</div>
		<marks-map style="margin-top: 10px;"></marks-map>
	</div>
</template>
<script>
import echarts from 'echarts';
import marksMap from '@/components/Maps/TrackingMode.vue';
import HeartRate from '@/components/Chart/heartRate.vue';
import Steps from '@/components/Chart/steps.vue';
export default {
	name: 'DevicesGraph',
	components: { marksMap, HeartRate, Steps },
	data() {
		return {
			charts: '',
			alertTrendOptionData: {
				title: 'Alert Trend',
				legendData: ['Normal', 'Hypertension', 'Hypotension'],
				opinionData: [
					{
						value: 335,
						name: 'Normal',
						itemStyle: {
							color: '#63D1E1'
						}
					},
					{
						value: 310,
						name: 'Hypertension',
						itemStyle: {
							color: '#F97777'
						}
					},
					{
						value: 234,
						name: 'Hypotension',
						itemStyle: {
							color: '#6BAFE3'
						}
					}
				]
			}
		};
	},
	//调用
	mounted() {
		this.$nextTick(function() {
			this._drawPie(
				'alertTrend',
				this._setBarGapOption(this.heartRateOptionData)
			);
		});
	},
	methods: {
		_drawPie(id, setOption) {
			this.charts = echarts.init(document.getElementById(id), { width: 365 });
			this.charts.setOption(setOption);
		},
		// 折线图表配置项
		_setLineGapOption() {
			let setOption = {
				// title: {
				// 	text: 'Heart rate'
				// },
				tooltip: {
					trigger: 'axis'
				},
				// Make gradient line here
				visualMap: [
					{
						show: false,
						type: 'piecewise',
						pieces: [
							{ gt: 100, color: '#E14F4F' }, // (1500, Infinity]
							{ gt: 50, lte: 100, color: '#83DD47' }, // (10, 200]
							{ lt: 50, color: '#FD9937' } // (-Infinity, 5)
						]
					}
				],
				xAxis: {
					data: [
						'0',
						'1',
						'2',
						'3',
						'4',
						'5',
						6,
						7,
						8,
						9,
						10,
						11,
						12,
						13,
						14,
						15,
						16,
						17,
						18,
						19,
						20,
						21,
						22,
						23
					],
					axisLine: { show: false },
					// 是否显示分割线
					splitLine: { show: true, interval: 0 },
					// 坐标轴两边不留白
					boundaryGap: false,
					// 不显示刻度线
					axisTick: { show: false, alignWithLabel: true }
				},
				yAxis: {
					axisLine: { show: false },
					splitLine: { show: true },
					axisTick: { show: false },
					minInterval: 50
				},
				series: [
					{
						type: 'line',
						// 平滑的曲线
						smooth: true,
						// 是否显示标记点
						showSymbol: false,
						data: [
							10,
							40,
							150,
							90,
							10,
							40,
							20,
							10,
							40,
							20,
							90,
							10,
							40,
							20,
							10,
							40,
							20,
							90,
							10,
							40,
							20,
							10,
							40,
							20,
							90,
							10,
							40,
							20,
							10,
							40,
							20,
							90,
							10,
							40,
							20,
							90,
							10,
							40,
							20,
							150
						]
					}
				]
			};
			return setOption;
		},

		// 柱状图表配置项
		_setBarGapOption() {
			let setOption = {
				title: {
					text: 'Alert Trend'
				},
				tooltip: {},
				xAxis: {
					data: [
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
					],
					axisLabel: {
						formatter: '{value}',
						color: '#000',
						rotate: 45
					}
				},
				yAxis: {
					splitLine: {
						lineStyle: { color: '#000' }
					},
					axisLabel: {
						color: '#000'
					}
				},
				series: [
					{
						type: 'bar',
						name: 'Alert Trend',
						data: [10, 40, 20, 90, 10, 40, 20, 90, 10, 40, 20, 90],
						barWidth: 18,
						itemStyle: {
							color: '#4F81BD'
						}
					}
				]
			};
			return setOption;
		}
	}
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
