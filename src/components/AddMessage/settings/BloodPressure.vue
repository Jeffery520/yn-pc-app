<template>
	<div class="setting-optings-bg" style="position: relative;">
		<el-form
			ref="BloodPressure"
			:model="form"
			label-suffix=":"
			label-width="auto"
		>
			<el-form-item class="form-inline" :label="$t('others.SYS_low_limit')">
				<el-input
					type="number"
					v-model="form.bplimit.dbplower"
					:min="0"
				></el-input>
				<span class="form-unit">mmHg</span>
			</el-form-item>
			<el-form-item class="form-inline" :label="$t('others.SYS_high_limit')">
				<el-input
					type="number"
					v-model="form.bplimit.dbpupper"
					:min="0"
				></el-input>
				<span class="form-unit">mmHg</span>
			</el-form-item>
			<div class="form-inline-padding"></div>
			<el-form-item class="form-inline" :label="$t('others.DIA_low_limit')">
				<el-input
					type="number"
					v-model="form.bplimit.sbplower"
					:min="0"
				></el-input>
				<span class="form-unit">mmHg</span>
			</el-form-item>
			<el-form-item class="form-inline" :label="$t('others.DIA_high_limit')">
				<el-input
					type="number"
					v-model="form.bplimit.sbpupper"
					:min="0"
				></el-input>
				<span class="form-unit">mmHg</span>
			</el-form-item>
		</el-form>
		<el-button
			@click="submit"
			style="width: 100px;margin-left: 0;"
			type="primary"
			>{{ $t('action.save') }}</el-button
		>
	</div>
</template>

<script>
export default {
	name: 'BloodPressure',
	data() {
		return {
			language: this.$store.getters.language,
			form: {
				cmd: 110,
				did: 0,
				bplimit: {
					dbplower: 0,
					dbpupper: 0,
					sbplower: 0,
					sbpupper: 0
				}
			}
		};
	},
	methods: {
		submit() {
			console.log(this.form);
			if (
				this.form.bplimit.dbplower &&
				this.form.bplimit.dbpupper &&
				this.form.bplimit.sbplower &&
				this.form.bplimit.sbpupper
			) {
				let data = {
					didList: [],
					wSettings: this.form
				};
				this.$emit('submit', data);
			} else {
				console.log('error submit!!');
				this.$alert(
					this.language == 'zh'
						? '请填写完整信息'
						: 'Please complete the information'
				);
			}
		}
	}
};
</script>

<style scoped>
.form-inline-padding {
	height: 0px;
}
</style>
