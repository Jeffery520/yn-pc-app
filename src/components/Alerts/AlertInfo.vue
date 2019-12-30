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
					<!-- 机构和姓名 todo-->
					<span style="margin-right: 5px;font-weight: 600;">
						{{
							`${dataInfo.fOrgName}${
								item.fFullname ? ',' + item.fFullname : ''
							}`
						}}
					</span>
					<!-- 1-SOS -->
					<span v-if="item.fAlertType == 1">
						<span style="color:#FF0000;font-weight: 600;">SOS</span>
					</span>
					<!-- 2-围栏 -->
					<span v-if="item.fAlertType == 2">
						<span style="color:#FF0000;font-weight: 600;">{{
							$store.getters.language == 'zh'
								? '走出地理围栏'
								: 'Out of Geo-fence'
						}}</span>
						<span style="color:#5F9DE9;">{{ item.fLocationTitle }}</span>
					</span>

					<!-- 3-心率 -->
					<span v-if="item.fAlertType == 3">
						<span style="font-weight: 600;">{{
							$store.getters.language == 'zh' ? '心率' : 'Heart Rate'
						}}</span>
						<span style="color:#FF0000;font-weight: 600;"
							>{{ item.fHrstatus }} BPM</span
						>
					</span>
					<!-- 4-血压 -->
					<span v-if="item.fAlertType == 4">
						<span style="font-weight: 600;">{{
							$store.getters.language == 'zh' ? '血压' : 'Blood Pressure'
						}}</span>
						<span style="color:#FF0000;font-weight: 600;">{{
							item.fDiastolic
						}}</span>
					</span>
					<!-- 4-血糖 -->
					<span v-if="item.fAlertType == 5">
						<span style="font-weight: 600;"
							>{{ $store.getters.language == 'zh' ? '血糖' : 'Blood Glucose' }}
						</span>
						<span style="color:#FF0000;font-weight: 600;"
							>{{ item.fBloodsugar }} mmol/L</span
						>
					</span>

					<!-- 6-体温 -->
					<span v-if="item.fAlertType == 6">
						<span style="font-weight: 600;">{{
							$store.getters.language == 'zh' ? '体温' : 'Temper'
						}}</span>
						<span style="color:#FF0000;font-weight: 600;"
							>{{ item.fTemper }} ℃</span
						>
					</span>

					<!-- 6-体温 -->
					<span v-if="item.fAlertType == 15">
						<span style="font-weight: 600;">{{ item.fMsgContent }}</span>
					</span>
					<!--  日期-->
					<span style="margin-left: 5px;">
						{{ `at ${formatTime(item.fAlertTime)}` }}
					</span>
				</el-card>
			</el-timeline-item>
		</el-timeline>
	</div>
</template>

<script>
import { formatDate } from '@/utils/validate';
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
						this.alertsList = list.slice(0, 3);
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
						this.alertsList = list.slice(0, 3);
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
			const dateObj = formatDate(timestamp, 'en');
			return `${dateObj.month} ${dateObj.day}, ${
				dateObj.hour < 10 ? '0' + dateObj.hour : dateObj.hour
			}:${dateObj.minute < 10 ? '0' + dateObj.minute : dateObj.minute} ${
				dateObj.ampm
			} `;
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
