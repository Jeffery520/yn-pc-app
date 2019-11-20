<template>
	<div class="chart-bg">
		<chart-header
			ref="chartHeader"
			:title="language == 'en' ? 'Heart rate' : '心率'"
			@dateChanged="dateChanged"
			@typeChanged="typeChanged"
			@changeList="changeList"
		></chart-header>

		<div class="chart-content">
			<chart-list
				v-if="isShowList"
				:list-params="{ id: $route.params.id, type: 1 }"
				icon-class="heart-rate"
			></chart-list>
			<div v-show="!isShowList" id="heartRate" class="chart-canvas"></div>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import { deviceHeartRateOfChart } from '@/api/devices';
import { getCuMonthDays } from '@/utils/validate';
import ChartHeader from '@/components/Chart/chartHeader';
const ChartList = (resolve) =>
	require(['@/components/Chart/chartList'], resolve);
const sortBy = require('lodash/sortBy');

export default {
	name: 'HeartRate',
	mixins: [mixin],
	components: { ChartHeader, ChartList },
	props: { id: Number },
	//调用
	mounted() {
		this._getHeartRateOfChart();
	},
	methods: {
		_getHeartRateOfChart() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.chart-bg'),
				background: 'rgba(225, 225, 225, 0)'
			});
			// 请求图表数据
			deviceHeartRateOfChart({
				dataType: 4,
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
					this._drawPie(
						'heartRate',
						this._setLineGapOption(this._initData(data))
					);
				})
				.catch(() => {
					this.loading.close();
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
			let setOption = {
				tooltip: {
					trigger: 'axis'
				},
				visualMap: [
					{
						show: false,
						type: 'piecewise',
						pieces: [
							{ gt: 100, color: '#E14F4F' }, // (1500, Infinity]
							{ gt: 50, lte: 100, color: '#39C973' }, // (10, 200]
							{ lt: 50, color: '#FD9937' } // (-Infinity, 5)
						]
					}
				],
				dataZoom: {
					type: 'slider',
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
					max: 200,
					maxInterval: 50
				},
				series: [
					{
						name: 'Heat Rate',
						type: 'line',
						// 平滑的曲线
						smooth: true,
						// 是否显示标记点
						showSymbol: true,
						data: seriesData
					}
				]
			};
			return setOption;
		},
		_initData(data) {
			data = data.filter((item) => {
				return item.hrvalue > 1;
			});
			// 升序并格式化时间戳
			let valueList = sortBy(data, 'measuredate');
			let viewType = this.$refs.chartHeader.viewType;
			// 合并交叉两个数组
			const mergeArray = (items, num) => {
				let arr = [];
				for (let i = 1; i <= num; i++) {
					arr.push({
						hrvalue: null,
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
					return [item.measuredate * 1000, item.hrvalue];
				});
			} else {
				valueList = data.map(function(item) {
					return item.hrvalue;
				});
			}
			console.log(valueList);
			return valueList;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/components/Chart/chart.scss';
</style>
