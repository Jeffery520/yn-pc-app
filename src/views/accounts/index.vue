<template>
	<div id="devices">
		<header class="table-header-tools">
			<el-button
				v-if="$store.getters.userInfo.resource.indexOf(16) > -1"
				@click="$refs.AddOrg.addOrgVisible = true"
				type="primary"
				>+ {{ $t('action.add') }}</el-button
			>
			<div style="width: 620px;">
				<el-input
					:placeholder="
						$t('notice.searchTipsStart') +
							' ' +
							$t('tableTitle.orgName') +
							' ' +
							$t('notice.searchTipsEnd')
					"
					v-model="search"
					@keyup.enter.native="searchUser"
				>
					<el-button slot="append" @click="searchUser">{{
						$t('action.search')
					}}</el-button>
				</el-input>
			</div>
		</header>
		<main>
			<el-table
				ref="table"
				:cell-style="_tableCellColor"
				:header-cell-style="_tableHeaderColor"
				:row-class-name="_tabRowClassName"
				highlight-current-row
				:data="tableData"
				row-key="orgId"
				height="70vh"
				border
				style="width: 100%"
				lazy
				:load="load"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column
					:resizable="false"
					width="80"
					:label="$t('tableTitle.no')"
				>
					<template slot-scope="scope">
						<span>
							{{ parseInt(pageSize * (currentPage - 1) + scope.$index + 1) }}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="simpleName"
					width="160"
					:label="$t('tableTitle.orgName')"
				>
					<template slot-scope="scope">
						<span
							v-if="scope.row.grade == 2"
							style="font-size: 16px;cursor: pointer"
							>{{ scope.row.simpleName }}</span
						>
						<span v-else>{{ scope.row.simpleName }}</span>
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					prop="orgId"
					width="100"
					:label="$t('tableTitle.orgID')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="grade"
					:label="$t('tableTitle.subOrg')"
					width="100"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="address"
					:label="$t('user.address')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="devNum"
					width="100"
					:label="$t('tableTitle.noOfDevices')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="contact"
					width="160"
					:label="$store.getters.language == 'en' ? 'Contact' : '联系人'"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="phone"
					:label="$t('user.phone')"
				>
					<template slot-scope="scope">
						<span
							@click="
								$store.getters.userInfo.resource.indexOf(8) > -1
									? callPhone(scope.row.phone)
									: ''
							"
							>{{ scope.row.phone }}</span
						>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="email"
					:label="$t('user.email')"
				>
					<template slot-scope="scope">
						<a :href="'mailto:' + scope.row.email">{{ scope.row.email }}</a>
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					width="130"
					prop="minAdminList"
					:label="$t('tableTitle.accountID')"
				>
					<template slot-scope="scope">
						<el-dropdown @command="selectUser">
							<span>
								<span
									v-if="
										scope.row.minAdminList &&
											scope.row.minAdminList.length > 0 &&
											scope.row.minAdminList[0].administrator
									"
									>{{ scope.row.minAdminList[0].administrator }}</span
								>
								<span v-else style="color: #aaa;">—</span>
								<i
									v-if="
										scope.row.minAdminList &&
											scope.row.minAdminList.length > 0 &&
											scope.row.minAdminList[0].administrator
									"
									class="el-icon-arrow-right"
								></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item
									v-for="item in scope.row.minAdminList"
									:key="item.administrator"
									:command="item.administrator"
								>
									<span v-if="item.administrator">
										{{ item.administrator }}
									</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>

				<!-- 分配设备 -->
				<el-table-column
					v-if="$store.getters.userInfo.resource.indexOf(17) > -1"
					:resizable="false"
					prop="address2"
					:label="$t('route.devices')"
					width="80"
					fixed="right"
				>
					<template
						slot-scope="scope"
						v-if="scope.row.grade == tableData[0].grade"
					>
						<i
							@click.stop="allocateDevices(scope)"
							style="padding:10px;"
							class="el-icon-circle-plus-outline"
						></i>
					</template>
				</el-table-column>

				<el-table-column
					v-if="$store.getters.userInfo.resource.indexOf(18) > -1"
					:resizable="false"
					:label="$t('action.settings')"
					width="80"
					fixed="right"
				>
					<template
						slot-scope="scope"
						v-if="scope.row.grade == tableData[0].grade"
					>
						<i
							@click.stop="openSettings(scope)"
							style="padding:10px;"
							class="el-icon-setting"
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
		<add-org ref="AddOrg" @change="addAccountChange"></add-org>
		<org-settings ref="OrgSettings" @change="addAccountChange"></org-settings>

		<allocate-devices
			ref="AllocateDevices"
			@change="addAccountChange"
		></allocate-devices>
		<phone-call ref="phoneCall"></phone-call>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import eventBus from '@/utils/eventBus.js';
import { _debounce } from '@/utils/validate';
import { getAccountList, getTheOrgChild } from '@/api/account';
import Pagination from '@/components/Pagination/index.vue';
const AddOrg = () => import('@/components/Account/AddOrg.vue');
const AllocateDevices = () =>
	import('@/components/Account/AllocateDevices.vue');
const OrgSettings = () => import('@/components/Account/OrgSettings.vue');

export default {
	name: 'Organization',
	mixins: [mixin],
	components: { AddOrg, Pagination, OrgSettings, AllocateDevices },
	data() {
		return {
			fOrgId: this.$store.getters.userInfo.fOrgId, // 本账号的机构id
			search: '',
			pageSize: 10,
			currentPage: 1,
			rowIndex: 0,
			tableData: []
		};
	},
	created() {
		// 更新父组件数据
		eventBus.$on('updateAccount', () => {
			this._getAccountList();
		});
	},
	mounted() {
		this.search = this.$route.params.search || '';
		this.currentPage = 1;
		this._getAccountList();
	},
	beforeDestroy() {
		eventBus.$off('updateAccount');
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
		searchUser: _debounce(function() {
			if (this.$route.params.search) {
				this.$router.replace({
					name: 'SubOrgSearch',
					params: { search: this.search }
				});
			} else {
				this.$router.push({
					name: 'SubOrgSearch',
					params: { search: this.search }
				});
			}
			this.search = '';
			// this.currentPage = 1;
			// this._getAccountList();
		}),
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			this._getAccountList();
		},
		// 选择用户
		selectUser() {
			console.log('select a User');
		},
		allocateDevices({ row }) {
			this.$refs.table.setCurrentRow(row);
			this.$refs.AllocateDevices.orgId = row.orgId;
			this.$refs.AllocateDevices.allocateDevicesVisible = true;
		},
		openSettings({ row, $index }) {
			this.$refs.table.setCurrentRow(row);
			this.rowIndex = $index;
			this.$refs.OrgSettings.orgformData = row;
			this.$refs.OrgSettings.OrgSettingsVisible = true;
		},
		load(tree, treeNode, resolve) {
			this._getTheOrgChild(tree.orgId).then((list) => {
				resolve(list);
			});
		},
		addAccountChange() {
			this.currentPage = 1;
			this._getAccountList();
		},
		_getTheOrgChild(orgId) {
			return new Promise((resolve, reject) => {
				getTheOrgChild({ orgId })
					.then((data) => {
						const tableList = data.map((item) => {
							item.hasChildren = item.children ? true : false;
							return item;
						});
						resolve(tableList);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
		_getAccountList() {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});

			getAccountList({ page: this.currentPage, search: this.search })
				.then((data) => {
					this.loading.close();
					let { total, pageNum, pageSize, list } = data;
					this.pageSize = pageSize;
					if (this.$refs.Pagination) {
						this.$refs.Pagination.currentPage = pageNum;
						this.$refs.Pagination.pageSize = pageSize;
						this.$refs.Pagination.total = total;
					}

					this.tableData = list.map((item) => {
						item.hasChildren = item.children ? true : false;
						return item;
					});
					if (this.tableData.length > 0) {
						this.$refs.OrgSettings.orgformData = this.tableData[this.rowIndex];
					}
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 7 || columnIndex === 8) {
				// 蓝色字体
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			} else if (columnIndex === 10 || columnIndex === 11) {
				// 图标
				return 'color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;';
			}
			return 'color: #666666;text-align: center;';
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
			@include flex-c-c;
		}
	}
}
</style>
<style lang="scss"></style>
