import { getCuMonthDays } from '@/utils/validate';
import echarts from '@/components/Chart/echarts.js';

export default {
	data() {
		return {
			isShowList: false, // 显示列表模式
			valueList: [], // 列表模式数据
			language: this.$store.getters.language,
			xAxisData: {
				// x轴的坐标
				week_en: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
				// x轴的坐标
				week_zh: [
					'星期一',
					'星期二',
					'星期三',
					'星期四',
					'星期五',
					'星期六',
					'星期日'
				],
				year_en: [
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
				],
				year_zh: [
					'1月',
					'2月',
					'3月',
					'4月',
					'5月',
					'6月',
					'7月',
					'8月',
					'9月',
					'10月',
					'11月',
					'12月'
				]
			}
		};
	},
	methods: {
		changeList(v) {
			this.isShowList = v;
		},
		// 绘制图表
		_drawPie(id, setOption) {
			echarts.dispose(document.getElementById(id));
			this.$nextTick(() => {
				this.charts = echarts.init(document.getElementById(id), {
					width: 370,
					height: 200
				});
				this.charts.setOption(setOption);
				this.loading.close();
			});
		},
		// 图表刻度格式化
		formatter: function(value) {
			if (value && this.$refs.chartHeader.viewType != 1) {
				var dateArr = value.split(',');
			}

			switch (this.$refs.chartHeader.viewType) {
				case 1:
					if (value % (60 * 60 * 1000) == 0) {
						return new Date(value).getHours();
					}
					break;
				case 2:
					return dateArr[3];
				case 3:
					return dateArr[2];
				case 4:
					return dateArr[1];
			}
		},
		_xAxis: function() {
			const xAxisOptions = {
				axisLabel: {
					formatter: this.formatter
				},
				axisLine: { show: true },
				// 是否显示分割线
				splitLine: { show: false },
				// 不显示刻度线
				axisTick: { show: true }
			};

			// 一天的数据以小时为单位
			if (this.$refs.chartHeader.viewType == 1) {
				return {
					type: 'time',
					splitNumber: 25,
					min: new Date(this.$refs.chartHeader.currentDate).getTime(),
					max: new Date(this.$refs.chartHeader.endDate).getTime(),
					...xAxisOptions
				};
			} else {
				return {
					type: 'category',
					data: this._xAxisData(),
					...xAxisOptions
				};
			}
		},
		_xAxisData: function() {
			let year = new Date(this.$refs.chartHeader.currentDate).getFullYear();
			let month = new Date(this.$refs.chartHeader.currentDate).getMonth() + 1;
			// week
			if (this.$refs.chartHeader.viewType == 2) {
				let arr = [];
				let week =
					this.language == 'en'
						? this.xAxisData.week_en
						: this.xAxisData.week_zh;
				for (let i = 1; i <= 7; i++) {
					arr.push(`${year},${month},1,${week[i - 1]}`);
				}
				return arr;
			}
			// month
			if (this.$refs.chartHeader.viewType == 3) {
				// 当月的天数
				let d = getCuMonthDays(this.$refs.chartHeader.currentDate);
				let arr = [];
				for (let i = 1; i <= d; i++) {
					arr.push(`${year},${month},${i}`);
				}
				return arr;
			}
			// day
			if (this.$refs.chartHeader.viewType == 4) {
				let month =
					this.language == 'en'
						? this.xAxisData.year_en
						: this.xAxisData.year_zh;
				let arr = [];
				for (let i = 1; i <= 12; i++) {
					arr.push(`${year},${month[i - 1]}`);
				}
				return arr;
			}
		}
	}
};
