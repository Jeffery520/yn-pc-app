<template>
	<el-dialog top="20vh" width="760px" :visible.sync="infoVisible">
		<div class="yn-alert-info">
			<el-row
				class="user-info-row-bg"
				type="flex"
				justify="space-between"
				align="middle"
			>
				<!--header left-->
				<el-col :span="4">
					<div class="user-info-bg">
						<div class="user-info">
							<el-avatar
								:size="70"
								:src="
									dataInfo.fHead ||
										'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
								"
							></el-avatar>
							<span class="user-info-name">
								{{ dataInfo.fFullname || '--' }}
							</span>
						</div>
					</div>
				</el-col>
				<!--header right-->
				<el-col :span="20">
					<div class="user-info-right">
						<div class="user-info-right-top">
							<div class="input-suffix" style="width:40%;">
								<span>{{ $t('user.age') }}:</span>
								<el-input readonly :value="dataInfo.fAge"></el-input>
							</div>
							<div class="input-suffix" style="width:60%;">
								<span>{{ $t('user.phone') }}:</span>
								<el-input readonly :value="dataInfo.fPhone"></el-input>
							</div>
						</div>
						<div class="user-info-right-top" style="margin-top:20px;">
							<div class="input-suffix" style="width:100%;">
								<span>{{ $t('user.homeAddress') }}:</span>
								<el-input readonly :value="dataInfo.fAddress"></el-input>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>

			<el-row
				type="flex"
				justify="space-between"
				align="middle"
				style="margin-top: 30px;"
			>
				<el-col :span="16" class="alert-list">
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
									<span style="color:#E65945;font-weight: 600;">SOS:</span>
								</span>
								<!-- 2-围栏 -->
								<span v-if="item.fAlertType == 2">
									<span style="color:#E65945;font-weight: 600;"
										>Out of Geo-fence:</span
									>
									<span style="color:#5F9DE9;">{{ item.fLocationTitle }}</span>
								</span>

								<!-- 3-心率 -->
								<span v-if="item.fAlertType == 3">
									<span style="font-weight: 600;">Heart Rate:</span>
									<span style="color:#E65945;font-weight: 600;"
										>{{ item.fHrstatus }} BPM</span
									>
								</span>
								<!-- 4-血压 -->
								<span v-if="item.fAlertType == 4">
									<span style="font-weight: 600;">Blood Pressure</span>
									<span style="color:#E65945;font-weight: 600;">{{
										item.fDiastolic
									}}</span>
								</span>
								<!-- 4-血糖 -->
								<span v-if="item.fAlertType == 5">
									<span style="font-weight: 600;">Blood Glucose</span>
									<span style="color:#E65945;font-weight: 600;"
										>{{ item.fBloodsugar }} mmol/L</span
									>
								</span>

								<!-- 6-体温 -->
								<span v-if="item.fAlertType == 6">
									<span style="font-weight: 600;">Temper</span>
									<span style="color:#E65945;font-weight: 600;"
										>{{ item.fTemper }} ℃</span
									>
								</span>
								<!--  日期-->
								<span style="margin-left: 10px;">
									{{ `at ${formatTime(item.fAlertTime)}` }}
								</span>
							</el-card>
						</el-timeline-item>
					</el-timeline>
				</el-col>
				<el-col :span="5">
					<div class="user-info-bottom">
						<el-button @click="openDetail" type="primary">
							{{ $t('action.process') }}
						</el-button>
						<el-button @click="infoVisible = false">
							{{ $t('action.skip') }}
						</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
	</el-dialog>
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
			infoVisible: false,
			alertType: '', // 警报类型：1.全部  2.分类
			alertsList: []
		};
	},
	watch: {
		// 监听数据变化
		dataInfo() {
			this._getByTypeAlertList();
		}
	},
	methods: {
		closePop() {
			this.$emit('closePOP');
		},
		openDetail() {
			this.$emit('openDetail', this.dataInfo);
		},
		// 根据设备did查询该设备所有警报
		_getByTypeAlertList() {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, .6)'
			});
			if (this.alertType) {
				getByTypeAlertList({
					did: this.dataInfo.fDid,
					type: this.dataInfo.fAlertType
				})
					.then((data) => {
						let { list } = data;
						this.alertsList = list.slice(0, 5);
						this.loading.close();
					})
					.catch((error) => {
						this.loading.close();
						this.$message({
							showClose: true,
							message:
								error.message ||
								`Request failed with status code${error.status}`,
							type: 'error'
						});
					});
			} else {
				getDeviceAlertList({
					did: this.dataInfo.fDid
				})
					.then((data) => {
						let { list } = data;
						this.alertsList = list.slice(0, 5);
						this.loading.close();
					})
					.catch((error) => {
						this.loading.close();
						this.$message({
							showClose: true,
							message:
								error.message ||
								`Request failed with status code${error.status}`,
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
	.user-info-bottom {
		@include flex-c-c-c;
		align-items: flex-end;
		button:last-child {
			margin-top: 10px;
		}
	}
}
</style>
<style lang="scss">
.yn-alert-info {
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
