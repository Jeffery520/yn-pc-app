<template>
	<div>
		<header>History</header>
		<div class="infinite-list-wrapper" style="overflow:auto">
			<ul
				class="list"
				v-infinite-scroll="load"
				infinite-scroll-disabled="disabled"
			>
				<li v-for="(item, index) in list" :key="index" class="list-item">
					<span>
						<svg-icon class-name="svg-icon" :icon-class="iconClass"></svg-icon>
						<span style="font-size: 16px;">
							<span v-if="listParams.type == 1">{{ item[1] }}</span>
							<span v-if="listParams.type == 2">{{ item[1] }} steps</span>
							<span v-if="listParams.type == 3">
								<span>Sleep quality {{ item[1] }}%</span>

								<span
									style="color: #666666;font-size: 15px;margin-left: 10px"
									>{{ item[2] }}</span
								>
							</span>
							<span v-if="listParams.type == 4"
								>{{ item[1] + '/' + item[2] }} mmHg</span
							>
							<span v-if="listParams.type == 5">{{ item[1] }} mmol</span>
							<span v-if="listParams.type == 6">{{ item[1] }}</span>
						</span>
					</span>
					<span style="width:120px;text-align: right;">{{
						_dateTime(item[0])
					}}</span>
				</li>
			</ul>
			<p v-if="loading">加载中...</p>
			<p v-if="currentPages >= countPages">没有更多了</p>
		</div>
	</div>
</template>

<script>
import { formatDateToStr } from '@/utils/validate';
import {
	deviceHeartRatePage,
	deviceBloodPress,
	deviceBloodGlucose,
	devicePeOfList,
	deviceSlOfList,
	deviceBoOfList
} from '@/api/devices';

export default {
	name: 'ChartList',
	props: {
		listParams: Object, // type: 1.心率  4.血压
		valueList: Array,
		iconClass: String
	},
	data() {
		return {
			currentPages: 0,
			countPages: 10,
			loading: false,
			list: []
		};
	},
	watch: {
		listParams() {
			this.currentPages = 0;
		}
	},
	computed: {
		disabled() {
			return this.loading || this.currentPages >= this.countPages;
		}
	},
	methods: {
		load() {
			// 心率
			if (this.listParams.type == 1) {
				this.loading = true;
				this.currentPages++;
				this._deviceHeartRate();
			}
			// 记步
			if (this.listParams.type == 2) {
				this.loading = true;
				this.currentPages++;
				this._deviceSteps();
			}
			// 睡眠
			if (this.listParams.type == 3) {
				this.loading = true;
				this.currentPages++;
				this._deviceSlpage();
			}
			// 血压
			if (this.listParams.type == 4) {
				this.loading = true;
				this.currentPages++;
				this._deviceBloodPress();
			}
			// 血糖
			if (this.listParams.type == 5) {
				this.loading = true;
				this.currentPages++;
				this._deviceBloodGlucose();
			}
			// 血氧
			if (this.listParams.type == 6) {
				this.loading = true;
				this.currentPages++;
				this._deviceBloodOxygen();
			}
		},
		_deviceHeartRate() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.infinite-list-wrapper'),
				background: 'rgba(225, 225, 225, 0)'
			});

			// 请求图表数据
			deviceHeartRatePage({
				page: this.currentPages,
				did: this.listParams.id
			})
				.then((data) => {
					let { list, pages } = data;
					list = list.map((item) => {
						return [item.measuredate * 1000, item.hrvalue];
					});
					this.list = this.list.concat(list);
					this.countPages = pages;
					this.loading.close();
					this.loading = false;
				})
				.catch(() => {
					this.loading.close();
					this.loading = false;
				});
		},
		_deviceSteps() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.infinite-list-wrapper'),
				background: 'rgba(225, 225, 225, 0)'
			});

			// 请求图表数据
			devicePeOfList({
				page: this.currentPages,
				did: this.listParams.id
			})
				.then((data) => {
					let { list, pages } = data;
					list = list.map((item) => {
						return [item.measuredate * 1000, item.stepcount];
					});
					this.list = this.list.concat(list);
					this.countPages = pages;
					this.loading.close();
					this.loading = false;
				})
				.catch(() => {
					this.loading.close();
					this.loading = false;
				});
		},
		_deviceBloodPress() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.infinite-list-wrapper'),
				background: 'rgba(225, 225, 225, 0)'
			});

			// 请求图表数据
			deviceBloodPress({
				page: this.currentPages,
				did: this.listParams.id
			})
				.then((data) => {
					let { list, pages } = data;
					list = list.map((item) => {
						return [item.measuredate * 1000, item.dbp, item.sbp];
					});
					this.list = this.list.concat(list);
					this.countPages = pages;
					this.loading.close();
					this.loading = false;
				})
				.catch(() => {
					this.loading.close();
					this.loading = false;
				});
		},
		_deviceBloodGlucose() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.infinite-list-wrapper'),
				background: 'rgba(225, 225, 225, 0)'
			});

			// 请求图表数据
			deviceBloodGlucose({
				page: this.currentPages,
				did: this.listParams.id
			})
				.then((data) => {
					let { list, pages } = data;
					list = list.map((item) => {
						return [item.measuredate * 1000, item.gluvalue];
					});
					this.list = this.list.concat(list);
					this.countPages = pages;
					this.loading.close();
					this.loading = false;
				})
				.catch(() => {
					this.loading.close();
					this.loading = false;
				});
		},
		_deviceSlpage() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.infinite-list-wrapper'),
				background: 'rgba(225, 225, 225, 0)'
			});

			// 请求图表数据
			deviceSlOfList({
				page: this.currentPages,
				did: this.listParams.id
			})
				.then((data) => {
					let { list, pages } = data;
					list = list.map((item) => {
						let h = parseInt(item.sleeptimes / 60);
						let m = item.sleeptimes % 60;
						return [
							item.measuredate * 1000,
							item.deepperc,
							`${h}h ${m ? m + 'm' : ''}`
						];
					});
					this.list = this.list.concat(list);
					this.countPages = pages;
					this.loading.close();
					this.loading = false;
				})
				.catch(() => {
					this.loading.close();
					this.loading = false;
				});
		},
		_deviceBloodOxygen() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.infinite-list-wrapper'),
				background: 'rgba(225, 225, 225, 0)'
			});

			// 请求图表数据
			deviceBoOfList({
				page: this.currentPages,
				did: this.listParams.id
			})
				.then((data) => {
					let { list, pages } = data;
					list = list.map((item) => {
						return [item.measuredate * 1000, item.oxygen];
					});
					this.list = this.list.concat(list);
					this.countPages = pages;
					this.loading.close();
					this.loading = false;
				})
				.catch(() => {
					this.loading.close();
					this.loading = false;
				});
		},
		_dateTime(v) {
			return formatDateToStr(v, this.$store.getters.language);
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
	height: 320px;
	font-size: 15px;
	color: #333;
	padding: 20px 0;
	.list li {
		@include flex-b-c;
		height: 50px;
		border-top: 1px solid $baseBorderColor;
		padding: 0 20px;
	}
	.list-item {
		.svg-icon {
			color: $greenColor;
			font-size: 24px;
			font-weight: 600;
			margin-right: 10px;
		}
	}
}
</style>
