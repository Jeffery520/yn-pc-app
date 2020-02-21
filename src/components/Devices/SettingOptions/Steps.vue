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
			ref="Steps"
			:model="formData"
			label-suffix=":"
			label-width="auto"
			:inline="true"
		>
			<el-form-item :label="$t('others.target')">
				<el-input
					type="number"
					v-model="formData.stepcount"
					:disabled="disabled"
				></el-input>
				<span class="form-unit">{{ $t('others.steps') }}</span>
			</el-form-item>
			<div>
				<el-form-item class="form-inline" :label="$t('others.startTime')">
					<el-time-picker
						v-model="formData.scs"
						value-format="HH:mm:ss"
						format="h:mm A"
						:disabled="disabled"
						:picker-options="{
							selectableRange: '00:00:00 - 23:59:59'
						}"
					></el-time-picker>
				</el-form-item>
				<span class="line-to">~~</span>
				<el-form-item class="form-inline" :label="$t('others.endTime')">
					<el-time-picker
						v-model="formData.sce"
						value-format="HH:mm:ss"
						format="h:mm A"
						:disabled="disabled"
						:picker-options="{
							selectableRange: '00:00:00 - 23:59:59'
						}"
					></el-time-picker>
				</el-form-item>
			</div>

			<el-form-item :label="$t('others.interval')">
				<el-input
					type="number"
					v-model="formData.sci"
					:disabled="disabled"
					:min="0"
				></el-input>
				<span class="form-unit">{{ $t('others.minutes') }}</span>
			</el-form-item>
			<div class="button-el-form-item__label">
				<el-form-item label="-" v-show="!disabled" style="margin-top: 40px">
					<el-button @click="cancel">{{ $t('action.cancel') }}</el-button>
					<el-button type="primary" @click="submit">{{
						$t('action.save')
					}}</el-button>
				</el-form-item>
			</div>
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
			const { did, stepcount, sce, sci, scs } = this.formData;
			let data = {
				cmd: 202,
				did: did,
				stepcount: stepcount,
				timing: {
					start: scs,
					end: sce,
					span: sci
				}
			};
			this._submitForm(data);
		}
	}
};
</script>

<style scoped></style>
