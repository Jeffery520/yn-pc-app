<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="add-account-dialog"
			width="600px"
			:title="
				$t('action.add') +
					' ' +
					$t('route.administrator') +
					' ' +
					$t('tableTitle.accounts')
			"
			:visible.sync="addAccountVisible"
			@close="dialogClose"
			@opened="dialogOpen"
		>
			<main class="add-account-body" style="width: 500px;">
				<el-form
					ref="addAccountForm"
					:model="formData"
					label-width="160px"
					label-suffix=":"
					:rules="rules"
				>
					<el-form-item
						prop="administrator"
						:label="$t('tableTitle.accountID')"
					>
						<el-input
							:disabled="!!formData.adminId"
							v-model="formData.administrator"
						></el-input>
					</el-form-item>
					<el-form-item prop="password" :label="$t('user.password')">
						<el-input v-model="formData.password"></el-input>
					</el-form-item>
					<!--              todo-->
					<!--					<el-form-item prop="phone" :label="$t('user.phone')">-->
					<!--						<tel-input :phone="formData.phone" @change="poneChange"></tel-input>-->
					<!--					</el-form-item>-->

					<!--					<el-form-item prop="email" :label="$t('user.email')">-->
					<!--						<el-input v-model="formData.email"></el-input>-->
					<!--					</el-form-item>-->

					<!--添加机构时不需选择角色-->
					<el-form-item
						v-if="!cantSeleteRoles"
						prop="roleIdList"
						:label="$t('tableTitle.roles')"
					>
						<i
							v-if="roleIdList.length == 0"
							class="el-icon-refresh"
							style="color:#4b96ef;cursor: pointer;font-size: 20px;display: inline-block;margin-right: 10px"
							@click="_getOrgRoleList"
						></i>
						<el-button
							v-if="orgId == $store.getters.userInfo.fOrgId"
							type="primary"
							@click="$router.push({ name: 'Roles' })"
							>{{
								$store.getters.language == 'en' ? 'Edit Roles' : '角色编辑'
							}}</el-button
						>
						<div v-if="roleIdList.length == 0" style="margin: 15px 0;"></div>
						<el-checkbox-group
							class="roleIdList-bg"
							v-model="formData.roleIdList"
							:disabled="cantSeleteRoles"
							@change="
								formData.roleIdList = [
									formData.roleIdList[formData.roleIdList.length - 1]
								]
							"
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
		<add-role
			ref="AddRole"
			:orgId="orgId"
			@change="_getOrgRoleList()"
		></add-role>
	</div>
</template>

<script>
import eventBus from '@/utils/eventBus.js';
import { addAccount, pwdReset, editAccount } from '@/api/account';
import { getOrgRoleList } from '@/api/user';
const AddRole = () => import('@/components/Account/AddRole');
import TelInput from '@/components/TelInput/TelInput';

export default {
	name: 'AddAccount',
	props: { orgId: Number },
	components: { AddRole, TelInput },
	data() {
		return {
			addAccountVisible: false,
			cantSeleteRoles: false,
			roleId: 0,
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
				email: '',
				phone: '',
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
						message:
							this.$store.getters.language == 'zh'
								? '密码长度最少8个字符'
								: 'Password must be at least 8 characters long',
						trigger: 'blur'
					}
				],
				// phone: [
				// 	{
				// 		required: true,
				// 		message:
				// 			this.$store.getters.language == 'zh'
				// 				? '请输入管理员电话'
				// 				: 'Please enter the administrator phone',
				// 		trigger: 'blur'
				// 	},
				// 	{
				// 		min: 6,
				// 		message:
				// 			this.$store.getters.language == 'zh'
				// 				? '长度最少6个字符'
				// 				: 'minimum 6 characters in length',
				// 		trigger: 'blur'
				// 	}
				// ],
				// email: [
				// 	{
				// 		required: true,
				// 		message:
				// 			this.$store.getters.language == 'zh'
				// 				? '请输入管理员邮箱'
				// 				: 'Please enter the administrator email',
				// 		trigger: 'blur'
				// 	}
				// ],
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
		phoneChange(val) {
			this.formData.phone = val;
		},
		dialogOpen() {
			this.formData.orgId = this.orgId || 0;
			this._getOrgRoleList();
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
				email: '',
				phone: '',
				roleIdList: [0],
				status: 0
			};
			this.roleIdList = [];
			if (this.loading) this.loading.close();
		},
		addAccount() {
			this.$refs['addAccountForm'].validate((valid) => {
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
				target: document.querySelector('.add-account-body'),
				background: 'rgba(225, 225, 225, 0)'
			});
			this.formData.orgId = this.orgId;
			const params = this.formData;
			addAccount(params)
				.then((data) => {
					this.loading.close();
					if (data.status == 1) {
						this.$message({
							message: data.msg,
							type: 'error'
						});
						return;
					}
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
		_editAccount() {
			this.loading = this.$loading({
				target: document.querySelector('.add-account-body'),
				background: 'rgba(225, 225, 225, 0)'
			});

			const params = this.formData;
			params.password = '';
			delete params.roleInfoList;

			editAccount(params)
				.then((data) => {
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
				target: document.querySelector('.add-account-body'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getOrgRoleList(params)
				.then((data) => {
					this.roleIdList = data;
					if (
						data.length > 0 &&
						(!this.formData.roleIdList || this.formData.roleIdList == 0)
					) {
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
			const { adminId, administrator, password } = this.formData;
			pwdReset({ adminId, administrator, password })
				.then(() => {
					this.loading.close();
					this._editAccount();
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
