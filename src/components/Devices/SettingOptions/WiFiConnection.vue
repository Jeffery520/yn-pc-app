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
			ref="WiFiConnection"
			:model="formData"
			label-suffix="："
			label-width="120px"
		>
			<el-form-item class="form-inline" :label="$t('others.name')">
				<el-input v-model="formData.wifiInfo" :disabled="disabled"></el-input>
			</el-form-item>
			<span class="line-to"></span>
			<el-form-item class="form-inline" :label="$t('others.password')">
				<el-input
					show-password
					type="password"
					v-model="formData.wifiInfo"
					:disabled="disabled"
				></el-input>
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
	name: 'WiFiConnection',
	mixins: [mixin],
	methods: {
		submit() {
			// todo
			// wifiInfo:"1,{yinuo_work,,yinuocare2018}"
			const { did, wifiInfo } = this.formData;
			let data = {
				cmd: 304, // todo
				did: did,
				wifiInfoList: {
					mac: wifiInfo, //Wifi MAC地址
					name: wifiInfo, // Wifi名称，注意不能含有 ‘, or {}’
					pwd: wifiInfo //Wifi 密码， 注意不能含有 ‘, or {}’
				}
			};
			this._submitForm(data);
		}
	}
};
</script>

<style scoped></style>
