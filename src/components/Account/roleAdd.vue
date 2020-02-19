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
						:label="
							$store.getters.language == 'en'
								? 'Role Name of English'
								: '角色名称(英文)'
						"
					>
						<el-input v-model="formAddRoles.fEnName"></el-input>
					</el-form-item>
					<el-form-item
						prop="fName"
						:label="
							$store.getters.language == 'en'
								? 'Role Name of Chinese'
								: '角色名称(中文)'
						"
					>
						<el-input v-model="formAddRoles.fName"></el-input>
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
						<el-checkbox
							:indeterminate="isIndeterminate"
							v-model="checkAll"
							@change="handleCheckAllChange"
							>{{
								$store.getters.language == 'en' ? 'All' : '全选'
							}}</el-checkbox
						>
						<div style="margin: 15px 0;"></div>
						<el-checkbox-group v-model="formAddRoles.resourceIds">
							<el-checkbox
								v-for="item in resource"
								:label="item.fId"
								:key="item.fId"
								>{{ item.fName }}</el-checkbox
							>
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
import { addUserRole, getRoleResource } from '@/api/user';

export default {
	name: 'AddOrg',
	components: {},
	props: {},
	data() {
		return {
			roleAddVisible: false,
			roleId: 0,
			checkAll: false,
			isIndeterminate: true,
			resource: [],
			formAddRoles: {
				fEnName: '',
				fId: 0,
				fName: '',
				roleId: 0,
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
		handleCheckAllChange(val) {
			let resourceIds = this.resource.map((item) => {
				return item.fId;
			});
			this.formAddRoles.resourceIds = val ? resourceIds : [];
			this.isIndeterminate = false;
		},
		dialogOpen() {
			this.resource = this.$store.getters.userInfo.resource;
			if (this.formAddRoles.fId) {
				this.loading = this.$loading({
					target: document.querySelector('.form-Add-Roles'),
					background: 'rgba(225, 225, 225, 0)'
				});
				getRoleResource({ roleId: this.formAddRoles.fId })
					.then((data) => {
						this.loading.close();
						let resourceIds = data.map((item) => {
							return item.fId;
						});
						this.formAddRoles.resourceIds = resourceIds;
					})
					.catch(() => {
						this.loading.close();
					});
			}
		},
		dialogClose() {
			console.log(this.resource);
		},
		addRole() {
			this.$refs['formAddRoles'].validate((valid) => {
				if (!valid) {
					return false;
				} else {
					this._addRole();
				}
			});
		},
		_addRole() {
			this.loading = this.$loading({
				target: document.querySelector('.add-org-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const { fEnName, fId, fName } = this.formAddRoles;
			addUserRole({ fEnName, fId, fName })
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
		_addResource() {
			// // 更新父组件数据
			// this.$emit('change');
			// this.disabled = true;
			// this.formDataRead = true;
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
