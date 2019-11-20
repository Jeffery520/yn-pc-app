<template>
	<div id="devices">
		<header>
			<el-button @click="$refs.AddOrg.addOrgVisible = true" type="primary"
				>+ {{ $t('action.add') }}</el-button
			>
			<div style="width: 500px;">
				<el-input
					:placeholder="$t('notice.searchTips')"
					v-model="search"
					@keyup.enter.native="searchUser"
					@blur="searchUser"
				>
					<el-button slot="append" @click="searchUser">
						{{ $t('action.search') }}
					</el-button>
				</el-input>
			</div>
		</header>
		<main>
			<el-table
				:cell-style="_tableCellColor"
				:header-cell-style="_tableHeaderColor"
				:row-class-name="_tabRowClassName"
				:data="tableData"
				row-key="orgId"
				border
				style="width: 100%"
				lazy
				:load="load"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column
					prop="orgId"
					:label="$t('tableTitle.orgID')"
				></el-table-column>
				<el-table-column prop="simpleName" :label="$t('tableTitle.orgName')">
				</el-table-column>
				<el-table-column
					prop="devNum"
					:label="$t('tableTitle.subOrg')"
					width="114"
				></el-table-column>
				<el-table-column
					prop="address"
					:label="$t('user.address')"
				></el-table-column>
				<el-table-column
					prop="devNum"
					:label="$t('tableTitle.noOfDevices')"
				></el-table-column>
				<el-table-column
					prop="contact"
					:label="$t('tableTitle.admin')"
				></el-table-column>
				<el-table-column prop="phone" :label="$t('user.phone')">
					<template slot-scope="scope">
						<a href="tel:13163735200">{{ scope.row.phone }}</a>
					</template>
				</el-table-column>
				<el-table-column prop="email" :label="$t('user.email')">
					<template slot-scope="scope">
						<a :href="'mailto:' + scope.row.email">{{ scope.row.email }}</a>
					</template>
				</el-table-column>

				<el-table-column
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
								<span v-else style="color: #aaa;">null</span>
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
									<span v-if="item.administrator">{{
										item.administrator
									}}</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>

				<!-- 分配设备 -->
				<!--				<el-table-column-->
				<!--					prop="address2"-->
				<!--					:label="$t('tableTitle.allocateDevices')"-->
				<!--					width="80"-->
				<!--				>-->
				<!--					<template slot-scope="scope">-->
				<!--						<i-->
				<!--							@click.stop="allocateDevices(scope)"-->
				<!--							style="padding:10px;"-->
				<!--							class="el-icon-circle-plus-outline"-->
				<!--						></i>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<el-table-column
					prop="address2"
					:label="$t('action.settings')"
					width="80"
				>
					<template slot-scope="scope">
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
		<!--message 弹窗-->
		<Message ref="Message"></Message>
		<allocate-devices ref="AllocateDevices"></allocate-devices>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import eventBus from '@/utils/eventBus.js';
import AddOrg from '@/components/Account/AddOrg.vue';
import Message from '@/components/Devices/Message.vue';
import AllocateDevices from '@/components/Account/AllocateDevices.vue';
import OrgSettings from '@/components/Account/OrgSettings.vue';
import Pagination from '@/components/Pagination/index.vue';
import { getAccountList } from '@/api/account';

export default {
	name: 'Account',
	mixins: [mixin],
	components: { AddOrg, Message, Pagination, OrgSettings, AllocateDevices },
	data() {
		return {
			search: '',
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
		this._getAccountList();
	},
	beforeDestroy() {
		eventBus.$off('updateAccount');
	},
	methods: {
		searchUser() {
			this._getAccountList();
		},
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			this._getAccountList();
		},
		// 选择用户
		selectUser(command) {
			console.log('select a User');
		},
		allocateDevices({ row }) {
			this.$refs.AllocateDevices.allocateDevicesVisible = true;
		},
		openSettings({ row, $index }) {
			this.rowIndex = $index;
			this.$refs.OrgSettings.orgformData = row;
			this.$refs.OrgSettings.OrgSettingsVisible = true;
		},
		load(tree, treeNode, resolve) {
			setTimeout(() => {
				resolve([
					{
						id: 31,
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄'
					},
					{
						id: 32,
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄'
					}
				]);
			}, 1000);
		},
		addAccountChange() {
			this._getAccountList();
		},
		_getAccountList() {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, .6)'
			});
			getAccountList({ page: this.currentPage, search: this.search })
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.$refs.Pagination.currentPage = pageNum;
					this.$refs.Pagination.pageSize = pageSize;
					this.$refs.Pagination.total = total;
					this.tableData = list.map((item) => {
						// item.hasChildren = true;
						return item;
					});
					this.$refs.OrgSettings.orgformData = this.tableData[this.rowIndex];
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 4 || columnIndex === 6 || columnIndex === 7) {
				// 蓝色字体
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			} else if (columnIndex === 9 || columnIndex === 10) {
				// 图标
				return 'color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;';
			}
			return 'color: #666666;text-align: center;cursor: pointer;';
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
	}
	main {
		.el-dropdown-link {
			@include flex-c-c;
		}
	}
}
</style>
<style lang="scss"></style>
