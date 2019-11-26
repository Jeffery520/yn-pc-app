<template>
	<div id="devices">
		<header>
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
					@blur="searchDevices"
				>
					<el-button slot="append" @click="searchDevices">{{
						$t('action.search')
					}}</el-button>
				</el-input>
			</div>
		</header>
		<main>
			<el-table
				:header-cell-style="_tableHeaderColor"
				:cell-style="_tableCellColor"
				:row-class-name="_tabRowClassName"
				:data="tableData"
				height="65vh"
				border
				style="width: 100%"
			>
				<el-table-column
					type="index"
					width="50"
					:label="$t('tableTitle.no')"
				></el-table-column>
				<el-table-column prop="fFullname" :label="$t('user.userName')">
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
								<span v-else style="color: #aaa;">--</span>
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
					prop="fPhone"
					:label="$t('user.phoneNumber')"
					width="114"
				></el-table-column>
				<el-table-column
					prop="fAddress"
					:label="$t('user.address')"
				></el-table-column>
				<el-table-column prop="fDeviceType" :label="$t('tableTitle.modelNo')">
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
									: '--'
							}}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="fOrgName"
					:label="$t('tableTitle.org')"
				></el-table-column>
				<el-table-column
					prop="fDeviceImei"
					:label="$t('tableTitle.IMEI')"
				></el-table-column>
				<el-table-column
					prop="fDeviceImsi"
					:label="$t('tableTitle.IMSI')"
				></el-table-column>
				<el-table-column
					prop="fSaveTime"
					:label="$t('tableTitle.SIMStatus')"
					width="120"
				></el-table-column>
				<el-table-column
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
								<span v-else style="color: #aaa;">--</span>
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
									<span v-else style="color: #aaa;">--</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
				<el-table-column
					prop="bindUserList"
					:label="$t('tableTitle.authorisedPersonnels')"
					width="100"
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
								<span v-else style="color: #aaa;">--</span>
								<i class="el-icon-arrow-right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item
									v-for="item in scope.row.bindUserList"
									:key="item.fUid"
									:command="item.fUid"
								>
									<span v-if="item.fUserAlias">{{ item.fUserAlias }}</span>
									<span v-else style="color: #aaa;">--</span>
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
					:label="$t('action.messages')"
					width="85"
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
				<el-table-column :label="$t('route.alerts')" width="80" fixed="right">
					<template slot-scope="scope">
						<i
							@click.stop="showAlertInfo(scope)"
							style="padding:10px;"
							class="el-icon-bell"
						></i>
					</template>
				</el-table-column>
				<el-table-column
					prop="address2"
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
				<el-table-column width="80" fixed="right">
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
		<!--message 弹窗-->
		<Message ref="Message"></Message>
		<!--settings 弹窗-->
		<Settings ref="Settings"></Settings>
		<!--简要Info弹窗-->
		<alert-info
			ref="alertInfo"
			@openDetail="openDetail"
			:dataInfo="currentInfo"
		></alert-info>
		<!--Detail弹窗-->
		<alert-detail ref="alertDetail" :detail="currentDetail"></alert-detail>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
const Pagination = () => import('@/components/Pagination/index.vue');
const AddUser = () => import('@/components/Devices/AddUser.vue');
const Message = () => import('@/components/Devices/Message.vue');
const AlertInfo = () => import('@/components/Alerts/AlertInfo.vue');
const AlertDetail = () => import('@/components/Alerts/AlertDetail.vue');
const Settings = () => import('@/components/Devices/Settings.vue');

import { getDevicesList } from '@/api/devices';
import { _debounce, formatDate } from '@/utils/validate';
export default {
	name: 'Devices',
	mixins: [mixin],
	components: {
		AddUser,
		Message,
		AlertInfo,
		AlertDetail,
		Pagination,
		Settings
	},
	data() {
		return {
			search: '',
			currentPage: 0,
			total: 0,
			tableData: [],
			currentInfo: {},
			currentDetail: {}
		};
	},
	mounted() {
		this._getDevicesList(1, '');
	},
	methods: {
		searchDevices() {
			this._getDevicesList(1, this.search);
		},
		// 显示alerts信息弹窗
		showAlertInfo: _debounce(function({ row }) {
			this.$refs.alertInfo.infoVisible = true;
			this.currentInfo = row;
		}),
		// 显示详情弹窗
		showDetailInfo(row) {
			this.$refs.alertDetail.detailVisible = true;
			this.currentDetail = row;
		},
		// 通过AlertInfo组件触发
		openDetail(options) {
			this.showDetailInfo(options);
		},
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
			this.$refs.Message.messageVisible = true;
			this.$refs.Message.messageInfo = row;
		},
		openSettings({ row }) {
			this.$refs.Settings.settingsInfo = row;
			this.$refs.Settings.settingsVisible = true;
		},
		_getDevicesList(page, search) {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, .6)'
			});
			getDevicesList({ page: page, search: search })
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.total = total;
					this.tableData = list.map((item) => {
						let date = '';
						if (item.fSaveTime) {
							if (!isNaN(item.fSaveTime)) {
								date = formatDate(
									item.fSaveTime * 1000,
									this.$store.getters.language
								);
							} else {
								date = formatDate(item.fSaveTime, this.$store.getters.language);
							}
							item.fSaveTime = `${date.ampm} ${date.hour}:${date.minute}, ${date.year}-${date.month}-${date.day}`;
						}
						return item;
					});

					this.$refs.Pagination.currentPage = pageNum;
					this.$refs.Pagination.pageSize = pageSize;
					this.$refs.Pagination.total = total;
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
			if (columnIndex === 1 || columnIndex === 10) {
				// 用户名、sim status
				return 'color: #666666;text-align: center;cursor: pointer;position: relative;';
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
			return 'color: #60b8f7;text-align: center;cursor: pointer;';
		}
	}
};
</script>
<style scoped lang="scss">
@import '@/style/mixin.scss';
#devices {
	@include table-bg;
	header {
		@include flex-b-c;
		flex-wrap: wrap;
		margin-bottom: 25px;
		.d-header-title {
			line-height: 35px;
			color: #fff;
			& > span:first-child {
				display: inline-block;
				padding: 0 20px;
				background-color: $lightColor;
				font-size: 16px;
			}
			& > span:last-child {
				display: inline-block;
				padding: 0 20px;
				background-color: $normalColor;
				font-size: 18px;
				font-weight: 600;
			}
		}
	}
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
