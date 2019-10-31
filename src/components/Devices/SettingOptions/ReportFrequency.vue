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
			ref="ReportFrequency"
			:model="formData"
			label-suffix=":"
			label-width="auto"
		>
			<el-form-item :label="$t('others.interval')">
				<el-input
					type="number"
					v-model="formData.reportSpan"
					:disabled="disabled"
				></el-input>
				<span class="form-unit">{{ $t('others.minutes') }}</span>
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
	name: 'ReportFrequency',
	mixins: [mixin],
	methods: {
		submit() {
			const { did, reportSpan } = this.formData;
			let data = {
				cmd: 232,
				did: did,
				reportSpan: reportSpan
			};
			this._submitForm(data);
		}
	}
};
</script>

<style scoped></style>
