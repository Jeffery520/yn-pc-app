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
			ref="BloodGlucose"
			:model="formData"
			label-suffix=":"
			label-width="auto"
		>
			<el-form-item :label="$t('others.low_limit')">
				<el-input
					type="number"
					v-model="formData.lowbs"
					:disabled="disabled"
				></el-input>
				<span class="form-unit">mmol/L</span>
			</el-form-item>
			<el-form-item :label="$t('others.High_limit')">
				<el-input
					type="number"
					v-model="formData.highbs"
					:disabled="disabled"
				></el-input>
				<span class="form-unit">mmol/L</span>
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
	name: 'BloodGlucose',
	mixins: [mixin],
	methods: {
		submit() {
			const { did, lowbs, highbs } = this.formData;
			let data = {
				cmd: 111,
				did: did,
				bslimit: {
					lowbs: lowbs,
					highbs: highbs
				}
			};
			this._submitForm(data);
		}
	}
};
</script>

<style scoped></style>
