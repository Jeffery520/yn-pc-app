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
				:list-params="{ id: $route.params.id, type: 3 }"
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
import { deviceSlOfChart } from '@/api/devices';
import { sortBy } from 'lodash/collection';

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
			deviceSlOfChart({
				did: 73143,
				start: parseInt(
					new Date(this.$refs.chartHeader.currentDate).getTime() / 1000
				), // 单位（秒）
				end: parseInt(
					new Date(this.$refs.chartHeader.endDate).getTime() / 1000
				), // 单位（秒）
				viewType: this.$refs.chartHeader.viewType
			})
				.then((data) => {
					// 绘制图表
					this._drawPie('sleep', this._setOptions(data));
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
		_setOptions(seriesData = []) {
			if (this.$refs.chartHeader.viewType == 1) {
				return this._setHourOption(seriesData);
			} else {
				return this._setDayOption(seriesData);
			}
		},
		// 折线图表配置项
		// 1.day
		_setHourOption(seriesData = []) {
			// this._initHourData(seriesData)
			console.log(seriesData);
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
					minSpan: 10,
					maxSpan: this.$refs.chartHeader.viewType == 3 ? 50 : 100
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
		},
		// 1.week
		_setDayOption(seriesData = []) {
			seriesData = this._initDayData(seriesData);
			var colorList = [
				'#39C973', // 深睡
				'#28ADFC', // 浅睡
				'#FF7F00' // 未入睡
			];
			let setOption = {
				color: colorList,
				tooltip: {
					trigger: 'axis'
				},
				// Make gradient line here
				dataZoom: {
					type: 'slider',
					filterMode: 'weakFilter',
					left: 70,
					right: 60,
					minSpan: 25,
					maxSpan: this.$refs.chartHeader.viewType == 3 ? 50 : 100
				},
				xAxis: {
					type: 'time',
					splitNumber:
						this.$refs.chartHeader.viewType == 1
							? 25
							: this.$refs.chartHeader.viewType == 2
							? 8
							: this.$refs.chartHeader.viewType == 3
							? 31
							: this.$refs.chartHeader.viewType == 4
							? 10
							: 10,
					min: new Date(this.$refs.chartHeader.currentDate).getTime(),
					max: new Date(this.$refs.chartHeader.endDate).getTime(),
					// maxInterval: this._xAxisInterval(),
					axisLabel: {
						formatter: this.formatter
					},
					axisLine: { show: true },
					// 是否显示分割线
					splitLine: { show: false },
					// 不显示刻度线
					axisTick: { show: true }
				},
				yAxis: [
					{
						name: 'Percent',
						axisLabel: {
							formatter: function(val) {
								return val + '%';
							}
						},
						min: 0,
						max: 100
					},
					{
						name: 'Percent',
						axisLabel: {
							formatter: function(val) {
								return val + '%';
							}
						},
						min: 0,
						max: 100
					},
					{
						name: 'Hour',
						max: 1000,
						min: 0
					}
				],
				series: seriesData
			};
			return setOption;
		},
		_initHourData(data) {
			// var data = [
			// 	[1572943060942, 1573993171941, 40, 'A'],
			// 	[1573943076941, 1574143083942, 60, 'B'],
			// 	[1574143083942, 1575143083942, 60, 'c']
			// ];
			data = data.filter((item) => {
				return item.stepcount > 1;
			});
			// 升序并格式化时间戳
			var valueList = data.map(function(item) {
				if (item.deepperc) {
					return [
						item.sleepdate * 1000,
						item.wakeupdate * 1000,
						item.deepperc,
						'Deep'
					];
				} else if (item.quiteperc) {
					return [
						item.sleepdate * 1000,
						item.wakeupdate * 1000,
						item.deepperc,
						'Light'
					];
				} else {
					return [
						item.sleepdate * 1000,
						item.wakeupdate * 1000,
						item.deepperc,
						'Light'
					];
				}
			});
			valueList = sortBy(valueList, 'measuredate');
			return valueList;
		},
		_initDayData(data) {
			// data = data.filter((item) => {
			// 	return item.stepcount > 1;
			// });

			// 升序并格式化时间戳
			let valueList = sortBy(data, 'measuredate');

			var valueDeep = valueList.map(function(item) {
				return [item.measuredate * 1000, item.deepperc];
			});
			var valueQuite = valueList.map(function(item) {
				return [item.measuredate * 1000, item.quiteperc];
			});
			var valueSleeptimes = valueList.map(function(item) {
				return [item.measuredate * 1000, item.sleeptimes];
			});
			return [
				{
					name: 'Deep',
					type: 'bar',
					barGap: 0,
					barWidth: 12,
					data: valueDeep
				},
				{
					name: 'Light',
					type: 'bar',
					barGap: 0,
					barWidth: 12,
					data: valueQuite
				},
				{
					name: 'Sleeptimes',
					type: 'line',
					barGap: 0,
					barWidth: 12,
					data: valueSleeptimes
				}
			];
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/components/Chart/chart.scss';
</style>
