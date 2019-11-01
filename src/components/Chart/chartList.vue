<template>
	<div>
		<header>History</header>
		<div class="infinite-list-wrapper" style="overflow:auto">
			<ul
				class="list"
				v-infinite-scroll="load"
				infinite-scroll-disabled="disabled"
			>
				<li v-for="i in count" class="list-item">
					<span>
						<svg-icon class-name="svg-icon" icon-class="heart-rate"></svg-icon>
						<span>123456</span></span
					>
					<span style="width:100px;text-align: right;">aug time 2222</span>
				</li>
			</ul>
			<p v-if="loading">加载中...</p>
			<p v-if="noMore">没有更多了</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ChartList',
	props: {},
	data() {
		return { count: 10, loading: false };
	},
	computed: {
		noMore() {
			return this.count >= 20;
		},
		disabled() {
			return this.loading || this.noMore;
		}
	},
	methods: {
		load() {
			this.loading = true;
			setTimeout(() => {
				this.count += 5;
				this.loading = false;
			}, 1000);
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
	.list li {
		@include flex-b-c;
		height: 50px;
		border-top: 1px solid $baseBorderColor;
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
