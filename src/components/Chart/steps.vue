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
				:valueList="valueList"
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
import { deviceHeartRateOfChart } from '@/api/devices';

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
			deviceHeartRateOfChart({
				dataType: 6,
				did: 73143,
				start: new Date(this.$refs.chartHeader.currentDate).getTime() / 1000, // 单位（秒）
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
					minSpan: 10,
					maxSpan: this.$refs.chartHeader.viewType == 3 ? 50 : 100
				},
				xAxis: {
					type: 'time',
					splitNumber:
						this.$refs.chartHeader.viewType == 1
							? 24
							: this.$refs.chartHeader.viewType == 2
							? 7
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
					axisLine: { show: false },
					// 是否显示分割线
					splitLine: { show: true },
					// 不显示刻度线
					axisTick: { show: false }
				},
				yAxis: {
					show: false,
					axisLine: { show: false },
					splitLine: { show: true },
					axisTick: { show: false }
				},
				series: [
					{
						name: 'Steps',
						type: 'bar',
						barGap: 0,
						large: true,
						barWidth: 8,
						data: seriesData
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
