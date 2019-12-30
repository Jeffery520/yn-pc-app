<template>
	<div class="yn-alert-info">
		<el-timeline>
			<el-timeline-item
				v-for="(item, index) in alertsList"
				:key="index"
				color="#5E9EE8"
				hide-timestamp
				placement="top"
			>
				<el-card
					shadow="never"
					body-style="padding: 10px 20px;text-align: left;"
				>
					<!-- 1-SOS -->
					<span v-if="item.fAlertType == 1">
						<span style="color:#FF4848;font-weight: 600;">SOS</span>
						<a target="_blank" :href="item.sosHttp" style="cursor: help">{{
							item.fMsgContent
						}}</a>
					</span>
					<!-- 2-围栏 -->
					<span v-if="item.fAlertType == 2">
						<span style="color:#FF4848;font-weight: 600;">{{
							$store.getters.language == 'zh'
								? '走出地理围栏'
								: 'Out of Geo-fence'
						}}</span>
						<a target="_blank" :href="item.sosHttp" style="cursor: help">{{
							item.fMsgContent
						}}</a>
					</span>

					<!-- 3-心率 -->
					<span
						v-if="item.fAlertType == 3"
						style="color:#FF4848;font-weight: 600;"
					>
						<span>{{
							$store.getters.language == 'zh' ? '心率' : 'Heart Rate'
						}}</span>
						<span>{{ item.fHrstatus }} BPM</span>
					</span>
					<!-- 4-血压 -->
					<span
						v-if="item.fAlertType == 4"
						style="color:#FF4848;font-weight: 600;"
					>
						<span>{{
							$store.getters.language == 'zh' ? '血压' : 'Blood Pressure'
						}}</span>

						<span
							>{{ $store.getters.language == 'zh' ? '舒张压' : 'Diastolic' }}
							{{ item.fDiastolic }} mmHg</span
						>,
						<span
							>{{ $store.getters.language == 'zh' ? '收缩压' : 'Systolic' }}
							{{ item.fSystolic }} mmHg</span
						>
					</span>
					<!-- 4-血糖 -->
					<span
						v-if="item.fAlertType == 5"
						style="color:#FF4848;font-weight: 600;"
					>
						<span
							>{{ $store.getters.language == 'zh' ? '血糖' : 'Blood Glucose' }}
						</span>
						<span>{{ item.fBloodsugar }} mmol/L</span>
					</span>

					<!-- 6-体温 -->
					<span
						v-if="item.fAlertType == 6"
						style="color:#FF4848;font-weight: 600;"
					>
						<span>{{
							$store.getters.language == 'zh' ? '体温' : 'Temper'
						}}</span>
						<span>{{ item.fTemper }} ℃</span>
					</span>

					<!-- 15-低电量 -->
					<span v-if="item.fAlertType == 15">
						<span style="color:#FF4848;font-weight: 600;">{{
							$store.getters.language == 'zh' ? '电量过低' : 'Low Battery'
						}}</span>
						<span style="margin-right: 5px;">{{ item.fMsgContent }}</span>
					</span>

					<!--  日期-->
					<span style="margin-left: 5px;font-weight: 600;">
						{{ `${formatTime(item.fAlertTime * 1000)}` }}
					</span>
				</el-card>
			</el-timeline-item>
		</el-timeline>
	</div>
</template>

<script>
import { formatDateToStr } from '@/utils/validate';
import { getByTypeAlertList, getDeviceAlertList } from '@/api/alert';

export default {
	name: 'AlertInfo',
	props: {
		dataInfo: Object
	},
	data() {
		return {
			alertsList: []
		};
	},
	mounted() {
		this.alertsList = [];
		setTimeout(() => {
			this._getByTypeAlertList();
		}, 100);
	},
	methods: {
		// 根据设备did查询该设备所有警报
		_getByTypeAlertList() {
			if (this.dataInfo.fAlertType) {
				getByTypeAlertList({
					did: this.dataInfo.fDid,
					type: this.dataInfo.fAlertType
				})
					.then((data) => {
						let { list } = data;
						this.alertsList = list.slice(0, 3).map((item) => {
							if (item.fAlertType == 1) {
								if (
									item.fMsgContent.indexOf('https://www.google.com/maps') ||
									item.fMsgContent.indexOf('http://www.google.com/maps')
								) {
									let str = item.fMsgContent;
									str = str.split('http');
									item.fMsgContent = str[0].replace('SOS!', '');
									item.sosHttp =
										this.$store.getters.language == 'zh'
											? `./htmlPage/baiduMap.html?query=${item.fLongitude},${
													item.fLatitude
											  }&address=${encodeURI(item.fMsgContent)}`
											: `https://ditu.google.com/maps/search/?api=1&query=${item.fLatitude},${item.fLongitude}`;
								}
							}
							if (item.fAlertType == 2) {
								let str = item.fMsgContent;
								str = str.split('http');
								item.fMsgContent = str[0].replace(
									'Out of the set e-fence!',
									''
								);
								item.sosHttp =
									this.$store.getters.language == 'zh'
										? `./htmlPage/baiduMap.html?query=${item.fLongitude},${item.fLatitude}&address=${item.fMsgContent}`
										: `https://ditu.google.com/maps/search/?api=1&query=${item.fLatitude},${item.fLongitude}`;
							}
							return item;
						});
					})
					.catch((error) => {
						this.$message({
							showClose: true,
							message: error,
							type: 'error'
						});
					});
			} else {
				getDeviceAlertList({
					did: this.dataInfo.fDid
				})
					.then((data) => {
						let { list } = data;

						this.alertsList = list.slice(0, 3).map((item) => {
							if (item.fAlertType == 1) {
								if (
									item.fMsgContent.indexOf('https://www.google.com/maps') ||
									item.fMsgContent.indexOf('http://www.google.com/maps')
								) {
									let str = item.fMsgContent;
									str = str.split('http');
									item.fMsgContent = str[0].replace('SOS!', '');
									item.sosHttp =
										this.$store.getters.language == 'zh'
											? `./htmlPage/baiduMap.html?query=${item.fLongitude},${
													item.fLatitude
											  }&address=${encodeURI(item.fMsgContent)}`
											: `https://ditu.google.com/maps/search/?api=1&query=${item.fLatitude},${item.fLongitude}`;
								}
							}
							if (item.fAlertType == 2) {
								let str = item.fMsgContent;
								str = str.split('http');
								item.fMsgContent = str[0].replace(
									'Out of the set e-fence!',
									''
								);
								item.sosHttp =
									this.$store.getters.language == 'zh'
										? `./htmlPage/baiduMap.html?query=${item.fLongitude},${item.fLatitude}&address=${item.fMsgContent}`
										: `https://ditu.google.com/maps/search/?api=1&query=${item.fLatitude},${item.fLongitude}`;
							}
							return item;
						});
					})
					.catch((error) => {
						this.$message({
							showClose: true,
							message: error,
							type: 'error'
						});
					});
			}
		},
		formatTime(timestamp) {
			const dateObj = formatDateToStr(timestamp, this.$store.getters.language);
			return dateObj;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';

.yn-alert-info {
	.user-info-row-bg {
		@include flex-c-c;
		.user-info-bg {
			@include flex-s-c;
		}
		.user-info {
			@include flex-c-c-c;
			.user-info-name {
				margin-top: 8px;
			}
		}
		.user-info-right {
			.user-info-right-top {
				@include flex-b-c;
				span {
					flex-shrink: 0;
					margin-right: 10px;
					width: 100px;
					text-align: right;
				}
			}
			.input-suffix {
				@include flex-s-c;
			}
		}
	}
}
</style>
<style lang="scss">
.yn-alert-info {
	padding: 10px 0;
	.el-timeline-item {
		padding-bottom: 10px;
	}
	.el-timeline-item__tail {
		border-left: 2px solid $mainColor !important;
	}
	.el-timeline-item__node {
		border: 2px solid #afd0f3;
		box-sizing: border-box;
	}
	.el-card {
		border: 1px solid #bbbbbd;
	}
	.el-timeline {
		padding-inline-start: 30px !important;
	}
	.el-button {
		width: 100%;
		height: 50px;
	}
}
</style>
