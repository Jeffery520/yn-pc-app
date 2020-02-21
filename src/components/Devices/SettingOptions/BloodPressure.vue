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
			ref="BloodPressure"
			:model="formData"
			label-suffix=":"
			label-width="auto"
		>
			<el-form-item :label="$t('others.SYS_low_limit')">
				<el-input
					type="number"
					v-model="formData.sbplowerlimit"
					:disabled="disabled"
					:min="0"
				></el-input>
				<span class="form-unit">mmHg</span>
			</el-form-item>
			<el-form-item :label="$t('others.SYS_high_limit')">
				<el-input
					type="number"
					v-model="formData.sbpupperlimit"
					:disabled="disabled"
					:min="0"
				></el-input>
				<span class="form-unit">mmHg</span>
			</el-form-item>
			<div class="form-inline-padding"></div>
			<el-form-item :label="$t('others.DIA_low_limit')">
				<el-input
					type="number"
					v-model="formData.dbplowerlimit"
					:disabled="disabled"
					:min="0"
				></el-input>
				<span class="form-unit">mmHg</span>
			</el-form-item>
			<el-form-item :label="$t('others.DIA_high_limit')">
				<el-input
					type="number"
					v-model="formData.dbpupperlimit"
					:disabled="disabled"
					:min="0"
				></el-input>
				<span class="form-unit">mmHg</span>
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
	name: 'BloodPressure',
	mixins: [mixin],
	methods: {
		submit() {
			const {
				did,
				dbplowerlimit,
				dbpupperlimit,
				sbplowerlimit,
				sbpupperlimit
			} = this.formData;
			let data = {
				cmd: 110,
				did: did,
				timing: {
					dbplower: dbplowerlimit,
					dbpupper: dbpupperlimit,
					sbplower: sbplowerlimit,
					sbpupper: sbpupperlimit
				}
			};
			this._submitForm(data);
		}
	}
};
</script>

<style scoped>
.form-inline-padding {
	height: 20px;
}
</style>
