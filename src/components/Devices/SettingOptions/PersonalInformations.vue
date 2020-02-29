<template>
	<div style="position: relative;">
		<el-button
			v-if="$store.getters.userInfo.resource.indexOf(11) > -1"
			v-show="disabled"
			@click="disabled = false"
			type="primary"
			icon="el-icon-edit-outline"
			style="width: 70px;padding: 10px 5px;position: absolute;right: 0;top: 0;z-index: 10;"
			>Edit</el-button
		>
		<el-form
			ref="PersonalInformations"
			:model="settingsForm"
			label-suffix=":"
			label-width="auto"
			:rules="rules"
		>
			<el-form-item
				:label="$store.getters.language == 'en' ? 'Portrait' : '头像'"
				class="w200"
			>
				<upload-img
					:imgUrl="settingsForm.fHead"
					:disabled="disabled"
					@change="(url) => (settingsForm.fHead = url)"
				></upload-img>
			</el-form-item>

			<el-form-item prop="fFullname" :label="$t('user.userName')" class="w200">
				<el-input
					v-model="settingsForm.fFullname"
					:disabled="disabled"
				></el-input>
			</el-form-item>
			<el-form-item prop="fAge" :label="$t('user.age')" class="w110">
				<el-input
					type="number"
					v-model="settingsForm.fAge"
					:disabled="disabled"
					:min="0"
				></el-input>
			</el-form-item>
			<el-form-item prop="fSex" :label="$t('user.gender')" class="w110">
				<el-select v-model="settingsForm.fSex" :disabled="disabled">
					<el-option
						v-for="item in gender"
						:key="item.label"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="fPhone" :label="$t('user.phone')" class="w200">
				<tel-input
					v-if="!disabled"
					:phone="settingsForm.fPhone"
					@change="phoneChange"
				></tel-input>
				<el-input
					v-else
					:value="_formatPhone(settingsForm.fPhone)"
					:disabled="true"
				></el-input>
			</el-form-item>
			<!--			<el-form-item-->
			<!--				prop="fAddress"-->
			<!--				:label="$t('others.organization')"-->
			<!--				class="user-info-width"-->
			<!--			>-->
			<!--				<el-input-->
			<!--					v-model="settingsForm.fAddress"-->
			<!--					:disabled="disabled"-->
			<!--				></el-input>-->
			<!--			</el-form-item>-->
			<el-form-item
				prop="fAddress"
				:label="$t('user.address')"
				class="user-info-width"
			>
				<el-input
					type="textarea"
					v-model="settingsForm.fAddress"
					:disabled="disabled"
					resize="none"
					style="width: 400px"
				></el-input>
			</el-form-item>
			<el-form-item v-show="!disabled" style="margin-top: 40px">
				<el-button @click="cancel">{{ $t('action.cancel') }}</el-button>
				<el-button type="primary" @click="submit">
					{{ $t('action.save') }}
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import mixin from '@/components/Devices/SettingOptions/mixin';
import { getDevicesUserInfo, subDevicesUserInfo } from '@/api/devices';
import TelInput from '@/components/TelInput/TelInput';
import UploadImg from '@/components/UploadImg/index';
import { formatPhone } from '@/utils/validate';

export default {
	name: 'PersonalInformations',
	mixins: [mixin],
	components: { TelInput, UploadImg },
	data() {
		return {
			language: this.$store.getters.language,
			settingsForm: {},
			gender: [
				{
					label: this.$store.getters.language == 'en' ? 'Male' : '男',
					value: 0
				},
				{
					label: this.$store.getters.language == 'en' ? 'Female' : '女',
					value: 1
				},
				{
					label: this.$store.getters.language == 'en' ? 'Other' : '其他',
					value: 2
				}
			],
			rules: {
				fFullname: [
					{
						required: true,
						message:
							this.language == 'zh' ? '请输入姓名' : 'Please Enter Your Name',
						trigger: 'blur'
					}
				],
				fAge: [
					{
						required: true,
						message: this.language == 'zh' ? '请输入年龄' : 'Please Enter Age',
						trigger: 'blur'
					}
				],
				fSex: [
					{
						required: true,
						message:
							this.language == 'zh' ? '请输选择性别' : 'Please Lose The Gender',
						trigger: 'blur'
					}
				],
				fPhone: [
					{
						required: true,
						message:
							this.language == 'zh'
								? '请输入电话'
								: 'Please Enter The Phone Number',
						trigger: 'blur'
					},
					{
						min: 6,
						message:
							this.language == 'zh'
								? '长度在不少于6个字符'
								: 'Length Is No Less Than 6 Characters',
						trigger: 'blur'
					}
				],
				fAddress: [
					{
						required: true,
						message:
							this.language == 'zh'
								? '请输输入地址'
								: 'Please Enter The Input Address',
						trigger: 'blur'
					},
					{
						min: 5,
						message:
							this.language == 'zh'
								? '长度在不少于5个字符'
								: 'Length Is No Less Than 5 Characters',
						trigger: 'blur'
					}
				]
			}
		};
	},
	mounted() {
		this.loading = this.$loading({
			target: document.querySelector('.settings-dialog'),
			background: 'rgba(225, 225, 225, 0)'
		});
		getDevicesUserInfo({ did: this.form.did })
			.then((data) => {
				this.settingsForm = data;
				this.loading.close();
			})
			.catch(() => {
				this.loading.close();
			});
	},
	methods: {
		phoneChange(val) {
			this.settingsForm.fPhone = val;
		},
		submit() {
			this.$refs['PersonalInformations'].validate((valid) => {
				if (valid) {
					this.loading = this.$loading({
						target: document.querySelector('.settings-dialog'),
						background: 'rgba(225, 225, 225, 0)'
					});
					subDevicesUserInfo(this.settingsForm)
						.then(() => {
							this.disabled = true;
							this.loading.close();
							this.$message({
								message: 'Submit Success',
								type: 'success'
							});
						})
						.catch(() => {
							this.loading.close();
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},

		_formatPhone(phone) {
			return formatPhone(phone);
		}
	}
};
</script>

<style lang="scss">
.user-info-width {
	.el-input {
		width: 400px !important;
	}
}
.w110 {
	.el-input {
		width: 110px !important;
	}
}
.w200 {
	.el-input {
		width: 200px !important;
	}
}
</style>
