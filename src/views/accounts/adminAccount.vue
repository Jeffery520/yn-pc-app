<template>
	<div id="devices">
		<header class="table-header-tools">
			<el-button
				@click="$refs.AddAccount.addAccountVisible = true"
				type="primary"
				>+ {{ $t('action.add') }}</el-button
			>
		</header>
		<main>
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
				style="width: 900px"
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
					:resizable="false"
					:label="$t('action.edit')"
					width="100"
				>
					<template
						slot-scope="scope"
						v-if="scope.row.grade == tableData[0].grade"
					>
						<i
							@click.stop="openSettings(scope)"
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
		openSettings({ row, $index }) {
			this.$refs.table.setCurrentRow(row);
			this.rowIndex = $index;
			this.$refs.OrgSettings.orgformData = row;
			this.$refs.OrgSettings.OrgSettingsVisible = true;
		},
		addAccountChange() {
			this.currentPage = 1;
			this._getAccountList();
		},
		_getAccountList() {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
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
			if (columnIndex === 3) {
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
