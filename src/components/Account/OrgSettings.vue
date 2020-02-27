<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="org-settings-dialog"
			width="800px"
			:title="$t('action.settings')"
			:visible.sync="OrgSettingsVisible"
			destroy-on-close
			@close="dialogClose"
		>
			<main style="height:650px;overflow-y: scroll;">
				<div style="position: relative;">
					<!--删除子机构的功能暂时屏蔽，后续合适的时候再考虑是否放开-->
					<!--<el-button-->
					<!--type="info"-->
					<!--icon="el-icon-delete"-->
					<!--@click="deleteOrg"-->
					<!--style="width: 80px;height:36px;padding: 10px 5px;position: absolute;right:30px;top: 0;z-index: 10;"-->
					<!--&gt;{{ $t('action.delete') }}</el-button-->
					<!--&gt;-->
					<el-button
						v-show="orgDisabled"
						@click="orgDisabled = false"
						type="primary"
						icon="el-icon-edit-outline"
						style="width: 80px;padding: 10px 5px;position: absolute;right: 30px;top: 50px;z-index: 10;"
						>{{ $t('action.edit') }}</el-button
					>
					<el-form
						ref="addOrgForm"
						:model="orgformData"
						label-width="160px"
						label-suffix=":"
						:rules="rules"
					>
						<el-form-item prop="simpleName" :label="$t('tableTitle.orgName')">
							<span>{{ orgformData.simpleName }}</span>
						</el-form-item>
						<el-form-item prop="fullName" :label="$t('tableTitle.orgFullName')">
							<span>{{ orgformData.fullName }}</span>
						</el-form-item>
						<el-form-item prop="address" :label="$t('user.address')">
							<el-input
								:disabled="orgDisabled"
								v-model="orgformData.address"
							></el-input>
						</el-form-item>
						<el-form-item prop="contact" :label="$t('tableTitle.contact')">
							<el-input
								:disabled="orgDisabled"
								v-model="orgformData.contact"
							></el-input>
						</el-form-item>
						<el-form-item prop="phone" :label="$t('user.phone')">
							<el-input
								:disabled="orgDisabled"
								v-model="orgformData.phone"
							></el-input>
						</el-form-item>
						<el-form-item prop="email" :label="$t('user.email')">
							<el-input
								:disabled="orgDisabled"
								v-model="orgformData.email"
							></el-input>
						</el-form-item>

						<el-form-item v-if="!orgDisabled">
							<el-button style="width: 120px" @click="orgDisabled = true">{{
								$t('action.cancel')
							}}</el-button>
							<el-button
								style="width: 120px"
								type="primary"
								@click="resetOrg"
								>{{ $t('action.save') }}</el-button
							>
						</el-form-item>
					</el-form>
				</div>

				<div class="form-item-inline">
					<div
						style="font-size: 20px;padding: 10px 20px 20px;font-weight: 600;"
					>
						{{
							$store.getters.language == 'en'
								? 'Administrator accounts:'
								: '管理员账号:'
						}}
					</div>
					<el-form :model="orgformData" label-width="160px" label-suffix=":">
						<div
							v-for="(item, index) in orgformData.minAdminList"
							:key="item.adminId"
						>
							<el-form-item
								class="form-inline"
								:label="$t('tableTitle.accountID')"
							>
								<el-input v-model="item.administrator" disabled></el-input>
							</el-form-item>
							<el-form-item class="form-inline" :label="$t('user.password')">
								<el-input
									:disabled="orgDisabled"
									type="password"
									:value="item.password || '********'"
								></el-input>
								<el-button
									style="width: auto;margin-left: 10px;"
									@click.prevent="resetPassword(index)"
									type="primary"
									icon="el-icon-edit"
									circle
								></el-button>
								<!--<el-button-->
								<!--style="width: auto;margin-left: 10px;"-->
								<!--@click.prevent="deleteAccount(index)"-->
								<!--icon="el-icon-delete"-->
								<!--circle-->
								<!--&gt;</el-button>-->
							</el-form-item>
						</div>

						<el-form-item
							v-if="orgformData.minAdminList.length == 0"
							class="form-inline"
						>
							<el-button type="primary" size="small" @click="addAccount"
								>+
								{{
									$t('action.add') + ' ' + $t('tableTitle.accounts')
								}}</el-button
							>
						</el-form-item>
					</el-form>
				</div>
			</main>
		</el-dialog>
		<add-account ref="AddAccount" :orgId="orgformData.orgId"></add-account>
	</div>
</template>

<script>
import { resetOrg, deleteAccount, deleteOrg } from '@/api/account';
const AddAccount = () => import('@/components/Account/AddAccount');

export default {
	name: 'OrgSettings',
	components: { AddAccount },
	data() {
		return {
			OrgSettingsVisible: false,
			orgDisabled: true,
			orgformData: {
				hierarchy: '',
				fullName: '',
				simpleName: '',
				address: '',
				contact: '',
				phone: '',
				email: '',
				minAdminList: []
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
				]
			},
			hierarchy: [
				{
					value: 'OneCare Functional Units',
					label: 'OneCare Functional Units'
				},
				{
					value: 'Discipline',
					label: 'Discipline'
				},
				{
					value: 'Practice Area',
					label: 'Practice Area'
				},
				{
					value: 'Organization',
					label: 'Organization'
				},
				{
					value: 'Caregiver',
					label: 'Caregiver'
				}
			]
		};
	},
	methods: {
		dialogClose() {
			if (this.loading) this.loading.close();
			this.orgDisabled = true;
		},
		deleteOrg() {
			const language = this.$store.getters.language;
			this.$confirm(
				language == 'zh'
					? '您确定要删除吗?'
					: 'Are you sure you want to Delete?',
				language == 'zh' ? '提示' : 'Prompt',
				{
					type: 'warning'
				}
			).then(() => {
				this.loading = this.$loading({
					target: document.querySelector('.org-settings-dialog'),
					background: 'rgba(225, 225, 225, 0)'
				});
				deleteOrg({ orgId: this.orgformData.orgId })
					.then(() => {
						// 更新父组件数据
						this.OrgSettingsVisible = false;
						this.$emit('change');
						this.loading.close();
						this.$message({
							type: 'success',
							message: 'success!'
						});
					})
					.catch(() => {
						this.loading.close();
					});
			});
		},
		resetOrg() {
			this.$refs['addOrgForm'].validate((valid) => {
				if (valid) {
					this._resetOrg();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetPassword(index) {
			this.$refs.AddAccount.formData = this.orgformData.minAdminList[index];
			this.$refs.AddAccount.cantSeleteRoles = true;
			this.$refs.AddAccount.addAccountVisible = true;
		},
		deleteAccount(index) {
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
					target: document.querySelector('.org-settings-dialog'),
					background: 'rgba(225, 225, 225, 0)'
				});
				const params = {
					adminId: this.orgformData.minAdminList[index].adminId
				};
				deleteAccount(params)
					.then(() => {
						// 更新父组件数据
						this.$emit('change');
						this.loading.close();
					})
					.catch(() => {
						this.loading.close();
					});
			});
		},
		addAccount() {
			this.$refs.AddAccount.cantSeleteRoles = true;
			this.$refs.AddAccount.addAccountVisible = true;
		},
		_resetOrg() {
			this.loading = this.$loading({
				target: document.querySelector('.org-settings-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const params = this.orgformData;
			resetOrg(params)
				.then(() => {
					// 更新父组件数据
					this.$emit('change');
					this.orgDisabled = true;
					this.loading.close();
					this.$message({
						message: 'Submit Success',
						type: 'success'
					});
				})
				.catch(() => {
					this.loading.close();
				});
		}
	}
};
</script>

<style lang="scss">
.org-settings-dialog {
	.el-input {
		width: 450px;
	}
	.el-dialog__body {
		padding: 20px !important;
	}
	.el-form-item {
		/*width: 500px;*/
	}
}
</style>
