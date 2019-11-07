<template>
	<div class="chart-bg blood-pressure-bg">
		<chart-header
			ref="chartHeader"
			title="Blood Pressure"
			@dateChanged="dateChanged"
			@typeChanged="typeChanged"
			@changeList="changeList"
		></chart-header>

		<div class="chart-content">
			<chart-list
				v-if="isShowList"
				:list-params="{ id: $route.params.id, type: 4 }"
				icon-class="blood-pressure"
			></chart-list>
			<div v-show="!isShowList" id="bloodPressure" class="chart-canvas"></div>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import ChartHeader from '@/components/Chart/chartHeader';
import ChartList from '@/components/Chart/chartList';
import { deviceBloodPressChart } from '@/api/devices';

export default {
	name: 'bloodPressure',
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
				target: document.querySelector('.blood-pressure-bg'),
				background: 'rgba(225, 225, 225, 0)'
			});
			// 请求图表数据
			deviceBloodPressChart({
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
						'bloodPressure',
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
				// Make gradient line here
				visualMap: [
					{
						show: false,
						type: 'piecewise',
						pieces: [
							{ gt: 100, color: '#B973FF' }, // (1500, Infinity]
							{ lt: 100, color: '#007FFF' } // (-Infinity, 5)
						]
					}
				],
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
					axisLine: { show: false },
					splitLine: { show: true },
					axisTick: { show: false },
					min: 0,
					max: 250,
					maxInterval: 50
				},
				series: [
					{
						name: 'Heat Rate',
						type: 'line',
						// 平滑的曲线
						smooth: true,
						// 是否显示标记点
						showSymbol: false,
						areaStyle: {},
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
