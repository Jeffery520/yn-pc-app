import echarts from 'echarts';
import { sortBy } from 'lodash/collection';

export default {
	data() {
		return {
			isShowList: false, // 显示列表模式
			valueList: [], // 列表模式数据
			language: this.$store.getters.language,
			xAxisData: {
				// x轴的坐标
				week_en: ['Mon', 'Tue', 'Wed', 'thi', 'Fri', 'Sat', 'Sun'],
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
			this.$nextTick(() => {
				this.charts = echarts.init(document.getElementById(id), {
					width: 380,
					height: 200
				});
				this.charts.setOption(setOption);
				this.loading.close();
			});
		},
		// 图表刻度格式化
		formatter: function(value, index) {
			switch (this.$refs.chartHeader.viewType) {
				case 1:
					return value % (60 * 60 * 1000) == 0 &&
						new Date(value).getHours() >= 0
						? new Date(value).getHours()
						: '';
				case 2:
					var week = new Date(value).getDay();
					// 如果是周日设置为7
					week = week == 0 ? (week = 7) : week;

					if (value % (60 * 60 * 1000) == 0) {
						return this.language == 'en'
							? this.xAxisData.week_en[week - 1]
							: this.xAxisData.week_zh[week - 1];
					}
					break;
				case 3:
					var day = new Date(value).getDate();
					if (value % (60 * 60 * 1000) == 0 && day % 2 == 0) {
						return day;
					}
					break;
				case 4:
					var month = new Date(value).getMonth() + 1;
					if (month == 12 && index > 11) {
						return '';
					}
					return this.language == 'en'
						? this.xAxisData.year_en[month - 1]
						: this.xAxisData.year_zh[month - 1];
			}
		},
		_xAxisInterval: function() {
			return this.$refs.chartHeader.viewType == 1
				? 60 * 60 * 1000
				: this.$refs.chartHeader.viewType == 2
				? 60 * 60 * 1000 * 24
				: this.$refs.chartHeader.viewType == 3
				? 60 * 60 * 1000 * 24
				: this.$refs.chartHeader.viewType == 4
				? 60 * 60 * 1000 * 24 * 31
				: 60 * 60 * 1000 * 24 * 31;
		},
		_initData(data) {
			// 升序并格式化
			var valueList = data.map(function(item) {
				return [item.measuredate * 1000, item.hrvalue];
			});
			// 列表深拷贝
			this.valueList = JSON.stringify(valueList);
			this.valueList = JSON.parse(this.valueList);
			// 处理头尾数据
			valueList.unshift([
				new Date(this.$refs.chartHeader.currentDate).getTime(),
				null
			]);

			valueList.push([
				new Date(this.$refs.chartHeader.endDate).getTime(),
				null
			]);
			valueList = sortBy(valueList, 'measuredate');
			return valueList;
		}
	}
};
