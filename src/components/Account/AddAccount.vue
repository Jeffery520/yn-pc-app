<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="add-account-dialog"
			width="600px"
			:title="$t('action.add') + ' ' + $t('tableTitle.accounts')"
			:visible.sync="addAccountVisible"
			@close="dialogClose"
			@opened="dialogOpen"
		>
			<main style="width: 500px;">
				<el-form
					ref="addAccountForm"
					:model="formData"
					label-width="160px"
					label-suffix=":"
					:rules="rules"
				>
					<el-form-item prop="administrator" :label="$t('user.userName')">
						<el-input
							:disabled="!!formData.adminId"
							v-model="formData.administrator"
						></el-input>
					</el-form-item>
					<el-form-item
						maxlength="20"
						prop="password"
						:label="$t('user.password')"
					>
						<el-input maxlength="8" v-model="formData.password"></el-input>
					</el-form-item>
					<el-form-item prop="roleIdList" :label="$t('tableTitle.roles')">
						<el-checkbox-group
							class="roleIdList-bg"
							v-model="formData.roleIdList"
						>
							<el-checkbox
								v-for="item in roleIdList"
								:key="item.fId"
								:label="item.fId"
								>{{
									$store.getters.language == 'en' ? item.fEnName : item.fName
								}}</el-checkbox
							>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item v-if="orgId == $store.getters.userInfo.fOrgId">
						<el-button type="primary" @click="addAccountVisible = false"
							>+
							{{
								$store.getters.language == 'en' ? 'Add role' : '添加角色'
							}}</el-button
						>
					</el-form-item>
					<el-form-item>
						<el-button
							style="width: 140px;margin-top: 20px"
							@click="addAccountVisible = false"
							>{{ $t('action.cancel') }}</el-button
						>
						<el-button
							style="width: 140px;margin-top: 20px"
							type="primary"
							@click="addAccount"
							>{{ $t('action.save') }}</el-button
						>
					</el-form-item>
				</el-form>
			</main>
		</el-dialog>
	</div>
</template>

<script>
import eventBus from '@/utils/eventBus.js';
import { addAccount, pwdReset } from '@/api/account';
import { getOrgRoleList } from '@/api/user';

export default {
	name: 'AddAccount',
	props: { orgId: Number },
	data() {
		return {
			addAccountVisible: false,
			roleIdList: [],
			formData: {
				adminId: 0,
				administrator: '',
				city: '',
				faceUrl: '',
				ip: '',
				lat: '',
				lng: '',
				mapLevel: 0,
				orgId: 0,
				password: '',
				remarks: '',
				roleIdList: [],
				status: 0
			},
			rules: {
				administrator: [
					{
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请输入账户名'
								: 'please enter your username',
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
				password: [
					{
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请输入密码'
								: 'please enter your password',
						trigger: 'blur'
					},
					{
						min: 8,
						max: 8,
						message:
							this.$store.getters.language == 'zh'
								? '长度为8个字符'
								: '8 characters in length',
						trigger: 'blur'
					}
				],
				roleIdList: [
					{
						type: 'array',
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请选择角色'
								: 'Please select a role',
						trigger: 'change'
					}
				]
			}
		};
	},
	methods: {
		dialogOpen() {
			if (!this.formData.adminId) {
				this._getOrgRoleList();
			}
		},
		dialogClose() {
			this.formData = {
				adminId: 0,
				administrator: '',
				city: '',
				faceUrl: '',
				ip: '',
				lat: '',
				lng: '',
				mapLevel: 0,
				orgId: 0,
				password: '',
				remarks: '',
				roleIdList: [],
				status: 0
			};
			this.roleIdList = [];
		},
		addAccount() {
			this.$refs['addAccountForm'].validate((valid) => {
				console.log(this.formData);
				if (valid) {
					if (!this.formData.adminId) {
						this._addAccount();
					} else {
						this._resetPassword();
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		_addAccount() {
			this.loading = this.$loading({
				target: document.querySelector('.add-account-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			this.formData.orgId = this.orgId;
			const params = this.formData;
			addAccount(params)
				.then(() => {
					this.loading.close();
					this.$message({
						message: 'Submit Success',
						type: 'success'
					});
					this.addAccountVisible = false;
					// 更新父组件数据
					eventBus.$emit('updateAccount');
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_getOrgRoleList() {
			const params = { orgId: this.orgId };
			this.loading = this.$loading({
				target: document.querySelector('.roleIdList-bg'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getOrgRoleList(params)
				.then((data) => {
					this.roleIdList = data;
					if (data.length > 0) {
						this.formData.roleIdList = [parseInt(data[0].fId)];
					}
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_resetPassword() {
			this.loading = this.$loading({
				target: document.querySelector('.add-account-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const params = {
				reqPasswordReset: this.formData,
				adminId: this.formData.adminId
			};

			pwdReset(params)
				.then(() => {
					// 更新父组件数据
					eventBus.$emit('updateAccount');
					this.loading.close();
					this.$message({
						message: 'Submit Success',
						type: 'success'
					});
					this.addAccountVisible = false;
				})
				.catch(() => {
					this.loading.close();
				});
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
