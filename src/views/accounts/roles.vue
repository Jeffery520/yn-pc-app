<template>
	<div id="devices">
		<header class="table-header-tools" style="justify-content: flex-start">
			<el-button
				v-if="$store.getters.userInfo.resource.indexOf(25) > -1"
				type="primary"
				@click="$refs.RoleAdd.roleAddVisible = true"
				>+ {{ $t('action.add') + ' ' + $t('route.roles') }}</el-button
			>
		</header>
		<main class="add-role-list-dialog" style="width: 800px">
			<el-table
				ref="table"
				:cell-style="_tableCellColor"
				:header-cell-style="_tableHeaderColor"
				:row-class-name="_tabRowClassName"
				highlight-current-row
				:data="tableData"
				row-key="orgId"
				height="74vh"
				border
				@selection-change="handleSelectionChange"
			>
				<el-table-column
					:resizable="false"
					width="120"
					:label="$t('tableTitle.no')"
				>
					<template slot-scope="scope">
						<span>
							{{ scope.$index + 1 }}
						</span>
					</template>
				</el-table-column>
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
					v-if="$store.getters.userInfo.resource.indexOf(25) > -1"
					:resizable="false"
					:label="$t('action.delete')"
					width="120"
				>
					<template slot-scope="scope">
						<i
							v-if="scope.$index !== 0"
							@click.stop="deleteRole(scope)"
							style="padding:10px;"
							class="el-icon-delete"
						></i>
					</template>
				</el-table-column>

				<el-table-column
					v-if="$store.getters.userInfo.resource.indexOf(25) > -1"
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
			</el-table>
		</main>
		<role-add ref="RoleAdd" @change="_getOrgRoleList()"></role-add>
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
	mounted() {
		this._getOrgRoleList();
	},
	beforeDestroy() {
		if (this.loading) this.loading.close();
	},
	methods: {
		deleteRole({ row, $index }) {
			this.$confirm(
				this.$store.getters.language == 'zh'
					? '您确定要删除吗?'
					: 'Are you sure you want to Delete?',
				this.$store.getters.language == 'zh' ? '提示' : 'Prompt',
				{
					type: 'warning'
				}
			).then(() => {
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
			});
		},
		editRole({ row }) {
			console.log(row);
			this.$refs.RoleAdd.formAddRoles.fId = row.fId;
			this.$refs.RoleAdd.formAddRoles.fName = row.fName;
			this.$refs.RoleAdd.formAddRoles.fEnName = row.fEnName;
			this.$refs.RoleAdd.roleAddVisible = true;
			console.log(this.$refs.RoleAdd.formAddRoles);
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
			if (columnIndex === 2) {
				// 图标
				return 'color: #999;text-align: center;cursor: pointer;font-size:22px;';
			}
			if (columnIndex === 3) {
				// 图标
				return 'color: #60b8f7;text-align: center;cursor: pointer;font-size:22px;';
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
