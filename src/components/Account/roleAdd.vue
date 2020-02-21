<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="add-org-dialog"
			width="1000px"
			:title="$t('action.add') + ' ' + $t('tableTitle.role')"
			:visible.sync="roleAddVisible"
			destroy-on-close
			@close="dialogClose"
			@opened="dialogOpen"
		>
			<main style="width: 800px;">
				<el-form
					ref="formAddRoles"
					:model="formAddRoles"
					label-width="200px"
					label-suffix=":"
					:rules="rules"
				>
					<el-form-item
						prop="fEnName"
						:label="$store.getters.language == 'en' ? 'Role Name' : '角色名称'"
					>
						<el-input v-model="formAddRoles.fEnName"></el-input>
					</el-form-item>

					<el-form-item
						class="form-Add-Roles"
						prop="resourceIds"
						:label="
							$store.getters.language == 'en'
								? ' Select permissions'
								: '选择权限'
						"
					>
						<el-checkbox-group v-model="formAddRoles.resourceIds">
							<div
								v-for="(item, index) in resource"
								style="border-top:1px solid #ccc"
							>
								<el-checkbox
									:label="item.fId"
									:key="item.fId"
									@click.native.stop="
										parentCheck({ id: item.fId, index: index })
									"
									>{{ item.fName }}</el-checkbox
								>
								<div style="padding-left: 20px;">
									<el-checkbox
										v-for="(it, i) in item.child"
										:label="it.fId"
										:key="it.fId"
										@click.native.stop="
											childCheck({ id: [item.fId, it.fId], index: i })
										"
										>{{ it.fName }}</el-checkbox
									>
								</div>
							</div>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item>
						<el-button
							style="width: 140px;margin-top: 20px"
							@click="roleAddVisible = false"
							>{{ $t('action.cancel') }}</el-button
						>
						<el-button
							style="width: 140px;margin-top: 20px"
							type="primary"
							@click="addRole"
							>{{ $t('action.save') }}</el-button
						>
					</el-form-item>
				</el-form>
			</main>
		</el-dialog>
	</div>
</template>

<script>
import {
	addUserRole,
	getRoleResource,
	setRoleResource,
	editRole,
	getOrgRoleResource
} from '@/api/user';

export default {
	name: 'AddOrg',
	components: {},
	props: {},
	data() {
		return {
			roleAddVisible: false,
			resource: [],
			formAddRoles: {
				fEnName: '',
				fId: 0,
				fName: '',
				resourceIds: []
			},
			rules: {
				fEnName: [
					{
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请输入角色名'
								: 'please enter role name',
						trigger: 'blur'
					},
					{
						min: 3,
						message:
							this.$store.getters.language == 'zh'
								? '长度最少3个字符'
								: 'minimum 3 characters in length',
						trigger: 'blur'
					}
				],
				fName: [
					{
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请输入角色名'
								: 'please enter role name',
						trigger: 'blur'
					},
					{
						min: 3,
						message:
							this.$store.getters.language == 'zh'
								? '长度最少3个字符'
								: 'minimum 3 characters in length',
						trigger: 'blur'
					}
				],
				resourceIds: [
					{
						type: 'array',
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请选择权限'
								: 'Please select permissions',
						trigger: 'change'
					}
				]
			}
		};
	},
	methods: {
		parentCheck(val) {
			const { id, index } = val;
			setTimeout(() => {
				let resourceIds = this.formAddRoles.resourceIds;
				if (resourceIds.indexOf(id) < 0) {
					for (let i = 0; i < this.resource[index].child.length; i++) {
						if (resourceIds.indexOf(this.resource[index].child[i].fId) > -1) {
							this.formAddRoles.resourceIds.splice(
								resourceIds.indexOf(this.resource[index].child[i].fId),
								1
							);
							this.formAddRoles = this.formAddRoles;
						}
					}
				}
			}, 100);
		},
		childCheck(val) {
			const { id } = val;
			setTimeout(() => {
				let resourceIds = this.formAddRoles.resourceIds;
				if (resourceIds.indexOf(id[1]) > -1) {
					if (resourceIds.indexOf(id[0]) < 0) {
						this.formAddRoles.resourceIds.push(id[0]);
						this.formAddRoles = this.formAddRoles;
					}
				}
			}, 100);
		},
		dialogOpen() {
			if (this.formAddRoles.fId) {
				this.loading = this.$loading({
					target: document.querySelector('.form-Add-Roles'),
					background: 'rgba(225, 225, 225, 0)'
				});
				getRoleResource({ roleId: this.formAddRoles.fId })
					.then((data) => {
						this.loading.close();
						let resourceIds = [];
						let resource = data;
						let baseRoute = [];
						for (let i = 0; i < resource.length; i++) {
							if (resource[i].fParentId == 1) {
								resource[i].child = [];
								baseRoute.push(resource[i]);
							}
							if (resource[i].has) {
								resourceIds.push(resource[i].fId);
							}
						}
						this.formAddRoles.resourceIds = resourceIds;
						for (let i = 0; i < resource.length; i++) {
							for (let j = 0; j < baseRoute.length; j++) {
								if (resource[i].fParentId == baseRoute[j].fId) {
									baseRoute[j].child.push(resource[i]);
								}
							}
						}
						this.resource = baseRoute;
					})
					.catch(() => {
						this.loading.close();
					});
			} else {
				this.loading = this.$loading({
					target: document.querySelector('.form-Add-Roles'),
					background: 'rgba(225, 225, 225, 0)'
				});
				getOrgRoleResource({ orgId: this.$store.getters.userInfo.fOrgId })
					.then((data) => {
						this.loading.close();
						let resourceIds = [];
						let resource = data;
						let baseRoute = [];
						for (let i = 0; i < resource.length; i++) {
							if (resource[i].fParentId == 1) {
								resource[i].child = [];
								baseRoute.push(resource[i]);
							}
							if (resource[i].has) {
								resourceIds.push(resource[i].fId);
							}
						}
						this.formAddRoles.resourceIds = resourceIds;
						for (let i = 0; i < resource.length; i++) {
							for (let j = 0; j < baseRoute.length; j++) {
								if (resource[i].fParentId == baseRoute[j].fId) {
									baseRoute[j].child.push(resource[i]);
								}
							}
						}
						this.resource = baseRoute;
					})
					.catch(() => {
						this.loading.close();
					});
			}
		},
		dialogClose() {
			this.formAddRoles = {
				fEnName: '',
				fId: 0,
				fName: '',
				resourceIds: []
			};
			this.resource = [];
			if (this.loading) this.loading.close();
		},
		addRole() {
			this.$refs['formAddRoles'].validate((valid) => {
				if (!valid) {
					return false;
				} else {
					if (this.formAddRoles.fId) {
						this._editRole();
					} else {
						this._addRole();
					}
				}
			});
		},
		_editRole() {
			this.loading = this.$loading({
				target: document.querySelector('.add-org-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const { fEnName, fId, fName } = this.formAddRoles;
			editRole({ fEnName, fId, fName: fEnName })
				.then((data) => {
					this.loading.close();
					if (data.status != 0) {
						this.$message({
							message: data.msg,
							type: 'error'
						});
						return false;
					}
					this._addResource();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_addRole() {
			this.loading = this.$loading({
				target: document.querySelector('.add-org-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const { fEnName, fId, fName } = this.formAddRoles;
			addUserRole({ fEnName, fId, fName: fEnName })
				.then((data) => {
					this.loading.close();
					if (data.status != 0) {
						this.$message({
							message: data.msg,
							type: 'error'
						});
						return false;
					}
					this.formAddRoles.fId = data.data.id;
					this._addResource();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_addResource() {
			this.loading = this.$loading({
				target: document.querySelector('.add-org-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const params = {
				roleId: this.formAddRoles.fId,
				idList: this.formAddRoles.resourceIds
			};
			setRoleResource(params)
				.then((data) => {
					this.loading.close();
					if (data.status != 0) {
						this.$message({
							message: data.msg,
							type: 'error'
						});
						return false;
					}
					// 更新父组件数据
					this.$emit('change');
					this.roleAddVisible = false;
				})

				.catch(() => {
					this.loading.close();
				});
		}
	}
};
</script>

<style lang="scss">
.add-org-dialog {
	.el-dialog__body {
		padding: 20px !important;
	}
	.form-item-inline {
		border-top: 1px solid $baseBorderColor;
		padding-top: 20px;
	}
}
</style>
