<template>
	<div class="chart-bg sleep-bg">
		<chart-header
			ref="chartHeader"
			:title="language == 'en' ? 'Sleep Time' : '睡眠时间'"
			@dateChanged="dateChanged"
			@typeChanged="typeChanged"
			@changeList="changeList"
		></chart-header>

		<div class="chart-content">
			<chart-list
				v-if="isShowList"
				:list-params="{ id: $route.params.id, type: 3 }"
				icon-class="sleep"
			></chart-list>
			<div v-show="!isShowList" id="sleep" class="chart-canvas"></div>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import echarts from '@/components/Chart/echarts.js';
import { deviceSlOfChart } from '@/api/devices';
import { getCuMonthDays } from '@/utils/validate';
import { sortBy } from '@/utils/validate';
const ChartList = () => import('@/components/Chart/chartList');
import ChartHeader from '@/components/Chart/chartHeader';
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
				spinner: 'el-icon-loading',
				background: 'rgba(225, 225, 225, 0)'
			});
			// 请求图表数据
			deviceSlOfChart({
				did: this.$route.params.id,
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
			seriesData = this._initHourData(seriesData);
			// 0:开始 1:结束 3:高度  4.类型
			var colorList = [
				'#39C973', // 深睡
				'#28ADFC', // 浅睡
				'#FF7F00' // 未入睡
			];
			// 格式化自定义图表数据
			seriesData = echarts.util.map(seriesData, function(item, index) {
				return {
					value: item,
					itemStyle: {
						normal: {
							color:
								item[2] == 60
									? colorList[0]
									: item[2] == 40
									? colorList[1]
									: colorList[2]
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
				tooltip: {
					padding: 10,
					formatter: function(value) {
						let HH0 = new Date(value.value[0]).getHours();
						let mm0 = new Date(value.value[0]).getMinutes();
						let HH1 = new Date(value.value[1]).getHours();
						let mm1 = new Date(value.value[1]).getMinutes();

						return `${value.marker}${value.name}</br>${
							HH0 < 10 ? '0' + HH0 : HH0
						}:${mm0 < 10 ? '0' + mm0 : mm0} ~ ${HH1 < 10 ? '0' + HH1 : HH1}:${
							mm1 < 10 ? '0' + mm1 : mm1
						}`;
					}
				},
				dataZoom: {
					type: 'slider',
					filterMode: 'weakFilter',
					left: 60,
					right: 60,
					minSpan: 50,
					maxSpan: this.$refs.chartHeader.viewType == 3 ? 50 : 100
				},
				xAxis: {
					type: 'time',
					minInterval: 60 * 60 * 1000,
					boundaryGap: false,
					axisLabel: {
						formatter: function(value) {
							let HH = new Date(value).getHours();
							let mm = new Date(value).getMinutes();
							return `${HH < 10 ? '0' + HH : HH}:${mm < 10 ? '0' + mm : mm}`;
						}
					},

					splitLine: { show: false }
				},
				yAxis: {
					show: false,
					position: 'right'
				},
				series: [
					{
						type: 'custom',
						renderItem: renderItem,
						dimensions: ['start', 'end'],
						encode: {
							x: [0, 1],
							y: 2,
							tooltip: [0, 1],
							itemName: 3
						},
						data: seriesData
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
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					},
					padding: 10,
					extraCssText: 'text-align:left',
					formatter: function(value) {
						let dateArr = value[0].axisValueLabel.split(',');
						return `${dateArr[0] || ''}-${dateArr[1] || ''}${
							dateArr[2] ? '-' + dateArr[2] : ''
						} ${dateArr[3] || ''}</br>${value[0].marker}${
							value[0].seriesName
						}: ${value[0].value || '0'}%</br>${value[1].marker}${
							value[1].seriesName
						}: ${value[1].value || '0'}%</br>${value[2].marker}${
							value[2].seriesName
						}: ${value[2].value || '0'}h`;
					}
				},
				dataZoom: {
					type: 'slider',
					filterMode: 'weakFilter',
					left: 70,
					right: 60,
					minSpan: 25,
					maxSpan: this.$refs.chartHeader.viewType == 3 ? 40 : 100
				},
				xAxis: this._xAxis(),
				yAxis: [
					{
						axisLine: { show: false },
						axisTick: { show: false },
						axisLabel: {
							formatter: function(val) {
								return val + '%';
							}
						},
						min: 0,
						max: 100,
						minInterval: 50
					},
					{
						axisLine: { show: false },
						axisTick: { show: false },
						max: 24,
						minInterval: 6
					}
				],
				series: seriesData
			};
			return setOption;
		},
		_initHourData(seriesData = []) {
			// 升序并格式化时间戳
			var valueList = seriesData.sort(sortBy('measuredate'));
			// 数据为空时
			if (valueList.length == 0) {
				return [
					[
						this.$refs.chartHeader.currentDate,
						this.$refs.chartHeader.endDate,
						0
					]
				];
			}

			/* 格式化睡眠数据 */
			// 1.对睡眠数据进行3替换处理
			valueList = valueList.map((item) => {
				if (item.sleepdata) {
					let sleepdata = item.sleepdata.split('|');
					let sleepdata0 = sleepdata[0].split('');
					let sleepdata1 = sleepdata[1].split('');
					for (var i = 0; i < sleepdata0.length; i++) {
						if (sleepdata0[i] == 3) {
							sleepdata1[i] = '3';
						}
						if (sleepdata1[i] == ';') {
							sleepdata1.splice(i, 1);
						}
					}
					item.sleepdata = sleepdata1;
					return item;
				}
			});
			// 2.生成睡眠数据
			let sleeps = [];
			for (let i = 0; i < valueList.length; i++) {
				for (let j = 0; j < valueList[i].sleepdata.length; j++) {
					if (
						valueList[i].sleepdata[j] == 0 ||
						valueList[i].sleepdata[j] == 1
					) {
						sleeps.push([
							(parseInt(valueList[i].sleepdate) + 5 * 60 * j) * 1000,
							(parseInt(valueList[i].sleepdate) + 5 * 60 * (j + 1)) * 1000,
							60,
							this.language == 'en' ? 'Deep' : '深睡'
						]);
					} else if (valueList[i].sleepdata[j] == 2) {
						sleeps.push([
							(parseInt(valueList[i].sleepdate) + 5 * 60 * j) * 1000,
							(parseInt(valueList[i].sleepdate) + 5 * 60 * (j + 1)) * 1000,
							40,
							this.language == 'en' ? 'Light' : '浅睡'
						]);
					} else {
						sleeps.push([
							(parseInt(valueList[i].sleepdate) + 5 * 60 * j) * 1000,
							(parseInt(valueList[i].sleepdate) + 5 * 60 * (j + 1)) * 1000,
							30,
							this.language == 'en' ? 'Active' : '活动'
						]);
					}
				}
			}
			// 3.将相似的临近类型合并
			sleeps = sleeps.reduce((prev, cur) => {
				if (prev[prev.length - 1] && prev[prev.length - 1][2] == cur[2]) {
					prev[prev.length - 1][1] = cur[1];
					return prev;
				} else {
					prev.push(cur);
					return prev;
				}
			}, []);
			return sleeps;
		},
		_initDayData(data) {
			// 升序并格式化时间戳
			let valueList = data.sort(sortBy('measuredate'));
			let viewType = this.$refs.chartHeader.viewType;
			// 合并交叉两个数组
			const mergeArray = (items, num) => {
				let arr = [];
				for (let i = 1; i <= num; i++) {
					arr.push({
						deepperc: null,
						measuredate: i,
						quiteperc: null,
						sleeptimes: null
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
			// 深睡占比
			var valueDeep = valueList.map(function(item) {
				return item.deepperc;
			});
			// 浅睡占比
			var valueQuite = valueList.map(function(item) {
				return item.quiteperc;
			});
			// 睡眠时长
			var valueSleeptimes = valueList.map(function(item) {
				return item.sleeptimes ? (item.sleeptimes / 60).toFixed(1) : null;
			});

			return [
				{
					name: this.language == 'en' ? 'Deep' : '深睡',
					type: 'bar',
					yAxisIndex: 0,
					barGap: 0,
					barWidth: 12,
					data: valueDeep
				},
				{
					name: this.language == 'en' ? 'Light' : '浅睡',
					type: 'bar',
					yAxisIndex: 0,
					barGap: 0,
					barWidth: 12,
					data: valueQuite
				},
				{
					name: this.language == 'en' ? 'Sleeptimes' : '睡眠时长',
					type: 'line',
					yAxisIndex: 1,
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
