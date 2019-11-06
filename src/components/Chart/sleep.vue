<template>
	<div class="chart-bg sleep-bg">
		<chart-header
			ref="chartHeader"
			title="Sleep Time"
			@dateChanged="dateChanged"
			@typeChanged="typeChanged"
			@changeList="changeList"
		></chart-header>

		<div class="chart-content">
			<chart-list
				v-if="isShowList"
				:valueList="valueList"
				icon-class="steps"
			></chart-list>
			<div v-show="!isShowList" id="sleep" class="chart-canvas"></div>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import echarts from 'echarts';

import ChartHeader from '@/components/Chart/chartHeader';
import ChartList from '@/components/Chart/chartList';
import { deviceHeartRateOfChart } from '@/api/devices';

export default {
	name: 'Sleep',
	mixins: [mixin],
	components: { ChartHeader, ChartList },
	//调用
	mounted() {
		this._getHeartRateOfChart();
	},
	methods: {
		_getHeartRateOfChart() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.sleep-bg'),
				background: 'rgba(225, 225, 225, 0)'
			});
			// 请求图表数据
			deviceHeartRateOfChart({
				dataType: 4,
				did: 73143,
				start: new Date(this.$refs.chartHeader.currentDate).getTime() / 1000, // 单位（秒）
				viewType: this.$refs.chartHeader.viewType
			})
				.then((data) => {
					// 绘制图表
					this._drawPie('sleep', this._setLineGapOption(this._initData([])));
				})
				.catch((error) => {
					this.loading.close();
					this.$message({
						showClose: true,
						message:
							error.message || `Request failed with status code${error.status}`,
						type: 'error'
					});
				});
		},
		// 日期改变时触发
		dateChanged() {
			this._getHeartRateOfChart();
		},
		// 图表类型改变时触发
		typeChanged() {
			this._getHeartRateOfChart();
		},
		// 折线图表配置项
		_setLineGapOption(seriesData = []) {
			var data = [
				[1572943060942, 1573993171941, 40, 'A'],
				[1573943076941, 1574143083942, 60, 'B'],
				[1574143083942, 1575143083942, 60, 'c']
			];
			// 0:开始 1:结束 3:高度  4.类型
			// [['开始时间', '结束时间', '睡眠类型'],['开始时间', '结束时间', '睡眠类型'],]
			var colorList = [
				'#39C973', // 深睡
				'#28ADFC', // 浅睡
				'#FF7F00' // 未入睡
			];

			data = echarts.util.map(data, function(item, index) {
				return {
					value: item,
					itemStyle: {
						normal: {
							color: colorList[index]
						}
					}
				};
			});

			function renderItem(params, api) {
				var yValue = api.value(2);
				var start = api.coord([api.value(0), yValue]);
				var size = api.size([api.value(1) - api.value(0), yValue]);
				var style = api.style();
				return {
					type: 'rect',
					shape: {
						x: start[0],
						y: start[1],
						width: size[0],
						height: size[1]
					},
					style: style
				};
			}

			let setOption = {
				title: {
					text: 'Profit',
					left: 'center'
				},
				tooltip: {},
				dataZoom: {
					type: 'slider',
					filterMode: 'weakFilter',
					left: 70,
					right: 60,
					minSpan: 50,
					maxSpan: 100
				},
				xAxis: {
					type: 'time',
					axisLine: { show: false },
					// 是否显示分割线
					splitLine: { show: true },
					// 不显示刻度线
					axisTick: { show: false }
				},
				yAxis: {
					minInterval: 100,
					axisLine: { show: false },
					// 是否显示分割线
					splitLine: { show: false },
					// 不显示刻度线
					axisTick: { show: false },
					// 刻度值
					axisLabel: { show: false }
				},
				series: [
					{
						type: 'custom',
						renderItem: renderItem,
						dimensions: ['from', 'to'],
						encode: {
							x: [0, 1],
							y: 2,
							tooltip: [0, 1],
							itemName: 3
						},
						data: data
					}
				]
			};
			return setOption;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/components/Chart/chart.scss';
</style>
