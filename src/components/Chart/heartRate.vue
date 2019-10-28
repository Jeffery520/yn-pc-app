<template>
	<!--    年龄-->
	<div class="chart-bg">
		<header>
			<div class="chart-header">
				<span style="font-weight: 600;">Heart rate</span>
				<span style="cursor: pointer" @click="isShowList = !isShowList"
					><span style="color: #5f9de9;"
						>{{ isShowList ? 'Chart' : 'List' }} </span
					><i class="el-icon-arrow-right"></i
				></span>
			</div>
			<chart-header
				v-if="!isShowList"
				@dateChanged="dateChanged"
				@typeChanged="typeChanged"
			></chart-header>
		</header>
		<div style="overflow:hidden;width: 430px;">
			<div
				v-show="!isShowList"
				id="heartRate"
				style="width: 430px;height: 300px;margin-top: -40px;"
			></div>
			<chart-list v-if="isShowList"></chart-list>
		</div>
	</div>
</template>
<script>
import echarts from 'echarts';
import ChartHeader from '@/components/Chart/chartHeader';
import ChartList from '@/components/Chart/chartList';

export default {
	name: 'HeartRate',
	components: { ChartHeader, ChartList },
	data() {
		return {
			charts: '',
			isShowList: false
		};
	},
	methods: {
		dateChanged(currentDate) {
			console.log(currentDate);
		},
		typeChanged(type) {
			console.log(type);
		},
		_drawPie(id, setOption) {
			this.charts = echarts.init(document.getElementById(id), {
				width: 365,
				height: 190
			});
			this.charts.setOption(setOption);
		},
		// 折线图表配置项
		_setLineGapOption() {
			let setOption = {
				// title: {
				// 	text: 'Heart rate'
				// },
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
							{ gt: 50, lte: 100, color: '#83DD47' }, // (10, 200]
							{ lt: 50, color: '#FD9937' } // (-Infinity, 5)
						]
					}
				],
				xAxis: {
					data: [
						'0',
						'1',
						'2',
						'3',
						'4',
						'5',
						6,
						7,
						8,
						9,
						10,
						11,
						12,
						13,
						14,
						15,
						16,
						17,
						18,
						19,
						20,
						21,
						22,
						23
					],
					axisLine: { show: false },
					// 是否显示分割线
					splitLine: { show: true, interval: 0 },
					// 坐标轴两边不留白
					boundaryGap: false,
					// 不显示刻度线
					axisTick: { show: false, alignWithLabel: true }
				},
				yAxis: {
					axisLine: { show: false },
					splitLine: { show: true },
					axisTick: { show: false },
					minInterval: 50
				},
				series: [
					{
						type: 'line',
						// 平滑的曲线
						smooth: true,
						// 是否显示标记点
						showSymbol: false,
						data: [
							10,
							40,
							150,
							90,
							10,
							40,
							20,
							10,
							40,
							20,
							90,
							10,
							40,
							20,
							10,
							40,
							20,
							90,
							10,
							40,
							20,
							10,
							40,
							20,
							90,
							10,
							40,
							20,
							10,
							40,
							20,
							90,
							10,
							40,
							20,
							90,
							10,
							40,
							20,
							150
						]
					}
				]
			};
			return setOption;
		}
	},
	//调用
	mounted() {
		this.$nextTick(function() {
			this._drawPie('heartRate', this._setLineGapOption());
		});
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
			margin-bottom: 10px;
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
	}
}
</style>
