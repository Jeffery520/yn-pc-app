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
								src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
							></el-avatar>
							<span class="user-info-name">{{
								dataInfo.fFullname || '--'
							}}</span>
						</div>
					</div>
				</el-col>
				<!--header right-->
				<el-col :span="20">
					<div class="user-info-right">
						<div class="user-info-right-top">
							<div class="input-suffix" style="width:40%;">
								<span>{{ $t('alerts.info.age') }}:</span>
								<el-input readonly :value="dataInfo.fAge"> </el-input>
							</div>
							<div class="input-suffix" style="width:60%;">
								<span>{{ $t('alerts.info.phone') }}:</span>
								<el-input readonly :value="dataInfo.fPhone"> </el-input>
							</div>
						</div>
						<div class="user-info-right-top" style="margin-top:20px;">
							<div class="input-suffix" style="width:100%;">
								<span>{{ $t('alerts.info.homeAddress') }}:</span>
								<el-input readonly :value="dataInfo.fAddress"> </el-input>
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
				<el-col :span="16">
					<div>
						<el-timeline>
							<el-timeline-item color="#5E9EE8" hide-timestamp placement="top">
								<el-card
									shadow="never"
									body-style="padding: 10px 20px;text-align: left;"
								>
									<span>SOS:</span>
									<span
										>2180 Lake Blvd NE Atlanta,GA 30319 at Jul 23,4:32PM</span
									>
								</el-card>
							</el-timeline-item>
							<el-timeline-item color="#5E9EE8" hide-timestamp placement="top">
								<el-card body-style="padding: 10px 20px;text-align: left;">
									<span>SOS:</span>
									<SPAN
										>2180 Lake Blvd NE Atlanta,GA 30319 at Jul 23,4:32PM</SPAN
									>
								</el-card>
							</el-timeline-item>
						</el-timeline>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="user-info-bottom">
						<el-button @click="openDetail" type="primary">{{
							$t('alerts.info.process')
						}}</el-button>
						<el-button @click="infoVisible = false">{{
							$t('alerts.info.skip')
						}}</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
	</el-dialog>
</template>

<script>
export default {
	name: 'AlertInfo',
	props: {
		dataInfo: {
			type: Object,
			value: {}
		}
	},
	data() {
		return { infoVisible: false };
	},
	methods: {
		closePop() {
			this.$emit('closePOP');
		},
		openDetail() {
			this.$emit('openDetail', this.dataInfo);
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
