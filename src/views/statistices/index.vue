<template>
	<div class="statistices-bg">
		<div class="statistices-chart-inner">
			<!--    年龄-->
			<div class="chart-bg">
				<div id="demography" style="width: 420px;height: 340px;"></div>
			</div>
			<!--    高血压-->
			<div class="chart-bg">
				<div id="hypertension" style="width: 420px;height: 340px;"></div>
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
import marksMap from '@/components/Maps/marksMap/marksMap.vue';
export default {
	name: 'Statistices',
	components: { marksMap },
	data() {
		return {
			charts: '',
			// 年龄统计
			demographyOptionData: {
				title: 'Demography',
				legendData: ['<65', '≥65 and <70', '≥70 and <80', '≥80'],
				opinionData: [
					{
						value: 335,
						name: '<65',
						itemStyle: {
							color: '#63D1E1'
						}
					},
					{
						value: 310,
						name: '≥65 and <70',
						itemStyle: {
							color: '#F97777'
						}
					},
					{
						value: 234,
						name: '≥70 and <80',
						itemStyle: {
							color: '#6BAFE3'
						}
					},
					{
						value: 135,
						name: '≥80',
						itemStyle: {
							color: '#55CF87'
						}
					}
				]
			},

			// 高血压统计
			hypertensionOptionData: {
				title: 'Hypertension',
				legendData: ['Normal', 'Hypertension ', 'Hypotension'],
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
						name: 'Hypertension ',
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
			},
			// 糖尿病统计
			diabetesOptionData: {
				title: 'Diabetes',
				legendData: ['Diabetes ', 'Hypoglycaemia', 'Normal'],
				opinionData: [
					{
						value: 335,
						name: 'Diabetes ',
						itemStyle: {
							color: '#63D1E1'
						}
					},
					{
						value: 310,
						name: 'Hypoglycaemia',
						itemStyle: {
							color: '#F97777'
						}
					},
					{
						value: 234,
						name: 'Normal',
						itemStyle: {
							color: '#6BAFE3'
						}
					}
				]
			},
			activityOptionData: {
				title: 'Activity',
				legendData: ['<65', '≥65 and <70', '≥70 and <80', '≥80'],
				opinionData: [
					{
						value: 335,
						name: '<65',
						itemStyle: {
							color: '#63D1E1'
						}
					},
					{
						value: 310,
						name: '≥65 and <70',
						itemStyle: {
							color: '#F97777'
						}
					},
					{
						value: 234,
						name: '≥70 and <80',
						itemStyle: {
							color: '#6BAFE3'
						}
					},
					{
						value: 135,
						name: '≥80',
						itemStyle: {
							color: '#55CF87'
						}
					}
				]
			},
			alertsOptionData: {
				title: 'Alerts',
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
			},
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
	methods: {
		_drawPie(id, setOption) {
			this.charts = echarts.init(document.getElementById(id));
			this.charts.setOption(setOption);
		},
		// 环形图表配置项
		_setOption(OptionData) {
			let setOption = {
				title: { text: OptionData.title },
				tooltip: {
					trigger: 'item',
					formatter: '{a}<br/>{b}：{c} ({d}%)',
					confine: true
				},
				legend: {
					orient: 'vertical',
					color: '#000',
					itemWidth: 10,
					itemHeight: 10,
					itemGap: 20,
					x: 'right',
					top: 'middle',
					align: 'left',
					data: OptionData.legendData
				},
				series: [
					{
						name: OptionData.title,
						type: 'pie',
						radius: ['32%', '56%'],
						center: [150, 180],
						data: OptionData.opinionData.sort(function(a, b) {
							return a.value - b.value;
						}),
						label: {
							show: true,
							formatter: function({ percent }) {
								return `${parseInt(percent)}%`;
							},
							width: 10,
							color: '#000'
						}
					}
				]
			};
			return setOption;
		},
		// 柱状图表配置项
		_setBarGapOption(OptionData) {
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
	},
	//调用
	mounted() {
		this.$nextTick(function() {
			this._drawPie('demography', this._setOption(this.demographyOptionData));
			this._drawPie(
				'hypertension',
				this._setOption(this.hypertensionOptionData)
			);
			this._drawPie('diabetes', this._setOption(this.diabetesOptionData));
			this._drawPie('activity', this._setOption(this.activityOptionData));
			this._drawPie('alerts', this._setOption(this.alertsOptionData));
			this._drawPie('alertTrend', this._setBarGapOption());
		});
	}
};
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.statistices-bg {
	padding: 40px 30px 40px !important;
	@include table-bg;
	.statistices-chart-inner {
		overflow-x: scroll;
		@include flex-b-c;
		flex-wrap: wrap;
	}
	.chart-bg {
		width: 31.8%;
		min-width: 470px;
		height: 380px;
		border: 1px solid $baseBorderColor;
		padding: 20px;
		margin-bottom: 40px;
	}
}
</style>
