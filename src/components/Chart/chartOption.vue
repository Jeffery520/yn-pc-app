<template>
	<!--    年龄-->
	<div class="chart-bg">
		<header>
			<div class="chart-header">
				<span style="font-weight: 600;">Heart rate</span>
				<span style="cursor: pointer" @click="isShowList = !isShowList"
					><span style="color: #3aca75"
						>{{
							isShowList
								? language == 'en'
									? 'Chart'
									: '图表'
								: language == 'en'
								? 'List'
								: '列表'
						}} </span
					><i style="color: #3aca75" class="el-icon-arrow-right"></i
				></span>
			</div>
			<chart-header
				ref="chartHeader"
				v-if="!isShowList"
				@dateChanged="dateChanged"
				@typeChanged="typeChanged"
			></chart-header>
		</header>
		<div style="width: 440px; height: 300px;overflow-y: hidden;">
			<div
				v-show="!isShowList"
				id="heartRate"
				style="width: 450px;height: 300px;margin-top: -45px;margin-left: -15px"
			></div>
			<chart-list v-if="isShowList" :valueList="valueList"></chart-list>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import ChartHeader from '@/components/Chart/chartHeader';
import ChartList from '@/components/Chart/chartList';
import { deviceHeartRateOfChart } from '@/api/devices';
import { sortBy } from 'lodash/collection';

export default {
	name: 'ChartOption',
	mixins: [mixin],
	components: { ChartHeader, ChartList },
	data() {
		return {
			isShowList: false,
			valueList: []
		};
	},
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
				did: 73143,
				start: new Date(this.$refs.chartHeader.currentDate).getTime() / 1000, // 单位（秒）
				viewType: this.$refs.chartHeader.viewType
			})
				.then((data) => {
					// 绘制图表
					this._drawPie(
						'heartRate',
						this._setLineGapOption(this._initData(data))
					);
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
				xAxis: {
					type: 'time',
					interval: this._xAxisInterval(),
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
					minInterval: 50
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
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';
.statistices-bg {
	padding: 40px 30px 40px !important;
	@include table-bg;
	header {
		@include flex-c-c-c;
		.chart-header {
			width: 100%;
			font-size: 18px;
			color: #000;
			@include flex-b-c;
		}
	}
	.statistices-chart-inner {
		@include flex-b-c;
		flex-wrap: wrap;
	}
	.chart-bg {
		width: 470px;
		height: 380px;
		border: 1px solid $baseBorderColor;
		padding: 20px;
		margin-bottom: 40px;
		overflow: hidden;
	}
}
</style>
