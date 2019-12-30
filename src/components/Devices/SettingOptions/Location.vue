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
			ref="Steps"
			:model="formData"
			label-suffix=":"
			label-width="auto"
			:inline="true"
		>
			<div>
				<el-form-item class="form-inline" :label="$t('others.startTime')">
					<el-time-picker
						v-model="formData.los"
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
						v-model="formData.loe"
						value-format="HH:mm:ss"
						format="HH:mm A"
						:disabled="disabled"
						:picker-options="{
							selectableRange: formData.los + ' - 23:59:59'
						}"
					></el-time-picker>
				</el-form-item>
			</div>

			<el-form-item :label="$t('others.interval')">
				<el-input
					type="number"
					v-model="formData.loi"
					:disabled="disabled"
					:min="0"
				></el-input>
				<span class="form-unit">{{ $t('others.minutes') }}</span>
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
export default {
	name: 'Location',
	mixins: [mixin],
	methods: {
		submit() {
			const { did, los, loe, loi } = this.formData;
			let data = {
				cmd: 203,
				did: did,
				timing: {
					start: los,
					end: loe,
					span: loi
				}
			};
			this._submitForm(data);
		}
	}
};
</script>

<style scoped></style>
