<template>
	<div class="chart-bg blood-glucose-bg">
		<chart-header
			ref="chartHeader"
			title="Blood Glucose"
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
			<div v-show="!isShowList" id="bloodGlucose" class="chart-canvas"></div>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import ChartHeader from '@/components/Chart/chartHeader';
import ChartList from '@/components/Chart/chartList';
import { deviceBloodGlucoseChart } from '@/api/devices';

export default {
	name: 'bloodGlucose',
	mixins: [mixin],
	components: { ChartHeader, ChartList },
	props: { id: Number },
	//调用
	mounted() {
		this._getBloodGlucosOfChart();
	},
	methods: {
		_getBloodGlucosOfChart() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.blood-glucose-bg'),
				background: 'rgba(225, 225, 225, 0)'
			});
			// 请求图表数据
			deviceBloodGlucoseChart({
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
						'bloodGlucose',
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
				visualMap: [
					{
						show: false,
						type: 'piecewise',
						pieces: [
							{ gt: 10, color: '#E14F4F' }, // (1500, Infinity]
							{ lte: 10, color: '#39C973' } // (10, 200]
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
					max: 15,
					maxInterval: 5
				},
				series: [
					{
						type: 'scatter',
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
