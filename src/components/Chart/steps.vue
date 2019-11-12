<template>
	<div class="chart-bg steps-bg">
		<chart-header
			ref="chartHeader"
			title="Steps"
			@dateChanged="dateChanged"
			@typeChanged="typeChanged"
			@changeList="changeList"
		></chart-header>

		<div class="chart-content">
			<chart-list
				v-if="isShowList"
				:list-params="{ id: $route.params.id, type: 2 }"
				icon-class="steps"
			></chart-list>
			<div v-show="!isShowList" id="steps" class="chart-canvas"></div>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import ChartHeader from '@/components/Chart/chartHeader';
import ChartList from '@/components/Chart/chartList';
import { devicePeOfChart } from '@/api/devices';
import { sortBy } from 'lodash/collection';

export default {
	name: 'Steps',
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
				target: document.querySelector('.steps-bg'),
				background: 'rgba(225, 225, 225, 0)'
			});
			// 请求图表数据
			devicePeOfChart({
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
					this._drawPie('steps', this._setLineGapOption(this._initData(data)));
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
			let setOption = {
				tooltip: {
					trigger: 'axis'
				},
				// Make gradient line here
				itemStyle: { color: '#39C973', barBorderRadius: [5, 5, 0, 0] }, // (10, 200]
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
				yAxis: {
					show: true,
					axisLine: { show: false },
					splitLine: { show: true },
					axisTick: { show: false },
					axisLabel: {
						formatter: function(val) {
							return val / 1000 + 'k';
						}
					},
					min: 0,
					minInterval: 1000
				},
				series: [
					{
						name: 'Steps',
						type: 'bar',
						barGap: 0,
						large: true,
						barWidth: 6,
						data: seriesData
					}
				]
			};
			return setOption;
		},
		_initData(data) {
			data = data.filter((item) => {
				return item.stepcount > 1;
			});
			// 升序并格式化时间戳
			var valueList = data.map(function(item) {
				return [
					(item.measuredate - (item.measuredate % (30 * 60))) * 1000,
					item.stepcount
				];
			});
			valueList = sortBy(valueList, 'measuredate');
			return valueList;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/components/Chart/chart.scss';
</style>
