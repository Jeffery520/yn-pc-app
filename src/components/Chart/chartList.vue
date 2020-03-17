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
					<span
						style="display: flex;align-items: center;justify-content: flex-start"
					>
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
							<span v-if="listParams.type == 8">
								<span v-if="$store.getters.language == 'en'">
									Weight:
									{{ (item[1] * 2.2046226).toFixed(2) + ' Ib' }},FatRate:
									{{ item[2] }}
								</span>
								<span v-else
									>Weight: {{ item[1] + ' kg' }},FatRate: {{ item[2] }}</span
								>
							</span>
							<span v-if="listParams.type == 9">
								{{ $store.getters.language == 'en' ? 'Deep' : '深睡' }}：{{
									item[1]
								}}h,
								{{ $store.getters.language == 'en' ? 'Light' : '浅睡' }}：{{
									item[2]
								}}h,
								<span style="display: block;text-align: left"
									>{{ $store.getters.language == 'en' ? 'Score' : '评分' }}：{{
										item[3]
									}}</span
								>
							</span>
							<span v-if="listParams.type == 10">
								{{ $store.getters.language == 'en' ? 'Breath' : '呼吸' }}：{{
									item[1]
								}},
								{{
									$store.getters.language == 'en' ? 'Heart rate' : '心率'
								}}：{{ item[2] }}
							</span>
						</span>
					</span>
					<span
						v-html="_dateTime(item[0])"
						style="width:120px;text-align: right;"
					></span>
				</li>
			</ul>
			<p v-if="loading">
				{{ $store.getters.language == 'en' ? 'Loading...' : '加载中...' }}
			</p>
			<p v-if="currentPages >= countPages">
				{{ $store.getters.language == 'en' ? 'No more' : '没有更多了' }}
			</p>
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
	deviceBoOfList,
	deviceWthOfList,
	sleepDevOfList,
	sleepBmOfList
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
			// 体重
			if (this.listParams.type == 8) {
				this.loading = true;
				this.currentPages++;
				this._deviceBodyWeight();
			}
			// 睡眠仪
			if (this.listParams.type == 9) {
				this.loading = true;
				this.currentPages++;
				this._sleepDevOfList();
			}
			// 睡眠仪-呼吸
			if (this.listParams.type == 10) {
				this.loading = true;
				this.currentPages++;
				this._sleepBmOfList();
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
		_deviceBodyWeight() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.infinite-list-wrapper'),
				background: 'rgba(225, 225, 225, 0)'
			});

			// 请求图表数据
			deviceWthOfList({
				page: this.currentPages,
				did: this.listParams.id
			})
				.then((data) => {
					let { list, pages } = data;
					list = list.map((item) => {
						return [item.measuredate * 1000, item.weight, item.fat];
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
		_sleepDevOfList() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.infinite-list-wrapper'),
				background: 'rgba(225, 225, 225, 0)'
			});

			// 请求图表数据
			sleepDevOfList({
				page: this.currentPages,
				did: this.listParams.id
			})
				.then((data) => {
					let { list, pages } = data;
					list = list.map((item) => {
						return [
							item.measuredate * 1000,
							(item.fDeep / 60).toFixed(1),
							(item.fSober / 60).toFixed(1),
							item.score
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
		_sleepBmOfList() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.infinite-list-wrapper'),
				background: 'rgba(225, 225, 225, 0)'
			});

			// 请求图表数据
			sleepBmOfList({
				page: this.currentPages,
				did: this.listParams.id
			})
				.then((data) => {
					let { list, pages } = data;
					list = list.map((item) => {
						return [item.measuredate * 1000, item.fBreath, item.fHeartrate];
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
			return formatDateToStr(
				v,
				this.$store.getters.language,
				'YYMMDDHHmm',
				true
			);
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
	padding: 20px 0 40px;
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
