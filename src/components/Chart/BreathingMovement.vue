<template>
	<div class="chart-bg blood-pressure-bg">
		<chart-header
			ref="chartHeader"
			:title="language == 'en' ? 'Breath Movement' : '呼吸体动'"
			@dateChanged="dateChanged"
			@typeChanged="typeChanged"
			@changeList="changeList"
		></chart-header>

		<div class="chart-content">
			<chart-list
				v-if="isShowList"
				:list-params="{ id: $route.params.id, type: 10 }"
				icon-class="breath"
			></chart-list>
			<div
				v-show="!isShowList"
				id="breathingMovement"
				class="chart-canvas"
			></div>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import { sleepBmOfChart } from '@/api/devices';
import { getCuMonthDays } from '@/utils/validate';
import { sortBy } from '@/utils/validate';
const ChartList = () => import('@/components/Chart/chartList');
import ChartHeader from '@/components/Chart/chartHeader';
export default {
	name: 'BreathingMovement',
	mixins: [mixin],
	components: { ChartHeader, ChartList },
	props: { Did: Number },
	watch: {
		Did(newV, oldV) {
			if (newV !== oldV && oldV && newV) {
				this._sleepBmOfChart();
			}
		}
	},
	//调用
	mounted() {
		this._sleepBmOfChart();
	},
	methods: {
		_sleepBmOfChart() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.blood-pressure-bg'),
				spinner: 'el-icon-loading',
				background: 'rgba(225, 225, 225, 0)'
			});
			// 请求图表数据
			sleepBmOfChart({
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
					this.loading.close();

					// 绘制图表
					this._drawPie(
						'breathingMovement',
						this._setLineGapOption(this._initData(data))
					);
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// 日期改变时触发
		dateChanged() {
			this._sleepBmOfChart();
		},
		// 图表类型改变时触发
		typeChanged() {
			this._sleepBmOfChart();
		},
		// 折线图表配置项
		_setLineGapOption(seriesData = []) {
			let setOption = {
				tooltip: {
					trigger: 'axis'
				},
				color: ['#B973FF', '#007FFF'],
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
					max: 200
				},
				series: seriesData
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
						fBreath: null,
						fHeartrate: null,
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
			var valueListBreath, valueListHeartrate;
			if (viewType == 1) {
				valueListBreath = valueList.map(function(item) {
					return [item.measuredate * 1000, item.fBreath, item.fHeartrate];
				});
				valueListHeartrate = valueList.map(function(item) {
					return [item.measuredate * 1000, item.fBreath, item.fHeartrate];
				});
			} else {
				valueListBreath = valueList.map(function(item) {
					return item.fBreath;
				});
				valueListHeartrate = valueList.map(function(item) {
					return item.fHeartrate;
				});
			}
			return [
				{
					name: this.language == 'en' ? 'Heart Rate' : '心率',
					type: 'line',
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
									color: '#B973FF' // 0% 处的颜色
								},
								{
									offset: 0.9,
									color: 'rgba(255,255,255,0)' // 100% 处的颜色
								}
							]
						}
					},
					data: valueListHeartrate
				},
				{
					name: this.language == 'en' ? 'Breath' : '呼吸',
					type: 'line',
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
									color: '#007FFF' // 0% 处的颜色
								},
								{
									offset: 0.9,
									color: 'rgba(255,255,255,0)' // 100% 处的颜色
								}
							]
						}
					},
					data: valueListBreath
				}
			];
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/components/Chart/chart.scss';
</style>
