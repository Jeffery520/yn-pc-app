<template>
	<div style="position: relative;">
		<el-button
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
			label-width="120px"
		>
			<el-form-item :label="$t('user.phone') + 1" class="phone-width">
				<el-input v-model="formData.sos1" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item :label="$t('user.phone') + 2" class="phone-width">
				<el-input v-model="formData.sos2" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item :label="$t('user.phone') + 3" class="phone-width">
				<el-input v-model="formData.sos3" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item v-show="!disabled" style="margin-top: 40px">
				<el-button @click="cancel">Cancel</el-button>
				<el-button type="primary" @click="submit">Submit</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import mixin from '@/components/Devices/SettingOptions/mixin';
export default {
	name: 'SOSsettings',
	mixins: [mixin],
	methods: {
		submit() {
			// todo
			// soscontent	string
			// 紧急求救短信内容
			const { did, sos1, sos2, sos3, soscontent } = this.formData;
			let data = {
				cmd: 214,
				did: did,
				sos: { sos1, sos2, sos3, soscontent }
			};
			this._submitForm(data);
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
