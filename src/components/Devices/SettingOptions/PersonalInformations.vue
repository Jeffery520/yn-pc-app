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
			ref="PersonalInformations"
			:model="formData"
			label-suffix=":"
			label-width="auto"
		>
			<el-form-item :label="$t('user.userName')" class="w200">
				<el-input v-model="formData.wifiInfo" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item :label="$t('user.age')" class="w110">
				<el-input
					type="number"
					v-model="formData.wifiInfo"
					min="0"
					:disabled="disabled"
				></el-input>
			</el-form-item>
			<el-form-item :label="$t('user.gender')" class="w110">
				<el-select v-model="formData.wifiInfo" :disabled="disabled">
					<el-option
						v-for="item in gender"
						:key="item"
						:label="item"
						:value="item"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item type="number" :label="$t('user.phone')" class="w200">
				<el-input v-model="formData.wifiInfo" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item :label="$t('others.organization')" class="user-info-width">
				<el-input v-model="formData.wifiInfo" :disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item :label="$t('user.address')" class="user-info-width">
				<el-input
					type="textarea"
					v-model="formData.wifiInfo"
					:disabled="disabled"
					resize="none"
					style="width: 400px"
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
	name: 'PersonalInformations',
	mixins: [mixin],
	data() {
		return {
			gender: ['Male', 'Female']
		};
	},
	methods: {
		submit() {
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
