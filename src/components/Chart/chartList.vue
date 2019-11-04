<template>
	<div>
		<header>History</header>
		<div class="infinite-list-wrapper" style="overflow:auto">
			<ul class="list">
				<li v-for="item in valueList" :key="item[0]" class="list-item">
					<span>
						<svg-icon class-name="svg-icon" icon-class="heart-rate"></svg-icon>
						<span style="font-size: 18px;">{{ item[1] }}</span></span
					>
					<span style="width:100px;text-align: right;">{{
						_dateTime(item[0])
					}}</span>
				</li>
			</ul>
			<p>没有更多了</p>
		</div>
	</div>
</template>

<script>
import { formatDate } from '@/utils/validate';
export default {
	name: 'ChartList',
	props: { valueList: Array },
	data() {
		return {};
	},
	computed: {},
	methods: {
		_dateTime(v) {
			let date = formatDate(v);
			return `${date.month} ${date.day}，${date.year} ${date.hour}:${date.minute} ${date.ampm}`;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';

header {
	margin-bottom: 20px;
	font-size: 18px;
}
.infinite-list-wrapper {
	height: 270px;
	font-size: 16px;
	color: #333;
	padding: 20px 0;
	.list li {
		@include flex-b-c;
		height: 50px;
		border-top: 1px solid $baseBorderColor;
		padding: 0 20px;
		font-weight: 600;
	}
	.list-item {
		.svg-icon {
			color: $greenColor;
			font-size: 24px;
			font-weight: 600;
			margin-right: 20px;
		}
	}
}
</style>
