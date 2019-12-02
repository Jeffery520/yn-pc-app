<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="org-settings-dialog"
			width="1000px"
			:title="$t('action.settings')"
			:visible.sync="OrgSettingsVisible"
			destroy-on-close
		>
			<main>
				<div style="position: relative;">
					<el-button
						v-show="!orgDisabled"
						type="info"
						icon="el-icon-delete"
						circle
						@click="deleteOrg"
						style="width: 36px;height:36px;padding: 10px 5px;position: absolute;right: 0;top: 0;z-index: 10;"
					></el-button>
					<el-button
						v-show="orgDisabled"
						@click="orgDisabled = false"
						type="primary"
						icon="el-icon-edit-outline"
						style="width: 70px;padding: 10px 5px;position: absolute;right: 0;top: 0;z-index: 10;"
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
						<el-form-item prop="contact" :label="$t('tableTitle.admin')">
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
								<el-button
									style="width: auto;margin-left: 10px;"
									@click.prevent="deleteAccount(index)"
									icon="el-icon-delete"
									circle
								></el-button>
							</el-form-item>
						</div>

						<el-form-item class="form-inline">
							<el-button type="primary" size="small" @click="addAccount"
								>+ {{ $t('action.add') }}</el-button
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
				fullName: '',
				simpleName: '',
				address: '',
				contact: '',
				phone: '',
				email: ''
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
			}
		};
	},
	methods: {
		deleteOrg() {
			const language = this.$store.getters.language;
			this.$confirm(
				language == 'zh'
					? '此操作将删除该机构, 是否继续?'
					: 'This action will delete the institution, whether to continue?',
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
			this.$refs.AddAccount.addAccountVisible = true;
		},
		deleteAccount(index) {
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
		},
		addAccount() {
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
		width: 200px;
	}
	.el-dialog__body {
		padding: 20px !important;
	}
	.el-form-item {
		/*width: 500px;*/
	}
	.form-item-inline {
		border-top: 1px solid $baseBorderColor;
		padding-top: 20px;
	}
}
</style>
