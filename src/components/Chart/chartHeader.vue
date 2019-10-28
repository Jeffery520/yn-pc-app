<template>
	<div>
		<div class="yn-chart-header-bg">
			<i class="el-icon-arrow-left" @click="lastTime"></i>
			<el-date-picker
				v-model="datetime"
				type="date"
				default-time="00:00:00"
				align="center"
				format="MMM d,yyyy"
				value-format="timestamp"
				prefix-icon="null"
				:editable="false"
				:clearable="false"
				popper-class="222222"
				size="small"
				:picker-options="pickerOptions"
				@change="selectDate"
			>
			</el-date-picker>
			<i class="el-icon-arrow-right" @click="nextTime"></i>
		</div>
		<div class="chart-type-select">
			<span
				:class="{ active: selectType === 0 }"
				style="border-radius: 4px 0 0 4px;"
				@click="selectChartType(0)"
				>Day</span
			>
			<span
				:class="{ active: selectType === 1 }"
				style="margin-left: 1px"
				@click="selectChartType(1)"
				>Week</span
			>
			<span
				:class="{ active: selectType === 2 }"
				style="margin-left: 1px"
				@click="selectChartType(2)"
				>Month</span
			>
			<span
				:class="{ active: selectType === 3 }"
				style="border-radius: 0 4px 4px 0;margin-left: 1px"
				@click="selectChartType(3)"
				>Year</span
			>
		</div>
	</div>
</template>

<script>
import { _debounce } from '@/utils/validate';

export default {
	name: 'ChartHeader',
	props: {},
	data() {
		return {
			datetime: new Date(),
			selectType: 0,
			pickerOptions: {
				disabledDate(currentDate) {
					let date = new Date();
					return currentDate > date;
				}
			}
		};
	},
	created() {},
	mounted() {},
	methods: {
		selectDate() {
			this.$emit('dateChanged', this.datetime);
		},
		selectChartType(v) {
			this.selectType = v;
			this.$emit('typeChanged', v);
		},
		lastTime: _debounce(function() {
			this.datetime = new Date(this.datetime / 1000 - 24 * 60 * 60) * 1000;
			this.$emit('dateChanged', this.datetime);
		}),
		nextTime: _debounce(function() {
			// 如果选择的时间是当天则返回不操作
			if (
				parseInt(this.datetime / (1000 * 60 * 60 * 24)) ==
				parseInt(new Date() / (1000 * 60 * 60 * 24))
			) {
				return;
			}
			this.datetime = new Date(this.datetime / 1000 + 24 * 60 * 60) * 1000;
			this.$emit('dateChanged', this.datetime);
		})
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
	background-color: $greenColor2;
	color: $greenColor2;
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
		background-color: $greenColor2;
		color: #ffffff;
	}
}
</style>
