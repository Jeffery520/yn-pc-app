<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="add-org-dialog"
			width="800px"
			:title="$t('action.add') + ' ' + $t('route.organization')"
			:visible.sync="addOrgVisible"
			destroy-on-close
			@close="addOrgClose"
		>
			<main style="width: 600px;">
				<el-form
					ref="addOrgForm"
					:model="formData"
					label-width="160px"
					label-suffix=":"
					:rules="rules"
				>
					<el-form-item prop="simpleName" :label="$t('tableTitle.orgName')">
						<el-input
							:readonly="formDataRead"
							v-model="formData.simpleName"
						></el-input>
					</el-form-item>
					<el-form-item prop="fullName" :label="$t('tableTitle.orgFullName')">
						<el-input
							:readonly="formDataRead"
							v-model="formData.fullName"
						></el-input>
					</el-form-item>
					<el-form-item prop="address" :label="$t('user.address')">
						<el-input
							:readonly="formDataRead"
							v-model="formData.address"
						></el-input>
					</el-form-item>
					<el-form-item prop="contact" :label="$t('tableTitle.admin')">
						<el-input
							:readonly="formDataRead"
							v-model="formData.contact"
						></el-input>
					</el-form-item>
					<el-form-item prop="phone" :label="$t('user.phone')">
						<el-input
							:readonly="formDataRead"
							v-model="formData.phone"
						></el-input>
					</el-form-item>
					<el-form-item prop="email" :label="$t('user.email')">
						<el-input
							:readonly="formDataRead"
							v-model="formData.email"
						></el-input>
					</el-form-item>
					<!--<el-form-item v-if="!formDataRead">-->
					<!--<el-button style="width: 140px" @click="addOrgVisible = false">{{-->
					<!--$t('action.cancel')-->
					<!--}}</el-button>-->
					<!--<el-button style="width: 140px" type="primary" @click="addOrg">{{-->
					<!--$t('action.save')-->
					<!--}}</el-button>-->
					<!--</el-form-item>-->
				</el-form>
				<div style="font-size: 20px;padding: 10px 20px 20px;font-weight: 600;">
					{{
						$store.getters.language == 'en'
							? 'Administrator accounts:'
							: '管理员账号:'
					}}
				</div>
				<el-form
					ref="addAccountForm"
					:model="accountFormData"
					label-width="160px"
					label-suffix=":"
					:rules="accountRules"
				>
					<el-form-item prop="administrator" :label="$t('user.userName')">
						<el-input v-model="accountFormData.administrator"></el-input>
					</el-form-item>
					<el-form-item prop="password" :label="$t('user.password')">
						<el-input
							maxlength="20"
							v-model="accountFormData.password"
						></el-input>
					</el-form-item>
					<!--<el-form-item prop="roleIdList" :label="$t('tableTitle.roles')">-->
					<!--<i-->
					<!--v-if="roleIdList.length == 0"-->
					<!--class="el-icon-refresh"-->
					<!--style="color:#4b96ef;cursor: pointer;font-size: 20px;display: inline-block;"-->
					<!--@click="_getOrgRoleList"-->
					<!--&gt;</i>-->
					<!--<div style="margin: 15px 0;"></div>-->

					<!--<el-checkbox-group-->
					<!--class="roleIdList-bg"-->
					<!--v-model="accountFormData.roleIdList"-->
					<!--&gt;-->
					<!--<el-checkbox-->
					<!--v-for="item in roleIdList"-->
					<!--:key="item.fId"-->
					<!--:label="item.fId"-->
					<!--&gt;{{-->
					<!--$store.getters.language == 'en' ? item.fEnName : item.fName-->
					<!--}}</el-checkbox-->
					<!--&gt;-->
					<!--</el-checkbox-group>-->
					<!--</el-form-item>-->

					<el-form-item>
						<el-button
							style="width: 140px;margin-top: 20px"
							@click="addOrgVisible = false"
							>{{ $t('action.cancel') }}</el-button
						>
						<el-button
							style="width: 140px;margin-top: 20px"
							type="primary"
							@click="addOrg"
							>{{ $t('action.save') }}</el-button
						>
					</el-form-item>
				</el-form>
			</main>
		</el-dialog>
	</div>
</template>

<script>
import { addOrg, addAccount } from '@/api/account';
import { getOrgRoleList } from '@/api/user';

export default {
	name: 'AddOrg',
	components: {},
	data() {
		return {
			addOrgVisible: false,
			formDataRead: false,
			roleIdList: [],
			formData: {
				pid: this.$store.getters.userInfo.fOrgId,
				hierarchy: '',
				fullName: '', // 机构全称
				simpleName: '', // 机构名称
				address: '', // 机构地址
				contact: '', // 管理员
				phone: '', // 机构电话
				email: '', // 邮箱
				children: 0,
				description: '',
				devNum: 0,
				grade: 0,
				logoUrl: '',
				minAdminList: [],
				orgId: 0,
				pids: '',
				sort: 0
			},
			rules: {
				fullName: [
					{
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请输入机构全称'
								: 'Please Enter The Full Name Of The Org',
						trigger: 'blur'
					}
				],
				simpleName: [
					{
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请输入机构简称'
								: 'Please Enter The Simple Name Of The Org',
						trigger: 'blur'
					}
				],
				address: [
					{
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请输入机构地址'
								: 'Please Enter The Address Of The Org',
						trigger: 'blur'
					}
				],
				contact: [
					{
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请输入机构管理员'
								: 'please enter the agency administrator',
						trigger: 'blur'
					}
				],
				phone: [
					{
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请输入机构电话'
								: 'Please Enter The Phone Of The Org',
						trigger: 'blur'
					}
				],
				email: [
					{
						required: true,
						message:
							this.$store.getters.language == 'zh'
								? '请输入机构电话'
								: 'Please Enter The Email Of The Org',
						trigger: 'blur'
					}
				],
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
						max: 20,
						message:
							this.$store.getters.language == 'zh'
                ? '密码长度为8-20个字符'
                : 'Password length is 8-20 characters',
						trigger: 'blur'
					}
				]
			},
			accountFormData: {
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
			accountRules: {
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
		addOrg() {
			this.$refs['addOrgForm'].validate((valid) => {
				if (valid) {
					this.$refs['addAccountForm'].validate((valid) => {
						if (!valid) {
							return false;
						} else {
							this._addOrg();
						}
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		addAccount() {
			this.$refs['addAccountForm'].validate((valid) => {
				if (!valid) {
					return false;
				} else {
					this._addAccount();
				}
			});
		},
		addOrgClose() {
			if (this.loading) this.loading.close();
			this.formData = {
				pid: this.$store.getters.userInfo.fOrgId,
				hierarchy: '',
				fullName: '', // 机构全称
				simpleName: '', // 机构名称
				address: '', // 机构地址
				contact: '', // 管理员
				phone: '', // 机构电话
				email: '', // 邮箱
				children: 0,
				description: '',
				devNum: 0,
				grade: 0,
				logoUrl: '',
				minAdminList: [],
				orgId: 0,
				pids: '',
				sort: 0
			};
			this.accountFormData = {
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
			this.addOrgVisible = false;
			this.formDataRead = false;
		},
		_addOrg() {
			this.loading = this.$loading({
				target: document.querySelector('.add-org-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const params = this.formData;
			addOrg(params)
				.then((data) => {
					this.loading.close();
					if (data.status != 0) {
						this.$message({
							message: data.msg,
							type: 'error'
						});
						return false;
					}
					this.accountFormData.orgId = data.data.id;
					this.accountFormData.roleIdList = [data.data.roleInfo.fId || 0];
					this._addAccount();
					// this.disabled = true;
					// this.formDataRead = true;
					// this._getOrgRoleList();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_addAccount() {
			this.loading = this.$loading({
				target: document.querySelector('.add-org-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});

			addAccount(this.accountFormData)
				.then(() => {
					this.loading.close();
					this.$message({
						message: 'Submit Success',
						type: 'success'
					});
					this.formData = {
						pid: this.$store.getters.userInfo.fOrgId,
						hierarchy: '',
						fullName: '', // 机构全称
						simpleName: '', // 机构名称
						address: '', // 机构地址
						contact: '', // 管理员
						phone: '', // 机构电话
						email: '', // 邮箱
						children: 0,
						description: '',
						devNum: 0,
						grade: 0,
						logoUrl: '',
						minAdminList: [],
						orgId: 0,
						pids: '',
						sort: 0
					};
					this.addOrgVisible = false;
					this.formDataRead = false;
					// 更新父组件数据
					this.$emit('change');
				})
				.catch(() => {
					// 更新父组件数据
					this.$emit('change');
					this.loading.close();
				});
		},
		_getOrgRoleList() {
			const params = this.accountFormData;
			this.loading = this.$loading({
				target: document.querySelector('.roleIdList-bg'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getOrgRoleList(params)
				.then((data) => {
					this.accountFormData.roleIdList = [parseInt(data[0].fId)];
					this.roleIdList = data;
					this.loading.close();
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
