<template>
	<div class="chart-bg body-weight-bg">
		<chart-header
			ref="chartHeader"
			:title="language == 'en' ? 'Body Weight' : '体重'"
			@dateChanged="dateChanged"
			@typeChanged="typeChanged"
			@changeList="changeList"
		></chart-header>

		<div class="chart-content">
			<chart-list
				v-if="isShowList"
				:list-params="{ id: $route.params.id, type: 8 }"
				icon-class="body-weight"
			></chart-list>
			<div v-show="!isShowList" id="bodyWeight" class="chart-canvas"></div>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import { deviceWthOfChart } from '@/api/devices';
import { getCuMonthDays } from '@/utils/validate';
import { sortBy } from '@/utils/validate';
const ChartList = () => import('@/components/Chart/chartList');
import ChartHeader from '@/components/Chart/chartHeader';
export default {
	name: 'BodyWeight',
	mixins: [mixin],
	components: { ChartHeader, ChartList },
	props: { Did: Number },
	watch: {
		Did(newV, oldV) {
			if (newV !== oldV && oldV && newV) {
				this._getBodyWeightOfChart();
			}
		}
	},
	mounted() {
		this._getBodyWeightOfChart();
	},
	methods: {
		_getBodyWeightOfChart() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.body-weight-bg'),
				spinner: 'el-icon-loading',
				background: 'rgba(225, 225, 225, 0)'
			});
			// 请求图表数据
			deviceWthOfChart({
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
					this._drawPie(
						'bodyWeight',
						this._setLineGapOption(
							this._initData(data),
							this._initFatData(data)
						)
					);
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// 日期改变时触发
		dateChanged() {
			this._getBodyWeightOfChart();
		},
		// 图表类型改变时触发
		typeChanged() {
			this._getBodyWeightOfChart();
		},
		// 折线图表配置项
		_setLineGapOption(seriesData = [], fatData = []) {
			const that = this;
			let setOption = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					},
					padding: 10,
					extraCssText: 'text-align:left',
					formatter: function(value) {
						console.log(value);
						let dateArr = value[0].axisValueLabel.split(',');
						return `${dateArr[0] || ''}-${dateArr[1] || ''}${
							dateArr[2] ? '-' + dateArr[2] : ''
						} ${dateArr[3] || ''}</br>${value[0].marker}${
							value[0].seriesName
						}: ${value[0].value[1] || '0'}${
							that.$store.getters.language == 'en' ? 'Ib' : 'kg'
						}</br>${value[1].marker}${value[1].seriesName}: ${value[1]
							.value[1] || '0'}`;
					}
				},
				color: ['#39C973', '#FD9937'],
				dataZoom: {
					type: 'inside',
					filterMode: 'weakFilter',
					left: 70,
					right: 60,
					minSpan: 25,
					maxSpan: that.$refs.chartHeader.viewType == 3 ? 50 : 100
				},
				xAxis: this._xAxis(),
				yAxis: [
					{
						type: 'value',
						scale: true,
						name: 'Body Weight',
						min: 0,
						minInterval: 100,
						boundaryGap: [0.2, 0.2],
						axisLine: { show: false },
						splitLine: { show: true },
						axisTick: { show: false },
						axisLabel: {
							formatter:
								that.$store.getters.language == 'en' ? '{value}Ib' : '{value}kg'
						}
					},
					{
						type: 'value',
						show: false,
						scale: true,
						name: 'Body Fat Rate',
						max: 1,
						min: 0,
						boundaryGap: [0.2, 0.2],
						axisLine: { show: false },
						splitLine: { show: true },
						axisTick: { show: false },
						axisLabel: {
							formatter: '{value}'
						}
					}
				],
				series: [
					{
						name: 'Body Weight',
						type: 'line',
						yAxisIndex: 0,
						// 平滑的曲线
						smooth: true,
						// 是否显示标记点
						showSymbol: true,
						data: seriesData
					},
					{
						name: 'Body Fat Rate',
						type: 'bar',
						barWidth: 10,
						yAxisIndex: 1,
						// 平滑的曲线
						smooth: true,
						// 是否显示标记点
						areaStyle: {},
						data: fatData
					}
				]
			};
			return setOption;
		},
		_initData(data) {
			data = data.filter((item) => {
				return item.weight > 0;
			});
			// 升序并格式化时间戳
			let valueList = data.sort(sortBy('measuredate'));
			let viewType = this.$refs.chartHeader.viewType;
			// 合并交叉两个数组
			const mergeArray = (items, num) => {
				let arr = [];
				for (let i = 1; i <= num; i++) {
					arr.push({
						weight: null,
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
					return [
						item.measuredate * 1000,
						this.$store.getters.language == 'en'
							? (item.weight * 2.2046226).toFixed(2)
							: item.weight
					];
				});
			} else {
				valueList = data.map((item) => {
					return this.$store.getters.language == 'en'
						? (item.weight * 2.2046226).toFixed(2)
						: item.weight;
				});
			}
			return valueList;
		},
		_initFatData(data) {
			data = data.filter((item) => {
				return item.fat > 0;
			});
			// 升序并格式化时间戳
			let valueList = data.sort(sortBy('measuredate'));
			let viewType = this.$refs.chartHeader.viewType;
			// 合并交叉两个数组
			const mergeArray = (items, num) => {
				let arr = [];
				for (let i = 1; i <= num; i++) {
					arr.push({
						fat: null,
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
				valueList = data.map(function(item) {
					return [item.measuredate * 1000, item.fat];
				});
			} else {
				valueList = data.map(function(item) {
					return item.fat;
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
