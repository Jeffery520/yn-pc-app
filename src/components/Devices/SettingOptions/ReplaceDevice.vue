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
			ref="ReplaceDevice"
			:model="defaultForm"
			label-suffix=":"
			label-width="auto"
		>
			<el-form-item
				:label="
					$store.getters.language == 'en'
						? 'IMEI number of the new device'
						: '新设备的IMEI编号'
				"
			>
				<el-input
					style="width: 220px"
					type="number"
					v-model="defaultForm.fIMEI"
					:disabled="disabled"
					:min="0"
				></el-input>
			</el-form-item>

			<el-form-item v-show="!disabled" style="margin-top: 40px">
				<el-button @click="cancel">{{ $t('action.cancel') }}</el-button>
				<el-button type="primary" @click="submit">{{
					$t('action.save')
				}}</el-button>
			</el-form-item>
		</el-form>

		<div style="padding-top: 40px">
			Or
			<el-button
				@click="factoryReset"
				style="width: auto;margin-left: 30px"
				:disabled="disabled"
				plain
				>{{
					$store.getters.language == 'en'
						? 'Factory reset the device for another user'
						: '为另一个用户的设备恢复出厂设置'
				}}</el-button
			>
		</div>
	</div>
</template>

<script>
import mixin from '@/components/Devices/SettingOptions/mixin';
import { replaceDevice } from '@/api/devices';

export default {
	name: 'ReplaceDevice',
	mixins: [mixin],
	data() {
		return {
			defaultForm: { fIMEI: '' },
			rules: {
				fIMEI: [
					{
						required: true,
						message:
							this.language == 'zh'
								? '请输入IMEI编号'
								: 'Please Enter The IMEI number',
						trigger: 'blur'
					},
					{
						min: 4,
						message:
							this.language == 'zh'
								? '长度在不少于4个字符'
								: 'Length Is No Less Than 4 Characters',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		factoryReset() {
			const language = this.$store.getters.language;
			this.$confirm(
				language == 'zh' ? '您确定要删除吗?' : 'Are you sure?',
				language == 'zh' ? '提示' : 'Prompt',
				{
					type: 'warning'
				}
			).then(() => {
				this.$confirm(
					language == 'en'
						? "Please be patient, it's in progress of device replacement, and not available to change the settings now."
						: '请耐心等待，正在进行设备更换，现在无法更改设置。',
					'提示',
					{
						type: 'warning',
						center: true,
						showCancelButton: false
					}
				);
			});
		},
		submit() {
			const { did } = this.formData;
			this.$refs['ReplaceDevice'].validate((valid) => {
				if (valid) {
					this.loading = this.$loading({
						target: document.querySelector('.settings-dialog'),
						background: 'rgba(225, 225, 225, 0)'
					});
					let data = {
						scanInfo: this.defaultForm.fIMEI,
						did: did
					};
					replaceDevice(data)
						.then((data) => {
							this.disabled = true;
							this.loading.close();
							this.$message({
								message: `${data.msg ? data.msg : 'Submit Success'}`,
								type: 'success'
							});
							this.defaultForm.fIMEI = '';
						})
						.catch(() => {
							this.loading.close();
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
};
</script>

<style scoped></style>
