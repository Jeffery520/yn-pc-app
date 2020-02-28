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
			ref="SOSsettings"
			:model="formData"
			label-suffix="："
			label-width="auto"
			:rules="rules"
		>
			<el-form-item
				prop="sos1"
				:label="$t('user.phone') + 1"
				class="phone-width"
			>
				<tel-input
					v-if="!disabled"
					:phone="formData.sos1"
					@change="phoneChange1"
				></tel-input>
				<el-input
					v-else
					:value="_formatPhone(formData.sos1)"
					:disabled="disabled"
				></el-input>
			</el-form-item>
			<el-form-item
				prop="sos2"
				:label="$t('user.phone') + 2"
				class="phone-width"
			>
				<tel-input
					v-if="!disabled"
					:phone="formData.sos2"
					@change="phoneChange2"
				></tel-input>
				<el-input
					v-else
					:value="_formatPhone(formData.sos2)"
					:disabled="disabled"
				></el-input>
			</el-form-item>
			<el-form-item
				prop="sos3"
				:label="$t('user.phone') + 3"
				class="phone-width"
			>
				<tel-input
					v-if="!disabled"
					:phone="formData.sos3"
					@change="phoneChange3"
				></tel-input>
				<el-input
					v-else
					:value="_formatPhone(formData.sos3)"
					:disabled="disabled"
				></el-input>
			</el-form-item>
			<el-form-item prop="soscontent" :label="'SOS ' + $t('others.content')">
				<el-input
					type="textarea"
					v-model="formData.soscontent"
					:disabled="disabled"
					style="width: 440px"
				></el-input>
			</el-form-item>
			<el-form-item v-show="!disabled" style="margin-top: 40px">
				<el-button @click="cancel">{{ $t('action.cancel') }}</el-button>
				<el-button type="primary" @click="submit">{{
					$t('action.save')
				}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import mixin from '@/components/Devices/SettingOptions/mixin';
import TelInput from '@/components/TelInput/TelInput';
import { formatPhone } from '@/utils/validate';

export default {
	name: 'SOSsettings',
	mixins: [mixin],
	components: { TelInput },
	data() {
		return {
			rules: {
				sos1: [
					{
						required: true,
						message:
							this.language == 'zh' ? '请输入姓名' : 'Please Enter Your Name',
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
				soscontent: [
					{
						required: true,
						message:
							this.language == 'zh'
								? '请输入救援信息'
								: 'Please enter SOS content',
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
	methods: {
		phoneChange1(val) {
			this.formData.sos1 = val;
		},
		phoneChange2(val) {
			this.formData.sos2 = val;
		},
		phoneChange3(val) {
			this.formData.sos3 = val;
		},
		submit() {
			this.$refs['SOSsettings'].validate((valid) => {
				if (valid) {
					// 紧急求救短信内容
					const { did, sos1, sos2, sos3, soscontent } = this.formData;

					let data = {
						cmd: 214,
						did: did,
						sos: { sos1, sos2, sos3, soscontent }
					};
					this._submitForm(data);
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
.phone-width {
	.el-input {
		width: 200px !important;
	}
}
</style>
