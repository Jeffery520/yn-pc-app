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
			ref="SleepTime"
			:model="formData"
			label-suffix=":"
			label-width="auto"
		>
			<el-form-item class="form-inline" :label="$t('others.startTime')">
				<el-time-picker
					v-model="formData.sls"
					value-format="HH:mm:ss"
					format="HH:mm A"
					:disabled="disabled"
					:picker-options="{
						selectableRange: '00:00:00 - 23:59:59'
					}"
				></el-time-picker>
			</el-form-item>
			<span class="line-to">~~</span>
			<el-form-item class="form-inline" :label="$t('others.endTime')">
				<el-time-picker
					v-model="formData.sle"
					value-format="HH:mm:ss"
					format="HH:mm A"
					:disabled="disabled"
					:picker-options="{
						selectableRange: formData.sls + ' - 23:59:59'
					}"
				></el-time-picker>
			</el-form-item>
			<!--      开启关闭-->
			<el-form-item :label="$t('action.switch')">
				<el-switch
					v-model="formData.sli"
					active-text="on"
					inactive-text="off"
					:disabled="disabled"
				>
				</el-switch>
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
	name: 'SleepTime',
	mixins: [mixin],
	methods: {
		submit() {
			const { did, sle, sli, sls } = this.formData;
			let data = {
				cmd: 204,
				did: did,
				timing: {
					start: sls,
					end: sle,
					span: sli ? 1 : 0
				}
			};
			this._submitForm(data);
		}
	}
};
</script>

<style scoped></style>
