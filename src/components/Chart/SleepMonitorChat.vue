<template>
	<div class="chart-bg">
		<chart-header
			ref="chartHeader"
			:title="language == 'en' ? 'Sleep Data' : '睡眠数据'"
			@dateChanged="dateChanged"
			@typeChanged="typeChanged"
			@changeList="changeList"
		></chart-header>

		<div class="chart-content">
			<chart-list
				v-if="isShowList"
				:list-params="{ id: $route.params.id, type: 9 }"
				icon-class="sleep"
			></chart-list>
			<div
				v-show="!isShowList"
				id="sleepMonitorChat"
				class="chart-canvas"
			></div>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import { sleepOfChart } from '@/api/devices';
import { getCuMonthDays } from '@/utils/validate';
import { sortBy, formatDateToStr } from '@/utils/validate';
const ChartList = () => import('@/components/Chart/chartList');
import ChartHeader from '@/components/Chart/chartHeader';
export default {
	name: 'SleepMonitorChat',
	mixins: [mixin],
	components: { ChartHeader, ChartList },
	props: { Did: Number },
	watch: {
		Did(newV, oldV) {
			if (newV !== oldV && oldV && newV) {
				this._sleepOfChart();
			}
		}
	},
	mounted() {
		this._sleepOfChart();
	},
	methods: {
		_sleepOfChart() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.chart-bg'),
				spinner: 'el-icon-loading',
				background: 'rgba(225, 225, 225, 0)'
			});
			// 请求图表数据
			sleepOfChart({
				dataType: 4,
				did: this.Did,
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
					if (this.$refs.chartHeader.viewType == 1) {
						this._drawPie(
							'sleepMonitorChat',
							this._setDayOption(this._initData(data))
						);
					} else {
						this._drawPie(
							'sleepMonitorChat',
							this._setLineGapOption(this._initData(data))
						);
					}
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// 日期改变时触发
		dateChanged() {
			this._sleepOfChart();
		},
		// 图表类型改变时触发
		typeChanged() {
			this._sleepOfChart();
		},
		// 折线图表配置项:非day
		_setLineGapOption(seriesData = []) {
			let setOption = {
				tooltip: {
					trigger: 'axis'
				},
				visualMap: [
					{
						show: false,
						type: 'piecewise',
						pieces: [
							{ gt: 50, lte: 100, color: '#39C973' }, // (10, 200]
							{ lt: 50, color: '#FD9937' } // (-Infinity, 5)
						]
					}
				],
				dataZoom: {
					type: 'inside',
					filterMode: 'weakFilter',
					left: 70,
					right: 60,
					minSpan: 25,
					maxSpan: this.$refs.chartHeader.viewType == 3 ? 50 : 100
				},
				xAxis: this._xAxis(),
				yAxis: {
					axisLine: { show: false },
					splitLine: { show: true },
					axisTick: { show: false },
					min: 0,
					max: 100,
					minInterval: 20,
					maxInterval: 50
				},
				series: [
					{
						name: this.language == 'en' ? 'Sleep Score' : '睡眠质量',
						type: 'line',
						// 平滑的曲线
						smooth: true,
						// 是否显示标记点
						showSymbol: true,
						symbolSize: 6,
						symbol: 'circle',
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: '#39C973' // 0% 处的颜色
									},
									{
										offset: 1,
										color: '#FD9937' // 100% 处的颜色
									}
								]
							}
						},
						data: seriesData
					}
				]
			};
			return setOption;
		},
		// 折线图表配置项:day
		_setDayOption(seriesData = []) {
			var colorList = [
				'#39C973', // 深睡
				'#28ADFC', // 浅睡
				'#FF7F00' // 未入睡
			];
			let setOption = {
				color: colorList,
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					},
					padding: 10,
					extraCssText: 'text-align:left',
					formatter: function(value) {
						return `${value[0].marker}${value[0].seriesName}: ${value[0]
							.value || '0'}h</br>${value[1].marker}${
							value[1].seriesName
						}: ${value[1].value || '0'}h</br>${value[2].marker}${
							value[2].seriesName
						}: ${value[2].value || '0'}`;
					}
				},
				xAxis: [
					{
						type: 'category',
						data: [seriesData[0].measuredate]
					}
				],
				yAxis: [
					{
						type: 'value',
						name: '时长',
						axisTick: { show: false },
						min: 0,
						position: 'left',
						axisLabel: {
							formatter: '{value} h'
						}
					},
					{
						type: 'value',
						name: '评分',
						splitLine: { show: false },
						min: 0,
						position: 'right'
					}
				],
				series: [
					{
						name: this.language == 'en' ? 'Deep' : '深睡',
						type: 'bar',
						yAxisIndex: 0,
						barWidth: 40,
						data: [seriesData[0].fDeep]
					},
					{
						name: this.language == 'en' ? 'Light' : '浅睡',
						type: 'bar',
						yAxisIndex: 0,
						barWidth: 40,
						data: [seriesData[0].fLight]
					},
					{
						name: this.language == 'en' ? 'Score' : '评分',
						type: 'line',
						yAxisIndex: 1,
						data: [seriesData[0].score]
					}
				]
			};
			return setOption;
		},

		_initData(data) {
			// 升序并格式化时间戳
			let valueList = data.sort(sortBy('measuredate'));
			let viewType = this.$refs.chartHeader.viewType;
			// 合并交叉两个数组
			const mergeArray = (items, num) => {
				let arr = [];
				for (let i = 1; i <= num; i++) {
					arr.push({
						scorevalue: null,
						measuredate: i
					});
				}
				for (let i = 0; i < items.length; i++) {
					for (let j = 0; j < arr.length; j++) {
						if (items[i].measuredate == arr[j].measuredate) {
							arr[j] = items[i];
						}
					}
				}
				return arr;
			};
			// 周（7天）
			if (viewType == 2) {
				let items = valueList.map((item) => {
					let weekDay = new Date(item.measuredate * 1000).getDay();
					weekDay = weekDay == 0 ? weekDay == 7 : weekDay;
					item.measuredate = weekDay;
					return item;
				});
				valueList = mergeArray(items, 7);
			}
			// 月（n天）
			if (viewType == 3) {
				let d = getCuMonthDays(this.$refs.chartHeader.currentDate);
				let items = valueList.map((item) => {
					item.measuredate = new Date(item.measuredate * 1000).getDate();
					return item;
				});
				valueList = mergeArray(items, d);
			}
			// 年（12月）
			if (viewType == 4) {
				let items = valueList.map((item) => {
					item.measuredate = new Date(item.measuredate * 1000).getMonth() + 1;
					return item;
				});
				valueList = mergeArray(items, 12);
			}

			/* 提取图表数据 */
			if (viewType == 1) {
				valueList = data.map((item) => {
					item.fDeep = (item.fDeep / 60).toFixed(1);
					item.fLight = (item.fLight / 60).toFixed(1);
					item.measuredate = formatDateToStr(
						item.measuredate * 1000,
						this.language,
						'MMDD'
					);
					return item;
				});
			} else {
				valueList = data.map(function(item) {
					return item.score;
				});
			}
			return valueList;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/components/Chart/chart.scss';
</style>
