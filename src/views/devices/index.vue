<template>
	<div id="devices">
		<header class="table-header-tools">
			<div class="d-header-title">
				<span>{{ $t('devices.tableTitle') }}</span>
				<span>{{ total }}</span>
			</div>
			<div style="width: 620px;">
				<el-input
					:placeholder="
						$t('notice.searchTipsStart') +
							' ' +
							$t('user.userName') +
							' / ' +
							$t('user.phoneNumber') +
							' / ' +
							$t('tableTitle.IMEI') +
							' ' +
							$t('notice.searchTipsEnd')
					"
					v-model="search"
					@keyup.enter.native="searchDevices"
				>
					<el-button slot="append" @click="searchDevices">{{
						$t('action.search')
					}}</el-button>
				</el-input>
			</div>
		</header>
		<main>
			<el-table
				ref="table"
				highlight-current-row
				:header-cell-style="_tableHeaderColor"
				:cell-style="_tableCellColor"
				:row-class-name="_tabRowClassName"
				:data="tableData"
				height="70vh"
				border
				style="width: 100%;"
			>
				<el-table-column
					:resizable="false"
					:label="$t('tableTitle.no')"
					width="80"
				>
					<template slot-scope="scope">
						<span>{{
							parseInt(pageSize * (currentPage - 1) + scope.$index + 1)
						}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="fOrgName"
					:label="$t('tableTitle.org')"
					width="120"
				></el-table-column>

				<el-table-column
					:resizable="false"
					prop="fFullname"
					:label="$t('user.userName')"
					width="120"
				>
					<template slot-scope="scope">
						<el-popover
							placement="right"
							trigger="hover"
							popper-class="user-photo-popover"
						>
							<div slot="reference">
								<span v-if="scope.row.fFullname">{{
									scope.row.fFullname
								}}</span>
								<span v-else style="color: #bbb;">{{
									$t('user.unknownName')
								}}</span>
							</div>
							<el-avatar
								class="user-photo"
								:size="100"
								:src="scope.row.fHead"
							></el-avatar>
						</el-popover>
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					prop="fDeviceType"
					:label="$t('tableTitle.modelNo')"
				>
					<template slot-scope="scope">
						<span>
							{{
								scope.row.fDeviceType == 1
									? 'T9'
									: scope.row.fDeviceType == 4097
									? 'T9S'
									: scope.row.fDeviceType == 4098
									? 'R02'
									: scope.row.fDeviceType == 4099
									? 'R03'
									: scope.row.fDeviceType == 4100
									? 'R02T'
									: '—'
							}}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="fPhone"
					:label="$t('user.phoneNumber')"
					width="114"
				>
					<template slot-scope="scope">
						<span
							@click="
								$store.getters.userInfo.resource.indexOf(8) > -1
									? callPhone(scope.row.fPhone)
									: ''
							"
							>{{ scope.row.fPhone }}</span
						>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="fAddress"
					width="180"
					:label="$t('user.address')"
				></el-table-column>

				<el-table-column
					:resizable="false"
					prop="fDeviceImei"
					:label="$t('tableTitle.IMEI')"
					width="160"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="fDeviceImsi"
					width="160"
					:label="$t('tableTitle.IMSI')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="fSaveTime"
					:label="$t('tableTitle.lastReportedTime')"
					width="120"
				></el-table-column>
				<el-table-column
					:resizable="false"
					width="130"
					prop="subServiceList"
					:label="$t('tableTitle.subscription')"
				>
					<template slot-scope="scope">
						<el-dropdown @command="selectUser">
							<span class="el-dropdown-link">
								<span
									v-if="
										scope.row.subServiceList.length > 0 &&
											scope.row.subServiceList[0].name
									"
									>{{ scope.row.subServiceList[0].name }}</span
								>
								<span v-else style="color: #aaa;">—</span>
								<i
									v-if="scope.row.subServiceList.length > 0"
									class="el-icon-arrow-right"
								></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item
									v-for="item in scope.row.subServiceList"
									:key="item.name"
									:command="item.serviceId"
								>
									<span v-if="item.name">{{ item.name }}</span>
									<span v-else style="color: #aaa;">—</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="bindUserList"
					:label="$t('tableTitle.authorisedPersonnels')"
					width="110"
				>
					<template slot-scope="scope">
						<el-dropdown @command="selectUser">
							<span class="el-dropdown-link">
								<span
									v-if="
										scope.row.bindUserList.length > 0 &&
											scope.row.bindUserList[0].fUserAlias
									"
									>{{ scope.row.bindUserList[0].fUserAlias }}</span
								>
								<span v-else style="color: #aaa;">—</span>
								<i class="el-icon-arrow-right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item
									v-for="item in scope.row.bindUserList"
									:key="item.fUid"
									:command="item.fUid"
								>
									<span v-if="item.fUserAlias">{{ item.fUserAlias }}</span>
									<span v-else style="color: #aaa;">—</span>
								</el-dropdown-item>
								<!--								<el-dropdown-item-->
								<!--									:command="scope.row"-->
								<!--									icon="el-icon-plus"-->
								<!--									divided-->
								<!--									>Add a new one</el-dropdown-item-->
								<!--								>-->
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
				<el-table-column
					v-if="$store.getters.userInfo.resource.indexOf(6) > -1"
					:resizable="false"
					:label="$t('action.messages')"
					width="90"
					fixed="right"
				>
					<template slot-scope="scope">
						<i
							@click.stop="openMseeages(scope)"
							style="padding:10px; "
							class="el-icon-message"
						></i>
					</template>
				</el-table-column>
				<el-table-column
					v-if="$store.getters.userInfo.resource.indexOf(2) > -1"
					:resizable="false"
					:label="$t('route.alerts')"
					width="80"
					fixed="right"
				>
					<template slot-scope="scope">
						<i
							@click.stop="showAlertInfo(scope)"
							style="padding:10px;"
							class="el-icon-bell"
						></i>
					</template>
				</el-table-column>
				<el-table-column
					v-if="
						$store.getters.userInfo.resource.indexOf(11) > -1 ||
							$store.getters.userInfo.resource.indexOf(12) > -1
					"
					:resizable="false"
					:label="$t('action.settings')"
					width="80"
					fixed="right"
				>
					<template slot-scope="scope">
						<i
							@click.stop="openSettings(scope)"
							style="padding:10px;"
							class="el-icon-setting"
						></i>
					</template>
				</el-table-column>
				<el-table-column
					v-if="$store.getters.userInfo.resource.indexOf(13) > -1"
					:resizable="false"
					:label="$t('route.statistics')"
					width="90"
					fixed="right"
				>
					<template slot-scope="scope">
						<i
							@click="
								$router.push({
									name: 'DeviceData',
									params: { id: scope.row.fDid }
								})
							"
							style="padding:10px;"
							class="el-icon-arrow-right"
						></i>
					</template>
				</el-table-column>
			</el-table>
			<Pagination
				ref="Pagination"
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</main>
		<!-- 新增用户-->
		<AddUser ref="AddUser" @saveNewUser="saveNewUser"></AddUser>
		<!--		&lt;!&ndash;message 弹窗&ndash;&gt;-->
		<!--		<Message ref="Message"></Message>-->
		<!--settings 弹窗-->
		<Settings ref="Settings"></Settings>
		<phone-call ref="phoneCall"></phone-call>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import Pagination from '@/components/Pagination/index.vue';
const AddUser = () => import('@/components/Devices/AddUser.vue');
const Settings = () => import('@/components/Devices/Settings.vue');

import { getDevicesList } from '@/api/devices';
import { _debounce, formatDateToStr } from '@/utils/validate';
export default {
	name: 'Devices',
	mixins: [mixin],
	components: {
		AddUser,
		Pagination,
		Settings
	},
	data() {
		return {
			search: '',
			pageSize: 10,
			currentPage: 1,
			total: 0,
			tableData: [],
			currentInfo: {},
			currentDetail: {}
		};
	},
	mounted() {
		this.search = this.$route.params.search || '';
		this._getDevicesList(1, this.search);
	},
	beforeRouteLeave(to, from, next) {
		if (
			to.name != 'DeviceData' &&
			to.name != 'DeviceDataAlerts' &&
			to.name != 'DeviceMessage'
		) {
			this.$destroy(); //销毁B的实例
			next(); //当我们前进的不是C时我们让B页面刷新
		} else {
			next();
		}
	},
	methods: {
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
				this.$refs.phoneCall.phone = phone;
				this.$refs.phoneCall.callDisplay = true;
			}
		},
		searchDevices: _debounce(function() {
			if (this.$route.params.search) {
				this.$router.replace({
					name: 'DevicesSearch',
					params: { search: this.search }
				});
			} else {
				this.$router.push({
					name: 'DevicesSearch',
					params: { search: this.search }
				});
			}
			this.search = '';
			// this.currentPage = 1;
			// this._getDevicesList(this.currentPage, this.search);
		}),
		// 显示alerts信息弹窗
		showAlertInfo: _debounce(function({ row }) {
			this.$refs.table.setCurrentRow(row);
			this.$router.push({
				name: 'DeviceDataAlerts',
				params: { id: row.fDid }
			});
		}),
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			this._getDevicesList(page, this.search);
		},
		// 选择用户
		selectUser(command) {
			if (typeof command === 'object') {
				this.addNewUser();
			} else {
				console.log('select a User');
			}
		},
		// 新增用户
		saveNewUser() {
			this.$refs.AddUser.addUserVisible = true;
		},
		// 打开新增用户弹窗
		addNewUser() {
			this.$refs.AddUser.addUserVisible = true;
		},
		openMseeages({ row }) {
			this.$refs.table.setCurrentRow(row);
			// this.$refs.Message.messageVisible = true;
			// this.$refs.Message.messageInfo = row;
			this.$router.push({
				name: 'DeviceMessage',
				params: { id: row.fDid }
			});
		},
		openSettings({ row }) {
			this.$refs.table.setCurrentRow(row);
			this.$refs.Settings.settingsInfo = row;
			this.$refs.Settings.settingsVisible = true;
		},
		_getDevicesList(page, search) {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getDevicesList({ page: page, search: search })
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.pageSize = pageSize;
					this.total = total;
					this.tableData = list.map((item) => {
						let date = '';
						if (item.fSaveTime) {
							if (!isNaN(item.fSaveTime)) {
								date = formatDateToStr(
									item.fSaveTime * 1000,
									this.$store.getters.language
								);
							} else {
								date = formatDateToStr(
									item.fSaveTime,
									this.$store.getters.language
								);
							}
							item.fSaveTime = date;
						} else {
							item.fSaveTime = '';
						}

						return item;
					});
					if (this.$refs.Pagination) {
						this.$refs.Pagination.currentPage = pageNum;
						this.$refs.Pagination.pageSize = pageSize;
						this.$refs.Pagination.total = total;
					}

					this.loading.close();
				})
				.catch((error) => {
					this.loading.close();
					this.$message({
						showClose: true,
						message:
							error.message || `Request failed with status code${error.status}`,
						type: 'error'
					});
				});
		},
		// 重置表单样式
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 4) {
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			} else if (
				columnIndex === 11 ||
				columnIndex === 12 ||
				columnIndex === 13
			) {
				// 图标
				return 'color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;';
			} else if (columnIndex === 14) {
				// 箭头
				return 'color: #cccccc;text-align: center;cursor: pointer;font-size:24px;';
			}
			return 'color: #666666;text-align: center;position: relative;';
		}
	}
};
</script>
<style scoped lang="scss">
@import '@/style/mixin.scss';
#devices {
	@include table-bg;

	main {
		.el-dropdown-link {
			width: 70px;
			& > span {
				flex-grow: 1;
			}
			@include flex-c-c;
		}
	}
}
</style>
<style lang="scss"></style>
