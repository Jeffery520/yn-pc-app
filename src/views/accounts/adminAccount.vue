<template>
	<div id="devices">
		<header class="table-header-tools" style="justify-content: flex-start">
			<el-button
				v-if="$store.getters.userInfo.resource.indexOf(19) > -1"
				@click="$refs.AddAccount.addAccountVisible = true"
				type="primary"
				>+ {{ $t('action.add') + ' ' + $t('route.administrator') }}</el-button
			>
		</header>
		<main class="admin-user-bg">
			<el-table
				ref="table"
				:cell-style="_tableCellColor"
				:header-cell-style="_tableHeaderColor"
				:row-class-name="_tabRowClassName"
				highlight-current-row
				:data="tableData"
				row-key="adminId"
				height="70vh"
				border
				style="width: 1000px"
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
					prop="administrator"
					:label="$t('tableTitle.accountID')"
				>
				</el-table-column>

				<el-table-column :resizable="false" :label="$t('tableTitle.password')">
					<template>
						<span>*********</span>
					</template>
				</el-table-column>

				<el-table-column
					prop="roleInfoList"
					:resizable="false"
					:label="$t('route.roles')"
				>
					<template slot-scope="scope">
						<span
							v-for="(item, index) in scope.row.roleInfoList"
							:key="item.fId"
							>{{ $store.getters.language == 'en' ? item.fEnName : item.fName
							}}{{ index < scope.row.roleInfoList.length - 1 ? ',' : '' }}</span
						>
					</template>
				</el-table-column>

				<el-table-column
					v-if="$store.getters.userInfo.resource.indexOf(19) > -1"
					:resizable="false"
					:label="$t('action.delete')"
					width="100"
				>
					<template
						slot-scope="scope"
						v-if="scope.row.grade == tableData[0].grade"
					>
						<i
							v-if="
								$store.getters.userInfo.fAdministrator !=
									scope.row.administrator
							"
							@click.stop="deleteAccount(scope)"
							style="padding:10px;"
							class="el-icon-delete"
						></i>
					</template>
				</el-table-column>

				<el-table-column
					v-if="$store.getters.userInfo.resource.indexOf(19) > -1"
					:resizable="false"
					:label="$t('action.edit')"
					width="100"
				>
					<template
						slot-scope="scope"
						v-if="scope.row.grade == tableData[0].grade"
					>
						<i
							@click.stop="openEdit(scope)"
							style="padding:10px;"
							class="el-icon-edit-outline"
						></i>
					</template>
				</el-table-column>
			</el-table>
		</main>
		<!-- 新增用户-->
		<add-account ref="AddAccount" :orgId="fOrgId"></add-account>
		<org-settings ref="OrgSettings" @change="addAccountChange"></org-settings>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import eventBus from '@/utils/eventBus.js';
import { _debounce } from '@/utils/validate';
import { getAccountList, getUserRole } from '@/api/user';
import { deleteAccount } from '@/api/account';

const AddAccount = () => import('@/components/Account/AddAccount');
const OrgSettings = () => import('@/components/Account/OrgSettings.vue');

export default {
	name: 'Account',
	mixins: [mixin],
	components: { OrgSettings, AddAccount },
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
	beforeDestroy() {
		eventBus.$off('updateAccount');
	},
	mounted() {
		this._getAccountList();
	},
	methods: {
		openEdit({ row }) {
			this.$refs.AddAccount.addAccountVisible = true;
			this.$refs.AddAccount.formData.adminId = row.adminId;
			this.$refs.AddAccount.formData.administrator = row.administrator;
		},
		deleteAccount({ row, $index }) {
			this.$confirm(
				this.$store.getters.language == 'zh'
					? '您确定要删除 ' + row.administrator + ' 吗?'
					: 'Are you sure to delete ' + row.administrator + ' ?',
				this.$store.getters.language == 'zh' ? '提示' : 'Prompt',
				{
					type: 'warning'
				}
			).then(() => {
				this.loading = this.$loading({
					target: document.querySelector('.admin-user-bg'),
					background: 'rgba(225, 225, 225, 0)'
				});
				const params = {
					adminId: row.adminId
				};
				deleteAccount(params)
					.then(() => {
						this.loading.close();
						this.tableData.splice($index, 1);
					})
					.catch(() => {
						this.loading.close();
					});
			});
		},
		addAccountChange() {
			this.currentPage = 1;
			this._getAccountList();
		},

		_getAccountList() {
			this.loading = this.$loading({
				target: document.querySelector('.admin-user-bg'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getAccountList({ page: this.currentPage, search: this.search })
				.then((data) => {
					console.log(data);
					this.tableData = data;
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// _getAccountList() {
		//   this.loading = this.$loading({
		//     target: document.querySelector('.app-main'),
		//     background: 'rgba(225, 225, 225, 0)'
		//   });
		//   getAccountList({ page: this.currentPage, search: this.search })
		//     .then((data) => {
		//       let { total, pageNum, pageSize, list } = data;
		//       this.pageSize = pageSize;
		//       if (this.$refs.Pagination) {
		//         this.$refs.Pagination.currentPage = pageNum;
		//         this.$refs.Pagination.pageSize = pageSize;
		//         this.$refs.Pagination.total = total;
		//       }
		//
		//       this.tableData = list.map((item) => {
		//         item.hasChildren = item.children ? true : false;
		//         return item;
		//       });
		//       if (this.tableData.length > 0) {
		//         this.$refs.OrgSettings.orgformData = this.tableData[this.rowIndex];
		//       }
		//
		//       this.loading.close();
		//     })
		//     .catch(() => {
		//       this.loading.close();
		//     });
		// },
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 4) {
				// 图标
				return 'color: #999;text-align: center;cursor: pointer;font-size:22px;';
			}
			if (columnIndex === 5) {
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
