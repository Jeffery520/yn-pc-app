import echarts from 'echarts';
import { getMonthDays } from '@/utils/validate';
export default {
	data() {
		return {
			language: this.$store.getters.language,
			xAxis: {},
			xAxisData: {
				// x轴的坐标
				week: [
					'Monday',
					'Tuesday',
					'Wednesday',
					'thirsday',
					'Friday',
					'Saturday',
					'Sunday'
				],
				year: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec'
				]
			}
		};
	},
	methods: {
		// 初始化X坐标数据
		_getxAxisData() {
			let viewType = this.$refs.chartHeader.viewType;
			let currentDate = this.$refs.chartHeader.currentDate;
			let year = new Date(currentDate).getFullYear();
			let month = new Date(currentDate).getMonth() + 1;
			let xAxisData = [];
			switch (viewType) {
				case 1: // 日
					for (var i = 0; i < 24; i++) {
						xAxisData.push(i + 1);
					}
					break;
				case 2: // 周
					if (this.language == 'zh') {
						for (let i = 0; i < 7; i++) {
							xAxisData.push(i + 1);
						}
					} else {
						xAxisData = this.xAxisData.week;
					}
					break;
				case 3: // 月
					for (let i = 0; i < getMonthDays(year, month); i++) {
						xAxisData.push(i + 1);
					}
					break;
				case 4: // 年
					if (this.language == 'zh') {
						for (let i = 0; i < 12; i++) {
							xAxisData.push(i + 1);
						}
					} else {
						xAxisData = this.xAxisData.year;
					}
					break;
			}
			this.xAxis = {
				data: xAxisData,
				axisLine: { show: false },
				// 是否显示分割线
				splitLine: { show: true, interval: 0 },
				// 坐标轴两边不留白
				boundaryGap: false,
				// 不显示刻度线
				axisTick: { show: false, alignWithLabel: true },
				axisLabel: {
					rotate:
						(viewType == 2 || viewType == 4) && this.language == 'en' ? 45 : 0
				}
			};
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
				xAxis: this.xAxis,
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
						data: seriesData
					}
				]
			};
			return setOption;
		},
		// 绘制图表
		_drawPie(id, setOption) {
			this.charts = echarts.init(document.getElementById(id), {
				width: 365,
				height: 190
			});
			this.charts.setOption(setOption);
		}
	}
};
