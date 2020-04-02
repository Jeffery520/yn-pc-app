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
			ref="FallDetection"
			:model="formData"
			label-suffix=":"
			label-width="auto"
			:inline="true"
		>
			<div>
				<!--时间选择-->
				<el-form-item class="form-inline" :label="$t('others.startTime')">
					<el-time-picker
						v-model="formData.fallstarttime"
						value-format="HH:mm"
						format="h:mm A"
						:disabled="disabled"
						:picker-options="{
							selectableRange: '00:00:00 - 23:59:59'
						}"
					>
					</el-time-picker>
				</el-form-item>
				<span class="line-to">~~</span>
				<el-form-item class="form-inline" :label="$t('others.endTime')">
					<el-time-picker
						v-model="formData.fallendtime"
						value-format="HH:mm"
						format="h:mm A"
						:disabled="disabled"
						:picker-options="{
							selectableRange: '00:00:00 - 23:59:59'
						}"
					>
					</el-time-picker>
				</el-form-item>
			</div>
			<!--      开启关闭-->
			<el-form-item :label="$t('action.switch')">
				<el-switch
					v-model="formData.fallstatus"
					active-value="1"
					inactive-value="0"
					active-text="on"
					inactive-text="off"
					:disabled="disabled"
				>
				</el-switch>
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
	name: 'FallDetection',
	mixins: [mixin],
	methods: {
		submit() {
			const { did, fallstarttime, fallendtime, fallstatus } = this.formData;
			let data = {
				cmd: 206,
				did: did,
				timing: {
					start: fallstarttime,
					end: fallendtime,
					span: fallstatus ? 1 : 0 //开关
				}
			};
			this._submitForm(data);
		}
	}
};
</script>

<style scoped></style>
