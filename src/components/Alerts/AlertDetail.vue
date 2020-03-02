<template>
	<el-dialog
		top="3vh"
		:title="$t('alerts.UserProfiles')"
		custom-class="alert-detail-dialog"
		:width="
			detailVisible && charIndex >= 0
				? $store.getters.WindowWidth > 1450
					? '1450px'
					: '94%'
				: '1200px'
		"
		:visible.sync="detailVisible"
		@close="detailClose"
		lock-scroll
		destroy-on-close
	>
		<div v-if="detailVisible" class="yn-alert-detail" style="height:84vh">
			<div class="detail-header-alert">
				<svg-icon icon-class="alerts"></svg-icon
				><span>{{ $store.getters.language == 'zh' ? '警告' : 'Alert' }}:</span>
				<template>
					<!-- 1-SOS -->
					<span v-if="detail.fAlertType == 1">
						<span style="margin-right:5px;">SOS</span>
						<a
							target="_blank"
							:href="detail.sosHttp"
							style="margin-right: 5px;cursor: help"
							>{{ detail.fMsgContent }}
						</a>
					</span>
					<!-- 2-围栏 -->
					<span v-if="detail.fAlertType == 2">
						<span style="margin-right: 5px;">{{
							$store.getters.language == 'zh'
								? '走出地理围栏'
								: 'Out of Geo-fence'
						}}</span>
						<a
							target="_blank"
							:href="detail.sosHttp"
							style="margin-right: 5px;cursor: help"
							>{{ detail.fMsgContent }}
						</a>
					</span>

					<!-- 3-心率 -->
					<span v-if="detail.fAlertType == 3" style="margin-right: 5px;">
						<span>{{
							$store.getters.language == 'zh' ? '心率' : 'Heart Rate Alert'
						}}</span>
						<span>{{ detail.fHrstatus }} BPM</span>
					</span>
					<!-- 4-血压 -->
					<span v-if="detail.fAlertType == 4" style="margin-right: 5px;">
						<span>{{
							$store.getters.language == 'zh' ? '血压' : 'Blood Pressure Alert'
						}}</span>
						<span
							>{{ $store.getters.language == 'zh' ? '舒张压' : 'Diastolic' }}
							{{ detail.fDiastolic }} mmHg</span
						>,
						<span
							>{{ $store.getters.language == 'zh' ? '收缩压' : 'Systolic' }}
							{{ detail.fSystolic }} mmHg</span
						>
						<span
							>,{{ $store.getters.language == 'zh' ? '心率' : 'Heart Rate' }}
							{{ detail.fHrstatus }} BPM</span
						>
					</span>
					<!-- 4-血糖 -->
					<span v-if="detail.fAlertType == 5" style="margin-right: 5px;">
						<span>{{
							$store.getters.language == 'zh' ? '血糖' : 'Blood Glucose Alert'
						}}</span>
						<span>{{ detail.fBloodsugar }} mmol/L</span>
					</span>

					<!-- 6-体温 -->
					<span v-if="detail.fAlertType == 6" style="margin-right: 5px;">
						<span>{{
							$store.getters.language == 'zh' ? '体温' : 'Temperature Alert'
						}}</span>
						<span>{{ detail.fTemper }} ℃</span>
					</span>

					<!-- 15-低电量 -->
					<span v-if="detail.fAlertType == 15">
						<span style="margin-right: 5px;">{{
							$store.getters.language == 'zh' ? '电量过低' : 'Low Battery'
						}}</span>
						<span>{{ detail.fMsgContent }}</span>
					</span>

					<!-- 日期-->
					<span>{{ detail.fAlertTime }}</span>
				</template>
			</div>
			<div class="detail-content" :style="scaleDeatilStyle">
				<div class="detail-content-left">
					<div class="left-top">
						<div class="user-info-left" @click="deviceDetails">
							<el-avatar
								:size="110"
								class="user-photo"
								:src="detail.fHead"
							></el-avatar>
							<span class="user-info-name">
								<span v-if="detail.fFullname">{{ detail.fFullname }}</span>
								<span v-else style="color: #bbb">{{
									$t('user.unknownName')
								}}</span>
							</span>
						</div>
						<div class="user-info-right">
							<div class="artical">
								<div class="left">
									<header>{{ $t('alerts.BasicInfo') }}</header>
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
											:value="_formatPhone(detail.fPhone)"
											size="small"
											style="max-width: 200px;line-height: 29px !important;"
										>
											<!--  @click="call(item.fPhone)"-->
											<el-button
												v-if="$store.getters.userInfo.resource.indexOf(8) > -1"
												slot="append"
												:class="[
													'chat-button',
													callPhoneNumber == detail.fPhone && detail.fPhone
														? 'active'
														: ''
												]"
												@click="callPhone(_formatPhone(detail.fPhone))"
											>
												<svg-icon
													style="font-size: 18px;color: #fff;line-height: 29px !important;"
													icon-class="call"
												></svg-icon>
											</el-button>
										</el-input>
									</div>
									<div class="input-suffix" style="margin-top:6px;">
										<span>{{ $t('tableTitle.org') }}:</span>
										<div class="user_address_input2">{{ detail.fOrgName }}</div>
									</div>
									<div class="input-suffix" style="margin-top:6px;">
										<span>{{ $t('user.address') }}:</span>
										<div class="user_address_input">{{ detail.fAddress }}</div>
									</div>
								</div>
								<div class="right">
									<header>
										{{
											$store.getters.language == 'en'
												? 'Authorized personnel'
												: '授权人员'
										}}
									</header>
									<div class="right-bg">
										<div
											class="right-section"
											v-for="(item, index) in authorisedList"
											:key="item.fUid"
										>
											<div class="right-section-item" style="width:160px;">
												<span style="margin-bottom: 2px;">{{
													item.fUserAlias || $t('user.unknownName')
												}}</span>
												<span>{{ _formatPhone(item.fUin) }}</span>
											</div>
											<!--                    @click="call(item.fUin)"-->
											<div>
												<el-button
													v-if="
														$store.getters.userInfo.resource.indexOf(8) > -1
													"
													:class="[
														'chat-button',
														callPhoneNumber == item.fUin && item.fUin
															? 'active'
															: ''
													]"
													type="success"
												>
													<span
														class="tel_fPhone_call"
														@click="callPhone(_formatPhone(item.fUin))"
													>
														<div
															class="right-btn "
															style="color: #fff;text-decoration: none"
														>
															<svg-icon
																icon-class="call"
																style="color: #fff;text-decoration: none"
															></svg-icon>
															<span style="color: #fff;text-decoration: none"
																>{{
																	callPhoneNumber == item.fUin && item.fUin
																		? 'In call'
																		: 'Call'
																}}
															</span>
														</div>
													</span>
												</el-button>
												<el-button
													v-if="
														$store.getters.userInfo.resource.indexOf(9) > -1
													"
													type="success"
													:class="['chat-button']"
													@click="
														chat({ index: index, data: authorisedList[index] })
													"
												>
													<div class="right-btn" style="color: #fff">
														<svg-icon icon-class="chat"></svg-icon>
														<span style="color: #fff;text-decoration: none">{{
															charIndex == index ? 'In chat' : 'Chat'
														}}</span>
													</div>
												</el-button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="alert-detail-left-bottom left-bottom">
						<div style="width: 640px;margin-right:20px;flex-grow: 1 ">
							<div>
								<alert-info
									v-if="detailVisible"
									:dataInfo="detail"
								></alert-info>
							</div>
							<div>
								<div class="left-bottom-table-header">
									{{
										$store.getters.language == 'zh'
											? '最近5条数据'
											: 'Previous 5 Results'
									}}
								</div>
								<el-table
									ref="table"
									:header-cell-style="tableHeaderColor"
									:cell-style="tableCellColor"
									:data="tableData"
									:height="$store.getters.WindowWidth < 1600 ? 300 : ''"
									show-header
									border
									style="width: 100%;"
								>
									<el-table-column
										:resizable="false"
										prop="hrList"
										:label="$t('others.heartRate')"
										width="95"
									>
										<!--心率数据是hrtype字段，非1时代表警报-->
										<!--血氧数据是warning字段，非0时代表警报-->
										<!--血糖数据是glutype字段，非1时代表警报-->
										<!--定位数据是alertFlag?warning字段，当为1时电子围栏越界；-->
										<!--血压数据是warning字段，非0时代表警报-->

										<template slot-scope="scope">
											<div style="font-size:15px;font-weight: 600">
												<span
													v-if="scope.row.hrList.hrvalue != undefined"
													:style="{
														'flex-grow': 1,
														color:
															scope.row.hrList.hrtype == 1
																? '#39c973'
																: '#FF4848'
													}"
													>{{ scope.row.hrList.hrvalue }} BPM</span
												>
												<span v-else style="font-weight: 500;">—</span>
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
										prop="peList"
										:label="$t('others.steps')"
										width="95"
									>
										<template slot-scope="scope">
											<div
												style="font-size:15px;font-weight: 600;line-height: 16px !important;"
											>
												<!-- 1-正常 2-偏高 3-偏低-->
												<span
													v-if="scope.row.peList.stepcount != undefined"
													:style="{
														'flex-grow': 1,
														color: '#39c973'
													}"
													><span v-if="scope.row.peList.stepcount > 0">
														{{ scope.row.peList.stepcount }}
													</span>
													<span style="color: #bbb;font-size: 12px;" v-else
														>No Step Data</span
													>
												</span>
												<span v-else style="font-weight: 500;">—</span>
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
												style="font-size:15px;font-weight: 600;cursor: pointer"
											>
												<el-tooltip
													v-if="scope.row.posList.warning != undefined"
													class="item"
													effect="dark"
													:content="scope.row.posList.location"
													placement="top"
												>
													<!--todo-->
													<span
														:style="{
															'flex-grow': 1,
															color:
																scope.row.posList.warning != 1
																	? '#39c973'
																	: '#FF4848'
														}"
														>{{
															scope.row.posList.warning != 1
																? 'Normal'
																: 'Out of fence'
														}}</span
													>
												</el-tooltip>

												<span v-else style="font-weight: 500;">—</span>
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
										width="100"
										:label="$t('others.sleepTime')"
									>
										<template slot-scope="scope">
											<div
												style="font-size:15px;font-weight: 600;line-height: 16px !important;"
											>
												<span
													v-if="scope.row.slList.sleeptimes != undefined"
													:style="{
														'flex-grow': 1,
														color: '#39c973'
													}"
												>
													<span v-if="scope.row.slList.sleeptimes > 0">
														{{
															(scope.row.slList.sleeptimes / 60).toFixed(1) +
																'Hours'
														}}
													</span>
													<span
														style="color: #bbb;font-size: 12px;line-height: 14px !important;"
														v-else
														>No Sleep Data</span
													>
												</span>
												<span v-else style="font-weight: 500;">—</span>
											</div>
											<div
												style="font-size: 12px;line-height: 1.5;"
												v-if="scope.row.slList.measuredate"
												v-html="scope.row.slList.measuredate"
											></div>
										</template>
									</el-table-column>
									<el-table-column
										:resizable="false"
										prop="bpList"
										width="130"
										:label="$t('others.bloodPressure')"
									>
										<template slot-scope="scope">
											<div style="font-size:15px;font-weight: 600">
												<span
													v-if="scope.row.bpList.dbp != undefined"
													style="display: flex;justify-content: center;"
												>
													<span
														:style="{
															color: !scope.row.bpList.warning
																? '#39c973'
																: '#FF4848'
														}"
														>{{
															scope.row.bpList.sbp + '/' + scope.row.bpList.dbp
														}}</span
													>
													<span v-if="scope.row.bpList.hr != undefined"
														>,hr{{ scope.row.bpList.hr }}</span
													>
												</span>

												<span v-else style="font-weight: 500;">—</span>
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
										prop="spo2List"
										width="130"
										:label="$t('others.bloodOxygen')"
									>
										<template slot-scope="scope">
											<div style="font-size:15px;font-weight: 600">
												<span
													v-if="scope.row.spo2List.oxygen != undefined"
													style="display: flex;justify-content: center"
												>
													<span
														:style="{
															color: !scope.row.spo2List.warning
																? '#39c973'
																: '#FF4848'
														}"
														>{{ scope.row.spo2List.oxygen }}%</span
													>
													<span v-if="scope.row.spo2List.heartrate != undefined"
														>,hr{{ scope.row.spo2List.heartrate }}</span
													>
												</span>
												<span v-else style="font-weight: 500;">—</span>
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
										prop="bsList"
										:label="$t('others.bloodGlucose')"
										width="100"
									>
										<template slot-scope="scope">
											<div style="font-size:15px;font-weight: 600">
												<span
													v-if="scope.row.bsList.gluvalue"
													style="display: flex;justify-content: center"
												>
													<span
														:style="{
															color:
																scope.row.bsList.glutype == 1
																	? '#39c973'
																	: '#FF4848'
														}"
														>{{
															Math.floor(scope.row.bsList.gluvalue * 10) / 10
														}}mmol/L</span
													>
													<span v-if="scope.row.bsList.hr != undefined"
														>,hr{{ scope.row.bsList.hr }}</span
													>
												</span>
												<span v-else style="font-weight: 500;">—</span>
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
										prop="wthList"
										:label="$t('tableTitle.bodyWeight')"
										width="100"
									>
										<template slot-scope="scope">
											<div style="font-size:15px;font-weight: 600">
												<span
													v-if="scope.row.wthList.weight"
													style="display: flex;justify-content: center"
												>
													<span
														v-if="$store.getters.language == 'zh'"
														style="color:#39c973"
														>{{ scope.row.wthList.weight.toFixed(1) }} kg</span
													>
													<span v-else style="color:#39c973"
														>{{
															(scope.row.wthList.weight * 2.2046226).toFixed(1)
														}}
														lb</span
													>
												</span>
												<span v-else style="font-weight: 500;">—</span>
											</div>
											<div
												style="font-size: 12px;line-height: 1.5;"
												v-if="scope.row.wthList.measuredate"
												v-html="scope.row.wthList.measuredate"
											></div>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</div>

						<div
							v-if="$store.getters.userInfo.resource.indexOf(10) > -1"
							class="left-b-action"
						>
							<div class="action-status-bg">
								<h1 class="section-title">{{ $t('alerts.AlertStatus') }}</h1>
								<template>
									<el-select
										v-model="fStatus"
										:placeholder="
											$store.getters.language == 'zh'
												? '选择状态'
												: 'Select status'
										"
									>
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
								<h1 class="section-title">{{ $t('alerts.ActionsTaken') }}</h1>
								<div style="margin:0 15px 10px;">
									<el-input
										type="textarea"
										:rows="2"
										:placeholder="
											$store.getters.language == 'zh'
												? '备注信息'
												: 'Enter Notes Here'
										"
										v-model="fContent"
										:autosize="{ minRows: 3, maxRows: 6 }"
									></el-input>
								</div>
							</div>
							<el-button
								style="width: 120px;margin: 20px auto"
								@click="alertStatusHandle"
								type="primary"
								>{{ $t('action.save') }}</el-button
							>
						</div>
					</div>
				</div>
				<div class="detail-content-right">
					<Chat
						v-if="detailVisible && charIndex >= 0"
						:userInfo="chatInfo || ''"
					></Chat>
				</div>
			</div>
			<phone-call ref="phoneCall" @close="callPhoneNumber = ''"></phone-call>
		</div>
	</el-dialog>
</template>

<script>
import mixin from '@/views/mixin';
import { sortBy, formatPhone } from '@/utils/validate';
import {
	getDevicesBinders,
	getAlertBasicInfo,
	alertStatusHandle
} from '@/api/devices';
import { formatDateToStr } from '@/utils/validate';
const AlertInfo = () => import('@/components/Alerts/AlertInfo.vue');
const Chat = () => import('@/components/Chat');
export default {
	name: 'alertDetail',
	mixins: [mixin],
	components: { Chat, AlertInfo },
	props: {
		detail: Object
	},
	data() {
		return {
			callPhoneNumber: '',
			scaleDeatilStyle: {},
			detailVisible: false,
			authorisedList: [],
			tableData: [],
			chatInfo: '',
			charIndex: -1,
			fStatus: this.detail.fAlertStaus,
			fContent: '',
			// 1-open; 2-skip; 3-follow; 4-completed
			options: []
		};
	},
	watch: {
		detailVisible() {
			if (this.detailVisible) {
				this.authorisedList = [];
				this.tableData = [];
				this.charIndex = -1;
				this.options = [
					{
						label: this.$store.getters.language == 'zh' ? '开启' : 'open',
						value: 1
					},
					{
						label: this.$store.getters.language == 'zh' ? '跳过' : 'Skip',
						value: 2
					},
					{
						label: this.$store.getters.language == 'zh' ? '跟进' : 'Follow up',
						value: 3
					},
					{
						label: this.$store.getters.language == 'zh' ? '完成' : 'completed',
						value: 4
					}
				];
				setTimeout(() => {
					this.fStatus = this.detail.fAlertStaus;
					this._getDevicesBinders();
					this._getAlertBasicInfo();
				}, 100);
			}
		}
	},
	mounted() {
		if (document.documentElement.clientWidth < 1600) {
			this.scaleDeatilStyle = {
				transform: 'scale(0.95)',
				'-ms-transform': 'scale(0.95)',
				'-moz-transform': 'scale(0.95)',
				'-webkit-transform': 'scale(0.95)',
				'-o-transform': 'scale(0.95)',
				'transform-origin': '0 0',
				'-ms-transform-origin': '0 0',
				'-moz-transform-origin': '0 0',
				'-webkit-transform-origin': '0 0',
				'-o-transform-origin': '0 0'
			};
		}
		// transform: scale(0.96);
		// transform-origin: 0 0;
	},
	methods: {
		detailClose() {
			this.fContent = '';
			this.fContent = '';
		},
		deviceDetails() {
			this.$router.push({
				name: 'DevicesSearch',
				params: { search: this.detail.fDeviceImei + '=Alerts=' }
			});
			this.detailVisible = false;
		},
		callPhone(phone) {
			if (!this.$refs.phoneCall.isHangUp) {
				this.$alert(
					this.$store.getters.language == 'zh'
						? '还有通话进行中'
						: 'There are calls in progress',
					this.$store.getters.language == 'zh' ? '提示' : 'Prompt',
					{
						type: 'error'
					}
				);
				return;
			}
			if (phone) {
				this.callPhoneNumber = phone;
				this.$refs.phoneCall.phone = phone;
				this.$refs.phoneCall.callDisplay = true;
			}
		},
		chat({ index, data }) {
			console.log(this.charIndex == index);
			if (this.charIndex == index) {
				this.charIndex = -1;
			} else {
				this.charIndex = index;
				this.chatInfo = {
					userId: data.fUid,
					phone: this._formatPhone(data.fUin),
					userName: data.fUserAlias,
					Did: this.detail.fDid,
					isAdmin: 1
				};
			}
			// 滚动到最右边
			setTimeout(() => {
				document.querySelector('.yn-alert-detail').scrollLeft = 2000;
			}, 500);
		},
		tableCellColor() {
			return 'color: #666;text-align: center;padding:2px !important';
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
				target: document.querySelector('.alert-detail-left-bottom'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getAlertBasicInfo({ did: this.detail.fDid })
				.then((data) => {
					data.peList = data.peList.sort(sortBy('measuredate')).reverse();
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
						obj.wthList = data.wthList[i] || {};

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
							item.posList.measuredate * 1000
						);
						item.slList.measuredate = this._formatDate(
							item.slList.measuredate * 1000,
							'MMDD'
						);
						item.spo2List.measuredate = this._formatDate(
							item.spo2List.measuredate * 1000
						);
						item.wthList.measuredate = this._formatDate(
							item.wthList.measuredate * 1000
						);
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
		_formatDate(timestamp, type = 'MMDDHHmm') {
			return timestamp
				? formatDateToStr(timestamp, this.$store.getters.language, type, true)
				: '';
		},
		_formatPhone(phone) {
			return formatPhone(phone);
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
		margin-bottom: 15px;
		padding-right: 30px;
		.svg-icon {
			margin-right: 10px;
		}
	}
	.detail-content {
		@include flex-b-c;
		align-items: flex-start;
		.detail-content-left {
			cursor: pointer;
			flex-shrink: 0;
			max-width: 1000px;
			.left-top {
				height: 200px;
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
			flex-shrink: 0;
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

	.input-suffix {
		@include flex-s-c;
		justify-content: space-between;

		& > span {
			flex-grow: 0;
			flex-shrink: 0;
			width: 74px;
			margin-right: 8px;
			text-align: right;
		}
		.user_address_input {
			width: 200px;
			min-height: 35px;
			border: 1px solid #bbb;
			border-radius: 4px;
			padding: 5px 10px;
			font-size: 14px;
		}
		.user_address_input2 {
			width: 200px;
			height: 28px;
			border: 1px solid #bbb;
			border-radius: 4px;
			padding: 5px 10px;
			font-size: 14px;
		}
	}
	.artical {
		height: 100%;
		flex-grow: 1;
		header {
			font-size: 14px;
			font-weight: 600;
			color: $title-fontColor;
			padding-bottom: 15px;
			width: 100%;
		}
		@include flex-s-c;
		padding-bottom: 15px;
		.left {
			height: 100%;
			width: 280px;
			@include flex-c-c-c;
			justify-content: flex-start;
		}
		.right {
			height: 100%;
			margin-left: 20px;
			flex-grow: 1;
			header {
				font-size: 14px;
				font-weight: 600;
				color: $title-fontColor;
			}
			.right-bg {
				border: 1px solid #aaa;
				height: 138px;
				overflow-y: scroll;
			}
			.right-section {
				@include flex-c-c;
				justify-content: space-between;
				background-color: #eeeeee;
				padding: 4px;
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
			.chat-button.active {
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
	width: 250px;
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
	.tel_fPhone_call:active {
		color: #fff;
		text-decoration: none;
	}
	.call-button:active {
		background-color: $alertColor !important;
		border-color: $alertColor !important;
	}
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
.input-suffix {
	.el-input__inner {
		height: 28px;
		line-height: 28px;
	}
}
.input-suffix-padding {
	.el-input__inner {
		padding: 0 5px !important;
		text-align: center;
		height: 28px;
		line-height: 28px;
	}
}
</style>
