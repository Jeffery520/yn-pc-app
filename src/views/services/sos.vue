<template>
	<div id="devices">
		<!--		<header class="table-header-tools">-->
		<!--			<span></span>-->
		<!--			<div style="width: 620px;">-->
		<!--				<el-input-->
		<!--					:placeholder="-->
		<!--						$t('notice.searchTipsStart') +-->
		<!--							' ' +-->
		<!--							$t('user.userName') +-->
		<!--							' / ' +-->
		<!--							$t('user.phoneNumber') +-->
		<!--							' / ' +-->
		<!--							$t('tableTitle.IMEI') +-->
		<!--							' ' +-->
		<!--							$t('notice.searchTipsEnd')-->
		<!--					"-->
		<!--					v-model="search"-->
		<!--					@keyup.enter.native="searchDevices"-->
		<!--					@blur="searchDevices"-->
		<!--				>-->
		<!--					<el-button slot="append" @click="searchDevices">{{-->
		<!--						$t('action.search')-->
		<!--					}}</el-button>-->
		<!--				</el-input>-->
		<!--			</div>-->
		<!--		</header>-->
		<div class="d-header-filter">
			<span style="font-weight: 600;">筛选:</span>
			<div class="filter-item" style="margin-left:40px">
				<!--  用户类型 0-系统，1-app, 4-web管理用户-->
				<el-checkbox-group v-model="filterType" @change="filterTypeChange">
					<el-checkbox label="">{{ $t('action.all') }}</el-checkbox>
					<el-checkbox label="0">{{
						language == 'zh' ? '审核中' : 'Under Review'
					}}</el-checkbox>
					<el-checkbox label="1">{{
						language == 'zh' ? '已完成' : 'Completed'
					}}</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>

		<main>
			<el-table
				ref="table"
				highlight-current-row
				:header-cell-style="_tableHeaderColor"
				:cell-style="_tableCellColor"
				:row-class-name="_tabRowClassName"
				:data="tableData"
				height="65vh"
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
								<span v-else style="color: #aaa;">—</span>
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
					prop="fPhone"
					label="身份证号"
				></el-table-column>

				<el-table-column
					:resizable="false"
					prop="fAddress"
					:label="$t('user.address')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="fPhone"
					:label="$t('user.phoneNumber')"
					width="200"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="fDeviceImei"
					label="开通日期"
					width="200"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="fDeviceImei"
					label="结束日期"
					width="200"
				></el-table-column>

				<el-table-column
					:resizable="false"
					prop="fPhone"
					label="服务状态"
					width="160 "
				></el-table-column>

				<el-table-column
					:resizable="false"
					label="处理"
					width="80"
					fixed="right"
				>
					<template slot-scope="scope">
						<el-button type="text" @click="showDetailEdit(scope)"
							>编辑</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<Pagination
				ref="Pagination"
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</main>
		<rescue-details ref="RescueDetails"></rescue-details>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import Pagination from '@/components/Pagination/index.vue';
import RescueDetails from '@/components/Service/rescueDetails.vue';

import { getDevicesList } from '@/api/devices';
import { _debounce, formatDateToStr } from '@/utils/validate';
export default {
	name: 'EmergencyRescue',
	mixins: [mixin],
	components: {
		Pagination,
		RescueDetails
	},
	data() {
		return {
			filterType: [''],
			search: '',
			pageSize: 10,
			currentPage: 1,
			total: 0,
			language: this.$store.getters.language,
			tableData: [],
			currentInfo: {},
			currentDetail: {}
		};
	},
	mounted() {
		this._getDevicesList(1, '');
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
		filterTypeChange: _debounce(function(value) {
			// 去掉空项
			if (value[value.length - 1]) {
				if (value.indexOf('') >= 0) {
					value.splice(value.indexOf(''), 1);
				}
				this.filterType = value;
			} else {
				this.filterType = [''];
			}

			if (this.$route.params.id) {
				this._getDevicesMsgList();
			} else {
				this._getMsgList();
			}
		}),
		showDetailEdit({ row }) {
			this.$refs.RescueDetails.rescueDetailsVisible = true;
			this.$refs.RescueDetails.form = row;
		},
		searchDevices() {
			this._getDevicesList(1, this.search);
		},
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
			if (columnIndex === 3 || columnIndex === 5 || columnIndex === 6) {
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
			return 'color: #666666;text-align: center;cursor: pointer;position: relative;';
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
