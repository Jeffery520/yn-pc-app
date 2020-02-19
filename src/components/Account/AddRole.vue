<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="add-role-dialog"
			width="800px"
			:title="
				$store.getters.language == 'en' ? 'Administrator Roles' : '管理员角色'
			"
			:visible.sync="addRoleVisible"
			@close="dialogClose"
			@opened="dialogOpen"
		>
			<main class="add-role-list-dialog" style="padding-bottom: 20px">
				<el-button
					type="primary"
					style="margin-bottom: 10px"
					@click="$refs.RoleAdd.roleAddVisible = true"
					>+ {{ $t('action.add') }}</el-button
				>
				<el-table
					ref="table"
					:cell-style="_tableCellColor"
					:header-cell-style="_tableHeaderColor"
					:row-class-name="_tabRowClassName"
					highlight-current-row
					:data="tableData"
					row-key="orgId"
					height="70vh"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="120"> </el-table-column>

					<el-table-column
						v-if="$store.getters.language == 'en'"
						:resizable="false"
						prop="fEnName"
						label="Role Name"
					>
					</el-table-column>

					<el-table-column
						v-if="$store.getters.language != 'en'"
						:resizable="false"
						prop="fName"
						label="角色名称"
					>
					</el-table-column>

					<el-table-column
						:resizable="false"
						:label="$t('action.edit')"
						width="120"
					>
						<template slot-scope="scope">
							<i
								@click.stop="editRole(scope)"
								style="padding:10px;"
								class="el-icon-edit-outline"
							></i>
						</template>
					</el-table-column>
					<el-table-column
						:resizable="false"
						:label="$t('action.delete')"
						width="120"
					>
						<template slot-scope="scope">
							<!--v-if="scope.row.fEnName != 'Admin'"-->
							<i
								@click.stop="deleteRole(scope)"
								style="padding:10px;"
								class="el-icon-delete"
							></i>
						</template>
					</el-table-column>
				</el-table>
			</main>
		</el-dialog>
		<role-add ref="RoleAdd"></role-add>
	</div>
</template>

<script>
import mixin from '@/views/mixin';
const RoleAdd = () => import('@/components/Account/roleAdd');
import { getUserRole, delUserRole } from '@/api/user';
export default {
	name: 'AddRole',
	mixins: [mixin],
	props: { orgId: Number },
	components: { RoleAdd },
	data() {
		return {
			addRoleVisible: false,
			tableData: []
		};
	},
	mounted() {},
	methods: {
		dialogOpen() {
			this._getOrgRoleList();
		},
		deleteRole({ row, $index }) {
			this.loading = this.$loading({
				target: document.querySelector('.add-role-list-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			delUserRole({ roleId: row.fId })
				.then((data) => {
					if (data.status != 0) {
						this.$message({
							message: data.msg,
							type: 'error'
						});
						return false;
					}
					this.tableData.splice($index, 1);
					this.$emit('change');
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		editRole({ row }) {
			this.$refs.RoleAdd.formAddRoles.fId = row.fId;
			this.$refs.RoleAdd.formAddRoles.fName = row.fName;
			this.$refs.RoleAdd.formAddRoles.fEnName = row.fEnName;
			this.$refs.RoleAdd.roleAddVisible = true;
		},
		_getOrgRoleList() {
			this.loading = this.$loading({
				target: document.querySelector('.add-role-list-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getUserRole()
				.then((data) => {
					this.tableData = data;
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 3) {
				// 图标
				return 'color: #999;text-align: center;cursor: pointer;font-size:24px;';
			}
			if (columnIndex === 2) {
				// 图标
				return 'color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;';
			}
			return 'color: #666666;text-align: center;';
		}
	}
};
</script>

<style lang="scss">
.add-account-dialog {
	.el-dialog__body {
		padding: 20px !important;
	}
}
</style>
