<template>
	<div>
		<div class="yn-chart-header-bg">
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
</template>

<script>
import { _debounce, getMonthDays } from '@/utils/validate';

export default {
	name: 'ChartHeader',
	props: {},
	data() {
		return {
			language: this.$store.getters.language,
			datetype: 'date',
			format: this.language == 'en' ? 'MMM d, yyyy' : 'yyyy 年 MM 月 d 日', //默认显示年月日
			currentDate: new Date().setHours(0, 0, 0, 0),
			viewType: 1,
			pickerOptions: {
				firstDayOfWeek: 1,
				disabledDate(currentDate) {
					let date = new Date();
					return currentDate > date;
				}
			}
		};
	},
	methods: {
		// 选择日期
		selectDate() {
			this.$emit('dateChanged', this.currentDate);
		},
		// 选择图表类型
		selectChartType(v) {
			// day-1, week-2, month-3, year-4
			this.viewType = v;
			this._offsetDate(v);
			this.$emit('typeChanged', v);
		},
		// 上一时间节点
		lastTime: _debounce(function() {
			var year = new Date(this.currentDate).getFullYear();
			var month = new Date(this.currentDate).getMonth();
			var lastMouthDays = getMonthDays(year, month);
			switch (this.viewType) {
				case 1:
					// 切换day
					this.currentDate =
						new Date(
							new Date(this.currentDate).getTime() / 1000 - 24 * 60 * 60
						) * 1000;
					break;
				case 2:
					// 切换周
					this.currentDate =
						new Date(
							new Date(this.currentDate).getTime() / 1000 - 24 * 60 * 60 * 7
						) * 1000;
					break;
				case 3:
					// 切换月
					this.currentDate =
						new Date(
							new Date(this.currentDate).getTime() / 1000 -
								24 * 60 * 60 * lastMouthDays
						) * 1000;
					break;
				case 4:
					// 切换年
					this.currentDate = new Date(year - 1, 0);
					break;
			}

			this.$emit('dateChanged', this.currentDate);
		}),
		// 下一时间节点
		nextTime: _debounce(function() {
			// 如果选择的时间是当天则返回不操作
			var currentDate = new Date(this.currentDate).getTime(); // 当前所选择的时间
			var nowDate = new Date().setHours(0, 0, 0, 0); // 当前凌晨标准时间
			var year = new Date(this.currentDate).getFullYear();
			var month = new Date(this.currentDate).getMonth();
			var lastMouthDays = getMonthDays(year, month);
			switch (this.viewType) {
				case 1:
					// 切换day
					if (currentDate >= nowDate) return;
					this.currentDate =
						new Date(
							new Date(this.currentDate).getTime() / 1000 + 24 * 60 * 60
						) * 1000;
					break;
				case 2:
					// 切换周
					if (currentDate >= nowDate) return;
					this.currentDate =
						new Date(
							new Date(this.currentDate).getTime() / 1000 + 24 * 60 * 60 * 7
						) * 1000;
					break;
				case 3:
					// 切换月
					if (month >= new Date(nowDate).getMonth()) return;
					this.currentDate =
						new Date(
							new Date(this.currentDate).getTime() / 1000 +
								24 * 60 * 60 * lastMouthDays
						) * 1000;
					break;
				case 4:
					// 切换年
					if (currentDate >= new Date(new Date().getFullYear(), 0)) return;
					this.currentDate = new Date(year + 1, 0);
					break;
			}

			this.$emit('dateChanged', this.currentDate);
		}),
		// 将时间偏移到每种类型的第一阶段
		_offsetDate(viewType) {
			switch (viewType) {
				case 1: // 日
					this.currentDate = new Date(
						new Date(this.currentDate).setHours(0, 0, 0, 0)
					);
					this.format =
						this.language == 'en' ? 'MMM d, yyyy' : 'yyyy 年 MM 月 d 日';
					this.datetype = 'date';
					break;
				case 2: // 周，将时间定位到周一
					var week = new Date(this.currentDate).getDay();
					week = week == 0 ? (week = 7) : week;
					this.currentDate = new Date(
						new Date(this.currentDate).getTime() -
							24 * 60 * 60 * 1000 * (week - 1)
					);
					this.format = this.language == 'en' ? `yyyy, W week` : `yyyy 第 W 周`;
					this.datetype = 'week';
					break;
				case 3: // 周，将时间定位到1号
					var day = new Date(this.currentDate).getDate();
					this.currentDate = new Date(
						new Date(this.currentDate).getTime() -
							24 * 60 * 60 * 1000 * (day - 1)
					);
					this.format = this.language == 'en' ? 'MMM, yyyy' : 'yyyy 年 MM 月';
					this.datetype = 'month';
					break;
				case 4: // 年，将时间定位到1月1号
					this.currentDate = new Date(
						new Date(this.currentDate).setMonth(0, 1)
					);
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
