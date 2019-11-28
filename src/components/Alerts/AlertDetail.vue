<template>
	<el-dialog
		top="8vh"
		width="80vw"
		title="User Profiles"
		custom-class="alert-detail-dialog"
		:visible.sync="detailVisible"
	>
		<div class="yn-alert-detail" style="height: 700px;">
			<div class="detail-header-alert">
				<svg-icon icon-class="alerts"></svg-icon>Alert:{{ detail.fMsgContent }}
			</div>
			<div class="detail-content">
				<div class="detail-content-left">
					<div class="left-top">
						<div class="user-info-left">
							<el-avatar
								:size="110"
								class="user-photo"
								:src="detail.fHead"
							></el-avatar>
							<span class="user-info-name">{{ detail.fFullname || '—' }}</span>
						</div>
						<div class="user-info-right">
							<header>Basic Info</header>
							<div class="artical">
								<div class="left">
									<div class="input-suffix input-suffix-padding">
										<span>{{ $t('user.age') }}:</span>
										<el-input
											readonly
											:value="detail.fAge"
											style="width: 25%;"
											size="small"
										></el-input>
										<span>{{ $t('user.gender') }}:</span>
										<el-input
											readonly
											:value="
												detail.fSex == 0
													? $t('user.male')
													: detail.fSex == 1
													? $t('user.female')
													: $t('user.other')
											"
											style="width: 40%;"
											size="small"
										></el-input>
									</div>

									<div class="input-suffix" style="margin-top:6px;">
										<span>{{ $t('user.phone') }}:</span>
										<el-input
											readonly
											:value="detail.fPhone"
											size="small"
											style="max-width: 196px"
										>
											<el-button slot="append" @click="call(detail.fPhone)"
												><svg-icon
													style="font-size: 18px;"
													icon-class="call"
												></svg-icon
											></el-button>
										</el-input>
									</div>
									<div class="input-suffix" style="margin-top:6px;">
										<span>{{ $t('user.address') }}:</span>
										<el-input
											readonly
											resize="none"
											:value="detail.fAddress"
											type="textarea"
											size="small"
										></el-input>
									</div>
								</div>
								<div class="right">
									<div
										class="right-section"
										v-for="(item, index) in authorisedList"
										:key="item.fUid"
									>
										<div class="right-section-item" style="width:80px;">
											<span>Authorised</span>
											<span>Personnel {{ index + 1 }}</span>
										</div>
										<div
											class="right-section-item"
											style="width:120px;margin-left: 20px;"
										>
											<span>{{ item.fUserAlias || '—' }}</span>
											<span>{{ item.fUin }}</span>
										</div>
										<el-button @click="call(item.fPhone)" type="success">
											<div class="right-btn chat-button">
												<svg-icon icon-class="call"></svg-icon>
												<span>Call</span>
											</div>
										</el-button>
										<el-button type="success" class="chat-button">
											<div class="right-btn">
												<svg-icon icon-class="chat"></svg-icon>
												<span>Chat</span>
											</div>
										</el-button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="left-bottom">
						<div style="width: 640px;margin-right:20px;flex-grow: 1 ">
							<div class="left-bottom-table-header">Basic Info</div>
							<el-table
								:header-cell-style="tableHeaderColor"
								:cell-style="tableCellColor"
								:data="tableData"
								size="small"
								border
							>
								<el-table-column
									:resizable="false"
									prop="hrList"
									:label="$t('others.heartRate')"
								>
									<template slot-scope="scope">
										<div
											v-if="scope.row.hrList.measuredate"
											style="display: flex;justify-content: space-between;font-size: 15px;align-items:flex-start;font-weight: 600"
										>
											<!--                    1-正常 2-偏高 3-偏低-->
											<span
												:style="{
													'flex-grow': 1,
													color:
														scope.row.hrList.hrtype == 1 ? '#39c973' : '#E65945'
												}"
												>{{ scope.row.hrList.hrvalue }}</span
											>
										</div>
										<div
											style="font-size: 12px;line-height: 1.5;"
											v-if="scope.row.hrList.measuredate"
											v-html="scope.row.hrList.measuredate"
										></div>
									</template>
								</el-table-column>
								<el-table-column
									:resizable="false"
									prop="bpList"
									:label="$t('others.bloodPressure')"
								>
									<template slot-scope="scope">
										<div
											v-if="scope.row.bpList.measuredate"
											style="display: flex;justify-content: space-between;font-size: 15px;align-items:flex-start;font-weight: 600"
										>
											<!-- 1-理想血压 2-正常血压 3-正常高值 4-轻度高血压 5-中度高血压 6-重度高血压 7-低血压-->
											<span
												:style="{
													'flex-grow': 1,
													color:
														scope.row.bpList.hrtype == 1 ||
														scope.row.bpList.hrtype == 2 ||
														scope.row.bpList.hrtype == 3
															? '#39c973'
															: '#E65945'
												}"
												>{{
													scope.row.bpList.dbp + '/' + scope.row.bpList.sbp
												}}</span
											>
										</div>
										<div
											style="font-size: 12px;line-height: 1.5;"
											v-if="scope.row.bpList.measuredate"
											v-html="scope.row.bpList.measuredate"
										></div>
									</template>
								</el-table-column>
								<el-table-column
									:resizable="false"
									prop="bsList"
									:label="$t('others.bloodGlucose')"
								>
									<template slot-scope="scope">
										<div
											v-if="scope.row.bsList.measuredate"
											style="display: flex;justify-content: space-between;font-size: 15px;align-items:flex-start;font-weight: 600"
										>
											<!-- 1-正常 2-偏高 3-偏低-->
											<span
												:style="{
													'flex-grow': 1,
													color:
														scope.row.bsList.hrtype == 1 ? '#39c973' : '#E65945'
												}"
												>{{ scope.row.bsList.glu }}mmol/L</span
											>
										</div>
										<div
											style="font-size: 12px;line-height: 1.5;"
											v-if="scope.row.bsList.measuredate"
											v-html="scope.row.bsList.measuredate"
										></div>
									</template>
								</el-table-column>
								<el-table-column
									:resizable="false"
									prop="spo2List"
									:label="$t('others.bloodOxygen')"
								>
									<template slot-scope="scope">
										<div
											v-if="scope.row.spo2List.measuredate"
											style="display: flex;justify-content: space-between;font-size: 15px;align-items:flex-start;font-weight: 600"
										>
											<!--  1-正常 2-偏高 3-偏低-->
											<span
												:style="{
													'flex-grow': 1,
													color:
														scope.row.spo2List.hrtype == 1
															? '#39c973'
															: '#E65945'
												}"
												>{{ scope.row.spo2List.oxygen }}%</span
											>
										</div>
										<div
											style="font-size: 12px;line-height: 1.5;"
											v-if="scope.row.spo2List.measuredate"
											v-html="scope.row.spo2List.measuredate"
										></div>
									</template>
								</el-table-column>
								<el-table-column
									:resizable="false"
									prop="peList"
									:label="$t('others.steps')"
								>
									<template slot-scope="scope">
										<div
											v-if="scope.row.peList.measuredate"
											style="display: flex;justify-content: space-between;font-size: 15px;align-items:flex-start;font-weight: 600"
										>
											<!-- 1-正常 2-偏高 3-偏低-->
											<span
												:style="{
													'flex-grow': 1,
													color:
														scope.row.peList.hrtype == 1 ? '#39c973' : '#E65945'
												}"
												>{{ scope.row.peList.stepcount }}</span
											>
										</div>
										<div
											style="font-size: 12px;line-height: 1.5;"
											v-if="scope.row.peList.measuredate"
											v-html="scope.row.peList.measuredate"
										></div>
									</template>
								</el-table-column>
								<el-table-column
									:resizable="false"
									prop="posList"
									:label="$t('others.geoFence')"
									width="120px"
								>
									<template slot-scope="scope">
										<div
											v-if="scope.row.posList.measuredate"
											style="display: flex;justify-content: space-between;font-size: 15px;align-items:flex-start;font-weight: 600"
										>
											<span
												:style="{
													'flex-grow': 1,
													color: !scope.row.posList.warning
														? '#39c973'
														: '#E65945'
												}"
												>{{
													scope.row.posList.warning ? 'Out of fence' : 'Normal'
												}}</span
											>
										</div>

										<div
											style="font-size: 12px;line-height: 1.5;"
											v-if="scope.row.posList.measuredate"
											v-html="scope.row.posList.measuredate"
										></div>
									</template>
								</el-table-column>
								<el-table-column
									:resizable="false"
									prop="slList"
									:label="$t('others.sleepTime')"
								>
									<template slot-scope="scope">
										<div
											v-if="scope.row.slList.measuredate"
											style="display: flex;justify-content: space-between;font-size: 15px;align-items:flex-start;font-weight: 600"
										>
											<!--  1-正常 2-偏高 3-偏低-->
											<span
												:style="{
													'flex-grow': 1,
													color:
														scope.row.slList.hrtype == 1 ? '#39c973' : '#E65945'
												}"
												>{{
													(scope.row.slList.sleeptimes / 3600).toFixed(1)
												}}
												Hours</span
											>
										</div>
										<div
											style="font-size: 12px;line-height: 1.5;"
											v-if="scope.row.slList.measuredate"
											v-html="scope.row.slList.measuredate"
										></div>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div class="left-b-action">
							<div class="action-status-bg">
								<h1 class="section-title">Actions status</h1>
								<template>
									<el-select v-model="fStatus" placeholder="请选择">
										<el-option
											v-for="item in options"
											:key="item.value"
											:label="item.label"
											:value="item.value"
										></el-option>
									</el-select>
								</template>
							</div>
							<div class="action-status-bg" style="margin-top: 20px">
								<h1 class="section-title">Actions status</h1>
								<div style="margin:0 10px 10px;">
									<el-input
										type="textarea"
										:rows="2"
										placeholder="请输入内容"
										v-model="fContent"
										:autosize="{ minRows: 3, maxRows: 6 }"
									></el-input>
								</div>
								<el-button @click="alertStatusHandle" type="primary">{{
									$t('action.save')
								}}</el-button>
							</div>
						</div>
					</div>
				</div>
				<div class="detail-content-right">
					<Chat @sendMessage="sendMessage"></Chat>
					<div style="margin-top: 10px;">
						<el-button @click="detailVisible = false">{{
							$t('action.skip')
						}}</el-button>
						<el-button type="primary">{{ $t('action.save') }}</el-button>
					</div>
				</div>
			</div>
		</div>
	</el-dialog>
</template>

<script>
import {
	getDevicesBinders,
	getAlertBasicInfo,
	alertStatusHandle
} from '@/api/devices';
import { formatDate } from '@/utils/validate';

const Chat = () => import('@/components/Chat');

export default {
	name: 'alertDetail',
	components: { Chat },
	props: {
		detail: Object
	},
	data() {
		return {
			detailVisible: false,
			authorisedList: [],
			tableData: [],
			fStatus: this.detail.fAlertStaus,
			fContent: '',
			// 1-open; 2-skip; 3-follow; 4-completed
			options: [
				{ label: 'open', value: 1 },
				{ label: 'Skip', value: 2 },
				{ label: 'Follow up', value: 3 },
				{ label: 'completed', value: 4 }
			]
		};
	},
	watch: {
		detailVisible() {
			if (this.detailVisible) {
				this.authorisedList = [];
				this.tableData = [];
				setTimeout(() => {
					this.fStatus = this.detail.fAlertStaus;
					this._getDevicesBinders();
					this._getAlertBasicInfo();
				}, 100);
			}
		}
	},
	methods: {
		call(phone) {
			console.log(phone);
			this.$alert(
				this.$store.getters.language == 'zh'
					? '此功能暂不支持'
					: 'this feature is currently not supported'
			);
		},
		tableCellColor() {
			return 'color: #666;text-align: center;';
		},
		tableHeaderColor() {
			return 'color: #666;text-align: center;';
		},
		sendMessage() {
			console.log('发送消息');
		},
		alertStatusHandle() {
			this.loading = this.$loading({
				target: document.querySelector('.alert-detail-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const { fAlertId, fAlertType, fDid } = this.detail;
			const params = {
				fAlertId: fAlertId || 0,
				fAlertType: fAlertType || 0,
				fContent: this.fContent,
				fDid: fDid,
				fStatus: this.fStatus,
				fWay: 0
			};
			alertStatusHandle(params)
				.then(() => {
					this.$message({
						message: 'Success',
						type: 'success'
					});
					this.$emit('change');
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_getAlertBasicInfo() {
			this.loading = this.$loading({
				target: document.querySelector('.alert-detail-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getAlertBasicInfo({ did: this.detail.fDid })
				.then((data) => {
					let dataList = [];
					for (let i = 0; i < 5; i++) {
						let obj = {};
						obj.bpList = data.bpList[i] || {};
						obj.bsList = data.bsList[i] || {};
						obj.hrList = data.hrList[i] || {};
						obj.peList = data.peList[i] || {};
						obj.posList = data.posList[i] || {};
						obj.slList = data.slList[i] || {};
						obj.spo2List = data.spo2List[i] || {};
						dataList.push(obj);
					}
					this.tableData = dataList.map((item) => {
						item.bpList.measuredate = this._formatDate(
							item.bpList.measuredate * 1000
						);
						item.bsList.measuredate = this._formatDate(
							item.bsList.measuredate * 1000
						);
						item.hrList.measuredate = this._formatDate(
							item.hrList.measuredate * 1000
						);
						item.peList.measuredate = this._formatDate(
							item.peList.measuredate * 1000
						);
						item.posList.measuredate = this._formatDate(
							item.posList.measuredate
						);
						item.slList.measuredate = this._formatDate(
							item.slList.measuredate * 1000
						);
						item.spo2List.measuredate = this._formatDate(
							item.spo2List.measuredate * 1000
						);
						console.log(item);
						return item;
					});
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_getDevicesBinders() {
			getDevicesBinders({ did: this.detail.fDid })
				.then((data) => {
					this.authorisedList = data;
				})
				.catch(() => {});
		},
		_formatDate(timestamp) {
			let date = timestamp ? formatDate(timestamp) : '';
			return date
				? `${date.month}${this.$store.getters.language == 'zh' ? '月' : ''}${
						date.day
				  },</br>${date.hour}：${date.minute} ${date.ampm}`
				: '';
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.section-title {
	font-size: 14px;
	line-height: 48px;
	color: $title-fontColor;
	font-weight: 600;
	text-align: left;
	padding-left: 20px;
}
.yn-alert-detail {
	background: #fff;
	padding-right: 20px;
	padding-bottom: 30px;
	text-align: center;
	border-radius: 8px;
	overflow: scroll;
	box-sizing: border-box;
	color: $normal-fontColor;
	.alert-detail-header {
		color: $title-fontColor;
		@include flex-b-c;
		line-height: 40px;
		background: #ededed;
		padding: 0 20px;
		font-weight: 600;
		font-size: 14px;
	}
	.detail-header-alert {
		font-size: 18px;
		font-weight: 600;
		color: $alertColor;
		text-align: left;
		margin-bottom: 30px;
		padding-right: 30px;
		.svg-icon {
			margin-right: 10px;
		}
	}
	.detail-content {
		@include flex-b-c;
		align-items: flex-start;
		.detail-content-left {
			.left-top {
				height: 206px;
				margin-bottom: 20px;
				@include flex-b-c;
			}
			.left-bottom {
				@include flex-c-c;
				align-items: flex-start;
				margin-top: 20px;
			}
		}
		.detail-content-right {
			margin-left: 20px;
			.el-button {
				min-width: 120px !important;
			}
		}
	}
}
.user-info-left {
	width: 174px;
	height: 100%;
	border: 1px solid $baseBorderColor;
	@include flex-c-c-c;
	.user-info-name {
		max-width: 140px;
		margin-top: 20px;
		font-size: 14px;
		font-weight: 600;
		color: $title-fontColor;
		@include text-overflow;
	}
}
.user-info-right {
	margin-left: 20px;
	flex-grow: 1;
	height: 100%;
	border: 1px solid $baseBorderColor;
	text-align: left;
	padding: 15px;
	header {
		font-size: 14px;
		font-weight: 600;
		color: $title-fontColor;
	}
	.input-suffix {
		@include flex-s-c;
		justify-content: space-between;
		& > span {
			flex-grow: 0;
			width: 74px;
			margin-right: 8px;
			text-align: right;
		}
	}
	.artical {
		@include flex-s-c;
		padding-top: 18px;
		.left {
			width: 260px;
			height: 138px;
			@include flex-c-c-c;
			justify-content: space-between;
		}
		.right {
			height: 138px;
			margin-left: 20px;
			border: 1px solid #a6a6a6;
			flex-grow: 1;
			overflow-y: scroll;
			.right-section {
				@include flex-c-c;
				background-color: #eeeeee;
				padding: 6px;
				margin: 5px;
			}
			.right-section-item {
				@include flex-c-c-c;
				align-items: flex-start;
			}
			.el-button {
				width: 92px;
				height: 28px;
				line-height: 28px;
				font-size: 14px;
				padding: 0;
				background-color: $greenColor;
				border-color: $greenColor;
				border-radius: 0px;
				margin-left: 10px;
			}
			.chat-button:active {
				background-color: $alertColor !important;
				border-color: $alertColor !important;
			}

			.right-btn {
				@include flex-c-c;
			}
			.svg-icon {
				color: #ffffff;
				font-size: 20px;
				margin-right: 5px;
			}
		}
	}
}
.left-bottom-table-header {
	font-size: 14px;
	font-weight: 600;
	border: 1px solid #ddd;
	border-bottom: none;
	line-height: 56px;
	text-align: left;
	padding: 0 18px;
	color: $title-fontColor;
}
.detail-content-left {
	flex-grow: 1;
}
.left-b-action {
	width: 260px;
	flex-shrink: 0;
}
.action-status-bg {
	border: 1px solid $baseBorderColor;
	padding: 0 0 20px;
	.el-button {
		min-width: 120px !important;
	}
}
</style>
<style lang="scss">
.user-info-right {
	.el-input-group__append {
		background-color: $greenColor !important;
		border-color: $greenColor !important;
		padding: 0 15px;
		&:active {
			background-color: $alertColor !important;
			border-color: $alertColor !important;
		}
	}
}
.input-suffix-padding {
	.el-input__inner {
		padding: 0 5px !important;
		text-align: center;
	}
}
</style>
