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
			ref="Reminder"
			:model="formData"
			label-suffix="："
			label-width="auto"
		>
			<el-form-item class="form-inline no-label-form-item">
				<el-select v-model="formData.wifiInfo">
					<el-option
						v-for="item in timeCountOptins"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						:disabled="disabled"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item
				class="form-inline ml20"
				:label="$t('others.date') + ' ' + $t('others.time')"
			>
				<el-date-picker
					v-model="formData.wifiInfo"
					type="datetime"
					format="MMM d,yyyy HH:mm A"
					value-format="timestamp"
					:disabled="disabled"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item class="label-block-form-item">
				<div class="label-block">{{ $t('others.content') }}</div>
				<el-input
					type="textarea"
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
	name: 'Reminder',
	mixins: [mixin],
	props: {
		form: {
			type: Object,
			value: {}
		}
	},
	data() {
		return {
			timeCountOptins: [
				{ value: '1', label: 'Once' },
				{ value: '2', label: 'Repeat' }
			]
		};
	},
	computed: {},
	methods: {
		disabledDate(date) {
			console.log(date);
		},
		submit() {
			// todo
			// wifiInfo:"1,{yinuo_work,,yinuocare2018}"
			const { did, wifiInfo } = this.formData;
			let data = {
				cmd: 304,
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
.no-label-form-item .el-form-item__content {
	margin-left: 20px !important;
}
.ml20 {
	margin-left: 20px;
	.el-input {
		width: 260px !important;
	}
}
.label-block-form-item .el-form-item__content {
	margin-left: 20px !important;
	.label-block {
		color: #000000;
		font-size: 18px;
	}
	.el-textarea__inner {
		width: 542px;
	}
}
</style>
