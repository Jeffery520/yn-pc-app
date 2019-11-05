<template>
	<div class="yn-chart-header-bg">
		<div class="chart-header">
			<span style="font-weight: 600;">{{ title }}</span>
			<span style="cursor: pointer" @click="showList"
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

		<div v-if="!isShowList">
			<div class="yn-chart-time">
				<i class="el-icon-arrow-left" @click="lastTime"></i>
				<el-date-picker
					v-model="currentDate"
					:type="datetype"
					align="center"
					:format="format"
					firstDayOfWeek="1"
					prefix-icon="null"
					:editable="false"
					:clearable="false"
					size="small"
					:picker-options="pickerOptions"
					@change="selectDate"
				>
				</el-date-picker>
				<i class="el-icon-arrow-right" @click="nextTime"></i>
			</div>
			<div class="chart-type-select">
				<span
					:class="{ active: viewType === 1 }"
					style="border-radius: 4px 0 0 4px;"
					@click="selectChartType(1)"
					>Day</span
				>
				<span
					:class="{ active: viewType === 2 }"
					style="margin-left: 1px"
					@click="selectChartType(2)"
					>Week</span
				>
				<span
					:class="{ active: viewType === 3 }"
					style="margin-left: 1px"
					@click="selectChartType(3)"
					>Month</span
				>
				<span
					:class="{ active: viewType === 4 }"
					style="border-radius: 0 4px 4px 0;margin-left: 1px"
					@click="selectChartType(4)"
					>Year</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import { _debounce, getMonthDays } from '@/utils/validate';

export default {
	name: 'ChartHeader',
	props: { title: String },
	data() {
		return {
			isShowList: false, // 切换列表：必须
			language: this.$store.getters.language,
			datetype: 'date', // 时间选择器类型：必须
			format: this.language == 'en' ? 'MMM d, yyyy' : 'yyyy 年 MM 月 d 日', //默认显示年月日
			currentDate: new Date().setHours(0, 0, 0, 0), // 开始时间
			endDate: new Date().setHours(23, 59, 59, 999), // 结束时间
			viewType: 1, // 图表时间类型
			pickerOptions: {
				// 时间选择器禁用项
				firstDayOfWeek: 1,
				disabledDate(currentDate) {
					let date = new Date();
					return currentDate > date;
				}
			}
		};
	},
	methods: {
		showList() {
			this.isShowList = !this.isShowList;
			this.$emit('changeList', this.isShowList);
		},
		// 选择日期
		selectDate() {
			this._offsetDate(this.viewType);
			this.$emit('dateChanged', this.currentDate);
		},
		// 选择图表类型
		selectChartType(v) {
			// day-1, week-2, month-3, year-4
			this.viewType = v;
			this.currentDate = new Date();
			this._offsetDate(v);
			this.$emit('typeChanged', v);
		},
		// 上一时间节点
		lastTime: _debounce(function() {
			let dayMilliseconds = 24 * 60 * 60 * 1000;
			let year = new Date(this.currentDate).getFullYear();
			let month = new Date(this.currentDate).getMonth();
			let lastMouthDays = getMonthDays(year, month);
			switch (this.viewType) {
				case 1:
					// 切换day
					this.currentDate =
						new Date(this.currentDate).getTime() - dayMilliseconds;
					break;
				case 2:
					// 切换周
					this.currentDate =
						new Date(this.currentDate).getTime() - dayMilliseconds * 7;
					break;
				case 3:
					// 切换月
					this.currentDate =
						new Date(this.currentDate).getTime() -
						dayMilliseconds * lastMouthDays;
					break;
				case 4:
					// 切换年
					this.currentDate = new Date(year - 1, 0);
					break;
			}
			this._offsetDate(this.viewType);
			this.$emit('dateChanged', this.currentDate);
		}),
		// 下一时间节点
		nextTime: _debounce(function() {
			// 一天的毫秒数
			let dayMilliseconds = 24 * 60 * 60 * 1000;
			let currentDate = new Date(this.currentDate).getTime(); // 当前选择时间
			let nowDate = new Date().setHours(0, 0, 0, 0); // 当前凌晨标准时间
			let year = new Date(this.currentDate).getFullYear();
			let month = new Date(this.currentDate).getMonth();
			let lastMouthDays = getMonthDays(year, month);
			switch (this.viewType) {
				case 1:
					// 切换day
					if (currentDate >= nowDate) return;
					// 加一天
					this.currentDate =
						new Date(this.currentDate).getTime() + dayMilliseconds;
					break;
				case 2:
					// 切换week
					if (currentDate >= nowDate) return;
					// 加7天
					this.currentDate =
						new Date(this.currentDate).getTime() + dayMilliseconds * 7;
					break;
				case 3:
					// 切换月
					if (month >= new Date(nowDate).getMonth()) return;
					// 加1月
					this.currentDate =
						new Date(this.currentDate).getTime() +
						dayMilliseconds * lastMouthDays;
					break;
				case 4:
					// 切换年
					if (currentDate >= new Date(new Date().getFullYear(), 0)) return;
					this.currentDate = new Date(year + 1, 0);
					break;
			}

			this._offsetDate(this.viewType);
			this.$emit('dateChanged', this.currentDate);
		}),
		// 将时间偏移到每种类型的第一阶段，并计算出结束时间
		_offsetDate(viewType) {
			// 一天的毫秒数
			let dayMilliseconds = 24 * 60 * 60 * 1000;
			// 当前年份
			var year = new Date(this.currentDate).getFullYear();
			// 当前月份
			var month = new Date(this.currentDate).getMonth();
			// 本月天数
			var currentMouthDays = getMonthDays(year, month + 1);

			switch (viewType) {
				case 1: // 日
					this.currentDate = new Date(this.currentDate).setHours(0, 0, 0, 0);
					this.endDate = new Date(this.currentDate).setHours(23, 59, 59, 999);
					this.format =
						this.language == 'en' ? 'MMM d, yyyy' : 'yyyy 年 MM 月 d 日';
					this.datetype = 'date';
					break;
				case 2: // 周，将时间定位到周一
					var week = new Date(this.currentDate).getDay();
					// 如果是周日设置为7
					week = week == 0 ? (week = 7) : week;
					// 跳转到本周星期一
					this.currentDate =
						new Date(this.currentDate).getTime() - dayMilliseconds * (week - 1);
					// 开始时间设置为周一0点
					this.currentDate = new Date(this.currentDate).setHours(0, 0, 0, 0);
					// 设置结束时间为周日23点
					this.endDate = new Date(
						new Date(this.currentDate).getTime() + dayMilliseconds * 6
					).setHours(23, 59, 59, 999);
					// 设置时间显示格式
					this.format = this.language == 'en' ? `yyyy, W week` : `yyyy 第 W 周`;
					this.datetype = 'week';
					break;
				case 3: // 月，将时间定位到1号
					var day = new Date(this.currentDate).getDate();
					this.currentDate = new Date(
						new Date(this.currentDate).getTime() - dayMilliseconds * (day - 1)
					).setHours(0, 0, 0, 0);

					// 设置结束时间为周日23点
					this.endDate = new Date(
						new Date(this.currentDate).getTime() +
							dayMilliseconds * (currentMouthDays - 1)
					).setHours(23, 59, 59, 999);

					this.format = this.language == 'en' ? 'MMM, yyyy' : 'yyyy 年 MM 月';
					this.datetype = 'month';
					break;
				case 4: // 年，将时间定位到1月1号
					this.currentDate = new Date(
						new Date(this.currentDate).setMonth(0, 1)
					).setHours(0, 0, 0, 0);
					this.endDate = new Date(
						new Date(this.currentDate).setMonth(12, 0)
					).setHours(23, 59, 59, 999);
					this.format = this.language == 'en' ? 'yyyy' : 'yyyy 年';
					this.datetype = 'year';
					break;
			}
		}
	}
};
</script>

<style lang="scss">
@import '@/style/mixin.scss';

.yn-chart-header-bg {
	@include flex-c-c-c;
	.chart-header {
		width: 100%;
		font-size: 18px;
		color: #000;
		@include flex-b-c;
	}
}

.yn-chart-time {
	font-size: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	i {
		font-weight: 600;
		padding: 0 5px;
		&:active {
			opacity: 0.5;
		}
	}
	.el-input {
		width: 120px !important;
	}
	.el-input__inner {
		text-align: center;
		padding: 0;
		border: none !important;
		font-weight: 600;
	}
}
.chart-type-select {
	@include flex-c-c;
	padding: 1px;
	background-color: $greenColor;
	color: $greenColor;
	border-radius: 4px;
	overflow: hidden;
	margin-top: 10px;
	span {
		width: 98px;
		height: 30px;
		line-height: 30px;
		background-color: #fff;
		cursor: pointer;
	}
	.active {
		background-color: $greenColor;
		color: #ffffff;
	}
}
</style>
