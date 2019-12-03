<template>
	<div class="chart-bg blood-oxygen-bg">
		<chart-header
			ref="chartHeader"
			:title="language == 'en' ? 'Blood Oxygen' : '血氧'"
			@dateChanged="dateChanged"
			@typeChanged="typeChanged"
			@changeList="changeList"
		></chart-header>

		<div class="chart-content">
			<chart-list
				v-if="isShowList"
				:list-params="{ id: $route.params.id, type: 5 }"
				icon-class="blood-glucose"
			></chart-list>
			<div v-show="!isShowList" id="bloodOxygen" class="chart-canvas"></div>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import { deviceBloodGlucoseChart } from '@/api/devices';
import { getCuMonthDays } from '@/utils/validate';
import { sortBy } from '@/utils/validate';
const ChartList = () => import('@/components/Chart/chartList');
import ChartHeader from '@/components/Chart/chartHeader';
export default {
	name: 'bloodOxygen',
	mixins: [mixin],
	components: { ChartHeader, ChartList },
	props: { Did: Number },
	watch: {
		Did(newV, oldV) {
			if (newV !== oldV && oldV && newV) {
				this._getBloodGlucosOfChart();
			}
		}
	},
	//调用
	mounted() {
		this._getBloodGlucosOfChart();
	},
	methods: {
		_getBloodGlucosOfChart() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.blood-oxygen-bg'),
				spinner: 'el-icon-loading',
				background: 'rgba(225, 225, 225, 0)'
			});
			// 请求图表数据
			deviceBloodGlucoseChart({
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
						'bloodOxygen',
						this._setLineGapOption(this._initData(data))
					);
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// 日期改变时触发
		dateChanged() {
			this._getBloodGlucosOfChart();
		},
		// 图表类型改变时触发
		typeChanged() {
			this._getBloodGlucosOfChart();
		},
		// 折线图表配置项
		_setLineGapOption(seriesData = []) {
			let setOption = {
				tooltip: {
					trigger: 'axis'
				},
				// Make gradient line here
				colors: ['#007FFF'],
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
					axisTick: { show: false }
				},
				series: [
					{
						type: 'scatter',
						// 是否显示标记点
						showSymbol: true,
						symbolSize: 6,
						data: seriesData
					}
				]
			};
			return setOption;
		},
		_initData(data) {
			data = data.filter((item) => {
				return item.gluvalue > 1;
			});
			// 升序并格式化时间戳
			let valueList = data.sort(sortBy('measuredate'));
			let viewType = this.$refs.chartHeader.viewType;
			// 合并交叉两个数组（解决X轴空缺问题）
			const mergeArray = (items, num) => {
				let arr = [];
				for (let i = 1; i <= num; i++) {
					arr.push({
						oxygen: null,
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
					return [item.measuredate * 1000, item.oxygen];
				});
			} else {
				valueList = data.map(function(item) {
					return item.oxygen;
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
