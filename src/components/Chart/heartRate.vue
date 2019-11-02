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
				ref="chartHeader"
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
import mixin from '@/components/Chart/mixin';
import ChartHeader from '@/components/Chart/chartHeader';
import ChartList from '@/components/Chart/chartList';
import { deviceHeartRateOfChart } from '@/api/devices';

export default {
	name: 'HeartRate',
	mixins: [mixin],
	components: { ChartHeader, ChartList },
	data() {
		return {
			charts: '',
			isShowList: false
		};
	},
	created() {},
	//调用
	mounted() {
		this._getxAxisData();
		this._getHeartRateOfChart();
	},
	methods: {
		_getHeartRateOfChart() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.chart-bg'),
				background: 'rgba(225, 225, 225, .6)'
			});
			// 请求图表数据
			deviceHeartRateOfChart({
				dataType: 4,
				did: 73143,
				start: new Date(this.$refs.chartHeader.currentDate).getTime() / 1000, // 单位（秒）
				viewType: this.$refs.chartHeader.viewType
			})
				.then((data) => {
					data = data.reverse();
					data.unshift({
						hrtype: 1,
						hrvalue: null,
						id: 34631,
						warning: 0,
						remark: null,
						measuredate: 1572623940,
						savedate: 1572538052
					});
					data.push({
						hrtype: 1,
						hrvalue: null,
						id: 34631,
						warning: 0,
						remark: null,
						measuredate: 1572623940,
						savedate: 1572538052
					});
					var valueList = data.map(function(item) {
						return [item.measuredate * 1000, item.hrvalue];
					});
					// 绘制图表
					this.$nextTick(() => {
						this._drawPie('heartRate', this._setLineGapOption(valueList));
					});
					this.loading.close();
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
			this._getxAxisData();
			this._getHeartRateOfChart();
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
