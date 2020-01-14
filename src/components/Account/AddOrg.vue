<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="add-org-dialog"
			width="600px"
			:title="$t('action.add') + ' ' + $t('route.accounts')"
			:visible.sync="addOrgVisible"
			destroy-on-close
		>
			<main style="width: 540px;">
				<el-form
					ref="addOrgForm"
					:model="formData"
					label-width="160px"
					label-suffix=":"
					:rules="rules"
				>
					<!--					<el-form-item prop="simpleName" :label="$t('tableTitle.hierarchy')">-->
					<!--						<el-select v-model="formData.hierarchy">-->
					<!--							<el-option-->
					<!--								v-for="item in hierarchy"-->
					<!--								:key="item.label"-->
					<!--								:label="item.label"-->
					<!--								:value="item.value"-->
					<!--							></el-option>-->
					<!--						</el-select>-->
					<!--					</el-form-item>-->
					<el-form-item prop="simpleName" :label="$t('tableTitle.orgName')">
						<el-input v-model="formData.simpleName"></el-input>
					</el-form-item>
					<el-form-item prop="fullName" :label="$t('tableTitle.orgFullName')">
						<el-input v-model="formData.fullName"></el-input>
					</el-form-item>
					<el-form-item prop="address" :label="$t('user.address')">
						<el-input v-model="formData.address"></el-input>
					</el-form-item>
					<el-form-item prop="contact" :label="$t('tableTitle.admin')">
						<el-input v-model="formData.contact"></el-input>
					</el-form-item>
					<el-form-item prop="phone" :label="$t('user.phone')">
						<el-input v-model="formData.phone"></el-input>
					</el-form-item>
					<el-form-item prop="email" :label="$t('user.email')">
						<el-input v-model="formData.email"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button style="width: 140px" @click="addOrgVisible = false">{{
							$t('action.cancel')
						}}</el-button>
						<el-button style="width: 140px" type="primary" @click="addOrg">{{
							$t('action.save')
						}}</el-button>
					</el-form-item>
				</el-form>
				<!--				<div class="form-item-inline"></div>-->
				<!--				<el-form-->
				<!--					ref="addAccountForm"-->
				<!--					:model="formData"-->
				<!--					label-width="160px"-->
				<!--					label-suffix=":"-->
				<!--					:rules="accountRules"-->
				<!--				>-->
				<!--					<el-form-item prop="administrator" :label="$t('user.userName')">-->
				<!--						<el-input-->
				<!--							:disabled="!!formData.adminId"-->
				<!--							v-model="formData.administrator"-->
				<!--						></el-input>-->
				<!--					</el-form-item>-->
				<!--					<el-form-item-->
				<!--						maxlength="20"-->
				<!--						prop="password"-->
				<!--						:label="$t('user.password')"-->
				<!--					>-->
				<!--						<el-input maxlength="8" v-model="formData.password"></el-input>-->
				<!--					</el-form-item>-->
				<!--					<el-form-item>-->
				<!--						<el-button style="width: 140px" @click="addOrgVisible = false">{{-->
				<!--							$t('action.cancel')-->
				<!--						}}</el-button>-->
				<!--						<el-button style="width: 140px" type="primary" @click="addOrg">{{-->
				<!--							$t('action.save')-->
				<!--						}}</el-button>-->
				<!--					</el-form-item>-->
				<!--				</el-form>-->
			</main>
		</el-dialog>
		<AllocateDevices ref="AllocateDevices"></AllocateDevices>
	</div>
</template>

<script>
import { addOrg, addAccount } from '@/api/account';
const AllocateDevices = () => import('@/components/Account/AllocateDevices');
export default {
	name: 'AddOrg',
	components: { AllocateDevices },
	data() {
		return {
			addOrgVisible: false,
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
		addOrg() {
			// this.$refs['addAccountForm'].validate((valid) => {
			// 	if (!valid) {
			// 		return false;
			// 	} else {
			this.$refs['addOrgForm'].validate((valid) => {
				if (valid) {
					this._addOrg();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
			// 	}
			// });
		},
		_addOrg() {
			this.loading = this.$loading({
				target: document.querySelector('.add-org-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const params = this.formData;
			addOrg(params)
				.then(() => {
					// 更新父组件数据
					this.$emit('change');
					this.disabled = true;
					this.loading.close();
					this.$message({
						message: 'Submit Success',
						type: 'success'
					});
					this.addOrgVisible = false;
					this.formData = {};
				})
				.catch(() => {
					this.loading.close();
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
